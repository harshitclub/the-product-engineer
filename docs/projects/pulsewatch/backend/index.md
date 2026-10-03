---
title: "PulseWatch Backend Master Guide"
description: "A complete, beginner-friendly step-by-step guide to building the PulseWatch backend with Node.js, Express, Sequelize, PostgreSQL, Redis, BullMQ, and Zod."
---

# PulseWatch Backend Master Guide 🚀

Welcome to the **PulseWatch Backend Engineering Guide**! In this comprehensive track, you will learn how to build a high-performance, production-ready website uptime and health monitoring engine from scratch.

Every single line of code in this guide comes directly from the official working `backend` codebase. Follow these step-by-step chapters to understand every backend concept, copy the exact code, and build your own monitoring server.

---

## 📚 Backend Curriculum & Step-by-Step Chapters

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      PULSEWATCH BACKEND ROADMAP                        │
 ├────────────────────────────────────────────────────────────────────────┤
 │  01. Architecture & Setup  --> package.json, Docker & Environment      │
 │  02. Database & Models     --> Sequelize ORM, Users, Monitors & Logs   │
 │  03. Redis & BullMQ Worker --> ioredis, Task Queue & 60s Health Pinger │
 │  04. Auth & JWT Middleware --> Password Hashing, JWT & Inline Zod      │
 │  05. Monitor CRUD & Cache  --> Redis Cache-Aside & Heartbeat History   │
 │  06. Server & Testing      --> Express Lifecycle, Startup & cURL Tests │
 └────────────────────────────────────────────────────────────────────────┘
```

| Chapter | Title | What You Will Learn |
| :--- | :--- | :--- |
| **[Chapter 1](./01-architecture-and-setup.md)** | **Architecture & Docker Setup** | Backend file tree, `package.json` dependencies breakdown, `.env` configuration, and Docker Compose setup for PostgreSQL & Redis. |
| **[Chapter 2](./02-database-and-models.md)** | **Database & Sequelize Models** | Connecting to PostgreSQL with Sequelize, building `User`, `Monitor`, and `Heartbeat` models, and configuring cascading relationships. |
| **[Chapter 3](./03-redis-and-bullmq-worker.md)** | **Redis & BullMQ Background Worker** | Configuring `ioredis`, creating the `pings` queue, scheduling recurring 60s jobs, pinging websites with `axios`, and auto-updating monitor latency. |
| **[Chapter 4](./04-auth-and-jwt.md)** | **Authentication & JWT Middleware** | Writing the JWT verification middleware (`auth.js`), hashing passwords with `bcryptjs`, and building registration & login endpoints with inline Zod validation. |
| **[Chapter 5](./05-monitor-routes-and-caching.md)** | **Monitor Routes & Redis Caching** | Building the monitor controller routes with Redis Cache-Aside (`GET /api/monitors`), cache invalidation (`POST`), pause/resume toggle, deletion, and heartbeat logs. |
| **[Chapter 6](./06-server-and-testing.md)** | **Server Bootstrap & API Testing** | Assembling `src/app.js` with CORS, Morgan logging, 404 and 500 error handlers, database table sync, and verifying all routes with cURL commands. |

---

## 🎯 What Makes This Backend Special?

1. **True Asynchronous Decoupling**: External website pings never run inside the HTTP request loop. BullMQ and Redis handle repeating checks independently, keeping API response times under 10ms.
2. **Sub-Millisecond Dashboard Caching**: Implements the **Cache-Aside Pattern**. Monitor lists are cached in Redis RAM for 30 seconds and purged immediately whenever changes occur.
3. **All-in-One Model Architecture**: Models and relationships are defined cleanly in a single `db.js` file, allowing beginners to easily visualize the entire relational data model in one glance.
4. **Resilient Error Handling**: Features comprehensive try-catch wrappers, timeout protections (5-second axios ping timeout), and centralized Express error handling so the server never crashes unexpectedly.

👉 **Ready to begin? Start with [Chapter 1: Architecture, Dependencies & Docker Setup](./01-architecture-and-setup.md)!**
