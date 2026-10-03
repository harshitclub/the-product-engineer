---
title: "PulseWatch: Full-Stack Website Uptime & Health Monitor"
description: "A beginner-friendly full-stack engineering guide to building a production-grade website uptime monitoring service with Next.js, Express, PostgreSQL, Redis caching, BullMQ background workers, and Docker."
---

# PulseWatch: Full-Stack Website Uptime & Health Monitor 📡

> **Project Blueprint & Teaching Guide**  
> *A practical, real-world full-stack capstone designed to teach beginner and intermediate developers how to build an uptime monitoring system (similar to UptimeRobot) using Next.js, Express, PostgreSQL, Redis, and BullMQ background workers.*

---

## 1. Project Purpose & What We Are Building

### What is PulseWatch?
**PulseWatch** is a full-stack website uptime and health monitoring platform. 

Imagine you launch an online store, a personal portfolio, or a SaaS API. If your server crashes or your web hosting goes down in the middle of the night, how do you find out? Usually, an angry user tweets at you, or a customer abandons their cart!

With **PulseWatch**, you add your website's URL (e.g., `https://myportfolio.com` or `https://api.mycoolstore.com`). PulseWatch's background worker runs 24/7, sending automated HTTP health pings every 60 seconds. It records whether your site is **UP** (online) or **DOWN** (unreachable), measures how many milliseconds it took to respond, and displays the live health status on an interactive dashboard.

```text
+---------------------+         Pings every 60s         +---------------------+
|                     | ------------------------------> |                     |
|  PulseWatch Worker  |                                 |   Your Website or   |
|  (BullMQ + Redis)   | <------------------------------ |       API URL       |
|                     |     Status: 200 OK (84ms)       |                     |
+---------------------+                                 +---------------------+
```

---

## 2. Core Features

1. **User Authentication**: Secure registration and login using salted password hashing (`bcryptjs`) and stateless JSON Web Tokens (`jwt`).
2. **Website & API Monitoring**: Add multiple target URLs with custom friendly labels (e.g., "Production API", "Company Landing Page").
3. **Automated 60-Second Health Pings**: Background jobs scheduled with **BullMQ** send HTTP requests using `axios` with a 5-second timeout.
4. **Latency Measurement**: Accurately records network round-trip response time in milliseconds for every single check.
5. **Decoupled Architecture**: Health checks execute completely asynchronously in background workers, ensuring the Express HTTP API server remains unblocked and ultra-responsive.
6. **In-Memory Caching (Redis)**: User monitors are cached in Redis with a 30-second TTL (Time-To-Live) and instant invalidation on changes, delivering sub-millisecond dashboard loading times.
7. **Pause & Resume Controls**: Toggle active monitoring on or off without deleting the monitor or losing historical records.
8. **Heartbeat History Modal**: View the latest 50 chronological ping logs for any monitor, complete with exact timestamps, status indicators, and response latency.
9. **Interactive Dashboard**: Modern Next.js user interface featuring a live summary bar (Total Monitors, Online, Offline, Average Latency) and real-time cache hit indicators.

---

## 3. Technology Stack & Why We Use Each Tool

Every tool in this project was deliberately selected to teach a core software engineering concept without unnecessary complexity:

| Technology | Layer | Why We Use It (Simple Explanation) |
| :--- | :--- | :--- |
| **Next.js (React 19)** | Frontend (User Interface) | Provides client-side routing, React component state (`useState`), side effects (`useEffect`), and fast browser rendering. |
| **Vanilla CSS (Flexbox)** | Frontend Styling | No Tailwind or bulky UI frameworks! Uses simple CSS variables and standard Flexbox so any beginner can understand and customize every style rule. |
| **Node.js & Express.js** | Backend (API Server) | The JavaScript runtime and web framework that listens for incoming HTTP requests, handles authentication, and coordinates the database and queue. |
| **PostgreSQL** | Primary Relational Database | Durable SQL database running in Docker. Safely stores users, monitors, and historical heartbeat pings with structured tables and relationships. |
| **Sequelize ORM** | Object-Relational Mapper | Allows us to interact with PostgreSQL using clean JavaScript classes and objects, eliminating the need to write raw SQL strings. |
| **Redis** | In-Memory Cache & Message Broker | Lightning-fast key-value store running in RAM. Used for two vital jobs: caching dashboard monitor queries and powering the BullMQ task queue. |
| **BullMQ** | Background Job Queue | Manages recurring cron-style ping jobs. Distributes workload so heavy network requests never block the main Express server thread. |
| **Zod** | Schema Validation | Validates incoming user inputs (names, email formats, password lengths, valid URL formats) before execution reaches business logic. |
| **Docker & Docker Compose** | Infrastructure & DevOps | Spins up PostgreSQL and Redis with a single command (`docker compose up -d`) without requiring complex manual database installations on your computer. |

---

## 4. How PulseWatch Works (Architecture & Data Flow)

Here is the architectural overview showing how data travels between the Next.js frontend, the Express API, Redis, PostgreSQL, and monitored external websites:

```text
========================================================================================
                                 PULSEWATCH ARCHITECTURE
========================================================================================

 [ USER'S BROWSER ]               [ EXPRESS API SERVER ]             [ STORAGE & QUEUES ]
  Next.js (Port 3000)              Node.js (Port 5000)                Docker Containers
+--------------------+           +---------------------+           +--------------------+
|  Login / Register  | --------> |  auth.js Router     | --------> |  PostgreSQL        |
|  - JWT stored in   |   POST    |  - bcrypt hash check|  SELECT   |  - users table     |
|    localStorage    |           |  - signs JWT token  |           |                    |
+--------------------+           +---------------------+           +--------------------+
          |                                 |
          | Auth Bearer Header              |
          v                                 v
+--------------------+           +---------------------+           +--------------------+
|  Dashboard Page    | --------> |  monitors.js Router | ----+---> |  Redis Cache (RAM) |
|  - View monitors   |   GET     |  - Checks Redis 1st |  Hit?     |  - monitors:userId |
|  - Add URL form    |           |  - Miss? Queries DB |           +--------------------+
+--------------------+           +---------------------+                     |
          |                                 | Cache Miss                     |
          | Add URL (POST)                  +--------------------------------+
          v                                 |
+--------------------+                      v
|  Submit New URL    | --------> [ 1. Save to PostgreSQL 'monitors' table ]
+--------------------+           [ 2. Evict Redis key 'monitors:userId'    ]
                                 [ 3. Register repeating job in BullMQ     ]
                                                    |
                                                    v
========================================================================================
                          BACKGROUND WORKER PING EXECUTION FLOW
========================================================================================

     [ BullMQ Scheduler in Redis ]
                  |
                  | Fires every 60 seconds
                  v
         [ pingWorker Process ]
                  |
                  +---> 1. Send HTTP GET request via axios (timeout: 5000ms)
                  |        URL: https://example.com
                  |
                  +---> 2. Measure elapsed time (Date.now() - startTime)
                  |        Result: UP (200 OK, 120ms) OR DOWN (Timeout/Error)
                  |
                  +---> 3. Insert record into PostgreSQL 'Heartbeats' table
                  |
                  +---> 4. Update 'status' & 'lastResponseTime' in 'Monitors' table
                  |
                  +---> 5. Invalidate user's Redis cache key (redis.del)
                           (Ensures the next dashboard refresh shows latest data)
```

---

## 5. Key Engineering Concepts Explained Simply

### Concept 1: Decoupled Background Workers (Why BullMQ is Essential)
- **The Problem**: Node.js is single-threaded. If an Express route tried to ping 20 external websites directly inside an HTTP handler, each request could wait 5 seconds for a timeout. The user's browser would freeze for up to 100 seconds!
- **The Solution**: The Express route only inserts the monitor record into the database and registers a lightweight job definition with **BullMQ**. A separate, background worker process executes the ping independently. The HTTP request finishes in 10ms, while pings execute smoothly behind the scenes.

### Concept 2: The Cache-Aside Pattern (Why Redis is So Fast)
- **The Problem**: Every time a user reloads their dashboard, querying PostgreSQL on disk creates unnecessary I/O overhead.
- **The Solution**: 
  1. The API checks Redis RAM first for the key `monitors:<userId>`.
  2. If found (**Cache Hit**), the data is returned in under **1 millisecond**.
  3. If missing (**Cache Miss**), the server queries PostgreSQL, saves the result into Redis with a 30-second expiration (`TTL`), and returns the data.
  4. Whenever a monitor is added, toggled, or deleted, the server immediately deletes the cached key (`redis.del`), guaranteeing that users never see stale data.

### Concept 3: Docker Containerization
- **The Problem**: Installing PostgreSQL and Redis natively on Windows, macOS, or Linux requires separate installer wizards, background services, port conflicts, and varying system configurations.
- **The Solution**: With **Docker Compose**, running `docker compose up -d` spins up identical, isolated PostgreSQL (port 5432) and Redis (port 6379) containers with zero configuration headaches.

### Concept 4: Stateless JWT Authentication
- **The Problem**: Traditional session-based authentication requires the backend server to store active session IDs in server memory or a database table, requiring constant session table lookups.
- **The Solution**: JSON Web Tokens (**JWT**) are digitally signed using a secret key. Once the user logs in, the backend issues an encrypted token containing their `id` and `email`. The frontend stores this token in `localStorage` and attaches it to every request header (`Authorization: Bearer <token>`). The server verifies the cryptographic signature instantly without querying a session database.

### Concept 5: Relational Integrity & Cascade Deletions
- **The Problem**: If a user is deleted or a monitor is removed, orphan heartbeat ping records might stay behind in the database forever, consuming unnecessary disk space.
- **The Solution**: Sequelize models define explicit foreign keys with `onDelete: 'CASCADE'`. When a monitor is deleted, PostgreSQL automatically removes all associated heartbeat ping records instantaneously.

### Concept 6: Runtime Schema Validation with Zod
- **The Problem**: Malformed inputs (e.g., an invalid URL like `not-a-link`, or an empty password) can cause database errors or crash backend workers.
- **The Solution**: **Zod** parses and validates request payloads right at the route boundary. If the payload doesn't match the required schema, Zod immediately returns an informative HTTP 400 error message before any business logic executes.

---

## 6. Database Schema (PostgreSQL & Sequelize)

PulseWatch uses three relational models linked by foreign keys:

```text
  +------------------+
  |      Users       |
  +------------------+
  | id (PK)          |
  | name             |
  | email (Unique)   |
  | password (Hash)  |
  +------------------+
           |
           | 1-to-Many (One User has Many Monitors)
           v
  +--------------------+
  |      Monitors      |
  +--------------------+
  | id (PK)            |
  | userId (FK)        | --------> CASCADE on User delete
  | name               |
  | url                |
  | status             | --------> 'UP', 'DOWN', or 'PENDING'
  | lastResponseTime   | --------> Integer (milliseconds)
  | isActive           | --------> Boolean (true / false)
  +--------------------+
           |
           | 1-to-Many (One Monitor has Many Heartbeats)
           v
  +--------------------+
  |     Heartbeats     |
  +--------------------+
  | id (PK)            |
  | monitorId (FK)     | --------> CASCADE on Monitor delete
  | status             | --------> 'UP' or 'DOWN'
  | responseTime       | --------> Integer (milliseconds)
  | checkedAt          | --------> Timestamp (NOW)
  +--------------------+
```

---

## 7. REST API Endpoints Specification

All endpoints under `/api/monitors` and `/api/auth/me` require the `Authorization: Bearer <token>` header.

| Method | Endpoint | Protection | Description | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Server health & operational status | `200 OK` |
| `POST` | `/api/auth/register` | Public | Register new user account with hashed password | `201 Created` (`token`, `user`) |
| `POST` | `/api/auth/login` | Public | Authenticate user credentials & issue JWT | `200 OK` (`token`, `user`) |
| `GET` | `/api/auth/me` | Protected | Fetch current logged-in user profile | `200 OK` (`user`) |
| `GET` | `/api/monitors` | Protected | List all user monitors (uses Redis Cache) | `200 OK` (`cached`, `monitors`) |
| `POST` | `/api/monitors` | Protected | Create new monitor & register BullMQ ping schedule | `201 Created` (`monitor`) |
| `PATCH` | `/api/monitors/:id/toggle` | Protected | Pause or resume recurring pings for a monitor | `200 OK` (`isActive`) |
| `DELETE` | `/api/monitors/:id` | Protected | Delete monitor, remove ping schedule & purge cache | `200 OK` (`message`) |
| `GET` | `/api/monitors/:id/heartbeats` | Protected | Get latest 50 ping logs for latency reports | `200 OK` (`heartbeats`) |

---

## 8. Project Directory Structure

PulseWatch is organized into two clean, self-contained directories:

```text
the-product-engineer/
├── backend/
│   ├── docker-compose.yml          # Starts PostgreSQL & Redis containers
│   ├── package.json                # Express, Sequelize, BullMQ, ioredis, Zod
│   ├── .env                        # Local environment variables
│   ├── .env.example                # Template configuration
│   └── src/
│       ├── app.js                  # Express bootstrap, middlewares & error handling
│       ├── auth.js                 # JWT verification middleware
│       ├── db.js                   # Sequelize connection, models & associations
│       ├── queue.js                # BullMQ queue & background worker logic
│       ├── redis.js                # ioredis client instance
│       └── routes/
│           ├── auth.js             # User registration & login routes
│           └── monitors.js         # Monitor CRUD, caching & heartbeat routes
└── frontend/
    ├── package.json                # Next.js 16, React 19
    ├── jsconfig.json               # Absolute import path mappings
    ├── lib/
    │   └── api.js                  # Centralized fetch API client & auth tokens
    └── app/
        ├── layout.js               # Root layout & page metadata
        ├── globals.css             # Vanilla CSS design system & variables
        ├── page.js                 # Landing hero page (auto-redirects if logged in)
        ├── login/
        │   └── page.js             # User login form
        ├── register/
        │   └── page.js             # User registration form
        └── dashboard/
            └── page.js             # Monitoring dashboard, metrics & history modal
```

---

## 9. Quick Start Guide

### Step 1: Start Infrastructure Containers
From the `backend/` directory, launch PostgreSQL and Redis in the background:
```bash
cd backend
docker compose up -d
```
Verify they are running:
```bash
docker compose ps
```

### Step 2: Start the Express Backend
Install dependencies and run the server with nodemon auto-reloading:
```bash
cd backend
npm install
npm run dev
```
- API Server: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

### Step 3: Start the Next.js Frontend
In a new terminal window, navigate to `frontend/`:
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:3000`

---

## 10. Ready to Build?

Explore our in-depth, step-by-step master guides to build each part from scratch with full code explanations:

- 🚀 **[PulseWatch Backend Master Guide](./backend/)**
- 🎨 **[PulseWatch Frontend Master Guide](./frontend/)**
