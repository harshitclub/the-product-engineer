---
title: "05. Full-Stack Run & End-to-End Verification"
description: "Run the complete PulseWatch full-stack application, test all features end-to-end, and troubleshoot common full-stack development issues."
---

# 05. Full-Stack Run & End-to-End Verification 🚀

Congratulations on building both the backend and frontend of **PulseWatch**! 

In this final chapter, we will boot up all pieces of the architecture—**Docker (PostgreSQL & Redis)**, the **Express API**, and the **Next.js frontend**—and walk through a complete end-to-end verification workflow.

---

## 1. Starting the Entire System (3-Terminal Setup)

Open three separate terminal windows to manage each layer:

### Terminal 1: Infrastructure (Docker)
```bash
cd backend
docker compose up -d
docker compose ps
```
Both `pulsewatch_postgres` (port 5432) and `pulsewatch_redis` (port 6379) should report `Up`.

---

### Terminal 2: Express Backend Server
```bash
cd backend
npm run dev
```
Wait until you see:
```text
✅ Redis connected via ioredis
✅ PostgreSQL connected & tables synced
🚀 PulseWatch Server running at http://localhost:5000
```

---

### Terminal 3: Next.js Frontend Dashboard
```bash
cd frontend
npm run dev
```
Wait until you see:
```text
▲ Next.js 16.3.8
- Local:        http://localhost:3000
```

---

## 2. End-to-End Testing Walkthrough

Follow this step-by-step user journey in your browser:

### Step 1: Account Creation
1. Open your browser and navigate to `http://localhost:3000`.
2. Click **Create Free Account** or **Get Started**.
3. Fill in your name, email (`alex@example.com`), and a password (`secret123`).
4. Click **Create Account**.
5. You will be automatically authenticated, the JWT token will be saved in `localStorage`, and you will land on `/dashboard`.

---

### Step 2: Adding a Healthy Website
1. In the **Add Website to Monitor** box:
   - Friendly Name: `GitHub API`
   - URL: `https://api.github.com`
2. Click **Start Monitoring**.
3. Look at your **Terminal 2 (Backend)**. You will see BullMQ and the worker trigger an immediate check:
   ```text
   [Worker] Checked https://api.github.com -> UP (124ms)
   ```
4. On your dashboard, the monitor card will appear with:
   - **🟢 UP** green status badge with glowing dot
   - Latency pill showing response time (e.g. `⏱️ 124ms`)
   - Stats row updating: Total = `1`, Online = `1`, Offline = `0`, Avg Latency = `124 ms`.

---

### Step 3: Verifying Redis In-Memory Caching
1. Click the **🔄 Refresh** button in the dashboard navigation bar.
2. In the top right of the monitors header, notice the badge:
   ```text
   ⚡ Served from Redis Cache
   ```
3. The data was served from RAM in under 1 millisecond without querying PostgreSQL on disk!

---

### Step 4: Adding an Unreachable (Offline) Website
1. Add another monitor with a nonexistent domain:
   - Friendly Name: `Dead Server Test`
   - URL: `https://this-domain-does-not-exist-99999.com`
2. Click **Start Monitoring**.
3. In Terminal 2, axios will attempt to resolve the DNS, fail, and log:
   ```text
   [Worker] Checked https://this-domain-does-not-exist-99999.com -> DOWN (145ms)
   ```
4. In the dashboard, the card will display a **🔴 DOWN** red status badge, and the Offline count will update to `1`.

---

### Step 5: Inspecting Heartbeat History
1. On the `GitHub API` card, click **📊 History**.
2. An overlay modal opens displaying chronological ping records checked every 60 seconds:
   - Status (`🟢 UP`)
   - Latency (`⏱️ 124ms`)
   - Timestamp formatted in your local timezone (`10:45:12 PM`)
3. Click anywhere outside the popup or click **✕** to dismiss the modal.

---

### Step 6: Testing Pause and Delete Controls
1. Click **⏸️ Pause** on any monitor. The button label changes to **▶️ Resume**, and the repeating schedule is removed from BullMQ.
2. Click **🗑️ Delete**. Confirm the browser dialog. The monitor and all its historical heartbeats are removed from PostgreSQL with cascading deletes, and the Redis cache is purged.

---

## 3. Common Troubleshooting Scenarios

| Problem | Root Cause | Solution |
| :--- | :--- | :--- |
| **"Could not connect to backend server"** | The Express API server is not running on port 5000. | In Terminal 2, run `npm run dev` in the `backend/` directory. |
| **"Redis error: ECONNREFUSED"** | Redis Docker container is stopped. | Run `docker compose up -d` in the `backend/` folder and verify with `docker compose ps`. |
| **"PostgreSQL connection error"** | PostgreSQL container is stopped or port 5432 is occupied by a local database. | Stop any local Postgres service or restart containers with `docker compose restart`. |
| **CORS Error in Browser Console** | `app.use(cors())` missing in backend. | Verify that `cors` is imported and mounted before routes in `backend/src/app.js`. |
| **"Please login first (No token)"** | JWT expired or cleared from `localStorage`. | Click **Logout** or visit `/login` to sign in and obtain a fresh token. |

---

## 4. Summary & Architecture Mastery

By completing PulseWatch, you have mastered:
- **Client-Side React 19 State & Effects**: Forms, modals, array transformations (`filter`, `reduce`), and token storage.
- **Node.js & Express REST Architecture**: Routing, middlewares, password hashing, and JWT tokens.
- **Asynchronous Queues with BullMQ**: Offloading slow network I/O to background workers.
- **In-Memory Caching with Redis**: The Cache-Aside pattern and cache invalidation.
- **Relational Modeling with Sequelize**: PostgreSQL models, foreign keys, and cascading deletes.
- **DevOps with Docker Compose**: Running multi-container infrastructure statelessly.

🎉 **You are now a true full-stack product engineer!**
