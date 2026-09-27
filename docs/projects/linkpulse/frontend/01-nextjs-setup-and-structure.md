---
title: "01. Next.js Setup, Layout & Design System"
description: "Initialize the Next.js App Router project, set up package.json, configure layout.js metadata, and build the custom CSS theme."
---

# 01. Next.js Setup, Layout & Design System 🎨

In this first chapter, we will set up the **Next.js** project structure, configure `package.json`, create the root layout in `app/layout.js`, and build the complete design system in `app/globals.css`.

---

## 1. Frontend Directory Structure

Create a folder named `frontend/` and organize your files like this:

```text
frontend/
├── package.json              # Next.js and React dependencies
├── next.config.mjs           # Next.js configuration
├── jsconfig.json             # JavaScript path alias configuration
├── README.md                 # Frontend documentation
├── app/
│   ├── layout.js             # Root layout with metadata and HTML wrapper
│   ├── page.js               # Main Dashboard page (App Router)
│   └── globals.css           # Complete CSS styles, variables & themes
├── components/
│   ├── Navbar.jsx            # Top navbar with server health indicator
│   ├── CreateLinkForm.jsx    # Short link creation form
│   ├── LinkCard.jsx          # Individual link card with copy/delete actions
│   └── AnalyticsModal.jsx    # Pop-up modal showing detailed click metrics
└── services/
    └── api.js                # Helper functions for backend HTTP calls
```

---

## 2. Setting Up `package.json`

Create `package.json` in the `frontend/` directory:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "16.3.6",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "babel-plugin-react-compiler": "1.0.0"
  }
}
```

### Explanation of Dependencies:
- **`next`**: The React framework for production with file-based routing and server/client components.
- **`react` & `react-dom`**: The core React UI library.
- **`next dev`**: Starts the local development server on `http://localhost:3000` with instant Hot Module Replacement (HMR).

---

## 3. Next.js & Path Configurations

Create `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
```

Create `jsconfig.json` for cleaner imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. Root Application Layout (`app/layout.js`)

In the Next.js App Router, `app/layout.js` defines the common HTML skeleton shared across all pages.

Create `app/layout.js`:

```javascript
import "./globals.css";

export const metadata = {
  title: "LinkPulse — Minimalist URL Shortener & Analytics",
  description: "A fast URL shortener and real-time click analytics dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

### Core Concepts Explained:
1. **`import "./globals.css"`**: Imports our custom CSS once at the root so every component has access to all styles and design tokens.
2. **`export const metadata`**: Configures SEO title and meta descriptions automatically rendered into the `<head>` tag.
3. **`data-theme="light"`**: Sets the initial theme attribute on the `<html>` element. When the user toggles dark mode, JavaScript updates this attribute to `data-theme="dark"`.
4. **`{children}`**: The page content (from `app/page.js`) is injected right here inside the `<body>`.

---

## 5. Design System & CSS Styling (`app/globals.css`)

We use clean Vanilla CSS with CSS Custom Properties (CSS variables) to support **Light & Dark modes** without external heavy libraries.

Create `app/globals.css`:

```css
/* ==========================================================================
   LinkPulse - Minimalistic Shadcn-Style Vanilla CSS
   Simple, clean, and beginner-friendly styles for the frontend.
   ========================================================================== */

:root {
  /* Default Theme: Clean, Modern Light Mode */
  --bg-color: #ffffff;
  --bg-secondary: #f4f4f5;
  --text-main: #09090b;
  --text-muted: #71717a;
  --border-color: #e4e4e7;
  --card-bg: #ffffff;
  
  --primary-btn: #18181b;
  --primary-btn-text: #ffffff;
  --secondary-btn: #f4f4f5;
  --secondary-btn-text: #18181b;
  --danger-color: #ef4444;
  --danger-bg: #fef2f2;
  --success-color: #10b981;

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --border-radius: 4px;
}

/* Dark Mode Theme */
[data-theme="dark"] {
  --bg-color: #09090b;
  --bg-secondary: #18181b;
  --text-main: #f4f4f5;
  --text-muted: #a1a1aa;
  --border-color: #27272a;
  --card-bg: #0c0c0e;
  
  --primary-btn: #f4f4f5;
  --primary-btn-text: #09090b;
  --secondary-btn: #18181b;
  --secondary-btn-text: #f4f4f5;
  --danger-color: #f87171;
  --danger-bg: #450a0a;
  --success-color: #34d399;
}

/* Basic Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: var(--font-family);
  font-size: 14px;
  line-height: 1.5;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Main Page Container */
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* Navigation Bar */
.navbar {
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 20;
}

.navbar-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
}

.brand-badge {
  background-color: var(--primary-btn);
  color: var(--primary-btn-text);
  padding: 2px 6px;
  border-radius: var(--border-radius);
  font-size: 11px;
  font-weight: 700;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  background-color: var(--bg-secondary);
  padding: 4px 8px;
  border-radius: var(--border-radius);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--text-muted);
}

.status-dot.active {
  background-color: var(--success-color);
}

/* Hero Section */
.hero {
  padding: 32px 0 24px;
}

.hero h1 {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 6px;
}

.hero p {
  color: var(--text-muted);
  font-size: 14px;
}

/* Stats Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.stat-card {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  padding: 14px 16px;
  border-radius: var(--border-radius);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  font-family: var(--font-mono);
}

/* Cards & Forms */
.card {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 24px;
}

.card-heading {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.form-group {
  margin-bottom: 12px;
}

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input {
  width: 100%;
  padding: 8px 10px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-main);
  font-size: 13px;
  outline: none;
}

.input:focus {
  border-color: var(--text-main);
}

.input-with-prefix {
  display: flex;
  align-items: center;
}

.input-prefix {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-right: none;
  padding: 8px 10px;
  font-size: 13px;
  color: var(--text-muted);
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.input-with-prefix .input {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: var(--border-radius);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.9;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--primary-btn);
  color: var(--primary-btn-text);
}

.btn-secondary {
  background-color: var(--secondary-btn);
  color: var(--secondary-btn-text);
  border-color: var(--border-color);
}

.btn-danger {
  background-color: var(--danger-bg);
  color: var(--danger-color);
  border-color: transparent;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-icon {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 6px;
  cursor: pointer;
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Links List Section */
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.search-box {
  max-width: 220px;
}

.links-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-row {
  border: 1px solid var(--border-color);
  background-color: var(--card-bg);
  padding: 12px 14px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.link-info {
  flex-grow: 1;
  min-width: 0;
}

.link-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.link-title {
  font-weight: 600;
  font-size: 13px;
}

.click-badge {
  background-color: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 9999px;
  font-family: var(--font-mono);
}

.link-urls {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.short-url {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
}

.destination-url {
  font-size: 11px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
}

.link-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.empty-message {
  text-align: center;
  padding: 40px 20px;
  border: 1px dashed var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-muted);
}

/* Modal Popup */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
}

.modal-box {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 540px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
}

.modal-body {
  padding: 16px;
  overflow-y: auto;
}

.analytics-stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.analytics-stat-item {
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  padding: 10px;
  border-radius: var(--border-radius);
  text-align: center;
}

.analytics-stat-label {
  font-size: 11px;
  color: var(--text-muted);
}

.analytics-stat-val {
  font-size: 16px;
  font-weight: 700;
  font-family: var(--font-mono);
}

.analytics-section-title {
  font-size: 12px;
  font-weight: 600;
  margin: 14px 0 6px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.stat-item-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid var(--border-color);
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 6px;
}

.simple-table th, .simple-table td {
  padding: 6px 8px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.simple-table th {
  color: var(--text-muted);
  font-weight: 600;
}

/* Toast Floating Box */
.toast-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-btn);
  color: var(--primary-btn-text);
  padding: 8px 14px;
  border-radius: var(--border-radius);
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

/* Mobile Responsive adjustments */
@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  .link-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .link-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
```

---

👉 **Next Step:** Continue to **[Chapter 2: API Service Layer & Fetching](./02-api-service-layer.md)** to connect our frontend to the Express backend!
