---
title: "01. Next.js Setup, Layout & Design System"
description: "Set up the Next.js frontend project, configure package.json and jsconfig.json, build the Vanilla CSS design system with CSS variables, and configure app/layout.js."
---

# 01. Next.js Setup, Layout & Design System 🎨

In this first frontend chapter, we will initialize our Next.js project, configure project dependencies, establish an absolute import path alias (`@/*`), build our **Vanilla CSS design system**, and set up the root application layout.

---

## 1. Project Directory Structure

Here is the exact file tree for our frontend:

```text
frontend/
├── package.json                # Next.js 16 & React 19 dependencies
├── jsconfig.json               # Path alias mapping (@/*)
├── lib/
│   └── api.js                  # Centralized fetch API client
└── app/
    ├── globals.css             # Vanilla CSS design system & CSS variables
    ├── layout.js               # Root layout & page metadata
    ├── page.js                 # Landing hero page
    ├── login/
    │   └── page.js             # Sign in form
    ├── register/
    │   └── page.js             # Sign up form
    └── dashboard/
        └── page.js             # Monitoring dashboard & ping history modal
```

---

## 2. Dependencies & Configuration

### `package.json`
Create `package.json` in the root of your `frontend/` directory:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.3.8",
    "react": "19.2.8",
    "react-dom": "19.2.8"
  },
  "devDependencies": {
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.3.8"
  }
}
```

### `jsconfig.json`
Create `jsconfig.json` in the `frontend/` root to enable clean imports:

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

## 3. Global CSS Design System (`app/globals.css`)

We intentionally avoid complex CSS frameworks like Tailwind or Bootstrap so you can master foundational CSS principles:
- **CSS Variables**: Centralize your color palette and dimensions in `:root`.
- **Flexbox Exclusively**: Easy to reason about, responsive, and predictable.
- **Status Glow Badges**: Visual indicators for `UP`, `DOWN`, and `PENDING` states.

Create `app/globals.css`:

```css
/* ==============================================================================
   PulseWatch Global Styles (Vanilla CSS - Beginner Friendly)
   ==============================================================================
   Note for Students:
   - We use simple Flexbox (display: flex) instead of complex CSS Grid.
   - We use CSS Variables (--bg, --primary, etc.) so colors can be changed easily.
   - Clean, dark-mode design with smooth rounded corners and modern typography.
   ============================================================================== */

:root {
  /* Color Palette */
  --bg-main: #0b0f19;       /* Deep slate background */
  --bg-card: #151d30;       /* Card background */
  --bg-card-hover: #1c2742; /* Slightly lighter on hover */
  --border: #232f4e;        /* Subtle border color */
  --text-main: #f8fafc;     /* Primary text color (almost white) */
  --text-muted: #94a3b8;    /* Muted text color for sub-labels */

  /* Brand & Accent Colors */
  --primary: #3b82f6;       /* Blue for main actions */
  --primary-hover: #2563eb;
  --success: #10b981;       /* Emerald green for UP status */
  --success-bg: rgba(16, 185, 129, 0.15);
  --danger: #ef4444;        /* Red for DOWN status / Delete */
  --danger-bg: rgba(239, 68, 68, 0.15);
  --warning: #f59e0b;       /* Amber for PENDING status */
  --warning-bg: rgba(245, 158, 11, 0.15);

  /* Radius & Shadows */
  --radius: 12px;
  --radius-sm: 6px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

/* Base Reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ==============================================================================
   Layout Containers (Simple Flexbox)
   ============================================================================== */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px;
}

/* ==============================================================================
   Navbar
   ============================================================================== */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-badge {
  font-size: 14px;
  color: var(--text-muted);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
}

/* ==============================================================================
   Buttons
   ============================================================================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-main);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background-color: var(--bg-card-hover);
}

.btn-danger {
  background-color: var(--danger-bg);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  background-color: var(--danger);
  color: #ffffff;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

/* ==============================================================================
   Stats Bar (Using Flexbox)
   ============================================================================== */
.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 28px;
}

.stat-box {
  flex: 1 1 200px; /* Flexbox grow and shrink with minimum 200px width */
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.stat-title {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
}

/* ==============================================================================
   Monitor Cards List (Using Flexbox column)
   ============================================================================== */
.monitors-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.monitor-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 20px;
  transition: border-color 0.2s ease;
}

.monitor-card:hover {
  border-color: #3b5288;
}

.monitor-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.monitor-details h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}

.monitor-details a {
  font-size: 13px;
  color: var(--text-muted);
}

.monitor-details a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.monitor-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}

.latency-pill {
  font-size: 13px;
  color: var(--text-muted);
  background-color: rgba(255, 255, 255, 0.04);
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.monitor-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ==============================================================================
   Status Badges (Pills)
   ============================================================================== */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.badge-up {
  background-color: var(--success-bg);
  color: var(--success);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-up .badge-dot {
  background-color: var(--success);
  box-shadow: 0 0 8px var(--success);
}

.badge-down {
  background-color: var(--danger-bg);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge-down .badge-dot {
  background-color: var(--danger);
  box-shadow: 0 0 8px var(--danger);
}

.badge-pending {
  background-color: var(--warning-bg);
  color: var(--warning);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge-pending .badge-dot {
  background-color: var(--warning);
}

/* ==============================================================================
   Forms & Modals
   ============================================================================== */
.form-card {
  max-width: 440px;
  margin: 60px auto;
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 32px;
  box-shadow: var(--shadow);
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background-color: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-main);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus {
  border-color: var(--primary);
}

.alert-error {
  padding: 10px 14px;
  background-color: var(--danger-bg);
  border: 1px solid var(--danger);
  color: var(--danger);
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: 16px;
}

/* Modal Popup Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
}

.modal-content {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  width: 100%;
  max-width: 550px;
  box-shadow: var(--shadow);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

/* History Logs Table (Simple Flexbox layout) */
.history-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
}

.history-row:last-child {
  border-bottom: none;
}

/* ==============================================================================
   Responsive Queries (Mobile Friendly)
   ============================================================================== */
@media (max-width: 650px) {
  .monitor-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .monitor-meta {
    width: 100%;
    justify-content: space-between;
  }
  .monitor-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
```

---

## 4. Root Application Layout (`app/layout.js`)

Create `app/layout.js` inside your `frontend/` directory:

```javascript
// ==============================================================================
// Root Layout (frontend/app/layout.js)
// ==============================================================================
// Sets the HTML structure, global CSS, and page metadata for Next.js.
// ==============================================================================

import './globals.css';

export const metadata = {
  title: 'PulseWatch — Uptime & Health Monitor',
  description: 'Simple, modern full-stack website uptime monitoring application.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

🎉 **Layout and styling system are set!** Proceed to **[Chapter 2: API Service Layer & Token Storage](./02-api-service-layer.md)**.
