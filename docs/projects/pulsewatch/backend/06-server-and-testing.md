---
title: "06. Server Bootstrap & API Testing"
description: "Assemble the complete Express application lifecycle in app.js, configure global error handlers, start the server, and verify all API routes with cURL commands."
---

# 06. Server Bootstrap & API Testing 🧪

In this final backend chapter, we will build `src/app.js`—the main entry point of our backend application. It brings together all middlewares, routes, database synchronization, and background workers into one cohesive Express application lifecycle. 

After starting the server, we will test every endpoint using simple cURL commands.

---

## 1. Complete Source Code: `src/app.js`

Create `src/app.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// PulseWatch Server (app.js) - Complete Express Application Lifecycle
// ==============================================================================
// This file demonstrates the standard 5-step lifecycle of an Express backend:
// 1. Middlewares: CORS, JSON parser, Morgan logger
// 2. Routes: API endpoints for Auth and Monitors
// 3. 404 Handler: Catches any URL that doesn't exist
// 4. Error Handler: Catches any unexpected server errors
// 5. Server Bootstrap: Connects DB, syncs tables, and listens on port
// ==============================================================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { sequelize } from './db.js';
import './redis.js'; // Starts Redis connection
import './queue.js'; // Starts BullMQ background worker

import authRoutes from './routes/auth.js';
import monitorRoutes from './routes/monitors.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================================================
// 1. Global Middlewares
// ==============================================================================
// Allow our Next.js frontend to make requests to this backend
app.use(cors());

// Automatically parse incoming JSON payloads into req.body
app.use(express.json());

// Log every HTTP request to the terminal in color (e.g. GET /api/monitors 200 4ms)
app.use(morgan('dev'));

// ==============================================================================
// 2. API Routes
// ==============================================================================
// Basic health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PulseWatch Simple Backend',
    timestamp: new Date().toISOString()
  });
});

// Mount Authentication routes (/api/auth/register, /api/auth/login, /api/auth/me)
app.use('/api/auth', authRoutes);

// Mount Monitor routes (/api/monitors, /api/monitors/:id, etc.)
app.use('/api/monitors', monitorRoutes);

// ==============================================================================
// 3. 404 Not Found Handler
// ==============================================================================
// If a request reaches this point, none of the routes above matched!
app.use((req, res) => {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// ==============================================================================
// 4. Global Error Handler
// ==============================================================================
// Catches any unexpected errors in the app so the server doesn't crash silently
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ==============================================================================
// 5. Start Server & Sync Database
// ==============================================================================
async function startServer() {
  try {
    // Step 1: Connect to PostgreSQL and sync tables (creates them if they don't exist)
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ PostgreSQL connected & tables synced');

    // Step 2: Start listening for HTTP requests
    app.listen(PORT, () => {
      console.log(`🚀 PulseWatch Server running at http://localhost:${PORT}`);
      console.log(`📡 Health check URL: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
```

---

## 2. Starting the Backend Server

Ensure your Docker containers are running first:

```bash
docker compose up -d
```

Now start the backend server in development mode:

```bash
npm run dev
```

You should see clear initialization messages in your console:

```text
✅ Redis connected via ioredis
✅ PostgreSQL connected & tables synced
🚀 PulseWatch Server running at http://localhost:5000
📡 Health check URL: http://localhost:5000/health
```

---

## 3. Testing All Endpoints with cURL

Open another terminal to test the API endpoints step-by-step:

### 1. Test Server Health Check
```bash
curl http://localhost:5000/health
```
**Expected Response:**
```json
{
  "status": "ok",
  "service": "PulseWatch Simple Backend",
  "timestamp": "2026-10-03T22:30:00.000Z"
}
```

---

### 2. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alex Johnson\",\"email\":\"alex@example.com\",\"password\":\"secret123\"}"
```
**Expected Response:**
```json
{
  "message": "Registered successfully",
  "token": "eyJhbGciOi...",
  "user": { "id": 1, "name": "Alex Johnson", "email": "alex@example.com" }
}
```
*(Copy the returned `token` for the authenticated requests below!)*

---

### 3. Log In with Your Account
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"alex@example.com\",\"password\":\"secret123\"}"
```

---

### 4. Fetch User Profile (`/me`)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```

---

### 5. Create a Website Monitor
```bash
curl -X POST http://localhost:5000/api/monitors \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"GitHub API\",\"url\":\"https://api.github.com\"}"
```
**Expected Response:**
```json
{
  "message": "Monitor created",
  "monitor": {
    "id": 1,
    "userId": 1,
    "name": "GitHub API",
    "url": "https://api.github.com",
    "status": "PENDING",
    "lastResponseTime": 0,
    "isActive": true
  }
}
```
In your server terminal, you will see the background worker immediately perform the initial ping:
```text
[Worker] Checked https://api.github.com -> UP (112ms)
```

---

### 6. List Monitors & Test Redis Cache
Run the fetch command once:
```bash
curl http://localhost:5000/api/monitors \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```
Response will return `"cached": false` because it queried PostgreSQL.

Now run the exact same command immediately a second time:
```bash
curl http://localhost:5000/api/monitors \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```
Response will return `"cached": true`—served directly from Redis memory in under 1 millisecond!

---

### 7. View Ping History (Heartbeats)
```bash
curl http://localhost:5000/api/monitors/1/heartbeats \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```
**Expected Response:**
```json
{
  "heartbeats": [
    {
      "id": 1,
      "monitorId": 1,
      "status": "UP",
      "responseTime": 112,
      "checkedAt": "2026-10-03T22:30:05.123Z"
    }
  ]
}
```

---

### 8. Pause Monitoring
```bash
curl -X PATCH http://localhost:5000/api/monitors/1/toggle \
  -H "Authorization: Bearer <YOUR_TOKEN>"
```
**Response:**
```json
{ "message": "Paused", "isActive": false }
```

---

🎉 **Congratulations!** Your PulseWatch backend is fully functional, database-backed, queue-driven, and thoroughly tested. 

👉 Proceed to the **[PulseWatch Frontend Master Guide](../frontend/)** to build the interactive Next.js dashboard!
