# 100 React.js Theoretical Interview Questions

> A comprehensive master collection of 100 theoretical React.js interview questions with in-depth technical explanations, categorized into 50 Basic and 50 Intermediate to Advanced questions.

---

## 📑 Index & Question Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic & Foundational React.js**](#part-1-basic-foundational-reactjs-questions-1-50) | Q1 – Q50 | Declarative UI, Virtual DOM, JSX rules, Functional Components, Props vs State, `useState`, immutability, updater functions, re-rendering triggers, Fragments, conditional rendering, list keys, Synthetic Events, controlled vs uncontrolled inputs, form handling, Vite vs CRA, StrictMode, SPA principles |
| [**Part 2: Intermediate & Advanced React.js**](#part-2-intermediate-to-advanced-reactjs-questions-51-100) | Q51 – Q100 | `useEffect` lifecycle & dependencies, cleanup functions, data fetching patterns, `useRef`, `useMemo` & `useCallback`, `React.memo`, Fiber reconciliation tree, Concurrent React, automatic batching, `useTransition` & `useDeferredValue`, Error Boundaries, Suspense & lazy loading, Context API, Custom Hooks, Portals, React Router DOM, SSR hydration, React Server Components (RSC), memory leak prevention |

---

# Part 1: Basic & Foundational React.js (Questions 1 – 50)

### Q1: What is React and what primary problems does it solve?
**Answer:** React is an open-source, component-based front-end JavaScript library created by Meta (Facebook) for building dynamic user interfaces. 
Traditional web development relied on **imperative DOM manipulation** (e.g. `document.getElementById()`, `element.appendChild()`), which becomes fragile, repetitive, and difficult to synchronize as applications grow. React solves this by introducing:
1. **Declarative UI**: You define what the UI should look like based on data; React updates the DOM automatically when data changes.
2. **Component-Driven Architecture**: UIs are broken into modular, reusable, self-contained bricks.
3. **Virtual DOM**: An in-memory representation of the DOM that minimizes expensive browser reflows and repaints.

---

### Q2: What is Declarative Programming versus Imperative Programming in React?
* **Imperative Programming**: You specify *how* to achieve a result step-by-step. 
  *(Example in Vanilla JS: Find the button, listen for clicks, get the paragraph element, increment a counter variable, and update `paragraph.textContent` manually).*
* **Declarative Programming**: You specify *what* the final UI should look like for any given state. 
  *(Example in React: `<h2>{count}</h2>`. You only update the data `setCount(count + 1)`, and React automatically handles how the browser updates).*

---

### Q3: What is the Virtual DOM and how does it work?
**Answer:** The **Virtual DOM (VDOM)** is a lightweight JavaScript object representation of the real browser DOM kept in memory and synced with the "real" DOM by a library such as ReactDOM.
* Directly updating the real DOM is computationally expensive because the browser must recalculate styles, layout, and repaint pixels.
* When state changes in React, a new Virtual DOM tree is constructed in memory.
* React compares the new Virtual DOM tree with the previous snapshot using a process called **Diffing**.
* React calculates the minimal set of changes and batches updates to the real DOM, ensuring high performance.

---

### Q4: What is Reconciliation in React?
**Answer:** Reconciliation is the recursive algorithm React uses to compare two Virtual DOM trees (the previous snapshot and the newly rendered snapshot) and determine which sub-trees or DOM nodes need to be inserted, updated, or removed. React uses heuristic rules (like component type comparison and unique `key` props) to achieve this diffing process in linear $O(n)$ time complexity rather than $O(n^3)$.

---

### Q5: What is JSX and why do we use it?
**Answer:** **JSX** stands for **JavaScript XML**. It is an ECMAScript syntax extension that allows developers to write HTML-like markup directly inside JavaScript files.
* JSX provides a visual, co-located syntax uniting markup and component logic.
* Browsers cannot execute JSX directly; tools like Vite, Babel, or SWC compile JSX into standard `React.createElement()` or `_jsx()` function calls before running in the browser.

---

### Q6: Can browsers read JSX natively? How is JSX compiled?
**Answer:** No. Web browsers only understand standard JavaScript, HTML, and CSS. JSX is transformed at build time by compilers (Babel, SWC, ESBuild in Vite).
For example:
```jsx
// What you write:
<h1 className="title">Hello World</h1>

// What the compiler outputs:
React.createElement('h1', { className: 'title' }, 'Hello World');
```

---

### Q7: What is a React Component?
**Answer:** A component is an independent, reusable, self-contained block of code that accepts arbitrary inputs (called **props**) and returns React elements describing what should appear on the screen. Components allow developers to build complex applications by composing small, testable pieces.

---

### Q8: What is the difference between Functional Components and Class Components?
| Feature | Functional Components | Class Components (Legacy) |
| :--- | :--- | :--- |
| **Syntax** | Plain JavaScript functions returning JSX | ES6 classes extending `React.Component` |
| **State Management** | Handled with `useState` hook | Managed via `this.state` and `this.setState()` |
| **Lifecycle** | Handled with `useEffect` hook | Lifecycle methods (`componentDidMount`, etc.) |
| **Performance** | Less boilerplate, smaller bundle size | More boilerplate, complex `this` binding |
| **Current Standard** | Official modern industry standard | Maintained for legacy compatibility |

---

### Q9: What are Props in React?
**Answer:** **Props** (short for *properties*) are read-only inputs passed from a parent component down to a child component. They function identically to arguments passed into a JavaScript function and allow components to be dynamic and reusable across different contexts.

---

### Q10: Are Props mutable or immutable? Why?
**Answer:** Props are strictly **immutable (read-only)**. A component must never modify its own props. React follows a strict rule of **pure functions**: given the same inputs (props), a component should always return the same output without modifying the input arguments. Modifying props breaks one-way data flow and makes bugs unpredictable.

---

### Q11: What is "Prop Drilling" and why is it considered a drawback?
**Answer:** Prop drilling occurs when data needs to be passed from a high-level ancestor component down to a deeply nested descendant component through intermediary components that have no interest in the data themselves. It clutters component signatures, couples unrelated components, and makes refactoring painful. It is resolved using State Lifting, Component Composition (`children`), or Context API.

---

### Q12: What is the `children` prop?
**Answer:** `children` is a special prop automatically passed to every component representing whatever JSX content is placed between its opening and closing tags (e.g. `<Card><p>Hello</p></Card>`). It enables **Component Composition**, allowing generic container components (layouts, cards, modals) to wrap arbitrary content without hardcoding child components.

---

### Q13: How do you set default values for Props in modern functional components?
**Answer:** The modern standard is using standard JavaScript **ES6 Default Parameter Values** directly inside the destructured function signature:
```jsx
function Button({ text = "Click Me", color = "primary" }) {
  return <button className={color}>{text}</button>;
}
```

---

### Q14: What is State in React and how is it different from normal variables?
**Answer:** **State** is an internal, private data store managed inside a component that represents data that can change over time based on user interactions, network responses, or timers.
* Normal variables declared with `let` or `const` reset on every render and changes to them **do not** notify React.
* State variables managed via `useState` are preserved across renders, and updating state notifies React to schedule a **re-render** and update the visual screen.

---

### Q15: What is the difference between Props and State?
| Feature | Props | State |
| :--- | :--- | :--- |
| **Origin** | Passed from outside (Parent component) | Initialized and owned inside the component |
| **Mutability** | Immutable (Read-only for the receiver) | Mutable via setter function (`setState`) |
| **Control** | Controlled by whoever renders the component | Controlled by the component itself |
| **Re-renders** | Changes trigger a child re-render | Updates trigger a local component re-render |

---

### Q16: What is a React Hook and why were Hooks introduced?
**Answer:** A Hook is a special built-in function provided by React (starting with `use`, e.g., `useState`, `useEffect`) that lets functional components "hook into" React state and lifecycle features.
Introduced in React 16.8, Hooks eliminated the need for Class components, simplified logic reuse without complex Higher-Order Components or Render Props, and solved issues with `this` binding.

---

### Q17: What are the two golden Rules of Hooks?
**Answer:**
1. **Only call Hooks at the top level**: Never call Hooks inside loops, conditions (`if`), or nested functions. Hooks must be called in the exact same order on every render so React can correctly track their state.
2. **Only call Hooks from React functions**: Call them from React functional components or custom hooks, never from regular JavaScript functions.

---

### Q18: What is the `useState` hook and how does it work?
**Answer:** `useState` is a built-in React hook that allows functional components to declare state variables. It takes the initial state as an argument and returns an array containing two items:
1. The current state value.
2. A dispatcher/setter function to update the state value and trigger a component re-render.
```jsx
const [count, setCount] = useState(0);
```

---

### Q19: Why must you never mutate state directly in React?
**Answer:** Directly modifying state (e.g. `user.age = 25` or `items.push('item')`) modifies the existing object in memory without changing its reference. React's reconciliation engine uses shallow object comparison (`Object.is`) to check if state changed. If the reference is unchanged, React assumes nothing happened and **will not re-render the screen**. Always provide a brand new object or array (e.g., using spread `...`).

---

### Q20: What is an Updater Function in `useState` and when should you use it?
**Answer:** An updater function is when you pass a callback function to the state setter instead of a raw value: `setCount(prev => prev + 1)`.
You must use it whenever the new state depends on the previous state. Because state updates are batched asynchronously, reading raw state can capture stale values if multiple updates occur in rapid succession.

---

### Q21: What causes a React component to re-render?
**Answer:** A React component re-renders when:
1. Its internal **State** changes via a state setter (`setState`).
2. Its **Props** change (passed from parent).
3. Its **Parent component** re-renders.
4. A **Context** value it subscribes to changes.

---

### Q22: When a parent component re-renders, do all its children re-render?
**Answer:** Yes, by default in React, when a parent component re-renders, every component in its child tree will re-render recursively, regardless of whether their props changed. This can be prevented for heavy children using `React.memo()`.

---

### Q23: What is a React Fragment (`<>...</>`) and why is it useful?
**Answer:** A Fragment (`<React.Fragment>` or shorthand `<> ... </>`) allows you to group a list of children elements together without adding an extra node (like a redundant `<div>`) to the real HTML DOM. It prevents invalid HTML nesting (such as extra divs inside `<table>` or `<ul>`) and keeps the DOM tree clean.

---

### Q24: Why must a React component return a single root JSX element?
**Answer:** Because JSX compiles to plain JavaScript function calls (`React.createElement()`). A JavaScript function can only return **one** value (one object). If you return multiple sibling elements without a container, it would be equivalent to returning multiple values from a function without an array or wrapper, which is a syntax error.

---

### Q25: Why do we use `className` instead of `class` in JSX?
**Answer:** Because JSX is JavaScript, and `class` is a reserved keyword in JavaScript used to declare ES6 classes (e.g., `class User {}`). To avoid syntactic ambiguity, React uses `className` to set the HTML `class` attribute.

---

### Q26: Why do we use `htmlFor` instead of `for` in JSX `<label>`?
**Answer:** Similar to `class`, `for` is a reserved keyword in JavaScript used for `for` loops (e.g. `for (let i = 0; ...)`). Therefore, JSX uses `htmlFor` to map to the HTML `for` attribute.

---

### Q27: How does Conditional Rendering work in React?
**Answer:** Conditional rendering in React works the same way conditions work in JavaScript:
1. **Ternary Operator (`condition ? <A /> : <B />`)**: Used to choose between two components.
2. **Logical AND (`condition && <A />`)**: Used to render a component only when a condition is true.
3. **If/Else with Early Return**: Returning early before the main JSX block.

---

### Q28: What is the pitfall of using `0 && <Component />` in React?
**Answer:** In JavaScript, `0 && <Component />` evaluates to the falsy expression itself, which is the number `0`. Instead of rendering nothing, React will render the visible number `0` on your screen! To fix this, always use an explicit boolean: `count > 0 && <Component />`.

---

### Q29: How do you render lists in React?
**Answer:** In React, lists are rendered using JavaScript's native `.map()` array method inside curly braces `{}`. Each iteration returns a JSX element representing one item in the list.

---

### Q30: What is the `key` prop and why is it mandatory when rendering lists?
**Answer:** A `key` is a unique string or number attribute assigned to each element in an iterated list. It helps React identify which items have changed, been added, or been removed during reconciliation. Without keys, React is forced to re-render the entire list instead of surgically updating only the modified DOM node.

---

### Q31: Why is using an array index as a `key` considered an anti-pattern?
**Answer:** If items in the list can be reordered, inserted, or deleted, an item's index will change. If keys change between renders, React confuses the identities of list items, causing bugs with component state, uncontrolled inputs, and performance degradation. Always use a unique, stable business ID (e.g., `item.id`).

---

### Q32: What are Synthetic Events in React?
**Answer:** Synthetic Events are React's cross-browser wrappers around native browser DOM events. They provide a unified API that behaves identically across all web browsers (Chrome, Safari, Firefox, Edge). They attach event listeners to the root container rather than individual DOM nodes using event delegation.

---

### Q33: How is event handling in React different from native HTML DOM?
1. React events use **camelCase** naming (`onClick` instead of `onclick`).
2. You pass a **function reference** rather than a string (`onClick={handleClick}` instead of `onclick="handleClick()"`).
3. Returning `false` does not prevent default behavior in React; you must explicitly call `e.preventDefault()`.

---

### Q34: What does `e.preventDefault()` do in React forms?
**Answer:** In standard HTML, submitting a `<form>` triggers an HTTP POST/GET request and reloads the entire webpage. In React Single-Page Applications, `e.preventDefault()` stops this default browser behavior so JavaScript can process the form data asynchronously without refreshing the page and losing state.

---

### Q35: What does `e.stopPropagation()` do in React?
**Answer:** It stops the event from bubbling up the DOM tree to parent elements that have click listeners attached.

---

### Q36: What is a Controlled Component?
**Answer:** A controlled component is an input element (like `<input>`, `<textarea>`, or `<select>`) whose current value is driven directly by React **state**, and whose changes trigger state updates via `onChange`. React serves as the "Single Source of Truth" for the input.

---

### Q37: What is an Uncontrolled Component and when would you use it?
**Answer:** An uncontrolled component stores its value internally in the browser's DOM rather than in React state. You access its current value using a **`useRef`** reference when needed (such as on form submit). It is used for quick scripts, non-React library integrations, or file input fields (`<input type="file" />`), which are inherently read-only for security reasons.

---

### Q38: What is the "Single Source of Truth" concept in React forms?
**Answer:** It means that the form data exists in only one authoritative location: the component's React state. The DOM input simply reflects this state. This makes validation, disabling submit buttons, formatting text, and resetting forms predictable and synchronized.

---

### Q39: How do you handle multiple input fields with a single change handler?
**Answer:** By storing all form fields in an object state and using the input's `name` attribute with ES6 **Computed Property Names**:
```jsx
const [formData, setFormData] = useState({ username: '', email: '' });

function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
}
```

---

### Q40: What is `React.StrictMode` and what does it do in development?
**Answer:** `React.StrictMode` is a development-only wrapper tool for highlighting potential problems in an application. It has zero impact on production builds. In development mode, it:
1. Re-runs component renders and `useEffect` hooks **twice** to detect side effects and missing cleanups.
2. Warns about deprecated APIs and legacy patterns.

---

### Q41: Why does `useEffect` execute twice in React 18+ development mode?
**Answer:** React 18+ intentionally mounts, unmounts, and re-mounts components in development mode under StrictMode to test whether your component properly cleans up side effects (like subscriptions, event listeners, and timers). If your effect breaks when run twice, you have a missing cleanup function!

---

### Q42: What is Vite and why is it preferred over Create-React-App (CRA)?
**Answer:** Vite is a modern frontend build tool that leverages native browser ES Modules (`import`/`export`) during development and compiles with Rollup for production.
* CRA bundles the entire app on startup with Webpack, making local server startup slow (30–60s).
* Vite serves source code over native ESM on demand, resulting in near-instant server starts (<300ms) and lightning-fast Hot Module Replacement (HMR).

---

### Q43: What is Hot Module Replacement (HMR)?
**Answer:** HMR is a development server mechanism that exchanges, adds, or removes individual JavaScript modules in a running application without triggering a full page reload. It preserves application state while instantly applying visual code updates.

---

### Q44: What is the main entry point in a standard Vite React project?
**Answer:** `src/main.jsx`. It imports React, ReactDOM, the root `<App />` component, and mounts the application into the `<div id="root"></div>` element located inside `index.html`.

---

### Q45: What does `ReactDOM.createRoot()` do?
**Answer:** Introduced in React 18, `createRoot` initializes the React rendering engine and attaches the React root to a DOM container. It replaces the legacy `ReactDOM.render()` and enables modern Concurrent React features like automatic batching and transitions.

---

### Q46: Can components render `null`, `undefined`, or `booleans`? What is displayed?
**Answer:** Yes. React considers `null`, `undefined`, `true`, and `false` valid render values, but it **renders nothing to the screen**. This allows simple conditional rendering: `{isLoggedIn && <Profile />}`. If you want to display a boolean as text, convert it to a string: `String(true)`.

---

### Q47: How do inline styles work in React? Why do they take an object?
**Answer:** In React, inline styles are passed as a JavaScript object with camelCase properties instead of CSS strings:
```jsx
<div style={{ backgroundColor: 'navy', fontSize: '18px' }}>Content</div>
```
The double curly braces represent a JavaScript object literal `{ ... }` placed inside JSX curly delimiters `{}`.

---

### Q48: How do you import external CSS stylesheets in a React component?
**Answer:** By importing the CSS file directly at the top of the component file:
```jsx
import './Button.css';
```
Vite or Webpack automatically injects the styles into the document `<head>` during runtime and bundles them for production.

---

### Q49: What is a Single-Page Application (SPA)?
**Answer:** An SPA is a web application that loads a single HTML document (`index.html`) on initial visit. Subsequent navigation and user interactions update the contents of the page dynamically via JavaScript without requesting full HTML pages from the server.

---

### Q50: How does client-side routing work compared to traditional server-side routing?
* **Server-Side Routing (MPA)**: Clicking a link requests a new `.html` file from the server; the browser flashes a white screen and reloads.
* **Client-Side Routing (SPA)**: Clicking a `<Link>` changes the browser URL via the HTML5 History API (`pushState`). React Router intercepts the URL change and mounts the matching component in memory instantly without any page refresh.

---

# Part 2: Intermediate & Advanced React.js (Questions 51 – 100)

### Q51: What is the `useEffect` hook and what are Side Effects?
**Answer:** `useEffect` is a React hook designed to perform side effects in functional components. A side effect is anything that interacts with the outside world outside the component's render cycle, such as:
* Data fetching from APIs
* Setting timers or subscriptions
* Manipulating the browser DOM (`document.title`)
* Adding global window event listeners

---

### Q52: What is the execution order of `useEffect` relative to rendering?
**Answer:** `useEffect` runs **after** the browser paints the screen. React calculates the JSX, updates the real DOM, the browser draws the pixels, and only then does React execute the `useEffect` callback. This guarantees that side effects never block visual page rendering.

---

### Q53: What happens when `useEffect` has no dependency array?
**Answer:** If omitted (`useEffect(() => {})`), the effect runs after **every single render** (initial render + every state/prop update). Setting state inside this effect without guards causes an **infinite re-render loop**.

---

### Q54: What happens when `useEffect` has an empty dependency array `[]`?
**Answer:** The effect executes **only once**, immediately after the component mounts onto the screen for the first time. It is the functional equivalent of Class component `componentDidMount`.

---

### Q55: What happens when `useEffect` has variables in its dependency array `[a, b]`?
**Answer:** The effect runs once on mount, and then re-runs whenever any of the listed dependencies (`a` or `b`) change value between renders (based on `Object.is` comparison).

---

### Q56: What is the Cleanup Function in `useEffect` and when does it run?
**Answer:** A cleanup function is a function returned from inside the `useEffect` callback:
```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup function!
}, []);
```
It runs:
1. Right before the component **unmounts** (is removed from the screen).
2. Before the effect re-runs on a dependency change (to clean up the previous effect's state).

---

### Q57: Why cannot the callback passed to `useEffect` be an `async` function?
**Answer:** Because an `async` function implicitly returns a **Promise**. React expects `useEffect` callbacks to return either nothing (`undefined`) or a synchronous **cleanup function**. Returning a Promise breaks React's cleanup mechanism.
To use async/await, declare an async function inside the effect and invoke it immediately:
```jsx
useEffect(() => {
  async function loadData() { ... }
  loadData();
}, []);
```

---

### Q58: How do you prevent race conditions when fetching data in `useEffect`?
**Answer:** If a user rapidly changes a search filter, multiple API requests fire concurrently. If request 1 returns after request 2, stale data overwrites fresh data.
This is prevented using an **`AbortController`** inside the cleanup function:
```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => { if (err.name !== 'AbortError') setError(err); });

  return () => controller.abort(); // Cancel if dependency changes or component unmounts
}, [url]);
```

---

### Q59: What is the `useRef` hook and how is it different from `useState`?
**Answer:** `useRef` returns a mutable object `{ current: initialValue }` that persists across renders.
* **`useState`**: Updating state triggers a component re-render.
* **`useRef`**: Updating `ref.current` **does NOT** trigger a re-render. It is used for storing values that need to be remembered without updating the visual UI.

---

### Q60: What are the two primary use cases of `useRef`?
1. **Accessing underlying DOM elements directly**: (e.g. focusing an input `inputRef.current.focus()`, measuring element scroll height).
2. **Storing mutable instance variables**: (e.g. storing timer IDs `timerRef.current = setInterval(...)` so they can be cleared later without re-rendering).

---

### Q61: What is `useMemo` and when should it be used?
**Answer:** `useMemo` is a hook that memoizes (caches) the **result of a computationally expensive calculation** between renders. It only recalculates the value when one of its dependencies changes:
```jsx
const filteredList = useMemo(() => expensiveSort(items), [items]);
```
It should only be used when calculations are measurably slow or when passing complex reference objects down to memoized child components.

---

### Q62: What is `useCallback` and how does it differ from `useMemo`?
**Answer:**
* **`useMemo`**: Memoizes the **result** of a function call: `useMemo(() => calculate(a, b), [a, b])`.
* **`useCallback`**: Memoizes the **function definition itself**: `useCallback(() => doSomething(a), [a])`.
In JavaScript, functions declared inside components are recreated as new object references on every render. `useCallback` ensures the function reference remains identical unless dependencies change, preventing unnecessary re-renders of memoized children.

---

### Q63: What is "Referential Equality" and how does it cause re-renders?
**Answer:** In JavaScript, two distinct objects or functions with identical properties are never equal by reference: `{} !== {}`.
When a parent re-renders, any inline objects (`{ color: 'red' }`) or functions (`() => handleClick()`) are recreated at new memory addresses. If passed as props, child components see "new" props and re-render even if their visual content hasn't changed.

---

### Q64: What is `React.memo`?
**Answer:** `React.memo` is a Higher-Order Component that wraps a functional component. It performs a shallow comparison of the component's incoming props. If props have not changed, React skips rendering that component and reuses the previous rendered output.

---

### Q65: When should you NOT use `useMemo` and `useCallback`?
**Answer:** Overusing memoization adds memory overhead and increases code complexity. For cheap operations (basic filtering, primitive calculations), the cost of setting up hooks, allocating dependency arrays, and running shallow comparisons is often higher than simply letting React re-render. Only memoize when profiling proves a bottleneck.

---

### Q66: What is the React Fiber architecture?
**Answer:** React Fiber is the complete rewrite of React's core reconciliation engine introduced in React 16. The legacy engine (Stack reconciler) operated synchronously, meaning once a render started, it could not be paused until the entire DOM tree finished, causing UI lag and dropped animation frames.
Fiber structures the component tree as a linked-list of "fiber" nodes, allowing React to:
* Pause work and resume it later
* Assign different priorities to different types of updates (e.g., typing an input has higher priority than loading a list)
* Reuse previously completed work or abort work if no longer needed

---

### Q67: What is Concurrent React?
**Answer:** Introduced in React 18, Concurrent React allows React to interrupt, pause, and resume rendering work in the background without blocking the main browser UI thread. This enables features like transitions and selective hydration.

---

### Q68: What is Automatic Batching in React 18+?
**Answer:** Batching is when React groups multiple state updates into a single re-render for performance.
* In React 17 and earlier, batching only worked inside React event handlers (`onClick`). State updates inside Promises, `setTimeout`, or native events triggered multiple separate re-renders.
* In React 18+, **all** state updates are batched automatically, regardless of where they originate.

---

### Q69: What is the `useTransition` hook and what are "Transitions"?
**Answer:** `useTransition` is a React 18 hook that lets you mark certain state updates as non-urgent transitions:
```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(input); // Marked as low-priority!
});
```
Urgent updates (like user typing in an input) are processed immediately, while non-urgent updates (like filtering 10,000 items) run in the background and can be interrupted if the user types another character.

---

### Q70: What is the `useDeferredValue` hook?
**Answer:** `useDeferredValue` accepts a state value and returns a deferred copy of it that lags behind during urgent updates. It is similar to debouncing, but integrated directly into React's render lifecycle without a fixed millisecond delay.

---

### Q71: What is an Error Boundary in React?
**Answer:** An Error Boundary is a React component that catches JavaScript errors anywhere in its child component tree, logs the error, and displays a fallback UI instead of crashing the entire application into a blank white screen.
It must currently be implemented as a Class component using `static getDerivedStateFromError()` and `componentDidCatch()`.

---

### Q72: What types of errors are NOT caught by Error Boundaries?
1. Event handlers (e.g. errors inside `onClick`).
2. Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame`).
3. Server-side rendering errors.
4. Errors thrown in the Error Boundary component itself rather than its children.

---

### Q73: What is React Suspense?
**Answer:** `<Suspense>` is a built-in React component that lets you orchestrate the display of a fallback UI (like a loading spinner) while child components are waiting for asynchronous resources (such as dynamically imported components or data fetching in frameworks like Next.js).

---

### Q74: What is `React.lazy()` and how does Code Splitting work?
**Answer:** `React.lazy()` allows you to dynamically import components on demand:
```jsx
const HeavyChart = React.lazy(() => import('./HeavyChart'));
```
Instead of bundling the heavy component in the initial JavaScript download, the browser only downloads the file when the component is actually rendered, dramatically reducing initial page load times.

---

### Q75: What is the Context API and what problem does it solve?
**Answer:** The Context API provides a way to share data globally across a component tree without manually passing props down through every level (solving **Prop Drilling**). It is designed for ambient data like current user themes (light/dark), authenticated user profiles, or language locales.

---

### Q76: What is the primary performance caveat of the Context API?
**Answer:** Whenever a Context Provider's value changes, **every single consumer component** that reads that context will re-render, even if only an unrelated part of the context object changed. For high-frequency state updates (like animations, typing, or real-time trading data), dedicated state managers (like Zustand or Redux) or splitting contexts is recommended.

---

### Q77: What is a Custom Hook and what are the rules for creating one?
**Answer:** A Custom Hook is a plain JavaScript function whose name starts with `use` (e.g., `useWindowSize`, `useFetch`) that can invoke other React hooks (`useState`, `useEffect`).
Custom hooks allow you to extract and share stateful logic across multiple components without duplicating code.

---

### Q78: If two components use the same Custom Hook, do they share state?
**Answer:** **No!** Custom hooks share *stateful logic*, not state itself. Each component calling a custom hook receives its own isolated, independent instance of state and effects.

---

### Q79: What are React Portals (`ReactDOM.createPortal`)?
**Answer:** Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component (typically into `document.body` or a dedicated modal root). This is critical for modals, tooltips, and popovers to avoid `overflow: hidden` or `z-index` stacking context clipping from parent containers.

---

### Q80: In React Router DOM, what is the difference between `<Link>` and `<NavLink>`?
* **`<Link to="/about">`**: Standard client-side navigation anchor without full page reload.
* **`<NavLink to="/about">`**: Specialized link that knows whether it matches the current URL. It passes an `isActive` boolean to its `className` and `style` props, making it ideal for navigation bars.

---

### Q81: How does dynamic routing work with `useParams` in React Router?
**Answer:** Dynamic routes define path placeholders using colons: `<Route path="/users/:id" element={<User />} />`.
Inside the `<User />` component, calling `const { id } = useParams()` extracts the matching value from the browser's address bar.

---

### Q82: How does `useNavigate` work in React Router DOM?
**Answer:** `useNavigate` returns an imperative navigation function:
```jsx
const navigate = useNavigate();
navigate('/dashboard'); // Navigate to /dashboard
navigate(-1);           // Go back one step in browser history
```
It is used to redirect users programmatically after form submissions, logout actions, or timers.

---

### Q83: What is the `<Outlet>` component in React Router DOM?
**Answer:** `<Outlet>` is a placeholder used in parent layout routes. When a parent route matches (e.g. a shared Navbar and Footer), the matching child route component is rendered inside the `<Outlet />`.

---

### Q84: How do you implement a Catch-All 404 route in React Router?
**Answer:** By defining a route with `path="*"` placed at the bottom of the `<Routes>` container:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

### Q85: What is Server-Side Rendering (SSR) in React?
**Answer:** SSR is the process of rendering React components to raw HTML on the server on every request. The fully rendered HTML is sent to the client browser, providing instant First Contentful Paint (FCP) and superior SEO, before the client JavaScript downloads and takes over.

---

### Q86: What is "Hydration" in React?
**Answer:** Hydration is the client-side process where React attaches event listeners and initializes state onto the pre-rendered HTML sent down by an SSR server, transforming static HTML markup into a fully interactive React application.

---

### Q87: What are React Server Components (RSC)?
**Answer:** Introduced in modern React (and leveraged by Next.js App Router), RSCs are components that execute exclusively on the server and never ship their JavaScript code to the client bundle. They can access databases directly, keep sensitive API keys secure, and reduce client bundle sizes to zero.

---

### Q88: How do React Server Components (RSC) differ from traditional SSR?
* **Traditional SSR**: Renders HTML on the server, but still ships the component's JavaScript bundle to the browser for full hydration.
* **RSCs**: Execute on the server and output a specialized binary-like stream. Their component code never ships to the browser, and they require zero hydration!

---

### Q89: What is the difference between `useEffect` and `useLayoutEffect`?
* **`useEffect`**: Asynchronous. Runs **after** the browser has painted the DOM. Recommended for 99% of side effects.
* **`useLayoutEffect`**: Synchronous. Runs **before** the browser paints the screen, immediately after DOM mutations. Used only when reading layout metrics (like element dimensions) and synchronously updating styles to prevent visual screen flickering.

---

### Q90: What is the `useId` hook in React?
**Answer:** `useId` generates unique, stable identifier strings across both server and client:
```jsx
const id = useId();
<label htmlFor={id}>Email</label>
<input id={id} />
```
It prevents hydration mismatch errors in SSR applications where client and server might otherwise generate different random IDs.

---

### Q91: What is `useImperativeHandle` and `forwardRef`?
**Answer:**
* **`forwardRef`**: Allows a component to pass a `ref` it receives down to a child DOM node.
* **`useImperativeHandle`**: Customizes the instance value that is exposed to parent components when using `ref`. Instead of exposing the raw DOM element, you can expose a custom object with specific methods (e.g., `{ focus(), reset() }`).

---

### Q92: What is the difference between Shallow Routing and Deep Routing?
* **Shallow Routing**: Updating the URL path or query parameters without triggering a re-run of data fetching methods or replacing the page component.
* **Deep Routing**: Navigating to a nested route that re-renders parent and child component trees and triggers new network requests.

---

### Q93: What was Synthetic Event Pooling and why was it removed in React 17?
**Answer:** In React 16 and earlier, React reused Synthetic Event objects across different events for memory efficiency and cleared their properties after the event handler ran. This prevented accessing event properties asynchronously inside `setTimeout`. React 17 removed pooling because modern JavaScript garbage collection is fast enough, simplifying event handling.

---

### Q94: What are common causes of memory leaks in React applications?
1. Uncanceled asynchronous requests or promises updating state after component unmount.
2. Active `setInterval` or `setTimeout` timers without cleanup functions.
3. Global DOM event listeners (`window.addEventListener`) not removed on unmount.
4. WebSocket or event emitter subscriptions left open.

---

### Q95: How do you identify unnecessary re-renders using React Developer Tools?
**Answer:**
1. Open Chrome DevTools $\rightarrow$ **Components** tab.
2. Click the gear icon (Settings) and enable **"Highlight updates when components render"**.
3. Elements flashing green/yellow indicate active re-renders.
4. Use the **Profiler** tab to record user interactions and view the "Why did this render?" breakdown.

---

### Q96: What is Prop Spreading (`{...props}`) and what are its risks?
**Answer:** Prop spreading passes an entire object as props: `<Component {...props} />`.
While convenient, it poses risks:
* It can accidentally leak unwanted attributes to the DOM (causing console warnings).
* It obscures which props the component actually requires, making code harder to read and refactor.

---

### Q97: What is the difference between Optimistic UI and Pessimistic UI?
* **Pessimistic UI**: Waits for the server API response before updating the screen (showing a spinner).
* **Optimistic UI**: Updates the screen immediately assuming the server request will succeed (e.g. liking a post). If the server request fails, the UI rolls back the change and displays an error message.

---

### Q98: How do you implement Code Splitting for routes in React?
**Answer:** By combining `React.lazy` with `<Suspense>`:
```jsx
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<div>Loading Page...</div>}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Suspense>
```

---

### Q99: What is the difference between client-side state and server-cache state?
* **Client-Side State**: Ephemeral UI state owned by the client (modal visibility, active tabs, form inputs).
* **Server-Cache State**: Asynchronous data owned by the backend (user profiles, database records). It requires synchronization, cache invalidation, deduplication, and background refetching (often handled by tools like TanStack Query or SWR).

---

### Q100: What are the best practices for structuring a scalable production React project?
1. **Feature-driven folder structure**: Group files by feature domain (`features/auth/`, `features/checkout/`) rather than by technical type (`components/`, `hooks/`).
2. **Co-locate related files**: Keep component code, styles (`.css`), tests, and sub-components in the same folder.
3. **Use Barrel exports (`index.js`)** carefully to avoid bundle bloat.
4. **Enforce Single Responsibility**: Keep components focused on one visual or logical responsibility.
5. **Treat state as immutable** and minimize unnecessary global state.
