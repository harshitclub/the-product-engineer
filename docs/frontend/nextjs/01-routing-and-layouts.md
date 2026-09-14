# 1. Setup, Routing & Layouts in Next.js

> From installing Node.js and spinning up your first Next.js project to mastering pure CSS styling, the App Router file-system, client-side navigation, and nested layouts.

---

## 1. Step 0: Installing Node.js & Environment Setup

Before you can run Next.js on your computer, you need **Node.js**.

### What is Node.js and Why Do We Need It?
Normally, JavaScript runs strictly inside a web browser (like Chrome, Safari, or Firefox). **Node.js** is an open-source runtime environment that lets JavaScript run **outside the browser**—directly on your computer's operating system!

Next.js needs Node.js because:
1. It runs a local development web server on your computer while you code.
2. It bundles, optimizes, and compiles your code in the background.
3. It renders your pages on the server before sending HTML to the browser.

---

### Step 1: Downloading & Installing Node.js

1. Visit the official Node.js website: [https://nodejs.org](https://nodejs.org).
2. You will see two download buttons:
   * **LTS (Long Term Support)** $\rightarrow$ **Choose this one!** (Recommended for 99% of developers; it is rock-solid and stable).
   * **Current** (Contains newest experimental features).
3. Download the installer for your operating system:
   * **Windows:** Download the `.msi` installer, double-click it, click *Next*, accept the license, and click *Install*.
   * **macOS:** Download the `.pkg` installer and follow the standard installation wizard.
   * **Linux:** Use your distribution package manager or `nvm` (Node Version Manager).
4. Restart your terminal (Command Prompt, PowerShell, or macOS/Linux Terminal).

---

### Step 2: Verify Your Installation in the Terminal

Open your terminal and run these two commands:

```bash
node -v
npm -v
```

You should see output similar to this:

```text
v20.18.0    <-- Your Node.js version (must be v18.18.0 or higher)
10.8.2      <-- npm (Node Package Manager) installed automatically with Node
```

If both commands return version numbers, your computer is 100% ready to build with Next.js!

---

## 2. Creating Your First Next.js Project

Next.js provides an official project generator called `create-next-app`. You do not need to install it globally; you can run it directly using `npx`:

```bash
npx create-next-app@latest my-agency-website
```

The CLI wizard will ask you a few quick configuration questions. Here are the recommended choices to keep everything clean and use **Pure CSS**:

```text
✔ Would you like to use TypeScript? … No / Yes  (Choose No for plain JavaScript, or Yes for TypeScript)
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … No  <-- CHOOSE NO (We are using Pure, clean CSS!)
✔ Would you like your code inside a `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes  <-- ALWAYS CHOOSE YES!
✔ Would you like to use Turbopack for `next dev`? … Yes   <-- Superfast Rust-powered bundler!
✔ Would you like to customize the import alias? … No
```

### Launching the Development Server
Once installation completes, change into your project folder and start the server:

```bash
cd my-agency-website
npm run dev
```

Your terminal will display:

```text
   ▲ Next.js 15.x / 16.x (Turbopack)
   - Local:        http://localhost:3000
   - Environments: .env
 ✓ Starting...
 ✓ Ready in 950ms
```

Open your browser and navigate to `http://localhost:3000`. You will see your live Next.js website!

---

## 3. Pure CSS in Next.js: How Styling Works

Next.js natively supports **Pure Vanilla CSS** out of the box with zero configuration! You have two main ways to write pure CSS:

### 1. Global CSS (`app/globals.css`)
Styles that apply to the entire website (reset rules, font families, CSS custom properties, utility classes, and layout rules). It is imported once inside `app/layout.js`:

```css
/* app/globals.css */
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg);
  color: var(--text-main);
  line-height: 1.6;
}
```

### 2. CSS Modules (`[name].module.css`)
If you want to scope styles strictly to one component so class names never collide, use CSS Modules:

```css
/* app/about/page.module.css */
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

.heading {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-main);
}

.description {
  margin-top: 16px;
  color: var(--text-muted);
}
```

Import and use it in your component like a normal JavaScript object:

```jsx
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>About Our Company</h1>
      <p className={styles.description}>We build high-performance software with pure CSS.</p>
    </main>
  );
}
```

---

## 4. The App Router: How File-System Routing Works

In modern Next.js, **folders define URL routes**, and special files inside those folders define the UI.

### The Special File Conventions
Inside any folder in `app/`, Next.js recognizes these reserved file names:

| File Name | Purpose | What it Does |
| :--- | :--- | :--- |
| `page.js` | **Unique Page UI** | Makes the route publicly accessible. If a folder doesn't have `page.js`, it is not a route! |
| `layout.js` | **Shared UI Shell** | Wraps the page and all child routes (e.g., persistent Header/Footer). Does NOT re-render on navigation. |
| `loading.js` | **Instant Loading State** | Automatically wraps page in a React Suspense boundary with a skeleton or spinner. |
| `not-found.js` | **404 Page** | Shown when a route is not found or when `notFound()` is triggered. |
| `error.js` | **Error Boundary** | Gracefully catches runtime errors and shows a friendly retry UI without crashing the whole app. |

---

### How Folders Map to URLs

Let's look at how folder nesting creates clean URLs:

```text
app/
├── page.js                    -->  example.com/               (Homepage)
├── about/
│   └── page.js                -->  example.com/about          (About Page)
├── services/
│   ├── page.js                -->  example.com/services       (Services Listing)
│   └── web-dev/
│       └── page.js            -->  example.com/services/web-dev (Sub-page)
└── contact/
    └── page.js                -->  example.com/contact        (Contact Page)
```

#### Writing Your First Page (`app/about/page.js`)
Create a folder named `about` inside `app/`, and add `page.js`:

```jsx
// app/about/page.js
export default function AboutPage() {
  return (
    <main className="content-container">
      <h1 className="page-title">About Our Company</h1>
      <p className="page-lead">
        We are an engineering studio building high-performance web applications.
      </p>
    </main>
  );
}
```

Visit `http://localhost:3000/about` in your browser. The page is live immediately!

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **ES Modules (`export default`)**: Next.js requires every page and layout file to have a `default` export so it knows which React component to mount.
2. **JSX (JavaScript XML)**: Writing HTML-like syntax directly inside JavaScript functions. Under the hood, the Next.js compiler turns this into `React.createElement()` function calls.
3. **Pure Functions**: A React component is simply a JavaScript function that takes inputs (`props`) and returns UI markup.

---

### 🔄 How We Had to Do This Without Next.js / React (Vanilla Web)

Before Next.js existed, how did we create a multi-page site?

```html
<!-- In 2010 Vanilla Web: We had to create physical HTML files -->
<!-- about.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>About Us</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- YOU HAD TO COPY-PASTE THIS NAVBAR INTO EVERY SINGLE HTML FILE! -->
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <h1>About Our Company</h1>
  </main>
</body>
</html>
```

#### The Pain Points of the Old Way:
1. **The Copy-Paste Nightmare:** If your client asked to change a link title in the Navbar from "About" to "About Us", you had to manually open and edit 50 individual `.html` files!
2. **White Flash on Navigation:** Clicking between `index.html` and `about.html` forced the browser to discard the current page, paint a blank white screen, re-request all CSS and scripts, and reload the entire document.
3. **Loss of Client State:** If a user was playing audio, filling a sidebar form, or had a chat widget open, navigating to another page completely killed that state.

---

## 5. Client-Side Navigation: `<Link>` vs `<a>`

In standard HTML, you navigate between pages with an anchor tag:

```html
<!-- Standard HTML: Forces full page reload -->
<a href="/about">About</a>
```

In Next.js, you **never** use raw `<a>` tags for internal links. Instead, you import the `<Link>` component from `'next/link'`:

```jsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="site-nav">
      <Link href="/" className="nav-link">Home</Link>
      <Link href="/about" className="nav-link">About</Link>
      <Link href="/services" className="nav-link">Services</Link>
      <Link href="/contact" className="nav-link">Contact</Link>
    </nav>
  );
}
```

```css
/* Styled with pure CSS */
.site-nav {
  display: flex;
  gap: 24px;
  padding: 16px;
  border-bottom: 1px solid var(--border);
  background-color: var(--card-bg);
}

.nav-link {
  text-decoration: none;
  color: var(--text-main);
  font-weight: 500;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--primary);
}
```

### Why is `<Link>` Magical?
1. **Zero Full Page Reloads:** When clicked, Next.js intercepts the click using JavaScript. It keeps the current page shell in place and only swaps out the changing content.
2. **Automatic Viewport Prefetching:** In production, whenever a `<Link>` appears in the user's viewport (as they scroll down), Next.js automatically prefetches that page's code and data in the background! When the user finally clicks it, the page opens **instantaneously**.

---

### 💡 What JavaScript Concepts Are We Using Here?
* **Event Interception (`e.preventDefault()`):** Under the hood, `<Link>` listens for the `click` event and stops the browser from doing a default navigation.
* **HTML5 History API (`window.history.pushState`):** Next.js updates the browser's address bar URL without triggering an HTTP reload.
* **Component Props:** Passing properties like `href="/about"` into a reusable function component.

---

### 🔄 How We Had to Do This in Vanilla JavaScript

If you wanted fast page transitions without Next.js or React, you had to manually engineer a Single Page Application (SPA) router in plain JavaScript:

```javascript
// Vanilla JS SPA Router (What you had to write manually before Next.js!)
const links = document.querySelectorAll('a[data-link]');

links.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault(); // Stop full page reload
    const url = e.target.getAttribute('href');

    // 1. Update browser address bar
    window.history.pushState(null, '', url);

    // 2. Manually fetch HTML content over network
    const response = await fetch(url);
    const htmlText = await response.text();

    // 3. Parse and swap DOM content manually
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const newContent = doc.querySelector('#app-content').innerHTML;

    document.querySelector('#app-content').innerHTML = newContent;
  });
});

// 4. Handle browser Back/Forward buttons
window.addEventListener('popstate', () => {
  // Re-fetch and re-render current location...
});
```

*Notice how fragile this was?* You had to manually intercept clicks, handle browser history, parse DOM strings, worry about memory leaks, and manage scroll positions. Next.js does all of this automatically with just `<Link href="...">`!

---

## 6. Dynamic Routes: `[slug]` and `[id]`

What if you have an e-commerce store with 10,000 products, or a blog with 500 articles? You cannot manually create 10,000 folders!

In Next.js, you wrap a folder name in **square brackets** to create a **dynamic route**:

```text
app/
└── blog/
    ├── page.js             -->  example.com/blog            (List of all posts)
    └── [slug]/
        └── page.js         -->  example.com/blog/first-post (Dynamic article)
                            -->  example.com/blog/second-post
                            -->  example.com/blog/learn-nextjs
```

### Accessing Dynamic Route Parameters
In Next.js, the dynamic segment is passed directly to your component as a parameter called `params`.

```jsx
// app/blog/[slug]/page.js

// In modern Next.js, params is an asynchronous Promise that we await
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  return (
    <article className="article-wrapper">
      <span className="badge">Engineering Article</span>
      <h1 className="article-title">{slug.replaceAll('-', ' ')}</h1>
      <p className="article-body">
        This is the dynamic content rendered for slug: <code>{slug}</code>.
      </p>
    </article>
  );
}
```

```css
/* Styled with pure CSS */
.article-wrapper {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--primary);
  background-color: #eef2ff;
  padding: 4px 10px;
  border-radius: 4px;
}

.article-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin-top: 12px;
  text-transform: capitalize;
}

.article-body {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #334155;
  line-height: 1.7;
}
```

If a user visits `http://localhost:3000/blog/mastering-css-grid`:
* `slug` becomes `"mastering-css-grid"`.
* The title renders as `"Mastering CSS Grid"`.

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **Object Destructuring:** Extracting `{ slug }` directly from the `params` object:
   ```javascript
   const { slug } = await params;
   ```
2. **`async / await` & Promises:** In modern Next.js (Next.js 15+), `params` is handled as an async object, ensuring optimal streaming and concurrency.
3. **String Methods (`.replaceAll()`):** Converting URL hyphens into readable spaces.

---

### 🔄 How We Had to Do This in Vanilla Web

Without Next.js, you had two cumbersome options:

#### Option A: Vanilla Frontend with Query Strings
```html
<!-- URL had to look like: website.com/article.html?id=mastering-css-grid -->
<script>
  // In vanilla JS, you had to manually parse query strings from the window
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('id');

  if (!slug) {
    document.body.innerHTML = '<h1>404 Post Not Found</h1>';
  } else {
    document.getElementById('title').textContent = slug;
  }
</script>
```
*Disadvantages:* Ugly URLs (`?id=xyz`), bad for SEO, and required client JavaScript to run before anything appeared on screen.

#### Option B: Backend Routing with Express.js / Node
```javascript
// Plain Node.js Express server
const express = require('express');
const app = express();

app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug; // Regex URL matching
  res.send(`<h1>${slug}</h1>`);
});
```
*Disadvantages:* You had to configure server infrastructure, write route regexes, set up HTML template engines (EJS/Pug), and configure separate frontend build pipelines.

---

## 7. Nested Layouts: Building the Persistent Shell

A **Layout** (`layout.js`) is UI that is shared between multiple pages. On navigation:
* Layouts **preserve state** (an audio player continues playing, a search bar preserves text).
* Layouts **remain interactive** and do not re-render unnecessarily.

### The Root Layout (`app/layout.js`)
Every Next.js app has exactly one Root Layout. It must contain the `<html>` and `<body>` tags:

```jsx
// app/layout.js
import Link from 'next/link';
import './globals.css'; // Importing pure CSS

export const metadata = {
  title: 'DevStudio — Software Engineering',
  description: 'High-performance web development with pure CSS and Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="site-body">
        {/* SHARED NAVBAR */}
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="site-logo">
              DevStudio<span>.</span>
            </Link>
            <nav className="header-nav">
              <Link href="/" className="nav-item">Home</Link>
              <Link href="/about" className="nav-item">About</Link>
              <Link href="/blog" className="nav-item">Blog</Link>
              <Link href="/contact" className="nav-item">Contact</Link>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT IS INJECTED HERE */}
        <main className="main-content">
          {children}
        </main>

        {/* SHARED FOOTER */}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} DevStudio. Built with Next.js & Pure CSS.</p>
        </footer>
      </body>
    </html>
  );
}
```

```css
/* Pure CSS for layout in app/globals.css */
.site-body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-logo {
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
  color: var(--text-main);
}

.site-logo span {
  color: var(--primary);
}

.header-nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.9375rem;
  transition: color 0.15s ease;
}

.nav-item:hover {
  color: var(--primary);
}

.main-content {
  flex-grow: 1;
}

.site-footer {
  background-color: #ffffff;
  border-top: 1px solid var(--border);
  padding: 30px 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}
```

### How `children` Works (The Component Nesting Mental Model)
Whenever a user visits `/about`, Next.js takes the component inside `app/about/page.js` and passes it as the `children` prop into `app/layout.js`:

```text
┌────────────────────────────────────────────────────────┐
│  RootLayout (app/layout.js)                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <header> Persistent Pure CSS Navbar </header>    │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ {children}  <-- Swaps out smoothly on click!     │  │
│  │                                                  │  │
│  │  If at /        --> renders app/page.js          │  │
│  │  If at /about   --> renders app/about/page.js    │  │
│  │  If at /blog/x  --> renders app/blog/[slug]      │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <footer> Persistent Pure CSS Footer </footer>    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 8. Custom 404 & Loading States

### Creating a Custom 404 Page (`app/not-found.js`)
When a user visits a route that does not exist, Next.js looks for `app/not-found.js`:

```jsx
// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-box">
      <h2 className="error-code">404</h2>
      <p className="error-title">Page Not Found</p>
      <p className="error-desc">
        The engineering chapter or route you requested does not exist or has been moved.
      </p>
      <Link href="/" className="btn-home">
        Return to Home
      </Link>
    </div>
  );
}
```

```css
/* Pure CSS for 404 */
.not-found-box {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
}

.error-code {
  font-size: 4rem;
  font-weight: 900;
  color: var(--primary);
  line-height: 1;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 10px;
}

.error-desc {
  color: var(--text-muted);
  max-width: 400px;
  margin-top: 8px;
}

.btn-home {
  margin-top: 24px;
  display: inline-block;
  background-color: var(--primary);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
}
```

---

## Chapter 1 Summary & Next Steps

In this chapter, you learned:
1. How to download and verify Node.js on your computer (`node -v`).
2. How to create a new project using `npx create-next-app@latest` choosing **Pure CSS**.
3. How `globals.css` and CSS Modules allow clean, modern styling without any third-party CSS utility frameworks.
4. How the App Router turns folders into URLs (`app/about/page.js` $\rightarrow$ `/about`).
5. Why `<Link>` eliminates page flashes and provides background prefetching.
6. How dynamic routes (`[slug]`) scale to thousands of URLs.
7. How `layout.js` eliminates copy-pasting headers and footers across files.

Now that our routing and pure CSS foundation is set, let's master React's core hooks (`useState` & `useEffect`) and understand Server vs. Client Components:  
👉 **[Chapter 2: Server vs. Client Components, useState & useEffect](./02-server-and-client-components)**!
