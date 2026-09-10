# JavaScript Objects, Destructuring & Spread Operators

> Mastering key-value data structures, dot vs bracket notation, computed properties, object static methods, destructuring, spread/rest, and immutability.

---

## 1. Object Fundamentals

An **Object** is a collection of related key-value pairs (properties and methods) used to model real-world entities.

```javascript
const userProfile = {
  id: "usr_101",
  fullName: "Alex Rivera",
  age: 28,
  isPremium: true,
  "billing-address": "Berlin, Germany", // Multi-word keys need quotes
  socials: {
    github: "alex_dev",
    twitter: "@alex_tweets"
  },
  greet() {
    return `Hi, I'm ${this.fullName}`;
  }
};

// 1. Dot Notation (Clean & standard)
console.log(userProfile.fullName); // "Alex Rivera"
console.log(userProfile.socials.github); // "alex_dev"

// 2. Bracket Notation (Required for dynamic keys or hyphenated names)
console.log(userProfile["billing-address"]); // "Berlin, Germany"

const field = "age";
console.log(userProfile[field]); // 28
```

---

## 2. Computed Property Names & Shorthand Syntax

```javascript
const dynamicPrefix = "env_";
const role = "Lead Engineer";

const serverConfig = {
  // Property value shorthand (role: role -> role)
  role,
  // Computed property key [expression]
  [`${dynamicPrefix}API_KEY`]: "sec_987654",
  [`${dynamicPrefix}PORT`]: 8080
};

console.log(serverConfig);
// { role: "Lead Engineer", env_API_KEY: "sec_987654", env_PORT: 8080 }
```

---

## 3. Destructuring Assignment (Objects & Arrays)

Destructuring extracts properties into distinct variables cleanly:

```javascript
// 1. Object Destructuring (Essential for React Component Props!)
const product = { id: 501, title: "Wireless Keyboard", price: 89.99, inStock: true };

// Destructuring with renaming (alias) and default values:
const { title, price: cost, category = "Electronics" } = product;
console.log(title, cost, category); // "Wireless Keyboard", 89.99, "Electronics"

// 2. Array Destructuring (Used in React useState)
const dimensions = [1920, 1080];
const [screenWidth, screenHeight] = dimensions;
console.log(screenWidth, screenHeight); // 1920, 1080

// Swapping variables without temporary variable:
let a = "First", b = "Second";
[a, b] = [b, a];
console.log(a, b); // "Second", "First"
```

---

## 4. Spread Operator (`...`) & Immutable Updates

In modern React and state management, state must **never be mutated in place**. Use spread `...` to copy and update immutably:

```javascript
// 1. Updating Objects Immutably
const initialSettings = { theme: "dark", fontSize: 14, sound: true };

const updatedSettings = {
  ...initialSettings,
  fontSize: 16,        // Overrides 14 without mutating initialSettings
  notifications: true // Adds new property
};

console.log(initialSettings.fontSize); // 14 (Unchanged!)
console.log(updatedSettings.fontSize); // 16

// 2. Combining & Adding to Arrays Immutably
const currentTodos = ["Task A", "Task B"];
const newTodos = [...currentTodos, "Task C"];
console.log(newTodos); // ["Task A", "Task B", "Task C"]
```

---

## 5. Shallow Copy vs Deep Copy with `structuredClone()`

```javascript
// Shallow copy problem (Spread only copies top level):
const original = { name: "Team A", stats: { wins: 5 } };
const shallowCopy = { ...original };
shallowCopy.stats.wins = 10;
console.log(original.stats.wins); // 10! (Mutated original because stats was copied by reference)

// ✅ Deep copy solution with native structuredClone():
const deepOriginal = { name: "Team A", stats: { wins: 5 } };
const deepCopy = structuredClone(deepOriginal);
deepCopy.stats.wins = 99;
console.log(deepOriginal.stats.wins); // 5 (Original is completely safe and isolated!)
```

---

## 6. Object Static Utilities: `keys`, `values`, `entries`, `fromEntries`

```javascript
const salaries = { engineering: 120000, design: 95000, marketing: 85000 };

// Object.keys() -> Array of string keys
console.log(Object.keys(salaries)); // ["engineering", "design", "marketing"]

// Object.values() -> Array of values
console.log(Object.values(salaries)); // [120000, 95000, 85000]

// Object.entries() -> Array of [key, value] pairs
const entries = Object.entries(salaries);
console.log(entries); // [["engineering", 120000], ["design", 95000], ["marketing", 85000]]

// Object.fromEntries() -> Converts entries back into an object
const euroSalaries = Object.fromEntries(
  Object.entries(salaries).map(([dept, usd]) => [dept, Math.round(usd * 0.92)])
);
console.log(euroSalaries);
```
