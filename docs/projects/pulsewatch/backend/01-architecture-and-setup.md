---
title: "01. Architecture, Dependencies & Docker Setup"
description: "Set up the PulseWatch backend environment, configure package.json, configure environment variables, and run PostgreSQL and Redis in Docker containers."
---

# 01. Architecture, Dependencies & Docker Setup 🏗️

In this first chapter, we will establish the project structure, configure all required npm dependencies in `package.json`, set up environment variables in `.env`, and launch **PostgreSQL** and **Redis** containers using **Docker Compose**.

---

## 1. Project Directory Structure

Here is the exact file and folder structure of our backend application. Create a directory named `backend` and organize your files like this:

```text
backend/
├── docker-compose.yml          # Runs PostgreSQL & Redis containers in Docker
├── package.json                # Project dependencies, scripts & ES Module flag
├── .env                        # Local secrets and connection strings
├── .env.example                # Example configuration template
└── src/
    ├── db.js                   # Sequelize connection & relational models (Users, Monitors, Heartbeats)
    ├── redis.js                # ioredis client configuration
    ├── queue.js                # BullMQ queue & repeating background ping worker
    ├── auth.js                 # JWT authentication middleware
    ├── routes/
    │   ├── auth.js             # User register, login & profile routes
    │   └── monitors.js         # Monitor CRUD, caching & heartbeat routes
    └── app.js                  # Express bootstrap, middlewares & server entry point
```

---

## 2. Setting Up `package.json`

Create `package.json` in the root of your `backend/` directory:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "PulseWatch Backend - Uptime & Health Monitoring API",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "axios": "^1.20.0",
    "bcryptjs": "^3.0.3",
    "bullmq": "^6.3.11",
    "cors": "^2.8.6",
    "dotenv": "^18.0.5",
    "express": "^5.2.1",
    "ioredis": "^6.0.0",
    "jsonwebtoken": "^9.0.3",
    "morgan": "^1.12.1",
    "pg": "^8.23.1",
    "pg-hstore": "^2.3.4",
    "redis": "^6.3.0",
    "sequelize": "^6.37.8",
    "winston": "^3.19.0",
    "zod": "^4.6.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

### What Each Dependency Does (Explained in Plain English)

| Package | Purpose & Why It Was Chosen |
| :--- | :--- |
| **`"type": "module"`** | Enables modern JavaScript ES Module syntax (`import ... from '...'`) across the entire backend. |
| **`express`** | Fast, unopinionated web framework for Node.js. Listens for HTTP requests and routes them to our controllers. |
| **`sequelize`** | Object-Relational Mapper (ORM) that enables us to define models, relationships, and queries using clean JavaScript methods instead of raw SQL queries. |
| **`pg` & `pg-hstore`** | The PostgreSQL database driver and serializer used by Sequelize under the hood to talk to the database. |
| **`ioredis`** | High-performance Redis client for Node.js. Used for both dashboard caching and as the connection layer for BullMQ. |
| **`bullmq`** | Distributed task and message queue built on Redis. Used to schedule repeating 60-second health check jobs without blocking the main server. |
| **`axios`** | Promise-based HTTP client used by the background worker to ping external website URLs and measure response latency. |
| **`bcryptjs`** | Secure password hashing library that hashes user passwords with cryptographic salts before saving to the database. |
| **`jsonwebtoken`** | Implements JSON Web Tokens (JWT) for stateless, secure user authentication. |
| **`zod`** | TypeScript-first schema declaration and validation library. Inspects request payloads before processing. |
| **`cors`** | Cross-Origin Resource Sharing middleware. Enables the Next.js frontend (on port 3000) to communicate with Express (on port 5000). |
| **`morgan`** | HTTP request logger that prints colored request logs (`GET /api/monitors 200 4ms`) to the terminal during development. |
| **`dotenv`** | Loads environment variables from `.env` into `process.env`. |
| **`nodemon`** | Development tool that automatically restarts the Node server whenever source code files are saved. |

---

## 3. Environment Configuration (`.env`)

Create `.env.example` as a template for documentation:

```env
# Server Configuration
PORT=5000

# Database Configuration (PostgreSQL running in Docker)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pulsewatch_db
DB_USER=postgres
DB_PASSWORD=postgres

# Redis Configuration (Running in Docker)
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Secret for User Authentication
JWT_SECRET=super_secret_pulsewatch_key_12345
```

Now create your active `.env` file with the exact same values:

```bash
cp .env.example .env
```

> [!NOTE]
> Since PostgreSQL and Redis run inside Docker containers with port forwarding to your host machine (`5432:5432` and `6379:6379`), your local Node.js server connects using `DB_HOST=localhost` and `REDIS_HOST=localhost`.

---

## 4. Docker Compose Setup (`docker-compose.yml`)

Instead of manually installing PostgreSQL and Redis services on your computer, we use **Docker Compose**. This ensures that every developer runs the exact same versions in isolated environments.

Create `docker-compose.yml` in the `backend/` directory:

```yaml
# Docker Compose for PulseWatch Local Development (Backend)
# Note: As requested for beginner simplicity, NO persistent volumes are configured here.
# Containers run clean and stateless for easy learning and reset.

services:
  postgres:
    image: postgres:16-alpine
    container_name: pulsewatch_postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pulsewatch_db

  redis:
    image: redis:7-alpine
    container_name: pulsewatch_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
```

### Why This Setup is Great for Beginners
1. **Lightweight Alpine Images**: Uses `postgres:16-alpine` and `redis:7-alpine`, downloading in seconds and consuming minimal system memory.
2. **Stateless Learning Mode**: No complex host volume mappings are required. If you ever want to reset the database and start fresh, simply restart the container.
3. **Port Forwarding**: Maps standard ports directly (`5432` for PostgreSQL and `6379` for Redis) so database GUI tools (like TablePlus, pgAdmin, or DBeaver) can connect directly to `localhost:5432`.

---

## 5. Starting the Containers & Installing Dependencies

Open your terminal in the `backend/` directory and run:

```bash
# 1. Start PostgreSQL and Redis containers in the background
docker compose up -d

# 2. Verify containers are running healthy
docker compose ps
```

You should see output confirming both containers are running:
- `pulsewatch_postgres` on port `0.0.0.0:5432->5432/tcp`
- `pulsewatch_redis` on port `0.0.0.0:6379->6379/tcp`

Next, install all project dependencies:

```bash
npm install
```

---

🎉 **Setup complete!** Proceed to **[Chapter 2: Database & Sequelize Models](./02-database-and-models.md)** to build the database schema and models.
