# Introduction to Next.js

## What is Next.js?

**Next.js** is an open-source, full-stack React framework created and maintained by Vercel. While standard React is a client-side library for structuring UI components, Next.js provides a production-grade application framework that handles **routing**, **rendering architectures (SSR, SSG, ISR, Streaming)**, **server components**, **data fetching & caching**, and **asset optimization** out of the box.

Next.js is the industry standard for production React development, powering enterprise platforms like TikTok, Notion, Twitch, Target, and Hulu.

```tsx
// Next.js App Router: Server Component with asynchronous data fetching
import { Suspense } from 'react';

async function RecentArchitectures() {
  const res = await fetch('https://api.example.com/architectures', { cache: 'no-store' });
  const data = await res.json();

  return (
    <ul>
      {data.map((item: any) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main>
      <h1>System Architecture Dashboard</h1>
      <Suspense fallback={<p>Loading real-time architecture feeds...</p>}>
        <RecentArchitectures />
      </Suspense>
    </main>
  );
}
```

---

## Why Next.js? Solving React SPA Limitations

Traditional client-side React Single Page Applications (SPAs created via tools like Create React App or standard Vite) suffer from several architectural bottlenecks:

```text
┌─────────────────────────────────────────────────────────────┐
│                 Client-Side SPA Bottleneck                  │
├─────────────────────────────────────────────────────────────┤
│ 1. Browser requests HTML ──> Receives empty <div id="root"> │
│ 2. Browser downloads massive JS bundle (500KB - 2MB)        │
│ 3. Browser executes JS, fetches data from API, renders UI   │
│                                                             │
│ Result: Slow First Contentful Paint (FCP) + Weak SEO Crawl  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 Next.js Server-Rendered Flow                │
├─────────────────────────────────────────────────────────────┤
│ 1. Server pre-renders fully populated HTML + data           │
│ 2. Browser instantly displays meaningful pixels to user     │
│ 3. Selective hydration enables client-side interactivity    │
│                                                             │
│ Result: Ultra-fast FCP/LCP + Perfect Search Engine Indexing │
└─────────────────────────────────────────────────────────────┘
```

| Metric / Problem | Standard React SPA | Next.js Architecture |
| :--- | :--- | :--- |
| **Initial HTML** | Empty shell (`<div id="root"></div>`) | Pre-rendered semantic HTML with data already populated |
| **Search Engine Optimization (SEO)** | Difficult; relies on bot JavaScript execution | Flawless; search engines receive complete HTML markup immediately |
| **First Contentful Paint (FCP)** | Delayed until entire JavaScript bundle downloads and executes | Instantaneous; server streams HTML directly to the browser |
| **Client Bundle Size** | Bundles all dependencies (DB clients, libraries, utils) | Server Components keep heavy backend dependencies strictly on the server (0KB client bundle) |

---

## Core Pillars of Modern Next.js (App Router)

### 1. Server Components vs. Client Components (RSC)
By default, every component inside the Next.js App Router (`app/` directory) is a **React Server Component (RSC)**:
* **Server Components (Default)**: Execute solely on the server or during build time. They can securely access databases, internal file systems, and environment secrets without sending any JavaScript to the client browser.
* **Client Components (`'use client'`)**: Opt-in components that provide interactive UI handlers (`onClick`), browser APIs (`localStorage`, `window`), or React hooks (`useState`, `useEffect`).

### 2. File-System Based Routing
In Next.js, routes are determined by the folder hierarchy inside the `app/` directory:

```text
app/
├── layout.tsx         ──> Root Layout (HTML/Body wrapper, Nav, Footer)
├── page.tsx           ──> Route: / (Home page)
├── dashboard/
│   ├── layout.tsx     ──> Sub-layout for dashboard
│   ├── page.tsx       ──> Route: /dashboard
│   └── settings/
│       └── page.tsx   ──> Route: /dashboard/settings
└── api/
    └── webhook/
        └── route.ts   ──> API Route: POST/GET /api/webhook
```

### 3. Comprehensive Rendering Strategies

* **Static Site Generation (SSG)**: HTML is generated once at build time. Ideal for marketing pages, blogs, and documentation.
* **Server-Side Rendering (SSR)**: HTML is dynamically generated on each incoming HTTP request. Ideal for user-personalized dashboards.
* **Incremental Static Regeneration (ISR)**: Static pages update in the background on a time-based interval without rebuilding the entire application.
* **Partial Prerendering (PPR)**: Combines static shell caching with streaming dynamic server content within a single route.

### 4. Built-in Production Optimizations
* **`<Image />` (`next/image`)**: Automatic WebP/AVIF format conversion, responsive resizing, and prevention of Cumulative Layout Shift.
* **`next/font`**: Zero-layout-shift font optimization with automatic self-hosting of Google Fonts.
* **`next/script`**: Prioritized asynchronous loading for analytics and third-party scripts.

---

## Next.js Road Ahead in This Curriculum

In the Next.js track, we will explore:
1. **App Router Deep Dive**: Layouts, nested templates, loading skeletons, error boundaries, and route groups.
2. **Server Actions & Mutations**: Mutating backend databases directly from form actions without standalone REST endpoints.
3. **Data Fetching & Cache Granularity**: Request deduplication, `fetch` tagging, `revalidateTag`, and `revalidatePath`.
4. **Authentication & Edge Middleware**: Securing routes, inspecting JWTs, and running geo-distributed edge redirects.
