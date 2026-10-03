---
title: "PulseWatch Frontend Master Guide"
description: "A complete, beginner-friendly step-by-step guide to building the PulseWatch frontend dashboard with Next.js, React 19, Vanilla CSS, and real-time uptime monitoring."
---

# PulseWatch Frontend Master Guide 🎨

Welcome to the **PulseWatch Frontend Engineering Guide**! In this track, you will build a clean, modern, dark-themed uptime monitoring dashboard using **Next.js (App Router)**, **React 19**, and **Vanilla CSS**.

Every single line of code in this guide comes directly from the official working `frontend` codebase. Follow these step-by-step chapters to understand every JavaScript, React, and CSS concept, copy the exact code, and assemble your own production-grade user interface.

---

## 📚 Frontend Curriculum & Step-by-Step Chapters

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      PULSEWATCH FRONTEND ROADMAP                       │
 ├────────────────────────────────────────────────────────────────────────┤
 │  01. Setup & Design System --> Next.js 16, globals.css & layout.js     │
 │  02. API Service Layer     --> lib/api.js, JWT Storage & Fetch Helpers │
 │  03. Landing & Auth Pages  --> Hero Landing, Login & Register Forms    │
 │  04. Monitoring Dashboard  --> Stats Row, Monitor Cards & History Modal│
 │  05. Full-Stack Execution  --> End-to-End Run, Verification & Debugging│
 └────────────────────────────────────────────────────────────────────────┘
```

| Chapter | Title | What You Will Learn |
| :--- | :--- | :--- |
| **[Chapter 1](./01-nextjs-setup-and-styling.md)** | **Next.js Setup, Layout & Design System** | Initializing Next.js, configuring `package.json` & `jsconfig.json`, building `globals.css` with CSS variables & Flexbox, and setting up `app/layout.js`. |
| **[Chapter 2](./02-api-service-layer.md)** | **API Service Layer & Token Storage** | Writing `lib/api.js`, managing JWT tokens in `localStorage`, handling request headers, and centralizing all REST API communication. |
| **[Chapter 3](./03-landing-and-auth-pages.md)** | **Landing & Authentication Pages** | Building the marketing Hero page (`app/page.js`) with auto-redirect logic, and creating controlled Login and Register forms. |
| **[Chapter 4](./04-dashboard-and-modals.md)** | **Monitoring Dashboard & History Modal** | Building the complete `app/dashboard/page.js` with live stats (Online/Offline/Latency), Add URL form, status pills, and the interactive Heartbeat ping history modal. |
| **[Chapter 5](./05-run-and-test-fullstack.md)** | **Full-Stack Run & End-to-End Verification** | Running backend + frontend together, testing the complete workflow, and fixing common full-stack issues (CORS, network errors, stale cache). |

---

## 💡 Key JavaScript & React Concepts You Will Master

- **React State Management (`useState`)**: Handling form input states, monitor arrays, modal visibility, and dynamic calculation metrics.
- **Side Effects & Auth Guards (`useEffect`)**: Protecting routes by checking `localStorage` tokens on component mount and redirecting unauthorized users.
- **Controlled Forms**: Handling text inputs, real-time validations, and async form submission preventing default page reloads (`e.preventDefault()`).
- **Array Aggregation (`filter`, `reduce`)**: Dynamically computing total monitors, online count, offline count, and average response latency directly from the monitors array in real time.
- **Modal Portals & Backdrop Click**: Opening interactive overlays and handling backdrop dismissals (`e.stopPropagation()`).
- **Zero-Dependency Vanilla CSS**: Professional dark-mode UI built 100% with CSS variables, Flexbox layouts, and custom status pills without needing Tailwind or Bootstrap.

👉 **Ready to begin? Start with [Chapter 1: Next.js Setup, Layout & Design System](./01-nextjs-setup-and-styling.md)!**
