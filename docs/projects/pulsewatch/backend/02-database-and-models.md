---
title: "02. Database Connection & Sequelize Models"
description: "Connect to PostgreSQL using Sequelize ORM, create User, Monitor, and Heartbeat models, configure relationships, and enable automatic schema synchronization."
---

# 02. Database Connection & Sequelize Models 🗄️

In this chapter, we will connect our Node.js application to PostgreSQL using **Sequelize ORM** and define the core database schema. 

Instead of scattering models across multiple nested folders, everything is neatly organized inside a single file: `src/db.js`. This allows beginners to see the entire relational schema, fields, and associations in one clear view.

---

## 1. Complete Source Code: `src/db.js`

Create `src/db.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Database & Models (db.js) - Super Simple All-in-One
// ==============================================================================
// Instead of splitting models across multiple files, everything is kept here
// so students can easily see the whole database structure in one place.
// ==============================================================================

import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';

// 1. Connect to PostgreSQL
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'pulsewatch_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false // Keep terminal clean
  }
);

// 2. User Model (stores registered accounts)
export const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
});

// 3. Monitor Model (stores websites being monitored)
export const Monitor = sequelize.define('Monitor', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'PENDING' }, // UP, DOWN, PENDING
  lastResponseTime: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// 4. Heartbeat Model (historical ping logs for graphs)
export const Heartbeat = sequelize.define('Heartbeat', {
  monitorId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  responseTime: { type: DataTypes.INTEGER, defaultValue: 0 },
  checkedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

// 5. Relationships (Associations)
// User has many Monitors
User.hasMany(Monitor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Monitor.belongsTo(User, { foreignKey: 'userId' });

// Monitor has many Heartbeats
Monitor.hasMany(Heartbeat, { foreignKey: 'monitorId', onDelete: 'CASCADE' });
Heartbeat.belongsTo(Monitor, { foreignKey: 'monitorId' });

// 6. Connect & sync helper
export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Automatically creates tables
    console.log('✅ PostgreSQL connected & tables synced');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
  }
}
```

---

## 2. In-Depth Code Explanation

Let's dissect the 6 sections of `db.js` so you understand how every line functions.

### Step 1: Connecting to PostgreSQL
```javascript
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'pulsewatch_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);
```
- **`new Sequelize(...)`**: Initializes a connection pool to our PostgreSQL database running in Docker.
- **`dialect: 'postgres'`**: Instructs Sequelize to use PostgreSQL SQL syntax.
- **`logging: false`**: By default, Sequelize prints every raw `SELECT`, `INSERT`, and `CREATE TABLE` query to the terminal. Disabling logging keeps the output tidy so you can see your application logs clearly.

---

### Step 2: The `User` Model
```javascript
export const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false }
});
```
- **`unique: true` on `email`**: Ensures no two users can register with the same email address. PostgreSQL automatically creates a unique index on this column.
- **`password`**: Stores the cryptographic bcrypt hash, never plaintext!
- By default, Sequelize automatically creates `id`, `createdAt`, and `updatedAt` columns.

---

### Step 3: The `Monitor` Model
```javascript
export const Monitor = sequelize.define('Monitor', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'PENDING' },
  lastResponseTime: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});
```
- **`userId`**: A foreign key identifying which registered user owns this monitor.
- **`status`**: Can have three values:
  - `'PENDING'`: Default state when newly created, waiting for its very first health check.
  - `'UP'`: The monitored URL responded successfully with an HTTP status code.
  - `'DOWN'`: The ping failed (connection refused, DNS error, or timed out).
- **`lastResponseTime`**: Stores the round-trip latency in milliseconds (e.g., `42` ms).
- **`isActive`**: When set to `false` (paused), background jobs are removed from the queue so no pings are sent.

---

### Step 4: The `Heartbeat` Model
```javascript
export const Heartbeat = sequelize.define('Heartbeat', {
  monitorId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  responseTime: { type: DataTypes.INTEGER, defaultValue: 0 },
  checkedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});
```
- A **heartbeat** is an individual ping snapshot.
- Every 60 seconds, when the worker pings a website, a new `Heartbeat` record is inserted into this table.
- **`{ timestamps: false }`**: Since we store `checkedAt` explicitly, we don't need Sequelize to generate automatic `createdAt` and `updatedAt` timestamps.

---

### Step 5: Defining Relationships & Cascading Deletes
```javascript
// User has many Monitors
User.hasMany(Monitor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Monitor.belongsTo(User, { foreignKey: 'userId' });

// Monitor has many Heartbeats
Monitor.hasMany(Heartbeat, { foreignKey: 'monitorId', onDelete: 'CASCADE' });
Heartbeat.belongsTo(Monitor, { foreignKey: 'monitorId' });
```
- **1-to-Many Association**: One `User` can monitor multiple websites. One `Monitor` accumulates hundreds of historical `Heartbeat` records.
- **`onDelete: 'CASCADE'`**: If a user deletes a monitor from their dashboard, PostgreSQL automatically removes all associated heartbeats from the database. This guarantees database hygiene and prevents orphaned records.

---

### Step 6: `connectDB()` and Automatic Schema Migration
```javascript
export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('✅ PostgreSQL connected & tables synced');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
  }
}
```
- **`sequelize.authenticate()`**: Verifies that the connection credentials and port are correct by running a quick handshake query.
- **`sequelize.sync({ alter: true })`**: Automatically inspects PostgreSQL, creates any missing tables, and adds newly defined columns without wiping existing rows!

---

🎉 **Database models are ready!** Proceed to **[Chapter 3: Redis Connection & BullMQ Background Worker](./03-redis-and-bullmq-worker.md)**.
