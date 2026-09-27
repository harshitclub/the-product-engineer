---
title: "06. Server Entry Point & API Testing"
description: "Assemble the Express application in server.js, boot the system, and test all REST endpoints and background queues using cURL or Postman."
---

# 06. Server Entry Point & API Testing 🧪

In this final backend chapter, we assemble all parts into the server entry point `src/server.js`, boot the application, and test every single endpoint step-by-step.

---

## 1. Application Entry Point (`src/server.js`)

Create `src/server.js`:

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import './config/redis.js';
import './queues/clickWorker.js';

import linkRoutes from './routes/link.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter); // Protect server with simple rate limiter

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Routes
app.use('/api/links', linkRoutes);
app.use('/', redirectRoutes);

// Start server
const startServer = async () => {
  try {
    // 1. Connect and sync PostgreSQL database
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully!');

    await sequelize.sync();
    console.log('✅ Database tables synchronized!');

    // 2. Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
  }
};

startServer();
```

### What Happens When `startServer()` Runs:
1. `import './config/redis.js'` connects to the Redis container.
2. `import './queues/clickWorker.js'` starts the BullMQ background worker listening for click events.
3. `await sequelize.authenticate()` tests the connection to PostgreSQL.
4. `await sequelize.sync()` automatically creates the `Links` and `Clicks` tables in PostgreSQL if they do not already exist.
5. `app.listen(PORT)` starts listening for incoming HTTP traffic on port `5000`.

---

## 2. Running the Backend

Open your terminal in the `backend/` folder and execute:

### Step 1: Start PostgreSQL and Redis Containers
```bash
docker compose up -d
```

### Step 2: Start the Development Server
```bash
npm run dev
```

You should see the following console output:

```text
[nodemon] starting `node src/server.js`
✅ Redis connected!
✅ PostgreSQL connected successfully!
✅ Database tables synchronized!
🚀 Server running on http://localhost:5000
```

---

## 3. Step-by-Step API Testing Guide

Let's test each endpoint using `curl` (or you can use Postman or Thunder Client in VS Code).

### Test 1: Server Health Check
```bash
curl http://localhost:5000/health
```
**Expected Response:**
```json
{ "status": "healthy" }
```

---

### Test 2: Create a Short Link (POST `/api/links`)
```bash
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com/harshitclub",
    "customCode": "github-profile",
    "title": "Harshit GitHub"
  }'
```
**Expected Response (`201 Created`):**
```json
{
  "id": 1,
  "originalUrl": "https://github.com/harshitclub",
  "shortCode": "github-profile",
  "title": "Harshit GitHub",
  "updatedAt": "2026-09-27T12:00:00.000Z",
  "createdAt": "2026-09-27T12:00:00.000Z"
}
```

---

### Test 3: Test Input Validation (Invalid URL)
```bash
curl -X POST http://localhost:5000/api/links \
  -H "Content-Type: application/json" \
  -d '{ "url": "invalid-url-string" }'
```
**Expected Response (`400 Bad Request`):**
```json
{ "message": "Please enter a valid URL (starting with http:// or https://)" }
```

---

### Test 4: Test Link Redirection (GET `/:code`)
Open your web browser and visit:
```text
http://localhost:5000/github-profile
```
**Expected Behavior:**
1. The browser instantly redirects to `https://github.com/harshitclub`.
2. In your terminal, you will see the BullMQ worker output:
```text
📊 Click saved in database for Link ID: 1
```

---

### Test 5: Get All Links (GET `/api/links`)
```bash
curl http://localhost:5000/api/links
```
**Expected Response (`200 OK`):**
```json
[
  {
    "id": 1,
    "originalUrl": "https://github.com/harshitclub",
    "shortCode": "github-profile",
    "title": "Harshit GitHub",
    "totalClicks": 1,
    "createdAt": "2026-09-27T12:00:00.000Z"
  }
]
```

---

### Test 6: Get Detailed Link Analytics (GET `/api/links/:id/analytics`)
```bash
curl http://localhost:5000/api/links/1/analytics
```
**Expected Response (`200 OK`):**
```json
{
  "link": {
    "id": 1,
    "originalUrl": "https://github.com/harshitclub",
    "shortCode": "github-profile",
    "title": "Harshit GitHub",
    "createdAt": "2026-09-27T12:00:00.000Z"
  },
  "totalClicks": 1,
  "clicks": [
    {
      "id": 1,
      "linkId": 1,
      "ipAddress": "127.0.0.1",
      "browser": "Chrome",
      "os": "Windows",
      "referrer": "Direct",
      "createdAt": "2026-09-27T12:00:05.000Z",
      "updatedAt": "2026-09-27T12:00:05.000Z"
    }
  ]
}
```

---

### Test 7: Delete a Link (DELETE `/api/links/:id`)
```bash
curl -X DELETE http://localhost:5000/api/links/1
```
**Expected Response (`200 OK`):**
```json
{ "message": "Link deleted successfully" }
```

---

## 4. Troubleshooting Guide

| Issue | Cause | Fix |
| :--- | :--- | :--- |
| `Connection refused: 5432` | PostgreSQL Docker container is not running | Run `docker compose up -d` and check with `docker ps`. |
| `Connection refused: 6379` | Redis Docker container is not running | Ensure `link_pulse_redis` is running on port 6379. |
| `EADDRINUSE: port 5000 already in use` | Another process is using port 5000 | Change `PORT=5001` in your `.env` or kill the process using port 5000. |

---

## 🎓 Congratulations!

You have successfully built and verified the entire **LinkPulse Backend** with:
- PostgreSQL & Docker containerization
- Sequelize ORM and cascade relationships
- Sub-2ms Redis caching
- Non-blocking BullMQ queue analytics processing
- Zod schema validation & rate limiting

Stay tuned for the **LinkPulse Frontend Track**!
