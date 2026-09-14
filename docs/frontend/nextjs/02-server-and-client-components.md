# 2. Server Components, Client Components, useState & useEffect

> Master the dual-runtime architecture of Next.js, learn React's foundational hooks (`useState` & `useEffect`) from first principles, and understand how to build fast, interactive user interfaces with pure CSS.

---

## 1. The Big Mental Model: Two Runtimes, One Framework

In traditional React (like Create React App or Vite), every single component was executed in the user's web browser. Whether a component was a dynamic interactive button or just a static footer paragraph, the browser had to download, parse, and execute the JavaScript for both.

Next.js introduces a revolutionary architecture: **React Server Components (RSC)**.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE NEXT.JS DUAL-RUNTIME                                 │
│                                                                                        │
│   SERVER RUNTIME (Node.js / Cloud Server)      CLIENT RUNTIME (User's Web Browser)     │
│   ┌─────────────────────────────────────┐      ┌────────────────────────────────────┐  │
│   │ Server Component (Default)          │      │ Client Component ('use client')    │  │
│   │                                     │      │                                    │  │
│   │ • Runs on your server only          │      │ • Runs on server for initial HTML  │  │
│   │ • Direct database & file access     │ ───► │ • Hydrates in the browser          │  │
│   │ • Keeps secret API tokens safe      │      │ • Handles user clicks & inputs     │  │
│   │ • 0 Kilobytes sent to browser!      │      │ • Uses useState & useEffect        │  │
│   └─────────────────────────────────────┘      └────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **The Golden Rule of Next.js App Router:**  
> By default, **EVERY component inside the `app/` directory is a Server Component** unless you explicitly add `'use client'` at the very top of the file!

---

## 2. Server Components: Why They Are The Default

Here is a basic Server Component:

```jsx
// app/components/ServerCard.js
// (No 'use client' at the top = this is a Server Component!)

export default function ServerCard() {
  const timestamp = new Date().toLocaleTimeString();

  return (
    <div className="server-card">
      <h3 className="card-title">Server Rendered Card</h3>
      <p className="card-desc">
        Computed on server at: <span className="time-badge">{timestamp}</span>
      </p>
    </div>
  );
}
```

```css
/* Pure CSS in app/globals.css */
.server-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.card-desc {
  margin-top: 8px;
  color: #64748b;
}

.time-badge {
  font-family: monospace;
  color: #4f46e5;
  font-weight: 600;
  background-color: #eef2ff;
  padding: 2px 6px;
  border-radius: 4px;
}
```

### Why Server Components are Powerful:
1. **0 Kilobytes of Client JavaScript:** The server executes the function, renders clean HTML, and sends that HTML to the browser. Zero component JavaScript is shipped to the user!
2. **Safe Database & API Keys:** You can query PostgreSQL, MongoDB, or read secrets (`process.env.SECRET_KEY`) safely because this code **never runs on the user's computer**.

---

## 3. Client Components: Adding Interactivity with `'use client'`

What if you need a button that increments a number when clicked, a dropdown menu that toggles open, or an input field that searches as you type?

Because Server Components run strictly on the server, they **cannot listen to browser clicks** like `onClick` or manage reactive in-memory state with hooks like `useState()`.

To enable client interactivity, write `'use client'` as the **very first line** of your file:

```jsx
'use client'; // <-- Declares this module as a Client Component!

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)} className="btn-counter">
      Clicked {count} times
    </button>
  );
}
```

```css
/* Pure CSS */
.btn-counter {
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.btn-counter:hover {
  background-color: #4338ca;
  transform: translateY(-1px);
}
```

### What is "Hydration"?
Client Components do **not** run only on the client:
1. **Server Pass:** Next.js pre-renders your Client Component on the server into static HTML so the user sees it immediately without a blank loading screen.
2. **Browser Download:** The browser downloads the lightweight JavaScript for that component.
3. **Hydration:** React "wakes up" the static HTML in the browser by binding the `onClick` event listener and the `useState` memory hook to the DOM node.

---

## 4. Deep Dive: The `useState` Hook Masterclass

### What is "State"?
In plain JavaScript, if you create a local variable inside a function:
```javascript
function greet() {
  let name = 'Alice';
}
```
When `greet()` finishes executing, `name` is wiped from memory.

In React, **State is the component's persistent memory**. When state changes:
1. React remembers the new value.
2. React re-runs your component function (**re-renders** it).
3. React calculates what changed and updates **only that specific part of the DOM**!

---

### Syntax Anatomy of `useState`

```javascript
const [value, setValue] = useState(initialValue);
```

```text
  const [ count,   setCount  ] = useState(0);
           │          │                    │
           │          │                    └─ Initial value when component first mounts
           │          └────────────────────── Function used to update the state
           └───────────────────────────────── Current state value (read-only!)
```

### The Rules of `useState`:
1. **Never mutate state directly!**
   * ❌ `count = count + 1;` (React will NOT know it changed; screen will not update!)
   * ✅ `setCount(count + 1);` (Notifies React to re-render!)
2. **Updating Based on Previous State (Functional Updates):**
   If your new state depends on the old state, use the updater callback:
   ```javascript
   setCount(prevCount => prevCount + 1);
   ```

---

### Practical Example: Interactive Accordion FAQ with Pure CSS

```jsx
// app/components/Accordion.js
'use client';

import { useState } from 'react';

export default function Accordion({ question, answer }) {
  // Boolean state: true = open, false = closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="accordion-header"
      >
        <span className="accordion-question">{question}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>

      {/* Conditionally render answer when isOpen is true */}
      {isOpen && (
        <div className="accordion-body">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
```

```css
/* Pure CSS for Accordion */
.accordion-item {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
}

.accordion-header:hover {
  background-color: #f8fafc;
}

.accordion-icon {
  font-size: 1.25rem;
  color: #4f46e5;
  font-weight: 700;
}

.accordion-body {
  padding: 0 20px 16px;
  color: #475569;
  font-size: 0.9375rem;
  line-height: 1.6;
}
```

---

### 💡 What JavaScript Concepts Are We Using Here?
1. **Array Destructuring:** Extracting elements from the array returned by `useState()`:
   ```javascript
   const [isOpen, setIsOpen] = useState(false);
   ```
2. **Closures:** The inline arrow function `() => setIsOpen(!isOpen)` captures the current value of `isOpen`.
3. **Short-Circuit Evaluation (`&&`):** `{isOpen && <div className="...">}`: In JavaScript, `true && expression` evaluates to the expression, while `false && expression` evaluates to `false` (which React ignores and renders nothing).

---

### 🔄 How We Had to Do This in Vanilla JavaScript

Before React and `useState`, how did we toggle an accordion in vanilla JS?

```html
<!-- Vanilla HTML -->
<div class="accordion">
  <button id="acc-btn">
    <span>What is Next.js?</span>
    <span id="acc-icon">+</span>
  </button>
  <div id="acc-content" style="display: none;">
    <p>Next.js is a full-stack framework.</p>
  </div>
</div>

<script>
  // Vanilla JavaScript (Manual, Imperative DOM Mutation)
  let isExpanded = false;
  const button = document.querySelector('#acc-btn');
  const icon = document.querySelector('#acc-icon');
  const content = document.querySelector('#acc-content');

  button.addEventListener('click', () => {
    isExpanded = !isExpanded;

    if (isExpanded) {
      content.style.display = 'block';
      icon.textContent = '−';
    } else {
      content.style.display = 'none';
      icon.textContent = '+';
    }
  });
</script>
```

#### The Problem with the Vanilla Approach:
* If you have 10 accordions, you had to write loops, attach event listeners to every single element, and manually synchronize the icon symbol and display style.
* With `useState`, you write the component once, and each instance manages its own independent state automatically!

---

## 5. Deep Dive: The `useEffect` Hook Masterclass

### What is a "Side Effect"?
React components are supposed to be **pure functions**: given inputs (`props`), they should calculate and return UI markup.

However, in the real world, applications need to do things **outside** of this pure rendering process:
* Starting a timer with `setInterval`.
* Listening to browser events like `window.addEventListener('resize')`.
* Updating the browser tab's title: `document.title = 'Hello'`.
* Reading or saving to `localStorage`.

These outside actions are called **Side Effects**. The **`useEffect`** hook tells React:  
*"Run this piece of code AFTER you have rendered my component to the screen."*

---

### Syntax Anatomy of `useEffect`

```javascript
import { useEffect } from 'react';

useEffect(() => {
  // 1. Effect Code: Runs AFTER the component renders
  
  return () => {
    // 2. Optional Cleanup Code: Runs when component unmounts or before re-running
  };
}, [/* 3. Dependency Array */]);
```

---

### The 3 Dependency Array Scenarios (Crucial to Understand!)

The second argument to `useEffect` is the **Dependency Array**. It controls **when** the effect runs:

| Scenario | Code | When It Runs | Common Use Case |
| :--- | :--- | :--- | :--- |
| **1. Empty Array `[]`** | `useEffect(() => { ... }, [])` | Runs **ONCE** when component mounts. | Setting up a timer, attaching global window event listeners. |
| **2. With Dependencies `[value]`** | `useEffect(() => { ... }, [search])` | Runs on mount **AND** whenever `search` changes. | Auto-saving when an input changes, syncing local storage. |
| **3. No Array (Omitted)** | `useEffect(() => { ... })` | Runs on **EVERY SINGLE RENDER**. | Logging / profiling (Use with extreme caution—can cause infinite loops!). |

---

### The Cleanup Function (Preventing Memory Leaks!)

If your effect subscribes to an event listener or starts a timer, you **must return a cleanup function**. Otherwise, when the user navigates to another page, the timer or event listener keeps running in the background, consuming CPU and causing memory leaks!

```jsx
// app/components/WindowSizeTracker.js
'use client';

import { useState, useEffect } from 'react';

export default function WindowSizeTracker() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // 1. Set initial width
    setWindowWidth(window.innerWidth);

    // 2. Define event listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 3. Attach listener to the browser window
    window.addEventListener('resize', handleResize);

    // 4. CLEANUP FUNCTION: Runs when component is removed from the DOM!
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array = setup once on mount, cleanup on unmount!

  return (
    <div className="tracker-card">
      <h4 className="tracker-title">Live Viewport Width</h4>
      <p className="tracker-value">{windowWidth}px</p>
    </div>
  );
}
```

```css
/* Pure CSS */
.tracker-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  max-width: 280px;
}

.tracker-title {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
}

.tracker-value {
  font-size: 2rem;
  font-weight: 800;
  color: #4f46e5;
  margin-top: 6px;
}
```

---

### ⚠️ When NOT to Use `useEffect` in Next.js

In older React tutorials, developers used `useEffect` to fetch data from APIs:
```javascript
// ❌ OLD REACT SPA WAY (Do NOT do this in Next.js!)
useEffect(() => {
  fetch('/api/posts').then(res => res.json()).then(data => setPosts(data));
}, []);
```

**In Next.js, you do NOT need `useEffect` for data fetching!**  
Instead, you write direct `async/await` inside Server Components (as we will master in Chapter 3). It is faster, has zero loading flickers, and ships 0kb of JavaScript to the user.

**Use `useEffect` ONLY for:**
* Event listeners (`window.addEventListener`).
* Timers (`setInterval`, `setTimeout`).
* Browser APIs (`localStorage`, `sessionStorage`, Canvas API, Web Audio).

---

## 6. Composition Pattern: "Push Client Logic to the Leaves"

To keep your Next.js application blazing fast, follow the **Leaf Component Pattern**:
* Keep your main pages (`app/page.js`, `app/layout.js`) as **Server Components**.
* Only create small, isolated Client Components for the interactive parts, and import them.

```text
┌─────────────────────────────────────────────────────────────┐
│  app/page.js (SERVER COMPONENT - 0kb JS)                    │
│                                                             │
│  <h1 className="hero-title">Welcome to DevStudio</h1>       │
│  <p className="hero-text">Fast full-stack architecture.</p> │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ <Accordion />  <-- Only this interactive component   │  │
│  │                    is a Client Component ('use client')│  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Passing Server Components as `children`
You can wrap a Client Component around Server Components by using the `children` prop:

```jsx
// app/components/CollapsibleContainer.js
'use client';

import { useState } from 'react';

export default function CollapsibleContainer({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="collapsible-box">
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="btn-toggle"
      >
        {collapsed ? 'Show Details' : 'Hide Details'}
      </button>

      {!collapsed && <div className="collapsible-content">{children}</div>}
    </div>
  );
}
```

Now inside your Server Component:

```jsx
// app/page.js (Server Component)
import CollapsibleContainer from './components/CollapsibleContainer';

export default function HomePage() {
  return (
    <main className="container">
      <CollapsibleContainer>
        {/* This paragraph renders on the SERVER even though it's inside a Client Component! */}
        <p>This is heavy server-rendered content with zero client bundle impact!</p>
      </CollapsibleContainer>
    </main>
  );
}
```

---

## 7. When to Use What? (Summary Decision Matrix)

| Task / Requirement | Server Component (Default) | Client Component (`'use client'`) |
| :--- | :---: | :---: |
| Fetch data from an API or database | ✅ **YES** (Faster, zero client JS) | ❌ No |
| Access backend environment secrets (`process.env.SECRET`) | ✅ **YES** (Secure) | ❌ No (Exposes keys to browser!) |
| Read directly from database / filesystem | ✅ **YES** | ❌ No |
| Store interactive state with `useState` | ❌ No | ✅ **YES** |
| Register side effects with `useEffect` | ❌ No | ✅ **YES** |
| Listen to clicks/inputs (`onClick`, `onChange`) | ❌ No | ✅ **YES** |
| Access browser objects (`window`, `localStorage`) | ❌ No | ✅ **YES** |

---

## Chapter 2 Summary & Next Steps

In this chapter, you mastered:
1. The **Server Component default**: zero client bundle size and instant HTML.
2. How to opt into client reactivity using `'use client'` and how **hydration** attaches event listeners to DOM nodes.
3. How **`useState`** provides persistent component memory and declarative UI updates.
4. How **`useEffect`** handles side effects, how the dependency array works, and why cleanup functions prevent memory leaks.
5. How to style interactive components cleanly with **Pure CSS**.
6. The **Leaf Composition Pattern** to keep your application ultra-fast.

Now that you understand components and hooks, let's learn how to connect your app to real data and backend APIs:  
👉 **[Chapter 3: Data Fetching, Dynamic Rendering & Route Handlers](./03-data-fetching-and-apis)**!
