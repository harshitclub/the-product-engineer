---
title: "02. API Service Layer & Fetching"
description: "Build the centralized API client in services/api.js, understand async/await, disable fetch caching with cache: 'no-store', and handle HTTP errors."
---

# 02. API Service Layer & Fetching 🌐

In a professional React application, you should **never scatter raw `fetch()` calls across multiple components**. Instead, we encapsulate all network calls in a centralized service module: `services/api.js`.

---

## 1. The API Service Code (`services/api.js`)

Create `services/api.js`:

```javascript
/**
 * API Service Helper
 * Functions to send HTTP requests to our Node.js/Express backend.
 */

// Base URL of the backend API (defaults to http://localhost:5000)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  // 1. Check if backend server is online
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`, { cache: 'no-store' });
      return response.ok;
    } catch {
      return false; // Server is unreachable
    }
  },

  // 2. Fetch all shortened links
  async getLinks() {
    const response = await fetch(`${API_URL}/api/links`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load links from server.');
    }
    return response.json();
  },

  // 3. Create a new short link
  async createLink({ url, customCode, title }) {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, customCode, title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create link.');
    }

    return data;
  },

  // 4. Fetch analytics for a specific link
  async getAnalytics(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}/analytics`, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to load analytics.');
    }

    return data;
  },

  // 5. Delete a link
  async deleteLink(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete link.');
    }

    return data;
  },

  // Helper to get the full redirect URL (e.g. http://localhost:5000/sale)
  getShortUrl(shortCode) {
    return `${API_URL}/${shortCode}`;
  },
};
```

---

## 2. JavaScript & Next.js Concepts Explained

### 1. `process.env.NEXT_PUBLIC_API_URL`
In Next.js, environment variables that begin with `NEXT_PUBLIC_` are safely exposed to the client-side browser bundle.
- In local development, if no variable is set, it defaults to `'http://localhost:5000'`.
- In production, you can set `NEXT_PUBLIC_API_URL=https://api.yourdomain.com`.

### 2. `async` / `await`
JavaScript runs on a single thread. When requesting data over the network, `fetch()` returns a **Promise**. The `await` keyword pauses the execution of that async function until the server sends back a response, without freezing the browser UI.

### 3. `{ cache: 'no-store' }`
By default, Next.js aggressive caching might cache API responses. In our real-time analytics dashboard, when a link is clicked, we want the latest click counts immediately! Adding `{ cache: 'no-store' }` tells the browser and Next.js to **always fetch fresh data directly from the server**.

### 4. `response.ok` & Error Handling
- `response.ok` is a built-in boolean that is `true` if the HTTP status code is between `200` and `299`.
- If the status is `400 Bad Request` or `500 Server Error`, `response.ok` is `false`. We parse `const data = await response.json()` and throw a JavaScript `Error(data.message)` containing the exact error message from our backend Zod validator!

### 5. `JSON.stringify()` & Request Headers
When sending a `POST` request with JSON data:
- `headers: { 'Content-Type': 'application/json' }`: Informs Express to parse the incoming request body as JSON with `express.json()`.
- `body: JSON.stringify({...})`: Converts our JavaScript object into a JSON string sent across the network.

---

👉 **Next Step:** Continue to **[Chapter 3: Core UI Components](./03-components-and-forms.md)** to build the Navbar, Link Creation Form, and Link Card components!
