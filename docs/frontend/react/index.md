# React.js Engineering Roadmap

> A beginner-friendly, hands-on guided roadmap taking you from setting up a lightning-fast React application with Vite to mastering state, form handling, API integration, and client-side routing.

---

## 1. The Big Picture: What is React and Why Do We Need It?

When you build websites with traditional JavaScript, updating the screen requires **manual, step-by-step instructions** (called *Imperative Programming*):

```javascript
// The Old Way (Vanilla JS): Manual, repetitive, and error-prone
const button = document.querySelector('#btn');
const counterDisplay = document.querySelector('#count');

let count = 0;
button.addEventListener('click', () => {
  count++;
  counterDisplay.textContent = count; // You have to remember to update the DOM manually!
});
```

As an application grows to have dozens of buttons, inputs, notifications, and modals, keeping track of every single HTML element manually becomes a nightmare. If you forget to update one element, your UI goes out of sync with your data.

### The React Way: Declarative UI

**React** was created by Facebook to solve this exact problem. Instead of telling the browser *how* to change the DOM step by step, you simply tell React:

> *"Here is what my UI should look like based on my current data. Whenever the data changes, you update the screen automatically."*

```text
┌─────────────────────────────────────────────────────────────┐
│                 THE REACT DATA-DRIVEN MODEL                 │
│                                                             │
│       Data / State  ──▶  React Component  ──▶  Screen (UI)  │
│            │                                       │        │
│            └──── If Data Changes, Screen Updates ──┘        │
│                  (Automatically & Instantly)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Why Learn Pure React Before Jumping to Next.js?

Many beginners try to jump straight into **Next.js** without understanding React first. This almost always leads to confusion because:

1. **Next.js is built on top of React**: Next.js uses the exact same components, JSX, props, `useState`, `useEffect`, and event handlers.
2. **Next.js adds server-side rules**: In Next.js, you have Server Components, Client Components, Server Actions, and special cache layers. If you do not yet know how React works on the client, debugging Next.js errors becomes ten times harder.
3. **Pure React gives you solid foundations**: Understanding client-side state, form handling, API fetching, and client routing gives you the confidence to build any modern frontend application.

```text
┌──────────────────────────────────────────────────────────────────┐
│                   YOUR LEARNING PATHWAY                          │
│                                                                  │
│  [ HTML & CSS ] ──▶ [ JavaScript ES6+ ] ──▶ [ React.js (Pure) ]  │
│                                                     │            │
│                                                     ▼            │
│                                              [ Next.js 14/15 ]   │
│                                           (Full-Stack Production)│
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. The 4-Part Guided Curriculum

This track is divided into 4 clear, beginner-friendly chapters designed to give you complete practical confidence:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        THE 4 REACT CHAPTERS                            │
├────────────────────────────────────────────────────────────────────────┤
│  Chapter 1: Vite Setup & Core Essentials                               │
│  Spinning up Vite, project anatomy, JSX syntax rules, components,      │
│  props, conditional rendering, and rendering lists with keys.          │
├────────────────────────────────────────────────────────────────────────┤
│  Chapter 2: State, Events & Form Handling                              │
│  Mastering useState, how re-renders work, event handlers, and a        │
│  deep-dive into controlled forms with real-time validation.            │
├────────────────────────────────────────────────────────────────────────┤
│  Chapter 3: Lifecycle & API Fetching                                   │
│  Mastering useEffect, dependencies, cleanup functions, and fetching    │
│  GET APIs safely with loading, error, and data states.                 │
├────────────────────────────────────────────────────────────────────────┤
│  Chapter 4: Client-Side Routing with React Router DOM                  │
│  BrowserRouter, Routes, Route, Link, NavLink, URL parameters           │
│  (useParams), programmatic navigation (useNavigate), and 404 pages.    │
└────────────────────────────────────────────────────────────────────────┘
```

---

### [Chapter 1: Vite Setup & Core Essentials](/frontend/react/01-setup-and-core-essentials)
* **What you will learn**:
  * How to set up a brand new React project in under 10 seconds using **Vite** (`npm create vite@latest`).
  * What each file and folder does in the project structure (`index.html`, `src/main.jsx`, `src/App.jsx`).
  * How JSX works and the 5 critical rules you must follow.
  * Creating reusable functional components.
  * Passing data between components using **Props**.
  * Showing and hiding elements conditionally with the ternary operator and `&&`.
  * Rendering dynamic lists with `.map()` and understanding the `key` prop.
  * Styling components using clean, **pure CSS** (no Tailwind required).

👉 **[Start Chapter 1: Vite Setup & Core Essentials →](/frontend/react/01-setup-and-core-essentials)**

---

### [Chapter 2: State, Events & Form Handling](/frontend/react/02-state-and-events)
* **What you will learn**:
  * What "State" is and why regular JavaScript variables cannot trigger screen updates.
  * The `useState` hook explained simply with the "Blueprint and Painting" analogy.
  * Handling user interactions with `onClick`, `onChange`, and synthetic events.
  * The rule of state immutability (never modify state directly!).
  * How to handle forms the React way with **Controlled Components**.
  * Managing multiple form inputs with a single, clean state object.
  * Validating user input and displaying friendly error messages.
  * Building a complete, real-world **User Feedback & Registration Form** styled with pure CSS.

👉 **[Explore Chapter 2: State, Events & Forms →](/frontend/react/02-state-and-events)**

---

### [Chapter 3: Lifecycle & API Fetching](/frontend/react/03-lifecycle-and-api-fetching)
* **What you will learn**:
  * What "Side Effects" are in a web application.
  * The `useEffect` hook demystified: When does it run and why?
  * The 3 dependency array patterns (no dependencies, `[]`, and `[dependencies]`).
  * The cleanup function to prevent memory leaks and duplicate network requests.
  * How to fetch real-world data from a backend GET API using native `fetch`.
  * The 3 mandatory states for every data request: **Loading**, **Error**, and **Success (Data)**.
  * Building a complete **User Directory App** that fetches real profiles from a public API with a loading spinner and error recovery.

👉 **[Master Chapter 3: Lifecycle & API Fetching →](/frontend/react/03-lifecycle-and-api-fetching)**

---

### [Chapter 4: Client-Side Routing with React Router DOM](/frontend/react/04-react-router-dom)
* **What you will learn**:
  * What a Single Page Application (SPA) is and why client-side routing feels instantaneous.
  * Installing and configuring `react-router-dom` in your Vite project.
  * Creating multi-page routes with `<Routes>` and `<Route>`.
  * Navigating seamlessly with `<Link>` and `<NavLink>` without full browser page reloads.
  * Highlighting active navigation tabs using pure CSS.
  * Creating dynamic detail pages using URL parameters (`/products/:id`) and `useParams()`.
  * Navigating through code using `useNavigate()` (e.g., redirecting after a form submission).
  * Catch-all routes for beautiful custom 404 "Page Not Found" screens.
  * Building a multi-page website with a shared navigation layout and content outlet.

👉 **[Complete Chapter 4: React Router DOM →](/frontend/react/04-react-router-dom)**

---

## 4. Prerequisites Checklist

Before diving into React, make sure you feel comfortable with:

- [x] **HTML**: Tags, forms, inputs, and attributes.
- [x] **CSS**: Box model, Flexbox, classes, and basic responsive layout.
- [x] **JavaScript ES6+**:
  - `const` and `let`
  - Arrow functions (`() => {}`)
  - Template literals (`` `Hello ${name}` ``)
  - Destructuring (`const { name, age } = person` and `const [first, second] = list`)
  - Array methods: `.map()` and `.filter()`
  - The Spread operator (`...`)
  - Promises and `async` / `await`

If you need a quick refresher on any of these JavaScript concepts, visit our **[Modern JavaScript for React Guide](/frontend/javascript/modern-javascript-for-react)** first.

Whenever you're ready, let's start with **[Chapter 1: Vite Setup & Core Essentials](/frontend/react/01-setup-and-core-essentials)**!
