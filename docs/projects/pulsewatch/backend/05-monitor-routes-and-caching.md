---
title: "05. Monitor Routes & Redis Caching"
description: "Build monitor management routes with Redis Cache-Aside, automatic cache invalidation, BullMQ scheduling integration, and historical heartbeat endpoints."
---

# 05. Monitor Routes & Redis Caching 📊

In this chapter, we will implement the core business logic of PulseWatch: creating websites to monitor, listing them with ultra-fast **Redis caching**, toggling pause/resume, deleting monitors, and retrieving heartbeat ping histories for charts.

---

## 1. Complete Source Code: `src/routes/monitors.js`

Create `src/routes/monitors.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Monitor Routes (routes/monitors.js) - Super Simple with Caching & BullMQ
// ==============================================================================

import express from 'express';
import { z } from 'zod';
import { Monitor, Heartbeat } from '../db.js';
import { redis } from '../redis.js';
import { schedulePing, removePing } from '../queue.js';
import auth from '../auth.js';

const router = express.Router();

// Require login for all monitor routes
router.use(auth);

// 1. Zod schema for creating a monitor
const monitorSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  url: z.string().url('Invalid URL (e.g. https://example.com)')
});

// GET /api/monitors - List monitors with Redis Cache
router.get('/', async (req, res) => {
  const cacheKey = `monitors:${req.user.id}`;

  // Step 1: Check Redis cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json({ cached: true, monitors: JSON.parse(cached) });
  }

  // Step 2: Cache miss -> Read from PostgreSQL
  const monitors = await Monitor.findAll({
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']]
  });

  // Step 3: Save to Redis for 30 seconds
  await redis.set(cacheKey, JSON.stringify(monitors), 'EX', 30);

  res.json({ cached: false, monitors });
});

// POST /api/monitors - Create monitor & start pinging
router.post('/', async (req, res) => {
  // Validate input directly with Zod
  const validation = monitorSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  const { name, url } = validation.data;

  // 1. Create in PostgreSQL
  const monitor = await Monitor.create({
    userId: req.user.id,
    name,
    url
  });

  // 2. Clear Redis cache so new monitor shows up immediately
  await redis.del(`monitors:${req.user.id}`);

  // 3. Tell BullMQ to start repeating pings every minute
  await schedulePing(monitor);

  res.status(201).json({ message: 'Monitor created', monitor });
});

// PATCH /api/monitors/:id/toggle - Pause or resume monitoring
router.patch('/:id/toggle', async (req, res) => {
  const monitor = await Monitor.findOne({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!monitor) return res.status(404).json({ error: 'Monitor not found' });

  // Toggle active state
  monitor.isActive = !monitor.isActive;
  await monitor.save();

  if (monitor.isActive) {
    await schedulePing(monitor); // Resume
  } else {
    await removePing(monitor.id); // Pause
  }

  // Clear cache
  await redis.del(`monitors:${req.user.id}`);

  res.json({ message: monitor.isActive ? 'Resumed' : 'Paused', isActive: monitor.isActive });
});

// DELETE /api/monitors/:id - Delete monitor
router.delete('/:id', async (req, res) => {
  const monitor = await Monitor.findOne({
    where: { id: req.params.id, userId: req.user.id }
  });

  if (!monitor) return res.status(404).json({ error: 'Monitor not found' });

  // Stop BullMQ job
  await removePing(monitor.id);

  // Delete from PostgreSQL
  await monitor.destroy();

  // Clear cache
  await redis.del(`monitors:${req.user.id}`);

  res.json({ message: 'Monitor deleted' });
});

// GET /api/monitors/:id/heartbeats - Ping logs for charts
router.get('/:id/heartbeats', async (req, res) => {
  const heartbeats = await Heartbeat.findAll({
    where: { monitorId: req.params.id },
    order: [['checkedAt', 'DESC']],
    limit: 50
  });

  res.json({ heartbeats });
});

export default router;
```

---

## 2. In-Depth Technical Breakdown

### 1. Global Route Protection with `router.use(auth)`
Notice line 15:
```javascript
router.use(auth);
```
Instead of repeating `auth` on every single route (`router.get('/', auth, ...)`), attaching it to the router guarantees that **every** endpoint in this file is automatically secured. Unauthenticated visitors are rejected with an HTTP 401 error.

### 2. The Read-Through Cache Pattern Explained
In `GET /api/monitors`:
```javascript
const cacheKey = `monitors:${req.user.id}`;

// 1. Check Redis first
const cached = await redis.get(cacheKey);
if (cached) {
  return res.json({ cached: true, monitors: JSON.parse(cached) });
}

// 2. Query PostgreSQL
const monitors = await Monitor.findAll({ where: { userId: req.user.id } });

// 3. Cache in Redis for 30s
await redis.set(cacheKey, JSON.stringify(monitors), 'EX', 30);
```
- **`cacheKey`**: Scoped by user ID (`monitors:1`, `monitors:2`) so users never see each other's cached lists.
- **`'EX', 30`**: Redis will automatically purge this key after 30 seconds.
- **`cached: true/false` flag**: Passed in the JSON response so the Next.js frontend can display an indicator badge: `⚡ Served from Redis Cache`.

### 3. Immediate Cache Eviction on Mutations
Whenever a user modifies their monitors:
- Adds a monitor (`POST /`)
- Pauses or Resumes (`PATCH /:id/toggle`)
- Deletes a monitor (`DELETE /:id`)

The controller immediately calls:
```javascript
await redis.del(`monitors:${req.user.id}`);
```
This is known as **Cache Invalidation**. It prevents the dreaded "stale read" bug where a user adds an item but doesn't see it appear on their screen.

### 4. Coordinated Queue Management
When a monitor is paused or deleted, the server ensures the background worker stops pinging it by calling:
```javascript
await removePing(monitor.id);
```
This deregisters the repeating job scheduler from Redis, saving server resources and bandwidth.

---

🎉 **Monitor routes are finished!** Now head to **[Chapter 6: Server Bootstrap & API Testing](./06-server-and-testing.md)** to tie everything together.
