# Beginner's Guide: Sequelize with Node.js, Express & Dockerized PostgreSQL

> A super simple, step-by-step guide for absolute beginners. No confusing folders, no complex architecture—just the easiest way to connect **Sequelize** to **PostgreSQL in Docker** and build a simple **Login & Signup** server.

---

## 1. What is Sequelize? (In 1 Minute)

When you write Node.js code, you work with JavaScript **objects**:
```javascript
const user = { name: "Harshit", email: "harshit@gmail.com" };
```

PostgreSQL stores data in **tables with rows and columns**:
```text
┌────┬─────────┬───────────────────┐
│ id │ name    │ email             │
├────┼─────────┼───────────────────┤
│  1 │ Harshit │ harshit@gmail.com │
└────┴─────────┴───────────────────┘
```

**Sequelize** is an **ORM (Object-Relational Mapper)**. It acts as an automatic translator between your JavaScript code and PostgreSQL:
* Instead of writing raw SQL strings like `INSERT INTO users ...`, you just call `User.create({ name: 'Harshit' })`.
* Instead of writing `SELECT * FROM users`, you just call `User.findAll()`.

Sequelize handles writing the SQL and talking to PostgreSQL for you!

```text
  Your Node.js Code                Sequelize                     PostgreSQL
┌──────────────────┐           ┌──────────────┐             ┌──────────────────┐
│  User.create()   │ ────────▶ │ Writes SQL   │ ──────────▶ │ INSERT INTO ...  │
└──────────────────┘           └──────────────┘             └──────────────────┘
```

---

## 2. Step 1: Start PostgreSQL in Docker

Open your terminal (PowerShell, Command Prompt, or Terminal) and run this **one single command**:

```bash
docker run --name my-postgres -e POSTGRES_PASSWORD=mypassword123 -p 5432:5432 -d postgres
```

### What does this command do?
* `--name my-postgres`: Gives our container a friendly name.
* `-e POSTGRES_PASSWORD=mypassword123`: Sets the database password to `mypassword123`.
* `-p 5432:5432`: Opens port `5432` so your Node.js app can talk to it.
* `-d postgres`: Downloads and starts PostgreSQL in the background.

To verify it is running:
```bash
docker ps
```
You will see `my-postgres` running. That's it! Your database is ready.

---

## 3. Step 2: Create Your Node.js Project

Let's create a new folder and install only what we need.

### 1. In your terminal, run:
```bash
mkdir simple-sequelize-auth
cd simple-sequelize-auth
npm init -y
```

### 2. Install the 4 simple packages:
```bash
npm install express sequelize pg bcryptjs
```

| Package | What it does |
| :--- | :--- |
| `express` | Creates our simple web server and API routes (`/signup`, `/login`). |
| `sequelize` | The library that lets us talk to PostgreSQL using JavaScript. |
| `pg` | The underlying PostgreSQL driver that Sequelize uses. |
| `bcryptjs` | Hashes passwords so we never save plain text passwords. |

---

## 4. Minimal Project Structure (Only 2 Files!)

We are **NOT** creating 10 different folders. To keep things crystal clear and easy to understand, our entire project has only **two files**:

```text
simple-sequelize-auth/
├── db.js          <-- 1. Database connection & User model
├── server.js      <-- 2. Express server with Signup, Login & CRUD
└── package.json
```

---

## 5. Step 3: Configure Database & Define Model (`db.js`)

Create a file named `db.js`. 

In this single file, we will:
1. Connect Sequelize to PostgreSQL.
2. Define our `User` model (which creates the `users` table).

```javascript
// db.js
const { Sequelize, DataTypes } = require('sequelize');

// 1. Configure the connection to our Dockerized PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', 'mypassword123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false // Set to true if you want to see raw SQL queries in console
});

// 2. Define the User Model (This will create the "users" table)
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // No two users can have the same email
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users' // Table name in PostgreSQL
});

// 3. Export both sequelize and User so server.js can use them
module.exports = { sequelize, User };
```

### Explanation:
* `new Sequelize('database_name', 'username', 'password', { ... })`: Connects to PostgreSQL running at `localhost:5432`.
* `sequelize.define('User', { ... })`: Tells Sequelize what columns our table should have (`id`, `username`, `email`, `password`).
* `DataTypes.STRING`: Text column (`VARCHAR`).
* `DataTypes.INTEGER`: Number column (`INT`).

---

## 6. Sequelize Basic CRUD Commands (Cheatsheet)

Here are the only commands you need to know to perform CRUD operations (Create, Read, Update, Delete) with Sequelize:

### 1. Create a New Record (INSERT)
```javascript
const newUser = await User.create({
  username: 'harshit',
  email: 'harshit@example.com',
  password: 'hashed_password_here'
});
console.log(newUser.id); // e.g. 1
```

---

### 2. Read Records (SELECT)

#### Find All Users:
```javascript
const users = await User.findAll();
console.log(users); // Array of all user objects
```

#### Find One User by Email:
```javascript
const user = await User.findOne({ 
  where: { email: 'harshit@example.com' } 
});
```

#### Find User by ID (Primary Key):
```javascript
const user = await User.findByPk(1);
```

---

### 3. Update Records (UPDATE)
```javascript
// Change username for user with ID 1
await User.update(
  { username: 'harshit_updated' }, 
  { where: { id: 1 } }
);
```

---

### 4. Delete Records (DELETE)
```javascript
// Delete user with ID 1
await User.destroy({ 
  where: { id: 1 } 
});
```

---

## 7. Step 4: Build Express Server with Login & Signup (`server.js`)

Now create `server.js`. This is where we create our API routes for:
* **Signup** (`POST /signup`)
* **Login** (`POST /login`)
* **Get All Users** (`GET /users`)

```javascript
// server.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./db');

const app = express();
app.use(express.json()); // Allows server to accept JSON in request body

// ==========================================
// 1. SIGNUP ROUTE
// ==========================================
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user filled in all fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if email already exists in PostgreSQL
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered!' });
    }

    // Hash the password so it is secure
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to PostgreSQL using Sequelize create()
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==========================================
// 2. LOGIN ROUTE
// ==========================================
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if inputs are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required!' });
    }

    // Find the user by email using Sequelize findOne()
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Check if the password matches the hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==========================================
// 3. GET ALL USERS (Simple Read CRUD Example)
// ==========================================
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from PostgreSQL
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'createdAt'] // Exclude password!
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==========================================
// 4. START SERVER & SYNC DATABASE
// ==========================================
const startServer = async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL database!');

    // Automatically create the "users" table if it does not exist
    await sequelize.sync();
    console.log('✅ Database synced (users table ready)!');

    // Start listening on Port 5000
    app.listen(5000, () => {
      console.log('🚀 Server is running on http://localhost:5000');
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

startServer();
```

---

## 8. Step 5: Run and Test Everything!

### 1. Start your server:
In your terminal, run:
```bash
node server.js
```

You should see:
```text
✅ Connected to PostgreSQL database!
✅ Database synced (users table ready)!
🚀 Server is running on http://localhost:5000
```

> **What happened?** Sequelize connected to your Docker PostgreSQL, saw that the `users` table did not exist yet, and automatically created it for you!

---

### 2. Test Signup with cURL or Postman

#### Request:
```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"harshit\", \"email\": \"harshit@example.com\", \"password\": \"123456\"}"
```

#### Response:
```json
{
  "message": "User registered successfully!",
  "user": {
    "id": 1,
    "username": "harshit",
    "email": "harshit@example.com"
  }
}
```

---

### 3. Test Login

#### Request:
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"harshit@example.com\", \"password\": \"123456\"}"
```

#### Response:
```json
{
  "message": "Login successful!",
  "user": {
    "id": 1,
    "username": "harshit",
    "email": "harshit@example.com"
  }
}
```

If you type the wrong password:
```json
{
  "message": "Wrong password!"
}
```

---

### 4. Test Get All Users

#### Request:
```bash
curl http://localhost:5000/users
```

#### Response:
```json
[
  {
    "id": 1,
    "username": "harshit",
    "email": "harshit@example.com",
    "createdAt": "2026-09-22T16:30:00.000Z"
  }
]
```

---

## 9. Summary & Quick Recap

| Goal | How we did it |
| :--- | :--- |
| **Run PostgreSQL** | `docker run --name my-postgres -e POSTGRES_PASSWORD=mypassword123 -p 5432:5432 -d postgres` |
| **Connect Database** | `new Sequelize('postgres', 'postgres', 'mypassword123', { host: 'localhost', dialect: 'postgres' })` |
| **Define Table** | `sequelize.define('User', { username: DataTypes.STRING, email: DataTypes.STRING, password: DataTypes.STRING })` |
| **Create Table** | `sequelize.sync()` automatically creates the table in PostgreSQL! |
| **Signup (Insert)** | `User.create({ username, email, password })` |
| **Login (Find)** | `User.findOne({ where: { email } })` + `bcrypt.compare()` |
| **Fetch All (Read)** | `User.findAll()` |
