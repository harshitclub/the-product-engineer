---
title: "04. Authentication & JWT Middleware"
description: "Implement user authentication with JSON Web Tokens (JWT), password hashing with bcrypt, input validation with Zod, and protected route middlewares."
---

# 04. Authentication & JWT Middleware 🔐

In this chapter, we will build a complete authentication system. Users will be able to register an account, securely log in, receive a cryptographically signed **JSON Web Token (JWT)**, and access protected endpoints.

---

## 1. Authentication Middleware (`src/auth.js`)

Create `src/auth.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Simple JWT Authentication Middleware (auth.js)
// ==============================================================================
// Checks if the user sent a valid token in:
// Authorization: Bearer <token>
// ==============================================================================

import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Please login first (No token)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pulsewatch_secret');
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

### How the Middleware Protects Endpoints
1. Reads the HTTP request header: `Authorization: Bearer eyJhbGciOi...`
2. Checks that the header exists and starts with `Bearer `. If not, halts execution immediately and sends an HTTP 401 response.
3. Decodes the token using `jwt.verify(token, secret)`. If someone tampered with the payload or the token expired, it throws an error caught by the `catch` block.
4. Stores the decoded payload onto the request object (`req.user = decoded`), allowing subsequent controllers to identify the authenticated user (`req.user.id`).
5. Calls `next()` to pass control to the route handler.

---

## 2. Authentication Routes (`src/routes/auth.js`)

Create `src/routes/auth.js` inside your `backend/` directory:

```javascript
// ==============================================================================
// Auth Routes (routes/auth.js) - Simple & Inline Zod
// ==============================================================================
// We do Zod validation directly inside the route function so students can easily
// see what is happening without jumping between 5 different files!
// ==============================================================================

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../db.js';
import auth from '../auth.js';

const router = express.Router();

// 1. Zod schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Register: POST /api/auth/register
router.post('/register', async (req, res) => {
  // Validate request body directly using Zod
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  const { name, email, password } = validation.data;

  // Check if user already exists
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    return res.status(400).json({ error: 'Email is already registered' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({ name, email, password: hashedPassword });

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'pulsewatch_secret',
    { expiresIn: '7d' }
  );

  res.status(201).json({
    message: 'Registered successfully',
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// 2. Zod schema for login
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required')
});

// Login: POST /api/auth/login
router.post('/login', async (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors[0].message });
  }

  const { email, password } = validation.data;

  // Find user
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || 'pulsewatch_secret',
    { expiresIn: '7d' }
  );

  res.json({
    message: 'Logged in successfully',
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// Get Profile: GET /api/auth/me
router.get('/me', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'createdAt']
  });
  res.json({ user });
});

export default router;
```

---

## 3. Key Concepts Explained for Beginners

### 1. Why Validate Inline with Zod?
In large enterprise projects, validators are often separated into multiple middleware files. However, for learning, writing:
```javascript
const validation = registerSchema.safeParse(req.body);
if (!validation.success) {
  return res.status(400).json({ error: validation.error.errors[0].message });
}
```
right inside the route makes the data flow crystal clear:
1. Parse the request body.
2. If invalid, reject immediately with a helpful error message (e.g., `"Password must be at least 6 characters"`).
3. If valid, proceed with sanitized data (`validation.data`).

### 2. Password Hashing with Salt Rounds (`bcrypt.hash`)
We never store raw passwords. Plaintext passwords can be compromised if a database snapshot is leaked.
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```
- The number `10` is the salt work factor.
- It generates a cryptographically random salt and applies repeated SHA hashing rounds so that even if two users have the password `"password123"`, their hashes in PostgreSQL look completely different!

### 3. Password Verification (`bcrypt.compare`)
During login, we never "decrypt" the password (hashes are one-way and cannot be reversed). Instead, `bcrypt.compare(plaintext, hash)` hashes the incoming password using the original salt and checks if the outputs match.

### 4. Token Expiration (`expiresIn: '7d'`)
The generated JWT is valid for 7 days. Once 7 days elapse, `jwt.verify` rejects it, prompting the user to log in again.

---

🎉 **Authentication is complete!** Proceed to **[Chapter 5: Monitor CRUD & Redis Caching](./05-monitor-routes-and-caching.md)**.
