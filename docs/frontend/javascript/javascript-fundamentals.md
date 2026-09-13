# JavaScript Fundamentals & DOM Manipulation

> Part 1 of the Full-Stack JavaScript Track. A friendly, practical foundation covering programming basics, core syntax, control flow, and browser DOM manipulation.

---

## 1. What is JavaScript & How Does It Run?

**JavaScript** is the programming language that makes websites alive and interactive. 

While HTML defines what appears on the page and CSS styles how it looks, JavaScript allows you to **calculate, store data, respond to user clicks, and update the screen without reloading the page**.

### Where Does JavaScript Run?
JavaScript runs inside an environment called a **JavaScript Engine**:
* In Google Chrome, it's called **V8**.
* In Apple Safari, it's called **JavaScriptCore**.
* In Mozilla Firefox, it's called **SpiderMonkey**.
* On computers and servers outside the browser, **Node.js** and **Bun** use these same engines to run backend code!

---

### How to Run Your First Line of JavaScript

#### Option 1: Right Inside Your Browser Console (Instant Experimentation)
1. Open any webpage in Google Chrome or Edge.
2. Press `F12` on your keyboard (or Right-Click anywhere and select **Inspect**).
3. Click the **Console** tab at the top.
4. Type the following and press `Enter`:

```javascript
console.log("Hello, World! I am learning JavaScript!");
```
You will immediately see your message printed out!

---

#### Option 2: Connecting JavaScript to an HTML Page
In real web projects, you write your JavaScript in a file named `app.js` and connect it to your `index.html` file using a `<script>` tag with the `defer` attribute:

```html
<!-- File: index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript Demo</title>

  <!-- defer tells the browser: "Download this JS in the background, 
       and run it AFTER the HTML elements are loaded into memory!" -->
  <script src="app.js" defer></script>
</head>
<body>
  <h1 id="greeting">Hello from HTML</h1>
</body>
</html>
```

```javascript
// File: app.js
console.log("JavaScript connected successfully!");
```

---

## 2. Printing Output & Logging

In JavaScript, you will frequently inspect values and debug your code using `console`:

```javascript
// 1. Standard informational log (your everyday best friend)
console.log("User logged in successfully.");

// 2. Warning message (displayed in bright yellow)
console.warn("Server response time is slower than expected.");

// 3. Error message (displayed in red with a stack trace)
console.error("Failed to connect to the database!");

// 4. Clean table view for arrays or objects
console.table([
  { id: 1, name: "Alex", role: "Frontend" },
  { id: 2, name: "Sarah", role: "Backend" }
]);
```

---

## 3. Variables: Storing Data (`const` vs. `let`)

A **variable** is simply a labeled storage box in computer memory where you save a piece of information so you can use it later.

In modern JavaScript, there are only two keywords you need to remember: **`const`** and **`let`**:

```text
┌─────────────────────────────────────────────────────────────┐
│                    CONST vs. LET (THE RULE)                 │
│                                                             │
│   const ──▶ Use by DEFAULT for values that should NOT change│
│             (e.g., API keys, user IDs, fixed settings)      │
│                                                             │
│   let   ──▶ Use ONLY when you know the value MUST be        │
│             reassigned later (e.g., counters, loop indexes) │
└─────────────────────────────────────────────────────────────┘
```

### 1. `const` (Constant — Cannot Be Reassigned)
```javascript
const appName = "Apex Cloud";
const maxLoginAttempts = 5;

// ❌ ERROR: You cannot reassign a const variable!
// appName = "New Name"; // TypeError: Assignment to constant variable.
```

### 2. `let` (Variable — Can Be Reassigned)
```javascript
let currentScore = 0;
console.log(currentScore); // Prints: 0

// Later in the game, the player scores points:
currentScore = 15;
console.log(currentScore); // Prints: 15
```

> **⚠️ What about `var`?**
> You might see the keyword `var` in older 2014 tutorials. **Do not use `var` in modern code**. `var` has confusing scoping rules and leaks outside of curly braces, causing subtle bugs. Stick to `const` by default and `let` when needed.

---

## 4. Data Types Made Super Simple

Every value in JavaScript belongs to a specific **data type**. There are two broad categories: **Primitives** and **Reference Types (Objects & Arrays)**.

### The 7 Primitive Types (Stored Directly by Value):

```javascript
// 1. String: Text wrapped in quotes (single, double, or backticks)
const userName = "Sarah Connor";

// 2. Number: Integers and decimals (JS has one single type for all numbers)
const userAge = 28;
const accountBalance = 199.95;

// 3. Boolean: Either true or false (used for toggles and decisions)
const isEmailVerified = true;
const hasSubscription = false;

// 4. Undefined: A variable that was created, but has NOT been given a value yet
let temporaryToken;
console.log(temporaryToken); // Output: undefined

// 5. Null: An INTENTIONAL empty value (You deliberately set it to nothing)
let selectedProduct = null; // No product selected right now

// 6. BigInt: Used for massive numbers larger than 9 quadrillion
const hugeNumber = 9007199254740991n;

// 7. Symbol: A completely unique identifier (mostly used under the hood by libraries)
const uniqueKey = Symbol("id");
```

### How to Check the Type of a Variable:
Use the built-in `typeof` operator:
```javascript
console.log(typeof "Hello");  // "string"
console.log(typeof 42);       // "number"
console.log(typeof true);     // "boolean"
console.log(typeof undefined);// "undefined"
```

---

### Reference Types: Objects & Arrays

#### 1. Objects (Key-Value Dictionaries)
An object lets you group related information together inside curly braces `{ }`:

```javascript
const engineer = {
  firstName: "Alex",
  lastName: "Rivera",
  yearsOfExperience: 5,
  isRemote: true
};

// Accessing properties using dot notation:
console.log(engineer.firstName); // "Alex"
console.log(engineer.yearsOfExperience); // 5

// Updating a property:
engineer.yearsOfExperience = 6;
```

#### 2. Arrays (Ordered Lists)
An array is an ordered list of items wrapped in square brackets `[ ]`:

```javascript
const skills = ["HTML", "CSS", "JavaScript", "React"];

// Array items are indexed starting at 0:
console.log(skills[0]); // "HTML"
console.log(skills[2]); // "JavaScript"

// Find how many items are in the array:
console.log(skills.length); // 4

// Add a new item to the end:
skills.push("Node.js");
console.log(skills); // ["HTML", "CSS", "JavaScript", "React", "Node.js"]
```

---

## 5. Operators & Comparisons

### Arithmetic Operators
```javascript
const sum = 10 + 5;        // 15 (Addition)
const difference = 20 - 8; // 12 (Subtraction)
const product = 4 * 6;     // 24 (Multiplication)
const quotient = 20 / 4;   // 5  (Division)
const remainder = 10 % 3;  // 1  (Modulo / Remainder: 10 divided by 3 has 1 left over)
```

---

### Comparison: Strict Equality (`===`) vs. Loose Equality (`==`)

```text
┌─────────────────────────────────────────────────────────────┐
│                    THE #1 RULE OF COMPARISON                │
│                                                             │
│   ===  ──▶ ALWAYS USE STRICT EQUALITY. Checks both the      │
│            VALUE and the DATA TYPE.                         │
│                                                             │
│   ==   ──▶ AVOID LOOSE EQUALITY. Performs weird behind-the- │
│            scenes conversions that cause nasty bugs.        │
└─────────────────────────────────────────────────────────────┘
```

```javascript
// Loose equality (==) tries to force types to match:
console.log(5 == "5");  // true  (Number 5 was converted to string "5"!)

// Strict equality (===) checks BOTH value and type:
console.log(5 === "5"); // false (A Number is NOT a String!)
console.log(5 === 5);   // true  (Both are numbers with value 5)

// Strict NOT equal (!==):
console.log(10 !== 20); // true  (10 is not equal to 20)
```

### Greater / Less Than:
```javascript
const score = 85;
console.log(score > 50);  // true
console.log(score >= 85); // true (greater than or equal)
console.log(score < 70);  // false
```

---

## 6. Logical Operators (`&&`, `||`, `!`)

Logical operators let you combine multiple conditions:

```javascript
const isUserLoggedIn = true;
const hasAdminRole = false;

// 1. AND (&&): BOTH conditions must be true
console.log(isUserLoggedIn && hasAdminRole); // false

// 2. OR (||): At least ONE condition must be true
console.log(isUserLoggedIn || hasAdminRole); // true

// 3. NOT (!): Inverts the boolean (flips true to false, or false to true)
console.log(!isUserLoggedIn); // false
```

---

## 7. Decision Making: `if / else` & The Ternary Operator

### 1. The Standard `if / else` Statement
```javascript
const userAge = 20;

if (userAge >= 21) {
  console.log("Full access granted.");
} else if (userAge >= 18) {
  console.log("Standard access granted.");
} else {
  console.log("Access denied. Must be 18 or older.");
}
```

---

### 2. The Ternary Operator (CRITICAL FOR REACT! ⭐)
In React, you cannot write full `if / else` blocks inside HTML/JSX markup. Instead, React developers use the **Ternary Operator** thousands of times a day!

It is a clean 1-line shortcut for `if / else`:

```text
condition ? valueIfTrue : valueIfFalse
```

```javascript
const isLoggedIn = true;

// Traditional if/else:
let greeting;
if (isLoggedIn) {
  greeting = "Welcome back, Alex!";
} else {
  greeting = "Please sign in.";
}

// ⭐ The Clean Ternary Shortcut:
const modernGreeting = isLoggedIn ? "Welcome back, Alex!" : "Please sign in.";
console.log(modernGreeting); // "Welcome back, Alex!"
```

---

## 8. Loops (Repeating Tasks Efficiently)

### 1. The Modern `for...of` Loop (For Arrays ⭐)
The cleanest, most readable way to loop through every item in a list:

```javascript
const frameworks = ["React", "Vue", "Next.js", "Express"];

for (const framework of frameworks) {
  console.log(`Currently learning: ${framework}`);
}
```

### 2. The Classic `for` Loop (Using an Index)
When you need to know the index number of each step:

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(`Countdown step: ${i}`);
}
```

---

## 9. Functions Basics

A **function** is a reusable block of code that performs a specific task. You define it once, and call it whenever you need it:

```javascript
// 1. Defining a function with parameters and default values
function calculateTotal(price, taxRate = 0.08) {
  const total = price + (price * taxRate);
  return total; // Sends the result back to whoever called it
}

// 2. Calling (invoking) the function with arguments
const finalBill = calculateTotal(100); 
console.log(finalBill); // 108

const customBill = calculateTotal(50, 0.10);
console.log(customBill); // 55
```

---

## 10. Browser DOM Manipulation (HTML + JavaScript Together!)

### What is the DOM?
The **DOM (Document Object Model)** is the live tree of HTML elements created by the browser. 

JavaScript can reach into this tree to read elements, change their text, modify CSS classes, and listen for user clicks.

---

### Project 1: The Interactive Counter App

Let's see exact HTML and JavaScript working together:

**The HTML (`index.html`):**
```html
<div class="counter-widget">
  <h2>Live Counter</h2>
  <p id="counter-value">0</p>
  
  <div class="btn-group">
    <button id="decrement-btn">- Decrease</button>
    <button id="reset-btn">Reset</button>
    <button id="increment-btn">+ Increase</button>
  </div>
</div>
```

**The JavaScript (`app.js`):**
```javascript
// 1. SELECT the HTML elements using document.querySelector
const counterDisplay = document.querySelector("#counter-value");
const incrementBtn = document.querySelector("#increment-btn");
const decrementBtn = document.querySelector("#decrement-btn");
const resetBtn = document.querySelector("#reset-btn");

// 2. STORE our app state (the number)
let count = 0;

// 3. LISTEN for button clicks with addEventListener
incrementBtn.addEventListener("click", function() {
  count = count + 1;
  counterDisplay.textContent = count; // Updates the HTML text!
});

decrementBtn.addEventListener("click", function() {
  count = count - 1;
  counterDisplay.textContent = count;
});

resetBtn.addEventListener("click", function() {
  count = 0;
  counterDisplay.textContent = count;
});
```

---

### Project 2: Dark Mode Theme Toggle

**The HTML:**
```html
<button id="theme-toggle">🌙 Toggle Dark Mode</button>
```

**The CSS:**
```css
body.dark-theme {
  background-color: #0f172a;
  color: #f8fafc;
}
```

**The JavaScript:**
```javascript
const themeToggleBtn = document.querySelector("#theme-toggle");

themeToggleBtn.addEventListener("click", function() {
  // toggle adds the class if missing, or removes it if already present!
  document.body.classList.toggle("dark-theme");

  // Update button label based on current mode
  if (document.body.classList.contains("dark-theme")) {
    themeToggleBtn.textContent = "☀️ Switch to Light Mode";
  } else {
    themeToggleBtn.textContent = "🌙 Switch to Dark Mode";
  }
});
```

---

## 11. The "Why React Exists" Revelation

Look closely at the Counter app above. Notice how much manual work we had to do:
1. Find the `<p>` element in the DOM.
2. Find all three `<button>` elements in the DOM.
3. Attach event listeners to all of them.
4. Manually update the variable.
5. Manually write `counterDisplay.textContent = count;` on every single click to force the screen to update.

If you had a real-world web application with 200 interactive components (shopping carts, chat messages, notifications, search bars), **manually synchronizing the DOM like this becomes a tangled mess of spaghetti code**.

### The Breakthrough:
This exact frustration is why **React.js** was invented:
* In React, you don't manually touch the DOM. 
* You simply update your data (`count`), and React automatically re-renders the exact part of the screen that changed!

To prepare for React, we need modern JavaScript tools like **Arrow Functions**, **Array Methods (`.map`)**, **Destructuring**, and **The Spread Operator**.

👉 **[Ready to level up? Proceed to Part 2: Modern ES6+ (The React Bridge) →](/frontend/javascript/modern-javascript-for-react)**
