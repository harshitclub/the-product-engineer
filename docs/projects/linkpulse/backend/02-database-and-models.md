---
title: "02. Database Connection & Sequelize Models"
description: "Configure PostgreSQL connection with Sequelize ORM, define Link and Click models, and establish relational associations with Cascade deletion."
---

# 02. Database Connection & Sequelize Models 🗄️

In this chapter, we will connect our Node.js backend to the **PostgreSQL** database running inside Docker using **Sequelize ORM**, define our two primary data models (`Link` and `Click`), and configure their relational association.

---

## 1. Database Connection Configuration (`src/config/db.js`)

Create the directory `src/config` and add `db.js`:

```javascript
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connect to PostgreSQL database running in Docker
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'linkpulsedb',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false, // Set to true if you want to see raw SQL queries in console
  }
);
```

### Explanation of Options:
- **`new Sequelize(database, username, password, options)`**: Initializes the connection pool to PostgreSQL.
- **`dialect: 'postgres'`**: Tells Sequelize to speak PostgreSQL's specific SQL dialect.
- **`logging: false`**: Keeps your terminal output clean during standard operations. If you want to debug SQL queries, you can switch this to `true` or `console.log`.

---

## 2. The `Link` Model (`src/models/Link.js`)

Create `src/models/Link.js`. This model represents the shortened URL entity.

```javascript
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the "links" table in PostgreSQL
export const Link = sequelize.define('Link', {
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
```

### Breakdown of Model Fields:
1. **`originalUrl`** (`STRING`): The target destination URL where the user will be redirected (e.g., `https://github.com/harshitclub`).
2. **`shortCode`** (`STRING`): The unique key generated for this link (e.g., `sale2026` or `x7K9pQ`). Marked `unique: true` so no two links can have duplicate codes.
3. **`title`** (`STRING`): An optional human-readable title provided by the user (e.g. *"My Portfolio Link"*).

> [!NOTE]
> Sequelize automatically creates `id` (Primary Key, auto-incrementing integer), `createdAt`, and `updatedAt` timestamps for every model by default.

---

## 3. The `Click` Model (`src/models/Click.js`)

Create `src/models/Click.js`. This model records every single visit to a short link for analytics.

```javascript
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the "clicks" table in PostgreSQL (stores each visit for analytics)
export const Click = sequelize.define('Click', {
  linkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
  },
  browser: {
    type: DataTypes.STRING,
  },
  os: {
    type: DataTypes.STRING,
  },
  referrer: {
    type: DataTypes.STRING,
  },
});
```

### Breakdown of Analytics Fields:
1. **`linkId`**: The Foreign Key pointing to the corresponding `Link` record.
2. **`ipAddress`**: The visitor's IP address (anonymized/stored for geo/traffic metrics).
3. **`browser`**: The detected browser name (e.g. `Chrome`, `Safari`, `Firefox`).
4. **`os`**: The detected operating system (e.g. `Windows`, `macOS`, `iOS`, `Android`).
5. **`referrer`**: Where the visitor came from (e.g. `https://twitter.com` or `Direct`).

---

## 4. Model Relationships & Associations (`src/models/index.js`)

In a relational database, **one Link has many Clicks**, and **every Click belongs to one Link**.

Create `src/models/index.js`:

```javascript
import { sequelize } from '../config/db.js';
import { Link } from './Link.js';
import { Click } from './Click.js';

// Define relationship: One Link has Many Clicks
Link.hasMany(Click, { foreignKey: 'linkId', as: 'clicks', onDelete: 'CASCADE' });
Click.belongsTo(Link, { foreignKey: 'linkId', as: 'link' });

export { sequelize, Link, Click };
```

### Why `onDelete: 'CASCADE'` is Critical:
If a user deletes a short link, all associated click analytics records in the `clicks` table will be **automatically cleaned up** by PostgreSQL. This prevents orphaned records and keeps your database clean and performant.

---

## 5. Visual Relational Schema

```text
 ┌──────────────────────────────┐          ┌──────────────────────────────┐
 │          Links Table         │          │         Clicks Table         │
 ├──────────────────────────────┤          ├──────────────────────────────┤
 │ id           (PK, INTEGER)   │◄────┐    │ id           (PK, INTEGER)   │
 │ originalUrl  (VARCHAR)       │     │    │ linkId       (FK, INTEGER)───┘
 │ shortCode    (VARCHAR, UNIQUE│     │    │ ipAddress    (VARCHAR)       │
 │ title        (VARCHAR)       │     │    │ browser      (VARCHAR)       │
 │ createdAt    (TIMESTAMP)     │     └───═│ os           (VARCHAR)       │
 │ updatedAt    (TIMESTAMP)     │ 1 : N    │ referrer     (VARCHAR)       │
 └──────────────────────────────┘          │ createdAt    (TIMESTAMP)     │
                                           └──────────────────────────────┘
```

---

👉 **Next Step:** Continue to **[Chapter 3: Redis Caching & BullMQ Queues](./03-redis-caching-and-queues.md)** to implement sub-2ms caching and asynchronous background analytics!
