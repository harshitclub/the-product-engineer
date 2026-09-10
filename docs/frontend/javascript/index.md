# Introduction to JavaScript

## What is JavaScript?

**JavaScript (JS)** is a lightweight, interpreted (or Just-In-Time compiled), high-level, single-threaded, multi-paradigm programming language with first-class functions. While famously known as the scripting language for web pages, modern JavaScript powers server runtimes (Node.js, Deno, Bun), mobile applications (React Native), desktop software (Electron), and distributed cloud edge functions.

In the web development triumvirate:
* **HTML** defines the semantic **structure** and content hierarchy.
* **CSS** defines the visual **styling**, layout, and aesthetic design.
* **JavaScript** provides **interactivity**, state management, asynchronous data fetching, and business logic.

```javascript
// Dynamic interactivity & modern ES6+ syntax
const greetEngineer = (name, role = 'Product Engineer') => {
  return `Welcome, ${name}! Ready to master ${role} architecture.`;
};

console.log(greetEngineer('Alex'));
```

---

## The Origin & Evolution of JavaScript

### Brendan Eich and the 10-Day Sprint (1995)
In May 1995, **Brendan Eich** at Netscape Communications developed the initial version of JavaScript in just **10 days** for the Netscape Navigator 2.0 browser. Originally code-named *Mocha* and briefly named *LiveScript*, it was renamed **JavaScript** as a marketing collaboration with Sun Microsystems (creators of Java), despite having vastly different syntactic design principles and runtime paradigms.

### Standardization: ECMAScript (ES)
To prevent browser fragmentation (such as Microsoft's competing *JScript* in Internet Explorer), Netscape submitted JavaScript to **ECMA International** in 1996 for standardization. This produced the official specification known as **ECMAScript (ECMA-262)**:

| Milestone / Standard | Year | Core Features & Significance |
| :--- | :--- | :--- |
| **ECMAScript 1 – 3** | 1997 – 1999 | Baseline language rules, regular expressions, try/catch exception handling. |
| **ECMAScript 5 (ES5)** | 2009 | Strict mode (`'use strict'`), JSON support, array functional methods (`map`, `filter`, `reduce`), accessor properties (getters/setters). |
| **ECMAScript 6 (ES6 / ES2015)** | 2015 | **The Modern Revolution**: `let`/`const`, Arrow functions, Classes, Modules (`import`/`export`), Promises, Template literals, Destructuring, Spread/Rest operators. |
| **ES2017 – Present** | Continuous | `async`/`await`, Object entries/values, Optional Chaining (`?.`), Nullish Coalescing (`??`), Top-level `await`, Private class fields (`#`). |

---

## How JavaScript Executes: The Engine & Runtime

JavaScript does not run in a vacuum; it executes inside an environment called a **JavaScript Runtime Environment** (such as a browser or Node.js).

```text
┌─────────────────────────────────────────────────────────────┐
│                 JavaScript Runtime Environment              │
│                                                             │
│   ┌───────────────────────────┐    ┌────────────────────┐   │
│   │   JS Engine (e.g. V8)     │    │     Web APIs /     │   │
│   │  ┌──────────┐ ┌─────────┐ │    │    Node C++ APIs   │   │
│   │  │  Memory  │ │  Call   │ │    │  - DOM (document)  │   │
│   │  │   Heap   │ │  Stack  │ │    │  - fetch() / AJAX  │   │
│   │  └──────────┘ └─────────┘ │    │  - setTimeout()    │   │
│   └───────────────────────────┘    └────────────────────┘   │
│                 │                             │             │
│                 ▼                             ▼             │
│       ┌──────────────────────────────────────────────┐      │
│       │            Event Loop & Callback Queues      │      │
│       │   - Microtask Queue (Promises, queueMicrotask)│      │
│       │   - Macrotask Queue (setTimeout, I/O, UI)    │      │
│       └──────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 1. The Engine Components
* **Memory Heap**: Unstructured memory pool where variables, objects, and function closures are allocated.
* **Call Stack**: Single-threaded execution stack that records where we are in the program using a Last-In, First-Out (LIFO) model.

### 2. Just-In-Time (JIT) Compilation
Modern JavaScript engines (Google V8, Apple JavaScriptCore, Mozilla SpiderMonkey) do not merely interpret bytecode line-by-line. They use **JIT Compilation**:
1. An **Interpreter** produces fast, unoptimized bytecode immediately to start execution with zero latency.
2. A **Profiler / JIT Compiler** observes "hot code" (frequently executed functions) and compiles it into heavily optimized machine code directly executed by the CPU.

---

## Key Language Characteristics

### 1. Single-Threaded with Non-Blocking Asynchronous I/O
JavaScript has a single call stack and can only execute one operation at a time on its main thread. Long-running tasks (network requests, timers, disk reads) are offloaded to runtime background threads via the **Event Loop**, preventing the user interface from freezing.

### 2. Dynamically & Weakly Typed
Variables in JavaScript hold values, not fixed static types. A variable's type can change dynamically at runtime:

```javascript
let identifier = 42;          // Number
identifier = "Hello World";   // String (dynamically reassigned)
```

### 3. Multi-Paradigm
JavaScript supports multiple programming styles seamlessly:
* **Object-Oriented Programming (OOP)**: Prototype-based inheritance and class syntax.
* **Functional Programming (FP)**: Pure functions, first-class functions, immutability patterns, and higher-order functions.
* **Imperative / Procedural Programming**: Loops, conditional branches, and explicit step-by-step algorithms.

---

## Including JavaScript in HTML

### Modern Recommended Pattern: Deferred Script Loading

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Engineering Demo</title>
  
  <!-- Non-blocking execution: parses HTML while downloading JS, executes after DOM is ready -->
  <script src="/scripts/app.js" defer></script>
</head>
<body>
  <button id="cta-btn">Click Me</button>
</body>
</html>
```

| Script Loading Attribute | Download Timing | Execution Timing | DOM Blocked? |
| :--- | :--- | :--- | :--- |
| **Default (`<script src="...">`)** | Pauses HTML parser immediately | Executes immediately upon download | **Yes** |
| **`async`** | Downloads asynchronously in parallel | Executes the instant download finishes | **Yes (briefly during execution)** |
| **`defer` (Recommended)** | Downloads asynchronously in parallel | Executes sequentially after DOM parsing completes | **No** |

---

## JavaScript Road Ahead in This Curriculum

As we progress through the JavaScript track, you will master:
1. **Core Language Fundamentals**: Types, memory lifecycle, scoping, closures, and hoisting.
2. **Asynchronous Architecture**: Callbacks, Promises, `async`/`await`, and Event Loop microtask scheduling.
3. **DOM & Browser APIs**: Efficient querying, event delegation, and performance rendering.
4. **Modern Modular Patterns**: ES Modules, bundling mechanics, and defensive programming.
