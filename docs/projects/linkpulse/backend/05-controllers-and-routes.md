---
title: "05. Controllers, Business Logic & API Routes"
description: "Build the link management controller with nanoid and cache pre-warming, the high-speed redirect controller, and connect Express routers."
---

# 05. Controllers, Business Logic & API Routes 🚦

In this chapter, we will build the core application logic:
1. **Link Controller**: Creating short links (with nanoid & Redis cache pre-warming), listing links with click counts, retrieving individual link analytics, and deleting links (with cache invalidation).
2. **Redirect Controller**: Lightning-fast sub-2ms redirections using Redis Cache-Aside and BullMQ event dispatching.
3. **Express Route Handlers**: Registering REST endpoints.

---

## 1. Link Controller (`src/controllers/link.controller.js`)

Create `src/controllers/link.controller.js`:

```javascript
import { nanoid } from 'nanoid';
import { Link, Click } from '../models/index.js';
import { redis } from '../config/redis.js';
import { createLinkSchema } from '../schemas/link.schema.js';

// 1. Create a new short link
export const createLink = async (req, res) => {
  try {
    // Step A: Validate user input with Zod
    const validation = createLinkSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors[0].message,
      });
    }

    const { url, customCode, title } = validation.data;

    // Step B: Determine short code (use custom code or generate random 6-character code)
    let shortCode = customCode;
    if (shortCode) {
      const existing = await Link.findOne({ where: { shortCode } });
      if (existing) {
        return res.status(400).json({ message: 'This custom code is already taken.' });
      }
    } else {
      shortCode = nanoid(6);
    }

    // Step C: Save link to PostgreSQL database
    const newLink = await Link.create({
      originalUrl: url,
      shortCode,
      title: title || '',
    });

    // Step D: Pre-warm Redis cache for 1 hour (3600 seconds) for fast redirects
    await redis.set(`url:${shortCode}`, newLink.originalUrl, 'EX', 3600);
    await redis.set(`id:${shortCode}`, newLink.id, 'EX', 3600);

    return res.status(201).json(newLink);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 2. Get all links with total click count
export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      include: [{ model: Click, as: 'clicks' }],
      order: [['createdAt', 'DESC']],
    });

    // Format simple response with total clicks count
    const formattedLinks = links.map((link) => ({
      id: link.id,
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      title: link.title,
      totalClicks: link.clicks ? link.clicks.length : 0,
      createdAt: link.createdAt,
    }));

    return res.json(formattedLinks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 3. Get detailed analytics for a specific link
export const getLinkAnalytics = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id, {
      include: [{ model: Click, as: 'clicks' }],
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    return res.json({
      link: {
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        title: link.title,
        createdAt: link.createdAt,
      },
      totalClicks: link.clicks.length,
      clicks: link.clicks,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 4. Delete a link and remove it from Redis cache
export const deleteLink = async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    // Invalidate / remove from Redis cache
    await redis.del(`url:${link.shortCode}`);
    await redis.del(`id:${link.shortCode}`);

    // Delete from PostgreSQL (clicks will be deleted automatically via CASCADE)
    await link.destroy();

    return res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
```

### Key Engineering Concepts in the Link Controller:
1. **Cache Pre-warming**: When a link is created, we immediately write `url:<shortCode>` and `id:<shortCode>` to Redis with an expiration of 3600 seconds (1 hour). The very first user to click will get a cache hit without hitting PostgreSQL!
2. **Cache Invalidation on Delete**: When `deleteLink` is triggered, we call `redis.del()` for both keys before destroying the PostgreSQL record. This prevents "phantom redirects" to a deleted link.

---

## 2. High-Performance Redirect Controller (`src/controllers/redirect.controller.js`)

This controller handles incoming public clicks (e.g. `GET /:code`).

Create `src/controllers/redirect.controller.js`:

```javascript
import { redis } from '../config/redis.js';
import { Link } from '../models/index.js';
import { clickQueue } from '../queues/clickQueue.js';

// Redirect visitor to the original URL
export const handleRedirect = async (req, res) => {
  try {
    const { code } = req.params;

    // 1. Check Redis Cache in RAM (super fast!)
    let url = await redis.get(`url:${code}`);
    let linkId = await redis.get(`id:${code}`);

    // 2. If missing from Redis, look up in PostgreSQL database
    if (!url || !linkId) {
      const link = await Link.findOne({ where: { shortCode: code } });

      if (!link) {
        return res.status(404).send('Link not found');
      }

      url = link.originalUrl;
      linkId = link.id;

      // Save in Redis for future requests (1-hour expiration)
      await redis.set(`url:${code}`, url, 'EX', 3600);
      await redis.set(`id:${code}`, linkId, 'EX', 3600);
    }

    // 3. Push click event to background queue (non-blocking)
    clickQueue.add('save-click', {
      linkId: Number(linkId),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers['referer'] || 'Direct',
    });

    // 4. Redirect visitor immediately
    return res.redirect(url);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};
```

### Why this Redirect is Ultra-Fast:
- Step 1 checks RAM (Redis) in $\approx 1\text{ms}$.
- Step 3 dispatches an asynchronous event to BullMQ without `await`-ing the database write.
- Step 4 triggers `res.redirect(url)` right away.

---

## 3. Link Routes (`src/routes/link.routes.js`)

Create `src/routes/link.routes.js`:

```javascript
import { Router } from 'express';
import {
  createLink,
  getAllLinks,
  getLinkAnalytics,
  deleteLink,
} from '../controllers/link.controller.js';

const router = Router();

// POST /api/links - Create a short link
router.post('/', createLink);

// GET /api/links - Get all links
router.get('/', getAllLinks);

// GET /api/links/:id/analytics - Get analytics for a single link
router.get('/:id/analytics', getLinkAnalytics);

// DELETE /api/links/:id - Delete a link
router.delete('/:id', deleteLink);

export default router;
```

---

## 4. Redirect Routes (`src/routes/redirect.routes.js`)

Create `src/routes/redirect.routes.js`:

```javascript
import { Router } from 'express';
import { handleRedirect } from '../controllers/redirect.controller.js';

const router = Router();

// GET /:code - Redirect to the original URL
router.get('/:code', handleRedirect);

export default router;
```

---

👉 **Next Step:** Continue to **[Chapter 6: Server Entry Point & API Testing](./06-server-and-testing.md)** to tie everything together into `server.js` and verify all endpoints!
