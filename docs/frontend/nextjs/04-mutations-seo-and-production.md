# 4. Server Actions, SEO & Full Project (Pure CSS)

> Learn how Server Actions eliminate API boilerplate for forms, master image and SEO optimizations, and build a complete multi-page agency website from scratch with 100% Pure CSS.

---

## 1. Server Actions: Modern Mutations without APIs

In traditional web development, whenever a user submitted a form, you had to:
1. Create a backend API endpoint (`/api/contact`).
2. Write client-side code to intercept the form submission (`e.preventDefault()`).
3. Send a manual `fetch()` POST request with JSON data.
4. Manually re-fetch the updated data or manually mutate your local state.

Next.js introduces **Server Actions**: asynchronous functions that run **securely on the server**, but can be invoked directly from your HTML forms or client components!

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                HOW SERVER ACTIONS WORK                                 │
│                                                                                        │
│   CLIENT (Browser)                                    SERVER (Next.js)                 │
│   ┌───────────────────────────────┐                   ┌─────────────────────────────┐  │
│   │ <form action={sendMessage}>   │                   │ 'use server';               │  │
│   │   <input name="email" />      │ ─── HTTP POST ──► │ async function sendMessage  │  │
│   │   <button>Send</button>       │     (RPC Call)    │ (formData) {                │  │
│   │ </form>                       │                   │   // Save to DB             │  │
│   │                               │ ◄── Revalidate ── │   revalidatePath('/admin'); │  │
│   │                               │     Fresh HTML    │ }                           │  │
│   └───────────────────────────────┘                   └─────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Step-by-Step Server Action Example

Let's create a server action in a dedicated file:

```javascript
// app/contact/actions.js
'use server'; // <-- Marks all exported functions in this file as Server Actions!

import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData) {
  // 1. Extract values using standard Web FormData API
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' };
  }

  // 2. Here you can write to your database or send an email!
  console.log('New Message Received on Server:', { name, email, message });

  // 3. Purge cached pages so fresh data displays immediately
  revalidatePath('/contact');

  return { success: true };
}
```

Now attach it directly to an HTML `<form>` inside your page:

```jsx
// app/contact/page.js
import { submitContactForm } from './actions';

export default function ContactPage() {
  return (
    <main className="form-container">
      <h1 className="form-title">Contact Our Team</h1>

      {/* Passing the server action directly to form action */}
      <form action={submitContactForm} className="contact-card">
        <div className="input-group">
          <label className="input-label">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input
            type="email"
            name="email"
            required
            className="input-field"
            placeholder="john@example.com"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Message</label>
          <textarea
            name="message"
            rows="4"
            required
            className="textarea-field"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button type="submit" className="btn-submit">
          Send Message
        </button>
      </form>
    </main>
  );
}
```

```css
/* Pure CSS in app/globals.css */
.form-container {
  max-width: 540px;
  margin: 60px auto;
  padding: 0 20px;
}

.form-title {
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 24px;
}

.contact-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.input-group {
  margin-bottom: 18px;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.btn-submit {
  width: 100%;
  background-color: #4f46e5;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn-submit:hover {
  background-color: #4338ca;
}
```

### Progressive Enhancement (Works Even Without JavaScript!)
Because Next.js binds this action to native HTML `<form action="...">`, **this form works even if the user has a slow connection and client JavaScript hasn't finished downloading yet!**

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **The `FormData` API:** Standard JavaScript web API for extracting input values by their `name` attribute:
   ```javascript
   const email = formData.get('email');
   ```
2. **Remote Procedure Call (RPC):** When the button is clicked, Next.js automatically executes an HTTP POST request in the background, serializes the arguments, runs the function on the server, and returns the result.
3. **Async / Await:** Database queries and email services are naturally asynchronous Promises.

---

### 🔄 How We Had to Do This in Vanilla JavaScript & Old React

Compare this with how we had to handle form submissions in vanilla web or classic React:

```javascript
// Vanilla JS Form Handling (What you had to write before Next.js!)
const form = document.querySelector('#contact-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop page reload

  // 1. Manually collect data from all form inputs
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // 2. Manually send fetch request to a separate API server
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      alert('Message sent!');
      form.reset();
    } else {
      alert('Error: ' + result.error);
    }
  } catch (err) {
    alert('Network error: ' + err.message);
  }
});
```

*With Next.js Server Actions, you don't write API routes, you don't parse JSON, and you don't write manual fetch requests!*

---

## 2. Image & Font Optimization

### The `<Image />` Component (`next/image`)
Standard HTML `<img>` tags are one of the biggest causes of slow websites and low Google PageSpeed scores:
* They cause **Cumulative Layout Shift (CLS)** (the page jumps around as images load).
* They force mobile phones to download giant 4K desktop images.
* They download all images immediately, even if they are far down the page.

Next.js replaces standard `<img>` with the high-performance `<Image />` component:

```jsx
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="hero-banner-wrapper">
      <Image
        src="/team-photo.jpg"
        alt="Engineering team at work"
        width={1200}
        height={600}
        priority={true} // Preloads the hero image immediately!
        className="responsive-img"
      />
    </div>
  );
}
```

```css
/* Pure CSS for Image */
.hero-banner-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
  border-radius: 12px;
  overflow: hidden;
}

.responsive-img {
  width: 100%;
  height: auto;
  display: block;
}
```

#### What `<Image />` Does Automatically:
1. **Size Optimization:** Automatically converts heavy JPEGs and PNGs into modern **WebP** and **AVIF** formats, reducing file size by up to 70%!
2. **Visual Stability:** By requiring `width` and `height`, the browser reserves the exact space before the image downloads, completely eliminating layout shifting.
3. **Lazy Loading:** Images below the fold are loaded only when the user scrolls near them.

---

### Font Optimization (`next/font`)
When you include Google Fonts using traditional `<link>` tags, the browser makes external network calls to Google servers, delaying text rendering and causing jarring font swaps (FOUT).

Next.js has built-in Google Font optimization:

```javascript
// app/layout.js
import { Plus_Jakarta_Sans } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-jakarta',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>{children}</body>
    </html>
  );
}
```

Next.js downloads the font files **at build time** and self-hosts them alongside your HTML. Zero external network requests to Google, zero layout shifts, and 100% GDPR compliant!

---

## 3. Technical SEO & The Metadata API

Search engines and social networks (Google, LinkedIn, Twitter/X, WhatsApp) rely on metadata in the `<head>` of your page to display titles, snippets, and link preview cards.

### Static Metadata
In any `layout.js` or `page.js`, you export a `metadata` object:

```javascript
// app/about/page.js
export const metadata = {
  title: 'About Us | DevStudio',
  description: 'Learn about our engineering philosophy, team, and culture.',
  openGraph: {
    title: 'About DevStudio Engineering',
    description: 'High-performance full-stack web applications with pure CSS.',
    url: 'https://devstudio.example.com/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'DevStudio Team',
      },
    ],
  },
};
```

---

### Dynamic Metadata for Dynamic Routes (`generateMetadata`)
What if you have dynamic blog posts, and each post needs its own specific title and preview image?

Export the `generateMetadata` function:

```javascript
// app/blog/[slug]/page.js

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return {
    title: `${post.title} | DevStudio Blog`,
    description: post.body.slice(0, 150) + '...',
    openGraph: {
      title: post.title,
      description: post.body.slice(0, 150),
    },
  };
}
```

When someone shares `devstudio.example.com/blog/1` on Twitter or WhatsApp, the rich preview card displays the exact article title and description automatically!

---

## 4. Capstone Project: Building a Full Multi-Page Website (Pure CSS)

Let's assemble everything you've learned into a complete, working multi-page website: **"DevAgency"**.

### Project File Structure
```text
my-agency-website/
├── app/
│   ├── globals.css        <-- Complete Pure CSS Design System
│   ├── layout.js          <-- Global Shell (Navbar & Footer)
│   ├── page.js            <-- Homepage (Hero, Stats, Highlights)
│   ├── services/
│   │   └── page.js        <-- Services Cards Grid
│   ├── blog/
│   │   ├── page.js        <-- Blog Listing (Server Data Fetching)
│   │   └── [slug]/
│   │       └── page.js    <-- Dynamic Article Page + Dynamic SEO
│   └── contact/
│       ├── actions.js     <-- Server Action for Form Processing
│       └── page.js        <-- Contact Page with Form
```

---

### 1. The Complete Pure CSS Design System (`app/globals.css`)

```css
/* app/globals.css */
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --primary-light: #eef2ff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --bg-page: #f8fafc;
  --bg-card: #ffffff;
  --border: #e2e8f0;
  --radius: 8px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-page);
  color: var(--text-main);
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header & Navbar */
.site-header {
  background-color: #ffffff;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: color 0.15s ease;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-btn {
  background-color: var(--primary);
  color: #ffffff !important;
  padding: 8px 16px;
  border-radius: var(--radius);
  font-weight: 600;
}

.nav-btn:hover {
  background-color: var(--primary-hover);
}

/* Buttons */
.btn-primary {
  display: inline-block;
  background-color: var(--primary);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  display: inline-block;
  background-color: #ffffff;
  color: var(--text-main);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.btn-secondary:hover {
  background-color: #f1f5f9;
}

/* Footer */
.site-footer {
  background-color: #ffffff;
  border-top: 1px solid var(--border);
  padding: 36px 20px;
  margin-top: auto;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}
```

---

### 2. Global Layout (`app/layout.js`)

```jsx
// app/layout.js
import Link from 'next/link';
import './globals.css'; // Pure CSS styles

export const metadata = {
  title: 'DevAgency — Modern Full-Stack Digital Products',
  description: 'Engineering studio building high-performance web applications with pure CSS and Next.js.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="nav-container">
            <Link href="/" className="brand-logo">
              DevAgency.
            </Link>

            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
              <Link href="/contact" className="nav-link nav-btn">Contact Us</Link>
            </nav>
          </div>
        </header>

        <main style={{ flexGrow: 1 }}>
          {children}
        </main>

        <footer className="site-footer">
          <p>© {new Date().getFullYear()} DevAgency Studio. Crafted with Next.js App Router & Pure CSS.</p>
        </footer>
      </body>
    </html>
  );
}
```

---

### 3. Homepage (`app/page.js`)

```jsx
// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <div style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: '#eef2ff',
        color: '#4f46e5',
        borderRadius: '9999px',
        fontSize: '0.8125rem',
        fontWeight: '700',
        marginBottom: '20px'
      }}>
        Next.js & Pure CSS Masterclass
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.15', marginBottom: '16px' }}>
        Engineered for High Speed, <br />
        <span style={{ color: '#4f46e5' }}>Crafted with Pure CSS.</span>
      </h1>

      <p style={{ fontSize: '1.15rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 32px' }}>
        Build production-ready web applications with server components, fast routing, and clean, beautiful vanilla styles.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/services" className="btn-primary">Our Services</Link>
        <Link href="/blog" className="btn-secondary">Read Blog</Link>
      </div>

      {/* Feature Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginTop: '60px',
        textAlign: 'left'
      }}>
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>⚡ Zero Bundle Waste</h3>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Server components execute on the server and ship 0kb of JavaScript for static pages.</p>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>🎨 Pure Vanilla CSS</h3>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>No heavy CSS frameworks or complex class strings. Clean, maintainable standard CSS.</p>
        </div>

        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>🛡️ Server Actions</h3>
          <p style={{ color: '#64748b', fontSize: '0.925rem' }}>Mutate data and handle forms directly without writing separate API controllers.</p>
        </div>
      </div>
    </section>
  );
}
```

---

### 4. Services Page (`app/services/page.js`)

```jsx
// app/services/page.js
export const metadata = {
  title: 'Our Services | DevAgency',
  description: 'Full-stack engineering capabilities and design systems.',
};

const SERVICES = [
  { id: '01', title: 'Next.js App Architecture', desc: 'Migrating legacy apps to React Server Components and App Router file-system routing.' },
  { id: '02', title: 'Pure CSS Design Systems', desc: 'Crafting responsive, zero-runtime design tokens, fluid typography, and CSS Grid layouts.' },
  { id: '03', title: 'Full-Stack REST & SQL', desc: 'PostgreSQL database modeling, indexing, Redis caching, and robust API endpoints.' },
];

export default function ServicesPage() {
  return (
    <div className="container" style={{ padding: '48px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>Engineering Services</h1>
      <p style={{ color: '#64748b', marginBottom: '36px' }}>What we build for forward-thinking engineering teams.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {SERVICES.map(s => (
          <div key={s.id} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px' }}>
            <span style={{ color: '#4f46e5', fontWeight: '800', fontFamily: 'monospace' }}>{s.id}</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '10px 0 8px' }}>{s.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem' }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### 5. Blog Listing & Dynamic Article (`app/blog/`)

```jsx
// app/blog/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Engineering Blog | DevAgency',
  description: 'Technical articles on Next.js and web architecture.',
};

export default async function BlogPage() {
  // Direct Server Component Data Fetching!
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6', {
    next: { revalidate: 3600 }
  });
  const posts = await res.json();

  return (
    <div className="container" style={{ padding: '48px 20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>Engineering Articles</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Pre-rendered on the server for maximum speed and SEO.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            style={{
              display: 'block',
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '24px',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4f46e5', textTransform: 'uppercase' }}>Article #{post.id}</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '8px 0', textTransform: 'capitalize' }}>{post.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.5' }}>{post.body.slice(0, 100)}...</p>
            <span style={{ display: 'inline-block', marginTop: '14px', color: '#4f46e5', fontWeight: '600', fontSize: '0.875rem' }}>Read More →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

```jsx
// app/blog/[slug]/page.js
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return {
    title: `${post.title} | DevAgency Blog`,
    description: post.body.slice(0, 150),
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await res.json();

  return (
    <article className="container" style={{ maxWidth: '720px', padding: '48px 20px' }}>
      <Link href="/blog" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
        ← Back to all posts
      </Link>

      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '20px', textTransform: 'capitalize', lineHeight: '1.2' }}>
        {post.title}
      </h1>

      <p style={{ marginTop: '24px', fontSize: '1.125rem', color: '#334155', lineHeight: '1.8' }}>
        {post.body}
      </p>
    </article>
  );
}
```

---

### 6. Contact Page with Server Action (`app/contact/`)

```javascript
// app/contact/actions.js
'use server';

import { revalidatePath } from 'next/cache';

export async function submitContact(formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  console.log('Message Saved to Server:', { name, email, message });
  revalidatePath('/contact');

  return { success: true };
}
```

```jsx
// app/contact/page.js
import { submitContact } from './actions';

export const metadata = {
  title: 'Contact | DevAgency',
  description: 'Reach out to our engineering team.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ maxWidth: '520px', padding: '48px 20px' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', textAlign: 'center', marginBottom: '8px' }}>Get in Touch</h1>
      <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '28px', fontSize: '0.9375rem' }}>
        Directly handled on the server via Next.js Server Actions.
      </p>

      <form action={submitContact} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', padding: '32px', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Jane Doe"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9375rem' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@example.com"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9375rem' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '6px' }}>Message</label>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Tell us about your project..."
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.9375rem', fontFamily: 'inherit' }}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}
```

---

## Conclusion & Your Journey Ahead

**Congratulations!** You now understand the full architecture of modern Next.js and pure CSS:
* You know how to set up Node.js and spin up a project with `npx create-next-app@latest` using **Pure CSS**.
* You understand the App Router's file-system conventions (`page.js`, `layout.js`, `not-found.js`).
* You master React's core hooks: **`useState`** for component memory and **`useEffect`** for browser side effects.
* You understand why **Server Components** keep client bundles lightweight and secure.
* You can fetch data directly with simple `await fetch()` on the server and style cleanly with CSS custom properties.
* You can mutate data seamlessly using **Server Actions** (`'use server'`).
* You can optimize images, self-host Google Fonts, and craft dynamic SEO metadata.

You now possess the foundational engineering tools to build high-performance, production-ready web applications!
