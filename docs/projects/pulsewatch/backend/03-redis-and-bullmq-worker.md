---
title: "03. Redis Connection & BullMQ Background Worker"
description: "Connect to Redis with ioredis, configure BullMQ queues, schedule recurring 60-second health check jobs, ping target URLs with axios, and record latency logs."
---

# 03. Redis Connection & BullMQ Background Worker ⚡

In this chapter, we will build the heartbeat of PulseWatch: **asynchronous background website health checking**.

Instead of holding up user requests on our Express server, we offload all network pinging to a distributed task queue managed by **BullMQ** and backed by **Redis**.

---

## 1. Setting Up Redis with `ioredis` (`src/redis.js`)

Create `src/redis.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Redis Client (redis.js) - Super Simple ioredis Setup
// ==============================================================================
// We use a single 'ioredis' connection for BOTH caching and BullMQ!
// No complicated setup: just connect once and export.
// ==============================================================================

import Redis from 'ioredis';
import 'dotenv/config';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null // Required by BullMQ
});

redis.on('connect', () => console.log('✅ Redis connected via ioredis'));
redis.on('error', (err) => console.error('❌ Redis error:', err.message));
```

### Why `maxRetriesPerRequest: null` is Required
When using `ioredis` with BullMQ, BullMQ manages its own retry logic and blocking commands (like `BRPOPLPUSH`). Setting `maxRetriesPerRequest: null` prevents `ioredis` from throwing premature timeout errors when waiting for incoming jobs.

---

## 2. Setting Up the Queue & Worker (`src/queue.js`)

Create `src/queue.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Queue & Background Worker (queue.js) - Super Simple BullMQ
// ==============================================================================
// 1. Queue: Schedules website check jobs into Redis.
// 2. Worker: Pulls jobs from Redis, pings the website, and saves the result in DB!
// ==============================================================================

import { Queue, Worker } from 'bullmq';
import axios from 'axios';
import { redis } from './redis.js';
import { Monitor, Heartbeat } from './db.js';

// 1. Create the Queue
export const pingQueue = new Queue('pings', { connection: redis });

// 2. Helper to schedule repeating ping every 1 minute
export async function schedulePing(monitor) {
  try {
    await pingQueue.upsertJobScheduler(
      `monitor-${monitor.id}`,
      { every: 60 * 1000 }, // Repeat every 60 seconds
      {
        name: 'check-website',
        data: { monitorId: monitor.id, url: monitor.url }
      }
    );
    // Also trigger one immediate check right now
    await pingQueue.add('check-website', { monitorId: monitor.id, url: monitor.url });
  } catch (err) {
    console.error('Error scheduling ping:', err.message);
  }
}

// 3. Helper to stop repeating ping when monitor is deleted or paused
export async function removePing(monitorId) {
  try {
    await pingQueue.removeJobScheduler(`monitor-${monitorId}`);
  } catch (err) {
    console.error('Error removing ping:', err.message);
  }
}

// 4. Background Worker: Runs automatically whenever a job is ready
export const pingWorker = new Worker(
  'pings',
  async (job) => {
    const { monitorId, url } = job.data;
    const startTime = Date.now();
    let status = 'DOWN';
    let responseTime = 0;

    try {
      // Ping the website (5s timeout)
      await axios.get(url, { timeout: 5000, validateStatus: () => true });
      status = 'UP';
      responseTime = Date.now() - startTime;
    } catch (err) {
      status = 'DOWN';
      responseTime = Date.now() - startTime;
    }

    // 1. Save Heartbeat record in PostgreSQL
    await Heartbeat.create({
      monitorId,
      status,
      responseTime
    });

    // 2. Update Monitor's current status
    await Monitor.update(
      { status, lastResponseTime: responseTime },
      { where: { id: monitorId } }
    );

    // 3. Find monitor to clear user's cache so dashboard updates
    const mon = await Monitor.findByPk(monitorId);
    if (mon) {
      await redis.del(`monitors:${mon.userId}`);
    }

    console.log(`[Worker] Checked ${url} -> ${status} (${responseTime}ms)`);
  },
  { connection: redis }
);
```

---

## 3. How the BullMQ System Works (Step-by-Step)

```text
 1. User submits URL in Dashboard
               |
               v
 2. Express Route calls schedulePing(monitor)
               |
               +---> BullMQ upsertJobScheduler: Registers repeating rule (every 60s)
               |
               +---> BullMQ pingQueue.add: Triggers immediate first check
               |
               v
 3. pingWorker detects job in Redis
               |
               +---> axios.get(url, { timeout: 5000 })
               |     - Status: UP or DOWN
               |     - Latency: Date.now() - startTime
               |
               +---> Inserts row in Heartbeat table
               |
               +---> Updates Monitor row in Monitors table
               |
               +---> Evicts Redis cache: redis.del("monitors:" + userId)
```

### 1. `pingQueue.upsertJobScheduler(...)`
BullMQ features built-in job schedulers that manage repeating tasks in Redis. 
- The unique key `monitor-${monitor.id}` ensures we never accidentally create duplicate schedules for the same website.
- `{ every: 60 * 1000 }` tells Redis to fire a new ping job precisely every 60 seconds (1 minute).

### 2. Immediate Ping Execution
When someone adds a new website, they don't want to wait 60 seconds for their first ping! Calling `pingQueue.add(...)` dispatches an initial job right away so the monitor gets its initial health status within seconds.

### 3. Graceful Pausing (`removePing`)
When a user clicks **Pause** or **Delete** on their dashboard, `removePing(monitorId)` tells BullMQ to drop the recurring scheduler:
```javascript
await pingQueue.removeJobScheduler(`monitor-${monitorId}`);
```
This immediately halts all background network traffic for that URL.

### 4. Resilient Ping with `axios`
```javascript
await axios.get(url, { timeout: 5000, validateStatus: () => true });
```
- **`timeout: 5000`**: If a target server hangs or stops responding, axios forcibly aborts after 5 seconds instead of keeping the worker thread busy indefinitely.
- **`validateStatus: () => true`**: Even if the target website returns an HTTP `404 Not Found` or `500 Server Error`, the server is still alive and reachable. As long as it responds, we mark it as `UP`. If the connection is refused, times out, or fails DNS resolution, the `catch` block catches the error and marks the site as `DOWN`.

### 5. Automatic Cache Invalidation
When the worker finishes, it purges the user's cached monitors key:
```javascript
await redis.del(`monitors:${mon.userId}`);
```
When the user visits or refreshes their dashboard, Express fetches fresh data reflecting the latest status and response time.

---

🎉 **Queue and background worker are configured!** Next, proceed to **[Chapter 4: Authentication & JWT Middleware](./04-auth-and-jwt.md)**.
