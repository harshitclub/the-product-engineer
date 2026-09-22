# The Complete PostgreSQL & Docker Master Guide

> A friendly, in-depth, and practical handbook covering everything you need to master PostgreSQL—from running containerized databases in Docker and connecting with `psql` to creating tables, writing essential data queries, building relationships with joins, and optimizing performance.

---

## 1. The Mental Model: What is PostgreSQL?

Before writing SQL queries, let's understand what a relational database is and why PostgreSQL has become the undisputed gold standard for modern backend engineering.

### What is a Database?
When you write a web application (in Node.js, Python, Go, or Java), data stored in variables or memory disappears whenever the server restarts or crashes. A **Database** is a dedicated software service designed to store, organize, safeguard, and retrieve information permanently on your disk with extreme speed.

### Relational Database Management Systems (RDBMS)
PostgreSQL is a **Relational Database Management System (RDBMS)**. In a relational database:
1. Data is organized into **Tables** (like organized sheets with strict columns and rows).
2. Each **Column** has a strict **Data Type** (e.g., numbers, text, dates, boolean flags).
3. Each **Row** represents a unique record (e.g., one user, one order, one product).
4. Tables can be **related** to one another using keys (e.g., an order belongs to a user; a product belongs to a category).

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATABASE: mystore                             │
├───────────────────────────────┬─────────────────────────────────────────┤
│ TABLE: users                  │ TABLE: orders                           │
├────┬───────────┬──────────────┼────┬─────────┬──────────────┬───────────┤
│ id │ name      │ email        │ id │ user_id │ total_amount │ status    │
├────┼───────────┼──────────────┼────┼─────────┼──────────────┼───────────┤
│  1 │ Alex Hall │ alex@web.dev │ 10 │    1    │        49.99 │ completed │
│  2 │ Maya Lin  │ maya@web.dev │ 11 │    1    │       120.50 │ pending   │
│  3 │ Liam Doe  │ liam@web.dev │ 12 │    2    │        15.00 │ shipped   │
└────┴───────────┴──────────────┴────┴─────────┴──────────────┴───────────┘
                                       │
                                       └──▶ Points to users.id (Foreign Key)
```

### Why PostgreSQL Over Other Databases?
* **Rock-Solid Reliability (ACID Compliant)**: Guarantees that data is never lost, corrupted, or left in a partial state, even if power cuts out mid-query.
* **Open Source & Community-Driven**: Free forever with no restrictive enterprise licensing or sudden pricing surprises.
* **Rich Native Types**: First-class support for Strings, Timestamps, UUIDs, Geolocation (PostGIS), Arrays, and binary JSON (`JSONB`).
* **Massive Concurrency (MVCC)**: Multiple users can read and write simultaneously without locking the entire table.

---

## 2. Running PostgreSQL in Docker

Installing PostgreSQL directly on your host operating system often litters your machine with background background services, registry keys, and port collisions. 

Using **Docker** isolates PostgreSQL inside a lightweight container. You can spin it up, destroy it, backup its volume, or run multiple versions side-by-side with zero clutter on your host computer.

```text
┌─────────────────────────────────────────────────────────────┐
│                      YOUR COMPUTER (HOST)                   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 DOCKER CONTAINER                    │   │
│   │                                                     │   │
│   │   PostgreSQL Engine (Port 5432)                     │   │
│   │   Database: "store_db"                              │   │
│   │   User: "postgres"                                  │   │
│   │                                                     │   │
│   │   Container Data: /var/lib/postgresql/data          │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │ Mapped via Volume            │
│                              ▼                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │             DOCKER VOLUME: pgdata                   │   │
│   │   (Stores data safely on host disk across restarts) │   │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Option A: The Quick `docker run` Command

If you want an instant PostgreSQL instance running in seconds, open your terminal (PowerShell, macOS Terminal, or Linux Bash) and run:

```bash
docker run -d \
  --name dev-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgrespassword \
  -e POSTGRES_DB=store_db \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  --restart unless-stopped \
  postgres:16-alpine
```

#### Breakdown of Each Flag:
| Flag | Meaning & Purpose |
| :--- | :--- |
| `-d` | **Detached Mode**: Runs the container in the background so your terminal remains free. |
| `--name dev-postgres` | Gives your container a friendly, memorable name instead of a random hash. |
| `-e POSTGRES_USER=...` | Sets the superuser name (default is `postgres`). |
| `-e POSTGRES_PASSWORD=...` | Sets the secure database password. |
| `-e POSTGRES_DB=...` | Automatically creates a default database named `store_db` on first boot. |
| `-p 5432:5432` | Maps host port `5432` to container port `5432` so local apps and GUIs can connect. |
| `-v pgdata:/var/lib/...` | Mounts a **Docker Volume** named `pgdata`. Your data remains safe on disk even if the container is stopped or deleted! |
| `postgres:16-alpine` | Uses the lightweight Alpine Linux build of PostgreSQL 16 (~80 MB download). |

---

### Option B: The Production-Ready `docker-compose.yml` (Recommended)

In practical team projects, you should define your database service declaratively in a `docker-compose.yml` file. Create a file named `docker-compose.yml` in your project folder:

```yaml
version: '3.8'

services:
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
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d store_db"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
    driver: local
```

#### Managing the Container with Docker Compose:

```bash
# 1. Start PostgreSQL in the background
docker compose up -d

# 2. View real-time database logs
docker compose logs -f database

# 3. Check container status and health
docker compose ps

# 4. Stop the database (data remains intact in the volume)
docker compose stop

# 5. Destroy the container (data is STILL preserved in the pgdata volume)
docker compose down

# 6. Completely wipe database and start 100% fresh (CAUTION: Deletes data)
docker compose down -v
```

---

## 3. Connecting to PostgreSQL

Now that PostgreSQL is up and running in your Docker container, how do you connect to it and run queries?

### Method 1: Interactive Terminal via `psql` (Zero Tools Required)
`psql` is PostgreSQL's official built-in interactive command-line interface. Because it is pre-installed inside the Docker image, you can jump straight in using `docker exec`:

```bash
docker exec -it dev-postgres psql -U postgres -d store_db
```

You will immediately be greeted by the PostgreSQL prompt:
```text
psql (16.2)
Type "help" for help.

store_db=# 
```

> [!TIP]
> The prompt ends with `store_db=#`. The `#` symbol indicates you are logged in as a superuser. Regular database users see a `>` prompt.

To exit `psql` at any time, type:
```sql
\q
```

---

### Method 2: GUI Desktop Client (DBeaver / TablePlus / VS Code)
If you prefer a visual interface with tables, trees, and interactive query tabs:
1. Download a free tool like **DBeaver Community**, **TablePlus**, or install the **Database Client** extension in VS Code.
2. Click **New Connection** -> Select **PostgreSQL**.
3. Enter your connection credentials:
   * **Host**: `localhost` (or `127.0.0.1`)
   * **Port**: `5432`
   * **Database**: `store_db`
   * **Username**: `postgres`
   * **Password**: `postgrespassword`
4. Click **Test Connection** -> **Connect**!

---

### Method 3: Connection String URI (For Backend Apps)
When connecting from Node.js (via `pg`, Prisma, Drizzle, or TypeORM), Python (SQLAlchemy, psycopg3), or Go, use this standard connection URI:

```text
postgresql://postgres:postgrespassword@localhost:5432/store_db
```

Syntax format:
```text
postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>
```

---

## 4. Essential `psql` Terminal Commands

When working inside `psql`, commands starting with a backslash `\` are special meta-commands (not SQL statements). They do not require a trailing semicolon.

```text
┌─────────────────────────────────────────────────────────────┐
│                   ESSENTIAL PSQL COMMANDS                   │
├─────────────┬───────────────────────────────────────────────┤
│ Command     │ Description                                   │
├─────────────┼───────────────────────────────────────────────┤
│ \l          │ List all databases                            │
│ \c <dbname> │ Connect (switch) to a different database      │
│ \dt         │ List all tables in current database           │
│ \d <table > │ Describe schema, columns & types of a table   │
│ \dn         │ List all schemas in database                  │
│ \du         │ List all database users & roles               │
│ \x          │ Toggle expanded display (clean view for rows) │
│ \timing     │ Toggle display of query execution time in ms  │
│ \?          │ Help on psql backslash commands               │
│ \h <cmd>    │ Help on SQL syntax (e.g. \h SELECT)           │
│ \q          │ Quit and return to host terminal              │
└─────────────┴───────────────────────────────────────────────┘
```

---

## 5. PostgreSQL Data Types Made Simple

Every column in a PostgreSQL table must have an assigned data type. Here are the most important and frequently used types:

### 1. Numeric Types
* `INT` / `INTEGER`: Standard whole number (-2 billion to +2 billion). Great for quantities and counts.
* `BIGINT`: Huge whole number. Used for massive IDs or high-traffic counters.
* `SERIAL`: An auto-incrementing integer (1, 2, 3, 4...). Automatically generates a sequence.
* `BIGSERIAL`: An auto-incrementing 64-bit integer. The default modern standard for table IDs.
* `NUMERIC(precision, scale)` or `DECIMAL`: Exact fixed-point number. **Always use this for currency and financial calculations** (e.g. `NUMERIC(10, 2)` allows up to 10 total digits with 2 decimal places, like `99999999.99`). Never use floating-point types like `FLOAT` for money due to rounding errors!

### 2. Character / Text Types
* `VARCHAR(n)`: Variable-length string with a maximum character limit (e.g. `VARCHAR(255)`).
* `TEXT`: Unlimited-length string. In PostgreSQL, `TEXT` has identical performance to `VARCHAR` without arbitrary artificial limits. Great for product descriptions, articles, and logs.
* `CHAR(n)`: Fixed-length string padded with spaces. Rarely used in modern apps.

### 3. Boolean Type
* `BOOLEAN`: Stores `TRUE`, `FALSE`, or `NULL` (unknown).

### 4. Date & Time Types
* `TIMESTAMPTZ` (`TIMESTAMP WITH TIME ZONE`): **The universal industry best practice**. Stores date, hour, minute, second, and UTC timezone offset. Always use this over plain `TIMESTAMP`.
* `DATE`: Calendar date only (`2026-09-22`).
* `TIME`: Time of day without date (`14:30:00`).

### 5. Advanced Modern Types
* `UUID`: Universally Unique Identifier (`a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`). Prevents predictable ID enumeration attacks.
* `JSONB`: Binary format JSON. Allows querying, filtering, and indexing inside nested JSON documents directly in SQL!
* `TEXT[]`: Native array of strings.

---

## 6. Table Schemas & Data Constraints

Let's design a real-world **E-Commerce & Tech Store** database schema. We will create three tables:
1. `categories`: Product classifications.
2. `users`: Customer accounts.
3. `products`: Items available for purchase.
4. `orders`: Purchases made by customers.

```text
┌─────────────────┐             ┌─────────────────┐
│   categories    │             │      users      │
├─────────────────┤             ├─────────────────┤
│ id (PK)         │             │ id (PK)         │
│ name            │             │ full_name       │
│ slug (UNIQUE)   │             │ email (UNIQUE)  │
└────────┬────────┘             └────────┬────────┘
         │                               │
         │ 1:N                           │ 1:N
         ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│    products     │             │     orders      │
├─────────────────┤             ├─────────────────┤
│ id (PK)         │             │ id (PK)         │
│ title           │             │ user_id (FK) ───┘
│ price           │             │ total_amount    │
│ stock           │             │ status          │
│ category_id(FK)─┘             │ created_at      │
└─────────────────┘             └─────────────────┘
```

### Understanding Column Constraints
* `PRIMARY KEY`: Uniquely identifies each row. Automatically forces uniqueness and `NOT NULL`.
* `NOT NULL`: Prevents empty/null entries in critical fields.
* `UNIQUE`: Guarantees no two rows share the same value (e.g. email addresses).
* `CHECK`: Validates data against a logical rule (e.g. `price > 0`).
* `DEFAULT`: Sets a fallback value if none is provided (e.g. `CURRENT_TIMESTAMP`, `status = 'pending'`).
* `FOREIGN KEY ... REFERENCES`: Enforces relational integrity across tables.

### Executing the Table Creation Scripts

Run the following SQL commands in your `psql` terminal:

```sql
-- 1. Create the Categories Table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(60) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the Users Table
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the Products Table with Foreign Key & Checks
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create the Orders Table
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  status VARCHAR(25) NOT NULL DEFAULT 'pending',
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
```

#### What does `ON DELETE` mean?
* `ON DELETE RESTRICT`: Prevents deleting a category if products are currently assigned to it (protects orphaned data).
* `ON DELETE CASCADE`: If a user account is deleted, all orders linked to that user are automatically cleaned up.

Inspect your newly created tables:
```sql
\dt
```

---

## 7. Inserting Records (Data Creation)

Now that your tables are ready, let's insert realistic sample data into them.

### 1. Basic Single-Row Insertion
To insert a single record, specify the table name, the target columns in parentheses, and the corresponding values:

```sql
INSERT INTO categories (name, slug) 
VALUES ('Laptops & Computers', 'laptops-computers');
```

---

### 2. Multi-Row Batch Insertion
You can insert multiple rows in a single query by separating value tuples with commas. This is vastly faster than running individual statements:

```sql
INSERT INTO categories (name, slug) VALUES 
  ('Smartphones & Audio', 'smartphones-audio'),
  ('Gaming & Consoles', 'gaming-consoles'),
  ('Accessories & Cables', 'accessories-cables');
```

Let's populate our `users` table:

```sql
INSERT INTO users (full_name, email, password_hash, role) VALUES 
  ('Alex Rivera', 'alex@example.com', 'argon2_hashed_secret_1', 'admin'),
  ('Sarah Connor', 'sarah@example.com', 'argon2_hashed_secret_2', 'customer'),
  ('Michael Chen', 'michael@example.com', 'argon2_hashed_secret_3', 'customer'),
  ('Emily Watson', 'emily@example.com', 'argon2_hashed_secret_4', 'customer');
```

Let's populate our `products` table:

```sql
INSERT INTO products (category_id, title, description, price, stock, is_available) VALUES 
  (1, 'MacBook Pro 16"', 'M3 Max chip, 36GB RAM, 1TB SSD', 2499.00, 15, TRUE),
  (1, 'ThinkPad X1 Carbon', 'Intel Core Ultra 7, 32GB RAM, 512GB SSD', 1749.50, 8, TRUE),
  (2, 'iPhone 15 Pro', 'Titanium design, A17 Pro chip, 256GB', 1099.00, 25, TRUE),
  (2, 'Sony WH-1000XM5', 'Industry-leading noise canceling headphones', 398.00, 40, TRUE),
  (3, 'PlayStation 5 Slim', '1TB storage, DualSense wireless controller', 499.99, 12, TRUE),
  (4, 'USB-C Braided Cable 2m', 'Fast 100W power delivery cable', 19.99, 120, TRUE);
```

Let's populate `orders`:

```sql
INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES 
  (2, 1099.00, 'completed', '742 Evergreen Terrace, Springfield'),
  (2, 398.00, 'shipped', '742 Evergreen Terrace, Springfield'),
  (3, 2499.00, 'processing', '10880 Wilshire Blvd, Los Angeles'),
  (4, 519.98, 'pending', '42 Wallaby Way, Sydney');
```

---

### 3. The PostgreSQL Superpower: The `RETURNING` Clause

In MySQL or other older databases, after inserting a row, you have to execute a second query (`SELECT LAST_INSERT_ID()`) to find out what ID was assigned.

In PostgreSQL, you can append `RETURNING` to get the generated fields (like auto-incremented IDs or timestamps) immediately back in the response:

```sql
INSERT INTO categories (name, slug) 
VALUES ('Smart Home', 'smart-home')
RETURNING id, name, created_at;
```

**Output Result:**
```text
 id |    name    |          created_at           
----+------------+-------------------------------
  5 | Smart Home | 2026-09-22 15:30:12.44192+00
(1 row)
```

You can even return the entire record using `RETURNING *`:
```sql
INSERT INTO users (full_name, email, password_hash)
VALUES ('David Miller', 'david@example.com', 'argon2_hashed_secret_5')
RETURNING *;
```

---

### 4. Handling Conflicts Gracefully (Upsert)

What happens if you try to insert an email that already exists? PostgreSQL will throw a unique constraint violation error.

With `ON CONFLICT`, you can tell PostgreSQL what to do instead:

#### A. Ignore Duplicates (`DO NOTHING`):
```sql
INSERT INTO categories (name, slug)
VALUES ('Smart Home', 'smart-home')
ON CONFLICT (slug) DO NOTHING;
```
*(Query completes cleanly without crashing your application).*

#### B. Update on Conflict (The "Upsert"):
```sql
INSERT INTO users (full_name, email, password_hash)
VALUES ('Sarah Connor-Reese', 'sarah@example.com', 'updated_hash_99')
ON CONFLICT (email) 
DO UPDATE SET 
  full_name = EXCLUDED.full_name,
  password_hash = EXCLUDED.password_hash
RETURNING id, full_name, email;
```

---

## 8. Querying & Reading Records (Data Retrieval)

Retrieving and filtering data is where you will spend the majority of your time writing SQL.

### 1. The Basic `SELECT` Statement

To view all columns and rows in a table:
```sql
SELECT * FROM products;
```

> [!WARNING]
> In production applications, avoid `SELECT *`. Always select only the specific columns your application needs (e.g. `SELECT id, title, price FROM products;`). This drastically cuts network bandwidth and memory usage.

```sql
SELECT id, title, price, stock 
FROM products;
```

---

### 2. Renaming Columns in Output (`AS` Alias)

You can assign friendly aliases to columns or calculated values:

```sql
SELECT 
  title AS product_name,
  price AS original_price,
  price * 0.90 AS discounted_price_10_percent
FROM products;
```

---

### 3. Filtering Results with the `WHERE` Clause

The `WHERE` clause allows you to specify exact matching conditions:

#### Equality & Comparisons
```sql
-- Find products that cost exactly 1099.00
SELECT * FROM products WHERE price = 1099.00;

-- Find products with price strictly greater than 400
SELECT id, title, price FROM products WHERE price > 400.00;

-- Find products with low stock (10 or fewer units)
SELECT id, title, stock FROM products WHERE stock <= 10;

-- Find all orders that are NOT completed
SELECT id, total_amount, status FROM orders WHERE status != 'completed';
```

#### Combining Conditions (`AND`, `OR`, `NOT`)
```sql
-- Products in category 1 that cost under $2000
SELECT title, price, category_id 
FROM products 
WHERE category_id = 1 AND price < 2000.00;

-- Orders that are either 'pending' or 'processing'
SELECT id, status, total_amount 
FROM orders 
WHERE status = 'pending' OR status = 'processing';
```

#### Range Checking with `BETWEEN`
```sql
-- Find products priced between $100 and $1000 inclusive
SELECT title, price 
FROM products 
WHERE price BETWEEN 100.00 AND 1000.00;
```

#### Matching Multiple Values with `IN`
Instead of chaining multiple `OR` conditions:
```sql
-- Find orders with specific statuses
SELECT id, total_amount, status 
FROM orders 
WHERE status IN ('shipped', 'completed', 'delivered');
```

#### Text Search with `LIKE` and `ILIKE`
* `LIKE`: Case-sensitive pattern matching.
* `ILIKE`: **Case-insensitive** pattern matching (PostgreSQL exclusive feature!).
* `%`: Wildcard matching any sequence of zero or more characters.
* `_`: Wildcard matching exactly one character.

```sql
-- Case-insensitive search for anything with "pro" in the title
SELECT id, title, price 
FROM products 
WHERE title ILIKE '%pro%';

-- Find users whose email ends with @example.com
SELECT id, full_name, email 
FROM users 
WHERE email LIKE '%@example.com';
```

#### Checking for Null Values
```sql
-- Check if description is missing
SELECT title FROM products WHERE description IS NULL;

-- Check if description is present
SELECT title FROM products WHERE description IS NOT NULL;
```

---

### 4. Sorting Records (`ORDER BY`)

By default, databases return rows in unpredictable order. Use `ORDER BY` to specify sorting:

```sql
-- Sort products by price cheapest to most expensive (Ascending)
SELECT title, price 
FROM products 
ORDER BY price ASC;

-- Sort products by price most expensive first (Descending)
SELECT title, price 
FROM products 
ORDER BY price DESC;

-- Multi-column sort: Category ascending, then price descending within each category
SELECT category_id, title, price 
FROM products 
ORDER BY category_id ASC, price DESC;
```

---

### 5. Pagination (`LIMIT` & `OFFSET`)

Web interfaces rarely load 100,000 items at once. They paginate results into pages of 10 or 20 items:

```sql
-- Page 1: Fetch the first 2 highest-priced products
SELECT id, title, price 
FROM products 
ORDER BY price DESC 
LIMIT 2 OFFSET 0;

-- Page 2: Skip the first 2 and fetch the next 2
SELECT id, title, price 
FROM products 
ORDER BY price DESC 
LIMIT 2 OFFSET 2;
```

Formula for API pagination:
```text
LIMIT = page_size
OFFSET = (page_number - 1) * page_size
```

---

## 9. Modifying & Updating Records (Data Updates)

The `UPDATE` statement modifies existing records in a table.

```text
┌─────────────────────────────────────────────────────────────┐
│                    THE GOLDEN RULE OF UPDATE                │
│                                                             │
│   NEVER RUN AN "UPDATE" STATEMENT WITHOUT A "WHERE" CLAUSE! │
│                                                             │
│   ❌ UPDATE products SET price = 10;                         │
│      (This will overwrite EVERY SINGLE PRODUCT in your DB!) │
│                                                             │
│   ✅ UPDATE products SET price = 10 WHERE id = 6;            │
│      (Only updates the exact target product)                │
└─────────────────────────────────────────────────────────────┘
```

### 1. Basic Single-Record Update
Update the price of product `#6`:

```sql
UPDATE products 
SET price = 15.99 
WHERE id = 6;
```

---

### 2. Updating Multiple Columns Simultaneously
Update the price, stock, and availability of product `#2`:

```sql
UPDATE products 
SET 
  price = 1699.00,
  stock = 14,
  is_available = TRUE 
WHERE id = 2;
```

---

### 3. Calculating Values Dynamically
You can modify a column based on its current value (e.g. decrementing stock when a purchase occurs, or applying a 10% store-wide price reduction):

```sql
-- Customer bought 1 unit of product #3
UPDATE products 
SET stock = stock - 1 
WHERE id = 3 AND stock > 0;
```

---

### 4. Returning Updated Data with `RETURNING`
Just like with `INSERT`, you can see the modified row immediately:

```sql
UPDATE orders 
SET status = 'delivered' 
WHERE id = 1 
RETURNING id, status, total_amount, created_at;
```

**Output:**
```text
 id |  status   | total_amount |          created_at           
----+-----------+--------------+-------------------------------
  1 | delivered |      1099.00 | 2026-09-22 15:30:12.44192+00
(1 row)
```

---

### 5. Conditional Updates (`CASE` Expression)
Apply different logic to different rows in a single statement:

```sql
UPDATE orders 
SET status = CASE 
  WHEN status = 'pending' THEN 'processing'
  WHEN status = 'processing' THEN 'shipped'
  ELSE status 
END 
WHERE status IN ('pending', 'processing');
```

---

## 10. Removing & Deleting Records (Data Deletion)

When information is no longer needed, you can delete it from the database.

### 1. The Targeted `DELETE` Statement

```sql
-- Delete a specific order by ID
DELETE FROM orders 
WHERE id = 4;
```

> [!CAUTION]
> Like `UPDATE`, executing `DELETE FROM orders;` without a `WHERE` clause will permanently wipe every single row in the table!

Inspect what was deleted using `RETURNING`:
```sql
DELETE FROM products 
WHERE is_available = FALSE 
RETURNING id, title, price;
```

---

### 2. Fast Table Reset (`TRUNCATE`)

If you want to clear an entire table completely (for example, resetting test data during automated integration tests), `TRUNCATE` is significantly faster than `DELETE FROM table;`:

```sql
-- Empties orders table and resets auto-incrementing ID counter back to 1
TRUNCATE TABLE orders RESTART IDENTITY CASCADE;
```

| Feature | `DELETE FROM table` | `TRUNCATE TABLE table` |
| :--- | :--- | :--- |
| **Speed** | Slow on large tables (logs every single row deletion) | **Lightning fast** (deallocates pages directly) |
| **WHERE filtering** | Supported (`WHERE id = 5`) | Not supported (wipes the whole table) |
| **Identity Reset** | Leaves sequence counters where they were | Can reset counters (`RESTART IDENTITY`) |

---

### 3. Production Best Practice: Soft Deletes

In enterprise applications (banking, healthcare, e-commerce), you almost **never physically delete rows from disk**. If an auditor asks to see a receipt from two years ago, a hard-deleted row is lost forever.

Instead, companies use **Soft Deletes**:
Add an `is_deleted` flag or a `deleted_at` timestamp column to your table:

```sql
-- Step 1: Add a deleted_at column
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT NULL;

-- Step 2: "Soft Delete" the user instead of removing the row
UPDATE users 
SET deleted_at = CURRENT_TIMESTAMP 
WHERE id = 3;

-- Step 3: Regular queries simply filter out deleted records
SELECT id, full_name, email 
FROM users 
WHERE deleted_at IS NULL;
```

---

## 11. Aggregations & Grouping (Data Analysis)

Databases excel at computing calculations across thousands or millions of records in milliseconds.

### Aggregate Functions
* `COUNT(*)`: Count total number of rows.
* `SUM(column)`: Sum total numerical value.
* `AVG(column)`: Calculate average value.
* `MIN(column)`: Lowest value.
* `MAX(column)`: Highest value.

```sql
-- Calculate store inventory statistics
SELECT 
  COUNT(*) AS total_products,
  MIN(price) AS cheapest_item,
  MAX(price) AS most_expensive_item,
  ROUND(AVG(price), 2) AS average_price,
  SUM(price * stock) AS total_inventory_value
FROM products;
```

---

### Grouping Data (`GROUP BY`)

`GROUP BY` collapses multiple rows into summary rows based on shared values:

```sql
-- Count how many products belong to each category
SELECT 
  category_id, 
  COUNT(*) AS product_count,
  AVG(price) AS avg_category_price
FROM products 
GROUP BY category_id;
```

---

### Filtering Groups with `HAVING`

Beginners often get confused between `WHERE` and `HAVING`:
* `WHERE`: Filters individual rows **before** aggregation.
* `HAVING`: Filters summarized groups **after** aggregation.

```sql
-- Find categories that have 2 or more products
SELECT 
  category_id, 
  COUNT(*) AS total_items 
FROM products 
GROUP BY category_id 
HAVING COUNT(*) >= 2;
```

---

## 12. Connecting Related Tables: Joins

In relational databases, data is split across multiple normalized tables to prevent duplication. **Joins** allow you to connect those tables back together in a single query result.

```text
       INNER JOIN                     LEFT JOIN
  (Only matching rows)       (All Left rows + matches)

    ┌───────┬───────┐              ┌───────┬───────┐
    │       │       │              │███████│       │
    │   A   │███B███│              │██ A ██│██ B ██│
    │       │       │              │███████│       │
    └───────┴───────┘              └───────┴───────┘
```

### 1. `INNER JOIN` (The Matchmaker)
Returns only the records that have matching values in **both** tables:

```sql
-- Join products with their category names
SELECT 
  products.id,
  products.title,
  products.price,
  categories.name AS category_name
FROM products
INNER JOIN categories ON products.category_id = categories.id;
```

**Output:**
```text
 id |         title          |  price  |    category_name    
----+------------------------+---------+---------------------
  1 | MacBook Pro 16"        | 2499.00 | Laptops & Computers
  2 | ThinkPad X1 Carbon     | 1699.00 | Laptops & Computers
  3 | iPhone 15 Pro          | 1099.00 | Smartphones & Audio
  4 | Sony WH-1000XM5        |  398.00 | Smartphones & Audio
  5 | PlayStation 5 Slim     |  499.99 | Gaming & Consoles
  6 | USB-C Braided Cable 2m |   15.99 | Accessories & Cables
(6 rows)
```

---

### 2. `LEFT JOIN` (Keep Everything from Left Table)
Returns all records from the left table, and matched records from the right table. If there is no match, the right side returns `NULL`:

```sql
-- Show all categories, even if they have zero products in them
SELECT 
  categories.id,
  categories.name,
  COUNT(products.id) AS total_products
FROM categories
LEFT JOIN products ON categories.id = products.category_id
GROUP BY categories.id, categories.name;
```

```text
 id |        name         | total_products 
----+---------------------+----------------
  1 | Laptops & Computers |              2
  2 | Smartphones & Audio |              2
  3 | Gaming & Consoles   |              1
  4 | Accessories & Cables|              1
  5 | Smart Home          |              0   <-- (Zero products, but category is kept!)
```

---

### 3. Multi-Table Join (E-Commerce Order Detail Query)

In real backend APIs, you often need to stitch together multiple tables:

```sql
SELECT 
  orders.id AS order_id,
  users.full_name AS customer_name,
  users.email AS customer_email,
  orders.total_amount,
  orders.status,
  orders.created_at
FROM orders
INNER JOIN users ON orders.user_id = users.id
ORDER BY orders.created_at DESC;
```

---

## 13. Transactions & ACID Safety Guarantees

What happens if you run a query that transfers $100 from Account A to Account B?
1. Step 1: Subtract $100 from Account A.
2. Step 2: Add $100 to Account B.

If the database server crashes or loses power after Step 1, $100 vanishes into thin air! 

### The Transaction Solution (`BEGIN`, `COMMIT`, `ROLLBACK`)
A **Transaction** wraps multiple queries into a single, indivisible unit of work: **all steps succeed together, or all steps are undone completely**.

```text
       BEGIN TRANSACTION
              │
              ├──▶ Step 1: Deduct from Account A (OK)
              │
              ├──▶ Step 2: Add to Account B (CRASH / ERROR)
              │
        ROLLBACK TRANSACTION
              ▼
   (Database state restored 100% as if nothing ever touched it!)
```

### Practical Transaction Example in PostgreSQL:

```sql
-- Start the transaction block
BEGIN;

-- 1. Deduct stock from the product
UPDATE products 
SET stock = stock - 1 
WHERE id = 1 AND stock > 0;

-- 2. Create the customer order
INSERT INTO orders (user_id, total_amount, status, shipping_address)
VALUES (2, 2499.00, 'processing', '742 Evergreen Terrace');

-- 3. Save changes permanently to disk
COMMIT;
```

If any error occurs before `COMMIT`, simply issue:
```sql
ROLLBACK;
```

### What is ACID?
* **Atomicity**: "All or nothing". Either every operation in the transaction succeeds, or the entire transaction is rolled back.
* **Consistency**: All constraints (foreign keys, checks, unique rules) must remain valid before and after.
* **Isolation**: Concurrent transactions cannot interfere with each other or see partial intermediate data.
* **Durability**: Once a transaction is committed, changes are written to non-volatile disk and will survive sudden crashes.

---

## 14. Indexes & Performance Optimization

As your database grows from 100 rows to 1,000,000 rows, queries searching without indexes will perform a **Sequential Scan** (reading every single block of your hard drive row by row).

### The Book Index Analogy
Think of a 1,000-page encyclopedia. If you want to find where "Albert Einstein" is mentioned:
* **Without an index**: You must read all 1,000 pages line-by-line from start to finish.
* **With an index**: You flip to the back alphabetical index, find "Einstein, Albert -> Page 342", and jump directly to that page in 2 seconds!

```text
SEQUENTIAL SCAN (Slow, O(N)):
[ Row 1 ] ──▶ [ Row 2 ] ──▶ [ Row 3 ] ──▶ ... ──▶ [ Row 1,000,000 ]

B-TREE INDEX SCAN (Lightning Fast, O(log N)):
                     [ Root Node ]
                     /           \
           [ Middle ]             [ Middle ]
           /        \             /        \
       [ Leaf ]   [ Leaf ]    [ Leaf ]   [ Leaf ] ──▶ Direct Row Pointer
```

### Creating Indexes

```sql
-- Index users by email for instant login lookups
CREATE INDEX idx_users_email ON users(email);

-- Index orders by user_id and status for fast order history queries
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Unique index (also enforces uniqueness rule)
CREATE UNIQUE INDEX idx_categories_slug ON categories(slug);
```

### Analyzing Query Performance with `EXPLAIN ANALYZE`

PostgreSQL includes an analyzer that reveals the database execution plan:

```sql
EXPLAIN ANALYZE 
SELECT * FROM users WHERE email = 'alex@example.com';
```

Look for:
* `Index Scan using idx_users_email`: Your query used the index (great!).
* `Seq Scan on users`: Your query scanned the entire table (consider adding an index if the table is large).

---

## 15. Database Backup & Restore inside Docker

Because PostgreSQL runs inside a Docker container, creating backups is straightforward using `pg_dump`.

### 1. Create a Complete SQL Backup
Run this command from your **host terminal** (not inside `psql`):

```bash
docker exec -t dev-postgres pg_dump -U postgres -d store_db > backup_store_db.sql
```

This generates a clean `backup_store_db.sql` file on your computer containing all table definitions and data.

---

### 2. Restore from a Backup File
To restore your database from that SQL file:

```bash
# Option A: Pipe the SQL dump directly into the container
docker exec -i dev-postgres psql -U postgres -d store_db < backup_store_db.sql
```

---

## 16. Essential Query Quick Reference Cheat Sheet

Keep this section bookmarked for daily coding:

```sql
-- =========================================================================
-- 1. CREATING & STRUCTURING DATA
-- =========================================================================
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 2. INSERTING DATA
-- =========================================================================
-- Single insert with return
INSERT INTO items (name, price) VALUES ('Mechanical Keyboard', 89.99) RETURNING *;

-- Multi-row batch insert
INSERT INTO items (name, price) VALUES 
  ('Gaming Mouse', 49.99),
  ('Mousepad XL', 19.99);

-- Upsert (ignore duplicate)
INSERT INTO items (id, name, price) VALUES (1, 'Mechanical Keyboard', 89.99)
ON CONFLICT (id) DO NOTHING;

-- =========================================================================
-- 3. QUERYING & FILTERING DATA
-- =========================================================================
-- Specific columns with conditions
SELECT id, name, price FROM items WHERE price > 30.00 AND is_active = TRUE;

-- Pattern search (case-insensitive)
SELECT * FROM items WHERE name ILIKE '%keyboard%';

-- Sorting & Pagination (Page 1 of 10 items)
SELECT * FROM items ORDER BY price DESC LIMIT 10 OFFSET 0;

-- =========================================================================
-- 4. MODIFYING EXISTING DATA
-- =========================================================================
-- Update with exact match and return updated row
UPDATE items SET price = 79.99 WHERE id = 1 RETURNING *;

-- Increment / Decrement
UPDATE items SET price = price * 1.05 WHERE is_active = TRUE;

-- =========================================================================
-- 5. REMOVING DATA
-- =========================================================================
-- Targeted deletion
DELETE FROM items WHERE id = 3 RETURNING *;

-- Soft deletion (recommended)
UPDATE items SET is_active = FALSE WHERE id = 2;

-- Complete table wipe
TRUNCATE TABLE items RESTART IDENTITY CASCADE;

-- =========================================================================
-- 6. JOINS & AGGREGATES
-- =========================================================================
-- Inner Join
SELECT o.id, u.full_name, o.total_amount 
FROM orders o 
INNER JOIN users u ON o.user_id = u.id;

-- Aggregation with Grouping
SELECT category_id, COUNT(*) AS count, AVG(price) AS average 
FROM products 
GROUP BY category_id 
HAVING COUNT(*) > 1;

-- =========================================================================
-- 7. TRANSACTIONS
-- =========================================================================
BEGIN;
  UPDATE items SET price = 99.99 WHERE id = 1;
COMMIT;
```

---

## 17. Summary & Next Steps

You now have a production-ready mental model and practical skillset for working with PostgreSQL:
1. **Containerized**: Running PostgreSQL cleanly in Docker with persistent volumes and port mapping.
2. **Accessible**: Connecting seamlessly via `psql` interactive terminal, GUI applications, and backend connection strings.
3. **Structured**: Designing normalized tables with strict constraints, data types, and relational foreign keys.
4. **Operable**: Writing queries to insert, read, filter, update, and remove data reliably.
5. **Scalable**: Leveraging table joins, group aggregations, ACID transactions, and B-Tree indexes for high-concurrency systems.

---

### Ready for Hands-On Practice?
Put your knowledge to work right away by building a complete academic database step-by-step:

👉 **[Go to Hands-On Project: College Management Database](./college-database-project.md)** — Create 5 connected tables, enroll students, calculate GPAs, and generate transcripts command-by-command!

