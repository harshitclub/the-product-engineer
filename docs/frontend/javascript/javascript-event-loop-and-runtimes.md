# The JavaScript Event Loop & Runtime Architecture

> How JavaScript executes under the hood: Call Stack, Web APIs, Microtask Queue vs Macrotask Queue, and Event Loop execution cycles.

---

## 1. The Runtime Engine Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                 JavaScript Runtime (Browser)                │
│                                                             │
│   ┌───────────────────────────┐    ┌────────────────────┐   │
│   │        JS Engine          │    │     Web APIs       │   │
│   │  ┌──────────┐ ┌─────────┐ │    │  - DOM Tree        │   │
│   │  │  Memory  │ │  Call   │ │    │  - fetch() / AJAX  │   │
│   │  │   Heap   │ │  Stack  │ │    │  - setTimeout()    │   │
│   │  └──────────┘ └─────────┘ │    │  - LocalStorage    │   │
│   └───────────────────────────┘    └────────────────────┘   │
│                 │                             │             │
│                 ▼                             ▼             │
│       ┌──────────────────────────────────────────────┐      │
│       │               The Event Loop                 │      │
│       └──────────────────────────────────────────────┘      │
│                 │                             │             │
│                 ▼                             ▼             │
│       ┌───────────────────┐         ┌───────────────────┐   │
│       │  Microtask Queue  │         │  Macrotask Queue  │   │
│       │  (Promises,       │         │  (setTimeout,     │   │
│       │   queueMicrotask) │         │   setInterval)    │   │
│       └───────────────────┘         └───────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Microtask vs Macrotask Priority

**The Golden Rule**: The Event Loop **always drains the entire Microtask Queue completely** before picking even one task from the Macrotask Queue!

```javascript
console.log("1. Synchronous Code Start");

setTimeout(() => {
  console.log("2. Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask (Promise .then)");
});

queueMicrotask(() => {
  console.log("4. Microtask (queueMicrotask)");
});

console.log("5. Synchronous Code End");

// ─── OUTPUT ORDER ───
// 1. Synchronous Code Start
// 5. Synchronous Code End
// 3. Microtask (Promise .then)
// 4. Microtask (queueMicrotask)
// 2. Macrotask (setTimeout 0ms)
```
