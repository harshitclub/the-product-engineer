---
title: "LinkPulse: Full-Stack URL Management & Real-Time Analytics Engine"
description: "A beginner-friendly full-stack engineering guide to building a production-grade URL shortener with Next.js, Express, PostgreSQL, Redis Cache-Aside, BullMQ background queues, and Docker."
---

# LinkPulse: Full-Stack URL Management & Real-Time Analytics Engine

> **Project Blueprint & Teaching Guide**  
> *A practical full-stack project designed to teach software engineering fundamentals, client-server communication, database design, caching, and background job processing in simple, clear steps.*

---

## 1. Project Purpose & What We Are Building

### What is LinkPulse?
**LinkPulse** is a URL shortener and click-analytics platform, similar to popular tools like Bitly or Dub.co.

When sharing links on social media, newsletters, or text messages, URLs are often long and messy:
```text
https://mycoolstore.com/products/electronics/wireless-noise-cancelling-headphones?utm_source=twitter&utm_medium=post&utm_campaign=summer_sale_2026
```

With **LinkPulse**, you paste that long URL, and it generates a clean, memorable short link:
```text
http://localhost:5000/sale
```

When anyone clicks `http://localhost:5000/sale`, LinkPulse instantly redirects them to the original destination URL, while recording detailed analytics (such as browser, operating system, timestamp, and referrer) in the background.

---

## 2. Core Features

1. **Short Link Creation**: Generate unique short codes automatically or choose custom aliases (e.g., `/my-portfolio`).
2. **Instant Redirection**: Sub-2 millisecond redirect speed powered by in-memory Redis caching.
3. **Real-Time Click Analytics**: Records each click event (browser, OS, device, IP address, referrer site, and exact timestamp).
4. **Non-Blocking Background Processing**: Click analytics are saved in the background through a job queue (BullMQ), so the user experiences zero redirect delay.
5. **API Rate Limiting**: Redis-backed rate limiting to protect the server from spam and denial-of-service abuse.
6. **Input Validation**: Server-side runtime schema validation using Zod to block invalid or malicious URLs.
7. **Interactive Dashboard**: A clean Next.js user interface to create links, copy them with one click, view total clicks, and delete old links.

---

## 3. Technology Stack & Why We Use Each Tool

Every tool in this stack was chosen to teach a distinct, real-world software engineering concept:

| Technology | Layer | Why We Use It (Simple Explanation) |
| :--- | :--- | :--- |
| **Next.js & React** | Frontend (User Interface) | Provides a component-based UI. We use React state (`useState`) for form inputs and `useEffect` with `fetch()` to communicate with our backend. |
| **Node.js & Express** | Backend (API Server) | The server engine that listens for requests, runs middleware functions, checks input data, and handles redirections. |
| **PostgreSQL** | Primary Database | A relational database running inside Docker. It permanently stores our links and click records with structured tables, relationships, and indexes. |
| **Redis** | In-Memory Cache | A super-fast key-value store stored in RAM. Reading from RAM takes ~1ms compared to ~30ms from disk, making our link redirects instant. |
| **BullMQ** | Background Job Queue | A message queue that offloads slow tasks (like parsing analytics and saving to the database) to a background worker so the redirect is never delayed. |
| **Docker & Docker Compose** | Environment & DevOps | Lets us start PostgreSQL and Redis with a single command (`docker-compose up -d`) without needing to install complicated software directly on our computers. |
| **Zod** | Data Validation | Checks incoming request data on the server. If someone sends an invalid URL or a custom alias that is too short, Zod rejects it immediately with a friendly error. |

---

## 4. How LinkPulse Works (Architecture & Data Flow)

Here is the visual step-by-step flow showing how data moves across the system:

```text
========================================================================================
                                 LINKPULSE SYSTEM ARCHITECTURE
========================================================================================

 [ USER INTERFACE ]             [ EXPRESS BACKEND ]             [ STORAGE & QUEUE ]
  Next.js Dashboard              Node.js API Server              Docker Containers
+--------------------+         +--------------------+         +--------------------+
|  Create Link Form  | ------> |  Zod Validator     | ------> |  PostgreSQL DB     |
|  - URL Input       |  POST   |  - Checks URL      |  INSERT |  - Links Table     |
|  - Custom Alias    |         |  - Pre-warms cache |  SAVE   |  - Clicks Table    |
+--------------------+         +--------------------+         +--------------------+
                                         |                              |
                                         v                              v
                               +--------------------+         +--------------------+
                               |  Redis Cache       | <------ |  In-Memory Storage |
                               |  - link:short_code |         |  - Sub-2ms lookups |
                               +--------------------+         +--------------------+


========================================================================================
                     HIGH-PERFORMANCE REDIRECT FLOW (WHEN SOMEONE CLICKS)
========================================================================================

 Visitor clicks short link (GET /:code)
            |
            v
   [ Express Redirect Handler ]
            |
            +---> 1. Check Redis Cache first (Takes ~1 millisecond)
            |        - If Found (Cache Hit): Get original destination URL immediately.
            |        - If Missing (Cache Miss): Query PostgreSQL, then save to Redis for next time.
            |
            +---> 2. Send immediate HTTP 302 Redirect to the visitor's browser.
            |
            +---> 3. Push click event to BullMQ Queue in Redis (Asynchronous / Non-blocking).
                     |
                     v
            [ Background Worker Process ]
                     |
                     +---> Reads job from BullMQ
                     +---> Parses User-Agent (Browser & OS)
                     +---> Inserts click row into PostgreSQL `clicks` table
```

---

## 5. Key Engineering Concepts Explained Simply

### Concept 1: Docker & Containerization
- **The Problem**: Setting up databases and Redis manually on different operating systems (Windows, Mac, Linux) often leads to configuration errors.
- **The Solution**: Docker packages PostgreSQL and Redis into isolated containers. With a single configuration file (`docker-compose.yml`), every student gets the exact same working environment.

### Concept 2: The Cache-Aside Pattern (Why Redis is So Fast)
- **The Problem**: Querying a relational database on disk for every single link click takes 30ms to 50ms. Under heavy traffic, the database gets overloaded.
- **The Solution**:
  1. When a user requests a short link, the server checks Redis (which lives in RAM).
  2. If found (**Cache Hit**), the URL is returned in under 2ms.
  3. If not found (**Cache Miss**), the server queries PostgreSQL, saves the result into Redis with a 1-hour expiration Time-To-Live (TTL), and redirects the user.

### Concept 3: Decoupled Background Workers (Why BullMQ is Essential)
- **The Problem**: When a visitor clicks a link, they want to reach their destination immediately. If the server waits to parse the user's browser, extract their IP, and insert a new record into PostgreSQL before redirecting, the user feels a noticeable lag.
- **The Solution**: The redirect handler pushes the click details into a BullMQ queue and immediately returns the HTTP 302 redirect. A separate background worker picks up the job from the queue and writes the analytics to PostgreSQL without making the visitor wait.

### Concept 4: Database Indexing
- **The Problem**: If you have 500,000 links in your database and look for `short_code = 'sale'`, PostgreSQL would have to check all 500,000 rows one by one (called a full table scan).
- **The Solution**: Adding an index on `short_code` creates an organized B-Tree search structure. PostgreSQL finds the row in just a few lookup operations ($O(\log N)$ time).

### Concept 5: Runtime Schema Validation with Zod
- **The Problem**: Users can submit invalid URLs, empty strings, or malicious scripts. Frontend checks can be bypassed using tools like Postman or curl.
- **The Solution**: Zod inspects every incoming request on the backend. If the URL is invalid or the custom alias contains forbidden characters, Zod stops the request immediately and returns a clean error message.

---

## 6. Database Schema (PostgreSQL)

We use two relational tables connected by a Foreign Key:

### Table 1: `links`
Stores each original URL and its corresponding short code.

```sql
CREATE TABLE links (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for instant lookups on short codes
CREATE INDEX idx_links_short_code ON links(short_code);
```

### Table 2: `clicks`
Stores every visit to a short link for analytics.

```sql
CREATE TABLE clicks (
    id SERIAL PRIMARY KEY,
    link_id INTEGER REFERENCES links(id) ON DELETE CASCADE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    browser VARCHAR(50),
    os VARCHAR(50),
    referrer TEXT,
    clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast analytics queries
CREATE INDEX idx_clicks_link_id ON clicks(link_id);
CREATE INDEX idx_clicks_clicked_at ON clicks(clicked_at);
```

---

## 7. REST API Endpoints

| Method | Endpoint | Purpose | Request Body | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/links` | Create a new shortened link | `{ "url": "https://example.com", "customCode": "demo" }` | `201 Created` / `400 Bad Request` |
| `GET` | `/api/links` | Get list of all links with total clicks | None | `200 OK` |
| `GET` | `/api/links/:id/analytics` | Get detailed analytics for a specific link | None | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/links/:id` | Delete a link and clear its cache | None | `200 OK` / `404 Not Found` |
| `GET` | `/:code` | Public redirect URL (redirects to original URL) | None | `302 Found (Redirect)` / `404 Not Found` |

---

## 8. Project Directory Structure

```text
linkpulse/
├── docker-compose.yml           # Runs PostgreSQL and Redis containers
├── .env.example                 # Environment variables template
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js            # PostgreSQL connection pool
│   │   │   └── redis.js         # Redis client instance
│   │   ├── controllers/
│   │   │   ├── link.controller.js      # Handlers for creating, listing, deleting links
│   │   │   └── redirect.controller.js  # High-speed redirect handler
│   │   ├── middlewares/
│   │   │   ├── rateLimiter.js   # Redis-backed rate limiter
│   │   │   └── validate.js      # Zod validation middleware
│   │   ├── queues/
│   │   │   ├── clickQueue.js    # BullMQ producer (pushes click jobs)
│   │   │   └── clickWorker.js   # BullMQ worker (saves clicks to PostgreSQL)
│   │   ├── routes/
│   │   │   ├── link.routes.js   # Routes for /api/links
│   │   │   └── redirect.routes.js # Route for /:code
│   │   ├── schemas/
│   │   │   └── link.schema.js   # Zod validation rules
│   │   └── server.js            # Express application entry point
│   └── sql/
│       └── schema.sql           # Database tables setup script
└── frontend/
    ├── package.json
    ├── src/
    │   ├── app/
    │   │   ├── page.js          # Main Dashboard page
    │   │   ├── layout.js        # Root application layout
    │   │   └── globals.css      # CSS styling
    │   ├── components/
    │   │   ├── CreateLinkForm.jsx # Form to submit new links
    │   │   ├── LinkList.jsx       # List of created links
    │   │   ├── LinkCard.jsx       # Individual link item card
    │   │   └── StatsCard.jsx      # Summary metrics badge
    │   └── services/
    │       └── api.js             # Client-side fetch helper functions
```

---

## 9. Step-by-Step Implementation Guide

### Phase 1: Docker Environment Setup

Create `docker-compose.yml` in the root folder:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: linkpulse-postgres
    restart: always
    environment:
      POSTGRES_USER: linkpulse
      POSTGRES_PASSWORD: linkpulse_secret
      POSTGRES_DB: linkpulse_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: linkpulse-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:
```

Start the containers:
```bash
docker-compose up -d
```

---

### Phase 2: Express Server & Zod Schema Validation

1. Set up the backend package:
```bash
cd backend
npm init -y
npm install express pg ioredis bullmq zod cors dotenv nanoid ua-parser-js
```

2. Define the link validation schema in `src/schemas/link.schema.js`:
```javascript
import { z } from 'zod';

export const createLinkSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL starting with http:// or https://' }),
  customCode: z
    .string()
    .trim()
    .min(3, 'Custom code must be at least 3 characters')
    .max(20, 'Custom code cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9-_]+$/, 'Custom code can only contain letters, numbers, hyphens, and underscores')
    .optional()
    .or(z.literal(''))
});
```

3. Create the reusable validation middleware in `src/middlewares/validate.js`:
```javascript
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    });
  }
  req.validatedBody = result.data;
  next();
};
```

---

### Phase 3: Redis Cache-Aside & Rate Limiting

1. Create the Redis rate limiter middleware in `src/middlewares/rateLimiter.js`:
```javascript
import { redis } from '../config/redis.js';

export const rateLimiter = (limit = 10, windowSeconds = 60) => async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const key = `ratelimit:${ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }

    if (current > limit) {
      return res.status(429).json({
        success: false,
        message: `Too many requests. Please wait ${windowSeconds} seconds before trying again.`
      });
    }
    next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    next(); // Continue even if rate limiter encounters an issue
  }
};
```

2. Build the high-speed redirect controller in `src/controllers/redirect.controller.js`:
```javascript
import { redis } from '../config/redis.js';
import { db } from '../config/db.js';
import { clickQueue } from '../queues/clickQueue.js';

export const handleRedirect = async (req, res) => {
  const { code } = req.params;

  try {
    // Step 1: Check Redis In-Memory Cache (Sub-2ms)
    let targetUrl = await redis.get(`link:${code}`);
    let linkId = null;

    if (targetUrl) {
      // Cache Hit: URL found in Redis memory
      linkId = await redis.get(`link_id:${code}`);
    } else {
      // Step 2: Cache Miss: Query PostgreSQL
      const query = 'SELECT id, original_url FROM links WHERE short_code = $1';
      const result = await db.query(query, [code]);

      if (result.rows.length === 0) {
        return res.status(404).send('Short link not found');
      }

      targetUrl = result.rows[0].original_url;
      linkId = result.rows[0].id;

      // Step 3: Populate Redis cache for future requests (1-hour expiration)
      await redis.set(`link:${code}`, targetUrl, 'EX', 3600);
      await redis.set(`link_id:${code}`, linkId, 'EX', 3600);
    }

    // Step 4: Dispatch click event asynchronously to BullMQ queue
    if (linkId) {
      clickQueue.add('track-click', {
        linkId: parseInt(linkId, 10),
        ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        userAgent: req.headers['user-agent'] || '',
        referrer: req.headers['referer'] || null,
        timestamp: new Date().toISOString()
      }).catch(err => console.error('Failed to enqueue click job:', err));
    }

    // Step 5: Immediate 302 Redirect to user
    return res.redirect(302, targetUrl);
  } catch (error) {
    console.error('Redirect Error:', error);
    return res.status(500).send('Internal Server Error');
  }
};
```

---

### Phase 4: BullMQ Queue & Background Worker

1. Initialize the BullMQ queue producer in `src/queues/clickQueue.js`:
```javascript
import { Queue } from 'bullmq';
import { redisConfig } from '../config/redis.js';

export const clickQueue = new Queue('click-events', {
  connection: redisConfig
});
```

2. Build the background worker in `src/queues/clickWorker.js`:
```javascript
import { Worker } from 'bullmq';
import { redisConfig } from '../config/redis.js';
import { db } from '../config/db.js';
import { UAParser } from 'ua-parser-js';

export const clickWorker = new Worker(
  'click-events',
  async (job) => {
    const { linkId, ip, userAgent, referrer, timestamp } = job.data;
    
    // Parse browser and operating system details
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || 'Unknown';
    const os = parser.getOS().name || 'Unknown';

    // Insert analytics into PostgreSQL
    await db.query(
      `INSERT INTO clicks (link_id, ip_address, user_agent, browser, os, referrer, clicked_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [linkId, ip, userAgent, browser, os, referrer, timestamp]
    );
  },
  { connection: redisConfig }
);

clickWorker.on('completed', (job) => {
  console.log(`Click logged for link ID: ${job.data.linkId}`);
});

clickWorker.on('failed', (job, err) => {
  console.error(`Click job ${job.id} failed:`, err);
});
```

---

### Phase 5: Next.js Frontend UI Component

Create the link submission form in `frontend/src/components/CreateLinkForm.jsx`:

```jsx
'use client';
import { useState } from 'react';

export default function CreateLinkForm({ onLinkCreated }) {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, customCode })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || (data.errors && data.errors[0].message) || 'Failed to create short link');
      }

      setUrl('');
      setCustomCode('');
      onLinkCreated(data.link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <input
        type="url"
        placeholder="Enter destination URL (e.g. https://example.com/long-page)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Custom Alias (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Shortening...' : 'Generate Short Link'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
```

---

## 10. Resume Description & Interview Questions

### Resume Description Template

> **LinkPulse: High-Performance URL Shortener & Analytics Engine**  
> *Stack: Next.js, Express.js, PostgreSQL, Redis, BullMQ, Docker, Zod*
> - Built a full-stack URL management platform delivering **sub-2ms redirect latency** with Express.js and Next.js.
> - Implemented an in-memory **Redis Cache-Aside** layer, eliminating over 95% of redundant database reads for popular links.
> - Decoupled click analytics tracking using **BullMQ background workers**, ensuring analytics database writes never delay client redirects.
> - Protected backend endpoints against spam and brute-force requests with a **Redis-backed rate limiter**.
> - Enforced runtime input validation across all routes using **Zod** schemas to guarantee data integrity.
> - Containerized PostgreSQL and Redis services with **Docker Compose** for reproducible local development.

---

### Top 5 Technical Interview Questions

#### 1. What is the Cache-Aside pattern, and how did you handle cache invalidation when a link is deleted?
**Answer**:  
In the Cache-Aside pattern, the application checks Redis first. On a cache hit, it returns the stored URL immediately. On a cache miss, it reads from PostgreSQL, stores the URL in Redis with a 1-hour expiration TTL, and returns it.  
When a link is deleted via `DELETE /api/links/:id`, we delete the record from PostgreSQL and immediately delete the corresponding Redis key (`redis.del("link:" + shortCode)`). This ensures users never get redirected to a deleted URL.

#### 2. Why did you use BullMQ instead of writing clicks directly to PostgreSQL inside the redirect handler?
**Answer**:  
Redirecting users is latency-critical. Saving a click directly to PostgreSQL takes 20ms–50ms because of network roundtrips, database disk writes, and user-agent parsing. Under heavy traffic, this creates database bottlenecks.  
By pushing a lightweight job into BullMQ, the redirect handler completes in under 2ms. The background worker picks up the job and writes the analytics to PostgreSQL without making the user wait.

#### 3. How does the Redis rate limiter prevent race conditions?
**Answer**:  
We use Redis's atomic `INCR` command. Because Redis processes commands in a single-threaded event loop, each increment is atomic. When the count is 1, we set an expiration TTL using `EXPIRE`. If the count exceeds the threshold within the time window, the request is blocked with HTTP 429 Too Many Requests.

#### 4. Why is frontend validation not enough, and why is Zod used on the server?
**Answer**:  
Frontend validation is only for user convenience. Anyone can send requests directly to backend endpoints using curl, Postman, or automated scripts without using the frontend. Server-side validation with Zod guarantees that all incoming data conforms to our strict rules before reaching the database.

#### 5. Why did you add an index on the `short_code` column in PostgreSQL?
**Answer**:  
Without an index, PostgreSQL must scan every row in the table from start to finish ($O(N)$ time complexity). With a B-Tree index on `short_code`, lookups take $O(\log N)$ time, ensuring that finding a link takes less than a millisecond even with millions of records in the database.
