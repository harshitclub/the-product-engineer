---
title: "03. Redis Caching & BullMQ Queues"
description: "Set up Redis with ioredis, implement the Cache-Aside pattern for sub-2ms redirects, and build background workers using BullMQ."
---

# 03. Redis Caching & BullMQ Queues ⚡

In high-traffic systems, speed is everything. In this chapter, we will connect to **Redis** using `ioredis` and set up **BullMQ** to process click tracking in the background.

---

## 1. Why Do We Need Redis & BullMQ?

### Problem 1: Database Latency on High-Frequency Redirects
If thousands of people click your shortened links at the same time, querying PostgreSQL on disk for every single click takes 20ms–50ms and exhausts database connections.
- **Solution (Redis Cache-Aside)**: We store the URL in Redis (in RAM). Fetching from RAM takes **under 2 milliseconds**!

### Problem 2: Slow Analytics Writes Block Redirects
When someone clicks a link, they expect an immediate redirect. If the server pauses to parse the browser's User-Agent string, extract IP information, and write a new row to PostgreSQL, the visitor experiences a noticeable delay.
- **Solution (BullMQ Background Worker)**: The redirect controller quickly pushes a small task message into a BullMQ queue and immediately sends the `302 Redirect` to the visitor. A background worker picks up the message and performs the database write asynchronously.

```text
Visitor Clicks Link ──────► Server reads from Redis (1ms) ──────► 302 Immediate Redirect to User
                                   │
                                   ▼
                    BullMQ Queue Event (Async)
                                   │
                                   ▼
                    Worker saves Click to DB (Background)
```

---

## 2. Redis Connection (`src/config/redis.js`)

Create `src/config/redis.js`:

```javascript
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Redis running in Docker on port 6379
export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // Required by BullMQ for background queues
});

redis.on('connect', () => {
  console.log('✅ Redis connected!');
});

redis.on('error', (err) => {
  console.log('❌ Redis error:', err.message);
});
```

> [!IMPORTANT]
> **Why `maxRetriesPerRequest: null`?**  
> BullMQ relies on blocking Redis commands (like `BRPOPLPUSH`) to efficiently listen for new jobs without polling. BullMQ strictly requires `maxRetriesPerRequest: null` in your ioredis options so connections won't timeout while waiting for incoming queue events.

---

## 3. Creating the BullMQ Click Queue Producer (`src/queues/clickQueue.js`)

The queue producer is responsible for adding click tracking jobs to the queue.

Create `src/queues/clickQueue.js`:

```javascript
import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

// Queue named "clicks" for sending click tracking jobs in the background
export const clickQueue = new Queue('clicks', { connection: redis });
```

Whenever a user visits a short link, we will simply call `clickQueue.add('save-click', payload)`.

---

## 4. Building the BullMQ Worker (`src/queues/clickWorker.js`)

The worker listens for new jobs in the `'clicks'` queue, parses client metadata (Browser & OS), and records the entry in the `clicks` PostgreSQL table.

Create `src/queues/clickWorker.js`:

```javascript
import { Worker } from 'bullmq';
import { UAParser } from 'ua-parser-js';
import { redis } from '../config/redis.js';
import { Click } from '../models/index.js';

// Background worker that listens to the "clicks" queue and saves data into PostgreSQL
export const clickWorker = new Worker(
  'clicks',
  async (job) => {
    const { linkId, ip, userAgent, referrer } = job.data;

    // Parse Browser and Operating System
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';

    // Save click record in database
    await Click.create({
      linkId,
      ipAddress: ip,
      browser,
      os,
      referrer: referrer || 'Direct',
    });

    console.log(`📊 Click saved in database for Link ID: ${linkId}`);
  },
  { connection: redis }
);
```

### How the Worker Operates:
1. It listens to the `clicks` queue through the shared Redis connection.
2. When a job arrives, it extracts `linkId`, `ip`, `userAgent`, and `referrer`.
3. `UAParser` extracts the browser family (`Chrome`, `Firefox`, `Safari`) and operating system (`Windows`, `macOS`, `Android`, `iOS`).
4. `Click.create(...)` commits the row to PostgreSQL.

---

👉 **Next Step:** Proceed to **[Chapter 4: Input Validation & Security Middlewares](./04-validation-and-middlewares.md)** to secure our endpoints with Zod and rate limiting!
