# The Complete Redis & Caching Master Guide

> A friendly, in-depth, and practical handbook covering everything you need to know about Redis—from starting a Redis container in Docker and using `redis-cli` to mastering in-memory data structures, key expiration, the Cache-Aside pattern, and Pub/Sub messaging.

---

## 1. The Mental Model: What is Redis & Why Does it Exist?

In modern web development, speed is everything. Users expect web pages and API responses in milliseconds.

### The Library vs. Desk Drawer Analogy
Imagine you are working at your desk:
* **Your Desk Drawer**: Holds your notepad and favorite pen. Reaching in and grabbing something takes **half a second**. However, your desk drawer has limited space.
* **The City Library**: Houses millions of books and encyclopedias. If you need a book, you have to stand up, drive 20 minutes across town, find the aisle, check it out, and drive home. It holds infinite knowledge, but it is **slow**.

```text
┌─────────────────────────────────────────────────────────────┐
│                    THE MEMORY HIERARCHY                     │
├──────────────────────────────┬──────────────────────────────┤
│  RAM (In-Memory - REDIS)     │  DISK (Persistent - POSTGRES)│
├──────────────────────────────┼──────────────────────────────┤
│  ⚡ Nanoseconds / Microseconds │  🐢 Milliseconds (100x slower)│
│  Volatile (wiped if unpowered)│  Permanent on physical disk  │
│  Smaller capacity (e.g. 16GB) │  Huge capacity (e.g. 2TB)    │
│  "Desk Drawer"               │  "City Library"              │
└──────────────────────────────┴──────────────────────────────┘
```

* **PostgreSQL / MySQL** is the **City Library**: Stored on disk (SSD/Hard Drive). It offers safety, complex relationships, and infinite storage, but reading from disk takes several milliseconds.
* **Redis** is your **Desk Drawer**: Stored entirely in **RAM** (Random Access Memory). Fetching or writing a key takes **sub-millisecond (under 1 millisecond)** speed!

### What Does "Redis" Stand For?
Redis stands for **RE**mote **DI**ctionary **S**erver. It is an open-source, ultra-fast in-memory **Key-Value Store**. Instead of tables with rows and columns, Redis stores values mapped to unique keys:

```text
       KEY                       VALUE
  "user:101:name"      ──▶    "Alex Rivera"
  "cart:user:45"       ──▶    ["item_1", "item_2"]
  "page_views:home"    ──▶    14502
```

### Top Real-World Use Cases for Redis:
1. **Database Caching**: Storing high-traffic PostgreSQL query results so you don't hammer your disk database repeatedly.
2. **User Session Storage**: Remembering user logins and authentication tokens across a cluster of backend servers.
3. **Counters & Rate Limiting**: Counting API requests per IP address to block spam and DDoS attacks (e.g., max 100 requests per minute).
4. **Leaderboards & Gaming**: Keeping real-time score rankings using Redis Sorted Sets.
5. **Real-time Messaging (Pub/Sub)**: Broadcasting chat messages and notifications instantly between servers.

---

## 2. Running Redis in Docker

Instead of installing Redis directly onto Windows, macOS, or Linux, we run Redis inside a **Docker Container**. This keeps your computer clean, allows instant resets, and mirrors production cloud environments.

```text
┌─────────────────────────────────────────────────────────────┐
│                      YOUR COMPUTER (HOST)                   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 DOCKER CONTAINER                    │   │
│   │                                                     │   │
│   │   Redis Engine (Port 6379)                          │   │
│   │   In-Memory RAM Store                               │   │
│   │   Append-Only File (AOF Persistence)                │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │ Mounted Volume               │
│                              ▼                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │             DOCKER VOLUME: redis_data               │   │
│   │   (Persists snapshots and logs to host disk)        │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Option A: The Quick `docker run` Command

Open your terminal (PowerShell, Command Prompt, or Terminal) and run:

```bash
docker run -d \
  --name dev-redis \
  -p 6379:6379 \
  -v redis_data:/data \
  --restart unless-stopped \
  redis:7-alpine redis-server --appendonly yes
```

#### What Each Flag Does:
| Flag / Option | Purpose |
| :--- | :--- |
| `-d` | **Detached Mode**: Runs Redis in the background so your terminal remains free. |
| `--name dev-redis` | Names the container `dev-redis`. |
| `-p 6379:6379` | Maps host port `6379` to container port `6379` (6379 is the official default Redis port). |
| `-v redis_data:/data` | Mounts a Docker Volume named `redis_data` to `/data` so snapshots are saved to host disk. |
| `--restart unless-stopped` | Automatically restarts the container if Docker restarts or your computer reboots. |
| `redis:7-alpine` | Uses the lightweight Alpine Linux build of Redis 7 (~35 MB download). |
| `redis-server --appendonly yes` | Starts the Redis server with **Append-Only File (AOF)** persistence enabled (logs every write to disk for durability). |

---

### Option B: The Production `docker-compose.yml`

If you are using Docker Compose alongside PostgreSQL in your project, add the Redis service to your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL Service
  database:
    image: postgres:16-alpine
    container_name: dev-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
      POSTGRES_DB: store_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  # Redis In-Memory Cache Service
  cache:
    image: redis:7-alpine
    container_name: dev-redis
    restart: unless-stopped
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  pgdata:
  redis_data:
```

#### Starting & Managing Redis:
```bash
# 1. Start Redis in the background
docker compose up -d cache

# 2. View real-time logs
docker compose logs -f cache

# 3. Stop Redis
docker compose stop cache
```

---

## 3. Connecting to Redis with `redis-cli`

Redis comes with its own interactive command-line tool called **`redis-cli`**. Because it is pre-installed inside the Docker container, you can jump straight in:

```bash
docker exec -it dev-redis redis-cli
```

You will see the Redis interactive prompt:
```text
127.0.0.1:6379> 
```

### The First Test: PING
Type `PING` and press Enter:
```text
127.0.0.1:6379> PING
PONG
```
If Redis responds with `PONG`, your server is healthy, running in RAM, and ready to accept commands!

### Basic Server Inspection Commands:
```bash
# 1. Check total number of keys currently in database
DBSIZE

# 2. View Redis server version and memory usage stats
INFO memory

# 3. Exit redis-cli back to your host terminal
exit
# (or type QUIT)
```

---

## 4. Key Naming Conventions (Industry Best Practice)

Unlike relational databases where tables dictate structure, Redis is a flat key-value dictionary. To keep millions of keys organized without conflicts, software engineers use **colon-separated namespaces**:

```text
<object_type>:<id>:<attribute>
```

#### Good Examples:
* `user:101:profile` ── (Profile data for user 101)
* `user:101:session` ── (Login session for user 101)
* `product:492:stock` ── (Inventory count for product 492)
* `cart:user:101` ── (Shopping cart for user 101)
* `rate_limit:ip:192.168.1.1` ── (Request count for this IP address)

---

## 5. Core Data Types & Essential Commands

Redis is not just a plain string store. It offers **5 fundamental data structures**, each tailored for specific backend challenges. Let's master each one with practical, hands-on examples.

```text
┌─────────────────────────────────────────────────────────────┐
│                     REDIS DATA STRUCTURES                   │
├──────────────┬──────────────────────────────────────────────┤
│ Type         │ Best Used For                                │
├──────────────┼──────────────────────────────────────────────┤
│ 1. Strings   │ Text, JSON, numbers, counters, cached pages  │
│ 2. Hashes    │ Objects / records with fields (User profile) │
│ 3. Lists     │ Ordered queues, activity feeds, task lists   │
│ 4. Sets      │ Unique items, tags, mutual friends, filters  │
│ 5. SortedSets│ Leaderboards, priority queues, rankings      │
└──────────────┴──────────────────────────────────────────────┘
```

---

### Type 1: Strings (The Foundation)

Strings are the most basic and versatile data type in Redis. They can hold plain text, serialized JSON strings, or raw numbers up to 512 MB.

#### 1. Setting and Getting Values
```text
127.0.0.1:6379> SET user:101:name "Alex Rivera"
OK

127.0.0.1:6379> GET user:101:name
"Alex Rivera"
```

If you query a key that does not exist, Redis returns `(nil)`:
```text
127.0.0.1:6379> GET user:999:name
(nil)
```

#### 2. Storing Serialized JSON
```text
127.0.0.1:6379> SET user:101:settings '{"theme":"dark","notifications":true,"currency":"USD"}'
OK

127.0.0.1:6379> GET user:101:settings
"{\"theme\":\"dark\",\"notifications\":true,\"currency\":\"USD\"}"
```

#### 3. Atomic Counters (`INCR`, `DECR`, `INCRBY`)
If a string contains a number, Redis can increment or decrement it **atomically** in memory without race conditions (even if 10,000 visitors click a button at the exact same millisecond!):

```text
-- Initialize website page views to 0
127.0.0.1:6379> SET page:home:views 0
OK

-- Increment by 1
127.0.0.1:6379> INCR page:home:views
(integer) 1

127.0.0.1:6379> INCR page:home:views
(integer) 2

-- Increment by a specific amount (e.g. 50 new views)
127.0.0.1:6379> INCRBY page:home:views 50
(integer) 52

-- Decrement (e.g. inventory reduction)
127.0.0.1:6379> DECRBY product:50:stock 2
(integer) 48
```

#### 4. Batch Operations (`MSET` & `MGET`)
Fetch or set multiple keys in one single roundtrip to save network latency:

```text
127.0.0.1:6379> MSET config:sitename "Apex Tech" config:maintenance "false"
OK

127.0.0.1:6379> MGET config:sitename config:maintenance
1) "Apex Tech"
2) "false"
```

#### 5. Set Only If Not Exists (`SETNX`)
`SETNX` (Set if Not eXists) only sets the key if it doesn't already exist. If it exists, it returns `0` (fails). This is the secret foundation of **Distributed Locks**:

```text
127.0.0.1:6379> SETNX lock:nightly_backup "worker_1"
(integer) 1   <-- Succeeded! Worker 1 acquired the lock.

127.0.0.1:6379> SETNX lock:nightly_backup "worker_2"
(integer) 0   <-- Failed! Another worker already holds the lock.
```

---

### Type 2: Key Expiration & TTL (The Heart of Caching)

The true superpower of Redis is **automatic time-to-live (TTL)**. You can tell Redis: *"Keep this cached data for 60 seconds, and then delete it automatically!"*

```text
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATIC EXPIRATION                     │
│                                                             │
│   SETEX cache:weather:london 10 "Sunny 22C"                 │
│                                                             │
│   Time = 0s  ──▶ Value is "Sunny 22C" (TTL = 10s)           │
│   Time = 5s  ──▶ Value is "Sunny 22C" (TTL = 5s)            │
│   Time = 11s ──▶ Key automatically deleted by Redis! (nil)  │
└─────────────────────────────────────────────────────────────┘
```

#### 1. Set Value with Expiration (`SETEX`)
Syntax: `SETEX <key> <seconds> <value>`

```text
-- Cache OTP (One-Time Password) that expires in 60 seconds
127.0.0.1:6379> SETEX otp:user:101 60 "849201"
OK
```

#### 2. Checking Remaining Life (`TTL`)
Syntax: `TTL <key>`

```text
127.0.0.1:6379> TTL otp:user:101
(integer) 54

127.0.0.1:6379> TTL otp:user:101
(integer) 12

-- Wait for it to expire...
127.0.0.1:6379> TTL otp:user:101
(integer) -2

127.0.0.1:6379> GET otp:user:101
(nil)
```

#### Interpreting TTL Return Codes:
* **Positive Number (e.g. `45`)**: Key is alive and will expire in that many seconds.
* **`-1`**: Key exists, but has **no expiration** set (it will live forever).
* **`-2`**: Key does not exist (or has already expired and been wiped).

#### 3. Adding Expiration to an Existing Key (`EXPIRE`)
```text
127.0.0.1:6379> SET session:token:xyz "logged_in_user_data"
OK

-- Set to expire in 3600 seconds (1 hour)
127.0.0.1:6379> EXPIRE session:token:xyz 3600
(integer) 1
```

---

### Type 3: Hashes (Objects & Dictionaries)

A Redis **Hash** is a miniature dictionary inside a key. Think of it as a JavaScript object or Python dictionary with field-value pairs. 

Hashes are ideal for storing structured entities (like user profiles or product details) without having to serialize and deserialize entire JSON strings.

```text
  KEY: "user:101"
┌──────────────────┬──────────────────────┐
│ Field            │ Value                │
├──────────────────┼──────────────────────┤
│ name             │ "Alex Rivera"        │
│ email            │ "alex@example.com"   │
│ role             │ "admin"              │
│ login_count      │ 1                    │
└──────────────────┴──────────────────────┘
```

#### 1. Creating and Updating Hashes (`HSET`)
```text
127.0.0.1:6379> HSET user:101 name "Alex Rivera" email "alex@example.com" role "admin" login_count 1
(integer) 4
```

#### 2. Reading a Single Field (`HGET`)
```text
127.0.0.1:6379> HGET user:101 email
"alex@example.com"
```

#### 3. Reading All Fields and Values (`HGETALL`)
```text
127.0.0.1:6379> HGETALL user:101
1) "name"
2) "Alex Rivera"
3) "email"
4) "alex@example.com"
5) "role"
6) "admin"
7) "login_count"
8) "1"
```

#### 4. Incrementing a Field Value Inside a Hash (`HINCRBY`)
```text
127.0.0.1:6379> HINCRBY user:101 login_count 1
(integer) 2
```

#### 5. Deleting a Specific Field (`HDEL`)
```text
127.0.0.1:6379> HDEL user:101 role
(integer) 1
```

---

### Type 4: Lists (Ordered Queues & Stacks)

Redis **Lists** are ordered collections of strings. You can insert or remove elements from the head (left) or tail (right) in **O(1) constant time**.

Lists are widely used for **Task Queues** (background job workers) and **Recent Activity Feeds**.

```text
            LPUSH (Left In)               RPUSH (Right In)
                   │                             │
                   ▼                             ▼
              ┌─────────┬─────────┬─────────┬─────────┐
              │ Item 1  │ Item 2  │ Item 3  │ Item 4  │
              └─────────┴─────────┴─────────┴─────────┘
                   ▲                             ▲
                   │                             │
             LPOP (Left Out)               RPOP (Right Out)
```

#### 1. Pushing Items (`LPUSH` and `RPUSH`)
```text
-- Add background tasks to queue (from the right)
127.0.0.1:6379> RPUSH tasks:email "welcome_user_101"
(integer) 1

127.0.0.1:6379> RPUSH tasks:email "send_receipt_492"
(integer) 2

127.0.0.1:6379> RPUSH tasks:email "reset_password_22"
(integer) 3
```

#### 2. Viewing Items (`LRANGE`)
Syntax: `LRANGE <key> <start_index> <stop_index>`
*(Use `0 -1` to view all elements from first to last)*

```text
127.0.0.1:6379> LRANGE tasks:email 0 -1
1) "welcome_user_101"
2) "send_receipt_492"
3) "reset_password_22"
```

#### 3. Processing Items from the Queue (`LPOP` - FIFO Queue)
A worker pulls the oldest task from the front (left) of the queue:

```text
127.0.0.1:6379> LPOP tasks:email
"welcome_user_101"

-- The task is removed and processed!
127.0.0.1:6379> LRANGE tasks:email 0 -1
1) "send_receipt_492"
2) "reset_password_22"
```

#### 4. Checking Queue Length (`LLEN`)
```text
127.0.0.1:6379> LLEN tasks:email
(integer) 2
```

---

### Type 5: Sets (Unique Unordered Collections)

A Redis **Set** is an unordered collection of unique strings. If you add the same item 10 times, Redis only keeps one copy.

Sets are perfect for **Unique Tags**, **Online User Tracking**, and finding **Mutual Friends / Common Interests**.

```text
       SET: "tags:article:42"
  ┌──────────────────────────────────┐
  │  "javascript"   "backend"        │
  │  "docker"       "redis"          │
  │  (No duplicates permitted!)      │
  └──────────────────────────────────┘
```

#### 1. Adding Members (`SADD`)
```text
127.0.0.1:6379> SADD online_users "user:101" "user:102" "user:103"
(integer) 3

-- Adding a duplicate returns 0 (ignored!)
127.0.0.1:6379> SADD online_users "user:101"
(integer) 0
```

#### 2. Checking Membership Instantly (`SISMEMBER`)
Runs in lightning-fast O(1) time:
```text
127.0.0.1:6379> SISMEMBER online_users "user:102"
(integer) 1   <-- Yes, user 102 is online!

127.0.0.1:6379> SISMEMBER online_users "user:999"
(integer) 0   <-- No, user 999 is offline.
```

#### 3. Set Operations: Mutual Friends (`SINTER`)
Find items that appear in **both** sets:

```text
-- Alex's skills
127.0.0.1:6379> SADD skills:alex "JavaScript" "PostgreSQL" "Docker" "Redis"
(integer) 4

-- Maya's skills
127.0.0.1:6379> SADD skills:maya "Python" "PostgreSQL" "Docker" "Kubernetes"
(integer) 4

-- Find skills shared by both Alex and Maya (Intersection)
127.0.0.1:6379> SINTER skills:alex skills:maya
1) "PostgreSQL"
2) "Docker"
```

---

### Type 6: Sorted Sets (ZSets - Leaderboards & Rankings)

A **Sorted Set (ZSet)** is like a Set where every element is assigned a floating-point **Score**. Redis automatically keeps elements sorted by their score at all times!

Sorted Sets are the industry standard for **Gaming Leaderboards**, **Trending Content**, and **Priority Queues**.

```text
                 SORTED SET: "leaderboard:game"
┌──────────────┬────────────────────────┬─────────────┐
│ Rank         │ Member                 │ Score (Pts) │
├──────────────┼────────────────────────┼─────────────┤
│ #1 (Top)     │ "ProGamer99"           │ 2450        │
│ #2           │ "CyberKnight"          │ 1890        │
│ #3           │ "PixelQueen"           │ 1420        │
└──────────────┴────────────────────────┴─────────────┘
```

#### 1. Adding Members with Scores (`ZADD`)
Syntax: `ZADD <key> <score> <member>`

```text
127.0.0.1:6379> ZADD leaderboard:arcade 1420 "PixelQueen" 2450 "ProGamer99" 1890 "CyberKnight"
(integer) 3
```

#### 2. Getting Top Players (`ZREVRANGE`)
Fetch the top 3 highest scores (descending order):

```text
127.0.0.1:6379> ZREVRANGE leaderboard:arcade 0 2 WITHSCORES
1) "ProGamer99"
2) "2450"
3) "CyberKnight"
4) "1890"
5) "PixelQueen"
6) "1420"
```

#### 3. Incrementing a Player's Score (`ZINCRBY`)
```text
-- CyberKnight defeats a boss and gains 600 points!
127.0.0.1:6379> ZINCRBY leaderboard:arcade 600 "CyberKnight"
"2490"
```

Check the new leaderboard:
```text
127.0.0.1:6379> ZREVRANGE leaderboard:arcade 0 2 WITHSCORES
1) "CyberKnight"   <-- Automatically took 1st place!
2) "2490"
3) "ProGamer99"
4) "2450"
5) "PixelQueen"
6) "1420"
```

---

## 6. Key Management & Safety in Production

### 1. Checking If a Key Exists (`EXISTS`)
```text
127.0.0.1:6379> EXISTS user:101:name
(integer) 1

127.0.0.1:6379> EXISTS user:999:name
(integer) 0
```

---

### 2. Deleting Keys (`DEL`)
```text
127.0.0.1:6379> DEL user:101:name
(integer) 1
```

---

### 3. THE DANGER OF `KEYS *` (And How to Use `SCAN`)

> [!CAUTION]
> **NEVER RUN `KEYS *` IN PRODUCTION!**
> Redis is single-threaded. If your production server has 5,000,000 keys, running `KEYS *` will freeze Redis for 5 to 10 seconds while it scans memory. During this time, **every single web request in your entire company will hang and timeout!**

Instead of `KEYS *`, use **`SCAN`**, which iterates through keys incrementally in small chunks without blocking:

```text
-- Safe incremental scanning of keys matching "user:*"
127.0.0.1:6379> SCAN 0 MATCH user:* COUNT 10
1) "0"
2) 1) "user:101"
   2) "user:101:settings"
```

---

### 4. Clearing Databases (`FLUSHDB` vs `FLUSHALL`)
* `FLUSHDB`: Deletes all keys in the **currently selected database**.
* `FLUSHALL`: Deletes all keys across **every single database** in Redis.

```text
-- Wipe only the current database for a clean start
127.0.0.1:6379> FLUSHDB
OK
```

---

## 7. The Cache-Aside Pattern: PostgreSQL + Redis in Production

How do software engineers use **PostgreSQL** and **Redis** together in real applications?

The most common, reliable architecture is the **Cache-Aside Pattern** (Lazy Loading):

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                           CACHE-ASIDE WORKFLOW                            │
│                                                                           │
│   Client App                                                              │
│       │                                                                   │
│       ├──▶ Step 1: Request Product #42                                    │
│       │                                                                   │
│       ├──▶ Step 2: Check Redis: GET product:42                            │
│       │             │                                                     │
│       │             ├──▶ [CACHE HIT! ⚡ (1ms)]                            │
│       │             │    Return cached data immediately to client!        │
│       │             │                                                     │
│       │             └──▶ [CACHE MISS! 🐢 (50ms)]                          │
│       │                  Query PostgreSQL: SELECT * FROM products...      │
│       │                  Save to Redis: SETEX product:42 3600 (Data)      │
│       │                  Return fresh DB data to client                   │
│       ▼                                                                   │
└───────────────────────────────────────────────────────────────────────────┘
```

### Pseudo-Code Implementation (Node.js / Express Example):

```javascript
async function getProduct(productId) {
  const cacheKey = `product:${productId}`;

  // 1. Check if product is already in Redis RAM
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('⚡ Cache Hit! Returning from Redis RAM in 1ms');
    return JSON.parse(cachedData);
  }

  // 2. Cache Miss: Fetch from PostgreSQL disk
  console.log('🐢 Cache Miss! Fetching from PostgreSQL database...');
  const dbResult = await pgClient.query('SELECT * FROM products WHERE id = $1', [productId]);
  const product = dbResult.rows[0];

  // 3. Store in Redis with an expiration of 600 seconds (10 minutes)
  if (product) {
    await redis.setex(cacheKey, 600, JSON.stringify(product));
  }

  return product;
}
```

#### Why Set a TTL (e.g. 10 Minutes)?
If an admin updates the product price in PostgreSQL, the old cached price will automatically vanish after 10 minutes, ensuring your cache never stays permanently out-of-date.

---

## 8. Real-Time Messaging with Pub/Sub

Redis has a built-in **Publish / Subscribe (Pub/Sub)** engine. One service can broadcast messages to a topic channel, and hundreds of listening services will receive the message instantly.

```text
    PUBLISHER (API Server)
           │
           ├──▶ PUBLISH "orders" "New Order #1001 Created!"
           │
           ▼
    CHANNEL: "orders"
           │
           ├──▶ SUBSCRIBER #1 (Notification Service ── SMS sent!)
           ├──▶ SUBSCRIBER #2 (Analytics Dashboard ── Live update!)
           └──▶ SUBSCRIBER #3 (Warehouse Service  ── Packing slip printed!)
```

### Try It Live in Two Terminal Tabs:

#### Terminal Tab 1: Start the Subscriber
Open a terminal and subscribe to a channel named `campus_alerts`:
```bash
docker exec -it dev-redis redis-cli
127.0.0.1:6379> SUBSCRIBE campus_alerts
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "campus_alerts"
3) (integer) 1
```
*(Terminal 1 will now sit and wait for incoming messages).*

#### Terminal Tab 2: Publish a Message
Open a second terminal window and publish a message:
```bash
docker exec -it dev-redis redis-cli
127.0.0.1:6379> PUBLISH campus_alerts "Classes moved online due to heavy snow."
(integer) 1
```

Look back at **Terminal Tab 1**—the alert appeared instantly in real-time!

---

## 9. Redis Persistence: Surviving Restarts

Because Redis holds data in RAM, what happens if the container restarts or power cuts out?

Redis provides two persistence mechanisms:
1. **RDB (Redis Database Backup)**: Takes point-in-time snapshots of your entire dataset every X minutes.
2. **AOF (Append-Only File)**: Logs every write command to disk sequentially as it happens.

In our Docker command:
```bash
redis-server --appendonly yes
```
We enabled **AOF**. Every time you run `SET`, `HSET`, or `INCR`, Redis appends the instruction to `/data/appendonly.aof` inside the mounted Docker volume (`redis_data`).

If your container crashes or restarts:
1. Redis boots up.
2. It replays the AOF log from disk in seconds.
3. Your entire database is restored back into RAM!

---

## 10. Essential Redis Command Cheat Sheet

Keep this quick reference guide handy:

```text
-- =========================================================================
-- 1. STRINGS
-- =========================================================================
SET key "value"                -- Set key to value
GET key                        -- Get value
SETEX key 60 "value"           -- Set with 60-second expiration
SETNX key "value"              -- Set only if key does NOT exist
INCR counter                   -- Increment number by 1
DECR counter                   -- Decrement number by 1
INCRBY counter 10              -- Increment by 10

-- =========================================================================
-- 2. KEYS & EXPIRATION
-- =========================================================================
EXISTS key                     -- Check if key exists (1 or 0)
TTL key                        -- Check remaining seconds (-1: none, -2: dead)
EXPIRE key 300                 -- Set expiration to 300 seconds
DEL key                        -- Delete key
SCAN 0 MATCH user:* COUNT 10   -- Safely iterate keys (NEVER USE KEYS *)
FLUSHDB                        -- Wipe current database

-- =========================================================================
-- 3. HASHES (Objects)
-- =========================================================================
HSET user:1 name "Alex" age 24 -- Set multiple fields
HGET user:1 name               -- Get single field
HGETALL user:1                 -- Get all fields and values
HINCRBY user:1 age 1           -- Increment field value
HDEL user:1 age                -- Delete field

-- =========================================================================
-- 4. LISTS (Queues)
-- =========================================================================
RPUSH queue "task1" "task2"    -- Add items to the right (tail)
LPUSH queue "priority_task"    -- Add item to the left (head)
LPOP queue                     -- Remove & return item from left
LRANGE queue 0 -1              -- View all items in list
LLEN queue                     -- Get count of items

-- =========================================================================
-- 5. SETS (Unique Unordered)
-- =========================================================================
SADD tags "web" "dev"          -- Add unique members
SMEMBERS tags                  -- View all members
SISMEMBER tags "web"           -- Check if member exists (1 or 0)
SINTER set1 set2               -- Find common items (Intersection)

-- =========================================================================
-- 6. SORTED SETS (Leaderboards)
-- =========================================================================
ZADD ranks 100 "Alex" 200 "Sam"-- Add members with scores
ZREVRANGE ranks 0 -1 WITHSCORES-- View top scores descending
ZINCRBY ranks 50 "Alex"        -- Add 50 points to Alex
```

---

## 11. Summary & Next Steps

You now have a solid, production-grade foundation in Redis:
1. **Containerized**: Running Redis in Docker with persistent AOF storage on host disk.
2. **Interactive**: Navigating with `redis-cli`, testing latency with `PING`, and monitoring memory.
3. **Data Structures**: Leveraging Strings, TTL Expirations, Hashes, Lists, Sets, and Sorted Sets.
4. **Architectural Patterns**: Combining PostgreSQL with Redis via the **Cache-Aside Pattern** to reduce database query loads by up to 95%.
5. **Real-Time Communication**: Broadcasting messages with Redis Pub/Sub.
