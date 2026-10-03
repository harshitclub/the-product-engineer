---
title: "PulseWatch Project Overview"
description: "PulseWatch full-stack website uptime and health monitoring application documentation and engineering blueprint."
---

# PulseWatch: Full-Stack Website Uptime & Health Monitor 📡

Welcome to the official documentation and engineering guide for **PulseWatch**!

PulseWatch is a real-world, full-stack website uptime and health monitoring service inspired by tools like UptimeRobot, designed specifically to teach full-stack engineering, asynchronous background workers, in-memory caching, and relational database modeling to beginners and students.

---

## 🧭 Navigation & Tracks

Choose a track below to explore the architecture or follow the hands-on code guides:

- **[PulseWatch Overview & Architecture](./overview.md)**: High-level system architecture, data flow diagrams, database schema, REST API endpoints, and core engineering concepts.
- **[PulseWatch Backend Master Guide](./backend/)**: Step-by-step tutorial to build the Node.js, Express, PostgreSQL, Redis, and BullMQ backend from scratch.
- **[PulseWatch Frontend Master Guide](./frontend/)**: Step-by-step tutorial to build the Next.js, React 19, and Vanilla CSS monitoring dashboard.

---

## ⚡ Quick Summary of Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js (App Router, React 19) | Modern component UI, client-side state, form validation, and stats dashboard |
| **Styling** | Vanilla CSS (Flexbox & Variables) | Zero external CSS libraries; clean, accessible, dark-mode design system |
| **Backend** | Node.js & Express.js (ES Modules) | High-performance REST API with authentication and monitor management |
| **Database** | PostgreSQL (Docker) & Sequelize ORM | Relational data persistence with automatic schema synchronization and cascade deletes |
| **In-Memory Cache** | Redis via `ioredis` (Docker) | Sub-millisecond read caching for user dashboard monitors with automatic invalidation |
| **Background Queue** | BullMQ (Powered by Redis) | Decoupled background task scheduler for recurring 60s health pings via `axios` |
| **Authentication** | JWT (`jsonwebtoken`) & `bcryptjs` | Stateless token-based authentication and secure password hashing |
| **Input Validation** | Zod | Runtime schema validation for user registrations, logins, and monitor URLs |
