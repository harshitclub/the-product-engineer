# 3. Data Fetching, Dynamic Rendering & Route Handlers

> Learn how Next.js lets you write direct `async/await` queries inside components, style them with pure CSS, master static and dynamic caching, and build backend REST APIs with Route Handlers.

---

## 1. The Magic of Direct Async Server Components

In traditional client-side React, fetching data was notorious for requiring tons of boilerplate code: you needed `useState` to store the data, another `useState` for loading state, a third `useState` for error handling, and a `useEffect` hook with dependency arrays.

In modern Next.js Server Components, fetching data is as simple as writing a standard JavaScript `async` function:

```jsx
// app/users/page.js
// This is an async Server Component!

export default async function UsersPage() {
  // 1. Fetch data directly inside your component function
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return (
    <main className="users-page">
      <h1 className="page-heading">Team Directory</h1>

      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">{user.email}</p>
            <span className="user-company">{user.company.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
```

```css
/* Pure CSS in app/globals.css */
.users-page {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

.page-heading {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--text-main);
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.user-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.user-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.user-email {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
}

.user-company {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4f46e5;
  background-color: #eef2ff;
  padding: 2px 8px;
  border-radius: 4px;
}
```

### Why is This Such a Massive Upgrade?
1. **Zero Client Waterfalls:** The data is fetched on your fast server or cloud network before HTML is sent. The browser receives fully populated HTML on the very first byte!
2. **No Loading Flickers:** The user doesn't see a blank card that suddenly pops into view 2 seconds later.
3. **No Secret Leaks:** If your API requires a private token (`Authorization: Bearer SECRET_KEY`), it stays on the server. The user's browser never sees your API keys!

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **Async/Await & Promises:** Using `async` on the component function allows the `await` keyword to pause execution until the HTTP Promise resolves.
2. **Native `fetch()` API:** Uses the standard Web Fetch API built right into modern Node.js and web browsers.
3. **Array `.map()` Transformation:** Transforming an array of user objects into an array of JSX elements:
   ```javascript
   users.map(user => <div key={user.id}>{user.name}</div>)
   ```
4. **React `key` Prop:** Providing a unique identifier (`key={user.id}`) so the reconciliation engine can track list items efficiently.

---

### 🔄 How We Had to Do This in Vanilla JavaScript & Old React

Let's look at the sheer amount of manual labor required before this existed:

#### In Vanilla JavaScript:
```javascript
// Vanilla JS (Imperative DOM Creation)
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#users-list');
  const spinner = document.querySelector('#spinner');

  spinner.style.display = 'block';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) throw new Error('Network failed');
      return response.json();
    })
    .then(users => {
      spinner.style.display = 'none';

      // Manually construct DOM nodes line-by-line
      users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';

        const nameHeading = document.createElement('h3');
        nameHeading.textContent = user.name;

        const emailParagraph = document.createElement('p');
        emailParagraph.textContent = user.email;

        card.appendChild(nameHeading);
        card.appendChild(emailParagraph);
        container.appendChild(card);
      });
    })
    .catch(error => {
      spinner.style.display = 'none';
      container.innerHTML = `<p class="error">Failed to load users: ${error.message}</p>`;
    });
});
```

#### In Classic React (Client SPA with Vite / CRA):
```jsx
// Classic React: 25+ lines of state & effect boilerplate!
import { useState, useEffect } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Easy to forget dependencies or cause infinite re-render loops!

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}
```

*In modern Next.js, all of that boilerplate vanishes into clean lines of direct `await fetch()`!*

---

## 2. Rendering Paradigms: Static vs. Dynamic vs. Revalidation

Next.js gives you granular control over how and when pages are compiled:

```text
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             RENDERING STRATEGIES                                 │
│                                                                                  │
│   1. STATIC (SSG)                2. DYNAMIC (SSR)         3. REVALIDATED (ISR)   │
│   Rendered at BUILD TIME         Rendered PER REQUEST     Cached with a TTL      │
│   • Superfast (CDN cached)       • Real-time data         • Best of both worlds  │
│   • Perfect for blogs & docs     • Personal dashboards    • Re-builds in BG      │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Strategy 1: Static Rendering (Default for static content)
If a route fetches data that doesn't change frequently (like marketing pages or blog posts), Next.js pre-renders the entire HTML page at **build time** (`npm run build`).
* When visitors access the page, it is delivered instantly from a Global Content Delivery Network (CDN) in under 30 milliseconds!

---

### Strategy 2: Dynamic Rendering (On-Demand)
If your page relies on information specific to the current user (such as reading request cookies, authentication headers, or search params):
* Next.js automatically switches to **Dynamic Rendering**.
* The HTML is generated fresh on the server for each incoming request.

You can force a route to always be dynamically rendered on every request:
```javascript
export const dynamic = 'force-dynamic';
```

---

### Strategy 3: Time-Based Revalidation (Incremental Static Regeneration - ISR)
What if you have an e-commerce catalog or news site? You want the blazing speed of static caching, but you want product prices to update periodically without rebuilding the entire website.

You simply pass a `revalidate` time (in seconds) to `fetch()`:

```jsx
// Re-fetch and update the cache at most once every 60 seconds!
const res = await fetch('https://api.example.com/products', {
  next: { revalidate: 60 }
});
const products = await res.json();
```

#### How ISR Works Behind the Scenes:
1. **First Request:** Serves the cached static page instantly.
2. **Requests within 60 seconds:** All users get the ultra-fast cached page.
3. **Request after 60 seconds:** Next.js serves the cached page to the user immediately, but silently triggers a background regeneration to fetch fresh data. Once updated, subsequent users see the fresh data!

---

## 3. Pre-Rendering Dynamic Routes: `generateStaticParams`

Earlier in Chapter 1, we learned about dynamic routes like `app/blog/[slug]/page.js`.  
By default, dynamic routes are rendered on-demand. But what if you want all 50 blog posts to be pre-rendered into static HTML at build time for maximum speed and SEO?

You export a special function named **`generateStaticParams`**:

```jsx
// app/blog/[slug]/page.js

// 1. Tell Next.js which slugs to pre-bake at build time!
export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();

  // Return an array of objects matching your route parameter: [{ slug: '1' }, { slug: '2' }]
  return posts.map((post) => ({
    slug: String(post.id),
  }));
}

// 2. The page component receives the params
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return (
    <article className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-body">{post.body}</p>
    </article>
  );
}
```

```css
/* Pure CSS */
.post-container {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

.post-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-transform: capitalize;
  color: #0f172a;
}

.post-body {
  margin-top: 20px;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #334155;
}
```

When you run `npm run build`, Next.js will generate static HTML files for all 5 posts in advance!

---

## 4. Route Handlers: Building Backend APIs in Next.js

Did you know Next.js can act as your complete backend API? You don't need a separate Express.js server to build REST endpoints!

In the App Router, backend endpoints are called **Route Handlers**. They are created by placing a `route.js` file inside your `app/` folder.

```text
app/
└── api/
    └── products/
        └── route.js     -->  Accessible at: example.com/api/products
```

### Writing a GET & POST Route Handler (`app/api/products/route.js`)

```javascript
// app/api/products/route.js
import { NextResponse } from 'next/server';

// Simulated database
let products = [
  { id: 1, name: 'Ergonomic Mechanical Keyboard', price: 149 },
  { id: 2, name: 'Precision Wireless Mouse', price: 79 },
];

// GET: Handle HTTP GET requests
export async function GET(request) {
  // Read optional query parameters: /api/products?search=keyboard
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  if (query) {
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json(filtered);
  }

  return NextResponse.json(products);
}

// POST: Handle HTTP POST requests (Creating new product)
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: 'Name and price are required.' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: products.length + 1,
      name: body.name,
      price: Number(body.price),
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 500 }
    );
  }
}
```

You can test this endpoint right from your terminal:

```bash
# Fetch all products
curl http://localhost:3000/api/products

# Create a product
curl -X POST http://localhost:3000/api/products -H "Content-Type: application/json" -d "{\"name\":\"4K Ultra Monitor\",\"price\":399}"
```

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **Web Standard `Request` & `Response` Objects:** Next.js Route Handlers use the modern web standard `Request` object (`await request.json()`, `request.url`).
2. **Named Exports for HTTP Verbs:** Exporting functions named `GET`, `POST`, `PUT`, `PATCH`, or `DELETE` matches the corresponding HTTP protocol method.
3. **URL Object Parsing:** Using `new URL(request.url)` to extract `searchParams` cleanly.

---

### 🔄 How We Had to Do This in Plain Node.js

Before Next.js unified frontend and backend, you had to maintain a completely separate Express.js server:

```javascript
// Old way: Separate server.js running on another port (e.g. port 5000)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // CORS headaches!
app.use(express.json());

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(5000, () => console.log('Server running on 5000'));
```

#### The Pain Points of Separate Backends:
1. **CORS (Cross-Origin Resource Sharing) Nightmares:** Browsers block requests between different ports (`localhost:3000` calling `localhost:5000`) unless you properly configure CORS headers.
2. **Double Deployment:** You had to deploy your frontend to one service (like Vercel/Netlify) and your backend to another (like Heroku/AWS/Render), doubling configuration time and hosting costs.
3. **Zero Shared Types or Logic:** You couldn't easily share validation schemas or TypeScript types between frontend and backend.

With Next.js, your frontend and backend live harmoniously in **one single project**!

---

## Chapter 3 Summary & Next Steps

In this chapter, you learned:
1. How to fetch data directly inside Server Components using simple `await fetch()` and style cleanly with **Pure CSS**.
2. How to avoid loading waterfalls, flickers, and leaked API secrets.
3. The difference between **Static Rendering (SSG)**, **Dynamic Rendering (SSR)**, and **Revalidation (ISR)**.
4. How `generateStaticParams` pre-builds dynamic routes into static HTML.
5. How to build full backend REST APIs inside `app/api/.../route.js`.

Now let's explore data mutations, SEO, image optimizations, and build a complete real-world website using pure CSS:  
👉 **[Chapter 4: Server Actions, SEO & Full Project with Pure CSS](./04-mutations-seo-and-production)**!
