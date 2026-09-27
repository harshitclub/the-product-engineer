---
title: "04. Input Validation & Security Middlewares"
description: "Implement robust server-side schema validation using Zod and protect your backend against brute-force abuse using express-rate-limit."
---

# 04. Input Validation & Security Middlewares 🛡️

Never trust client input! In this chapter, we create a runtime data validation schema with **Zod** and protect our backend server with an Express **Rate Limiting** middleware.

---

## 1. Why Server-Side Validation is Mandatory

Frontend validation (such as HTML `<input type="url">`) is great for user experience, but it provides **zero security**. Anyone can send malformed or malicious HTTP requests directly using tools like `cURL`, Postman, or automated bots.

By validating all incoming request bodies with **Zod** on the server, we ensure that:
1. Every URL is properly formatted with `http://` or `https://`.
2. Custom short aliases meet minimum length requirements and contain valid characters.
3. Errors return friendly, actionable messages to the client.

---

## 2. Link Validation Schema (`src/schemas/link.schema.js`)

Create `src/schemas/link.schema.js`:

```javascript
import { z } from 'zod';

// Simple validation rules for creating a short link
export const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL (starting with http:// or https://)'),
  customCode: z.string().min(3, 'Custom code must be at least 3 characters').optional().or(z.literal('')),
  title: z.string().optional().or(z.literal('')),
});
```

### Explanation of Rules:
- **`url`**: Must be a valid URL string. If an invalid string like `"not-a-url"` is provided, Zod throws our custom error message: `"Please enter a valid URL (starting with http:// or https://)"`.
- **`customCode`**: Optional. If the user provides a custom alias (e.g., `sale2026`), it must be at least 3 characters. It also permits empty strings (`""`).
- **`title`**: Optional descriptive title string or empty string.

---

## 3. Rate Limiting Middleware (`src/middlewares/rateLimiter.js`)

Rate limiting protects your server from being overwhelmed by spam, scrapers, or Denial-of-Service (DoS) attacks.

Create `src/middlewares/rateLimiter.js`:

```javascript
import rateLimit from 'express-rate-limit';

// Simple rate limiter: limit each IP to 60 requests every 15 minutes
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Maximum 60 requests per 15 minutes per IP
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
```

### How This Works:
- **`windowMs: 15 * 60 * 1000`**: Defines a 15-minute rolling window.
- **`max: 60`**: Allows a maximum of 60 requests per client IP address during this 15-minute timeframe.
- **`standardHeaders: true`**: Returns standard `RateLimit-*` headers in the HTTP response so clients know their remaining quota.
- When an IP exceeds the quota, Express immediately responds with `HTTP 429 Too Many Requests` without executing database or CPU operations.

---

👉 **Next Step:** Continue to **[Chapter 5: Controllers & API Routes](./05-controllers-and-routes.md)** to implement our link operations and high-performance redirect handler!
