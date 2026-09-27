---
title: "LinkPulse Frontend Master Guide"
description: "A complete, beginner-friendly step-by-step guide to building the LinkPulse frontend dashboard with Next.js, React 19, Vanilla CSS, and Real-Time Analytics."
---

# LinkPulse Frontend Master Guide 🎨

Welcome to the **LinkPulse Frontend Engineering Guide**! In this track, you will build a clean, modern, and lightning-fast user dashboard for LinkPulse using **Next.js (App Router)**, **React 19**, and **Vanilla CSS**.

Every single line of code in this guide comes directly from the official LinkPulse working frontend codebase. Follow these step-by-step chapters to understand every JavaScript and React concept, copy the code, and build your own interactive dashboard.

---

## 📚 Frontend Curriculum & Step-by-Step Chapters

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      LINKPULSE FRONTEND ROADMAP                        │
 ├────────────────────────────────────────────────────────────────────────┤
 │  01. Setup & Styling      --> Next.js 16, layout.js & globals.css      │
 │  02. API Service Layer    --> services/api.js, Fetch & Error Handling  │
 │  03. Core Components      --> Navbar, CreateLinkForm & LinkCard        │
 │  04. Analytics & Page     --> AnalyticsModal, Stats & Dashboard Page   │
 │  05. Full-Stack Testing   --> Connecting UI to Backend, Complete Flow  │
 └────────────────────────────────────────────────────────────────────────┘
```

| Chapter | Title | What You Will Learn |
| :--- | :--- | :--- |
| **[Chapter 1](./01-nextjs-setup-and-structure.md)** | **Next.js Setup, Layout & Design System** | Initializing Next.js, configuring `package.json`, building `globals.css` with dark/light mode CSS variables, and `layout.js`. |
| **[Chapter 2](./02-api-service-layer.md)** | **API Service Layer & Fetching** | Building `services/api.js`, managing base URLs, `async/await`, `fetch` with `cache: 'no-store'`, and centralized error handling. |
| **[Chapter 3](./03-components-and-forms.md)** | **Core UI Components** | Building `Navbar.jsx` (with live backend health polling), `CreateLinkForm.jsx` (controlled state), and `LinkCard.jsx` (Clipboard API). |
| **[Chapter 4](./04-analytics-modal-and-dashboard.md)** | **Analytics Modal & Main Dashboard** | Building `AnalyticsModal.jsx` (aggregating Browser & OS data), and assembling `app/page.js` with stats, search filtering, and toasts. |
| **[Chapter 5](./05-run-and-test-fullstack.md)** | **Full-Stack Run & Verification** | Running backend + frontend together, testing the complete workflow, and fixing common full-stack issues (CORS, offline API). |

---

## 💡 Key JavaScript & React Concepts You Will Master

- **React State Management (`useState`)**: Managing form inputs, dynamic link lists, active modals, and temporary toast messages.
- **Side Effects & Timers (`useEffect`)**: Fetching initial data on mount, polling backend health with `setInterval`, and cleaning up timers.
- **Immutable State Updates**: Updating state cleanly with the spread operator (`[...prevLinks]`) and `.filter()`.
- **Data Aggregation (`reduce`, `forEach`, `Object.entries`)**: Calculating total clicks, browser breakdown percentages, and OS distributions.
- **Browser APIs**: Interacting with `navigator.clipboard.writeText`, `document.documentElement`, and `window.confirm`.

👉 **Ready to begin? Start with [Chapter 1: Next.js Setup, Layout & Design System](./01-nextjs-setup-and-structure.md)!**
