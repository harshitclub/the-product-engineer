# Asynchronous JavaScript & Promises Masterclass

> Step-by-step masterclass on synchronous vs asynchronous code, callbacks, Callback Hell, Promises from scratch, chaining, and Promise combinators.

---

## 1. Synchronous vs Asynchronous JavaScript

JavaScript is **single-threaded** (has only one Call Stack). 

* **Synchronous**: Executes line-by-line in order. Each line must finish before the next line can start.
* **Asynchronous**: Tasks that take time (network requests, timers, disk reads) are started in the background without blocking the UI, notifying JavaScript when finished.

```text
Synchronous Flow (Blocking):
[ Step 1 ] ──► [ Step 2 (Wait 3s) ] ──► [ Step 3 ] ──► Total: 4s

Asynchronous Flow (Non-Blocking):
[ Step 1 ] ──► [ Start Step 2 in Background ] ──► [ Step 3 immediately! ]
                        │
                        ▼ (3s later)
                 [ Step 2 Callback ]
```

```javascript
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timer Finished (Asynchronous)");
}, 1000);

console.log("3. End");

// Output Order:
// 1. Start
// 3. End
// 2. Timer Finished (Asynchronous)
```

---

## 2. Callbacks and "Callback Hell"

Historically, asynchronous results were received through nested callback functions:

```javascript
// ❌ Callback Hell (The Pyramid of Doom):
getUser(101, function(user) {
  getOrders(user.id, function(orders) {
    getOrderDetails(orders[0].id, function(details) {
      processPayment(details, function(receipt) {
        console.log("Payment Receipt:", receipt);
      });
    });
  });
});
```

---

## 3. Promises: The Modern Solution

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous task.

### The 3 States of a Promise:
1. **Pending**: Initial state, task is currently running.
2. **Fulfilled**: Task completed successfully (`resolve(value)`).
3. **Rejected**: Task failed with an error (`reject(error)`).

```javascript
// Creating a Promise from scratch:
function simulateApiCall(success = true) {
  return new Promise((resolve, reject) => {
    console.log("Fetching data in background...");
    setTimeout(() => {
      if (success) {
        resolve({ id: 1, title: "Modern JavaScript Handbook" });
      } else {
        reject(new Error("500 Internal Server Error"));
      }
    }, 1000);
  });
}

// Consuming with .then(), .catch(), and .finally()
simulateApiCall(true)
  .then((data) => {
    console.log("Success:", data.title);
    return data.id; // Returns value to next .then()
  })
  .then((id) => {
    console.log("Processed ID:", id);
  })
  .catch((error) => {
    console.error("Error occurred:", error.message);
  })
  .finally(() => {
    console.log("Fetch operation finished.");
  });
```

---

## 4. Promise Combinators (`all`, `allSettled`, `race`, `any`)

```javascript
const p1 = Promise.resolve("User Data Loaded");
const p2 = Promise.resolve("Posts Loaded");
const p3 = Promise.reject(new Error("Comments Failed"));

// 1. Promise.all -> Resolves when ALL pass (fails fast if ANY reject)
// Promise.all([p1, p2]).then(results => console.log(results));

// 2. Promise.allSettled -> Waits for ALL to finish regardless of success/failure
Promise.allSettled([p1, p2, p3]).then((results) => {
  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      console.log(`Task #${i + 1} succeeded: ${res.value}`);
    } else {
      console.warn(`Task #${i + 1} failed: ${res.reason.message}`);
    }
  });
});
```
