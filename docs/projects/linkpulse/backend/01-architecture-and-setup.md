---
title: "01. Architecture, Dependencies & Docker Setup"
description: "Set up the LinkPulse backend environment, configure package.json, setup environment variables, and run PostgreSQL and Redis in Docker containers."
---

# 01. Architecture, Dependencies & Docker Setup 🏗️

In this first step, we will set up the project structure, configure all dependencies in `package.json`, set up environment variables, and start **PostgreSQL** and **Redis** using **Docker Compose**.

---

## 1. Project Directory Structure

Here is the exact structure of our backend project. Create a folder named `backend` and organize your files like this:

```text
backend/
├── docker-compose.yml          # Starts PostgreSQL & Redis containers
├── Dockerfile                  # Container image build instructions for Node.js
├── .dockerignore               # Ignores node_modules from Docker build
├── .env                        # Local environment variables (ports, DB passwords)
├── .env.example                # Example template for team members
├── package.json                # Dependencies and start scripts
└── src/
    ├── config/
    │   ├── db.js               # PostgreSQL connection via Sequelize
    │   └── redis.js            # Redis client connection
    ├── models/
    │   ├── Link.js             # Link model definition
    │   ├── Click.js            # Click analytics model definition
    │   └── index.js            # Model associations (Relationships)
    ├── schemas/
    │   └── link.schema.js      # Zod validation schema
    ├── middlewares/
    │   └── rateLimiter.js      # Express rate limiter middleware
    ├── queues/
    │   ├── clickQueue.js       # BullMQ queue producer
    │   └── clickWorker.js      # BullMQ background worker
    ├── controllers/
    │   ├── link.controller.js  # CRUD controller for links
    │   └── redirect.controller.js # Ultra-fast redirect handler
    ├── routes/
    │   ├── link.routes.js      # Routes for /api/links
    │   └── redirect.routes.js  # Route for /:code
    └── server.js               # Express application entry point
```

---

## 2. Setting Up `package.json`

Create `package.json` in the root of your `backend/` directory:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "LinkPulse Backend - URL Shortener & Click Analytics Engine",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "bullmq": "^5.41.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-rate-limit": "^8.7.0",
    "ioredis": "^5.5.0",
    "nanoid": "^5.1.0",
    "pg": "^8.13.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.5",
    "ua-parser-js": "^2.0.2",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

### What Each Package Does (Explained in Plain English)

| Package | Why We Use It |
| :--- | :--- |
| **`"type": "module"`** | Enables modern ES Module imports (`import ... from '...'`) instead of old CommonJS (`require`). |
| **`express`** | The web framework that listens for HTTP requests and routes them to controller functions. |
| **`cors`** | Allows our Next.js frontend running on port 3000 to talk to this backend running on port 5000. |
| **`dotenv`** | Loads secrets and configuration from our `.env` file into `process.env`. |
| **`sequelize` & `pg` & `pg-hstore`** | `sequelize` is the Object-Relational Mapper (ORM) that lets us work with PostgreSQL using JavaScript objects. `pg` is the PostgreSQL driver. |
| **`ioredis`** | Fast and robust Redis client for Node.js. Used for caching and as the engine for BullMQ. |
| **`bullmq`** | Production-ready background queue system. Offloads click tracking so redirects stay instant. |
| **`nanoid`** | Generates secure, compact, unique 6-character short codes (e.g., `x7K9pQ`). |
| **`zod`** | Schema validator that checks user input (e.g. verifying valid URL format). |
| **`ua-parser-js`** | Reads the browser `User-Agent` string to identify the visitor's browser (Chrome, Safari, Firefox) and Operating System (Windows, macOS, Android, iOS). |
| **`express-rate-limit`** | Limits how many requests a single IP can make to prevent denial-of-service spam. |
| **`nodemon`** | Development tool that automatically restarts the server whenever code changes are saved. |

---

## 3. Environment Configuration (`.env`)

Create `.env.example` as a template for documentation:

```env
# Application Port
PORT=5000

# PostgreSQL Database Configuration (running in Docker container 'link_pulse_db')
DB_HOST=localhost
DB_PORT=5432
DB_NAME=linkpulsedb
DB_USER=postgres
DB_PASS=postgres

# Redis In-Memory Cache & Queue Configuration (running in Docker)
REDIS_HOST=localhost
REDIS_PORT=6379

# Client / Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

Now copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

> [!NOTE]
> When running the backend locally while database and Redis run inside Docker, `DB_HOST` and `REDIS_HOST` are both `localhost`.

---

## 4. Docker & Docker Compose Setup

Instead of manually installing PostgreSQL and Redis on your machine, we use **Docker Compose** to run both services in lightweight, isolated containers.

Create `docker-compose.yml` in the `backend/` directory:

```yaml
version: '3.8'

services:
  # PostgreSQL Database Container
  postgres:
    image: postgres:16-alpine
    container_name: link_pulse_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: linkpulsedb
    ports:
      - "5432:5432"

  # Redis In-Memory Cache Container
  redis:
    image: redis:7-alpine
    container_name: link_pulse_redis
    restart: always
    ports:
      - "6379:6379"
```

### Dockerfile & .dockerignore (For Containerizing the Backend)

If you wish to containerize the entire backend application, create `Dockerfile`:

```dockerfile
# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first to take advantage of Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all backend source files into the container
COPY . .

# Expose port 5000 (the port Express listens on)
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
```

And create `.dockerignore`:

```text
node_modules
npm-debug.log
.git
.env
```

---

## 5. Starting the Database & Redis Containers

Run this single command in your terminal to start PostgreSQL and Redis in the background:

```bash
docker compose up -d
```

You can verify that both containers are running healthy with:

```bash
docker ps
```

You will see two running containers:
- `link_pulse_db` listening on port `5432`
- `link_pulse_redis` listening on port `6379`

Next, install all node dependencies:

```bash
npm install
```

---

🎉 **Setup complete!** Now proceed to **[Chapter 2: Database Connection & Sequelize Models](./02-database-and-models.md)** to build the database schema.
