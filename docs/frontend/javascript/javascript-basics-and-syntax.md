# JavaScript Basics: Variables, Types, Operators & Control Flow

> A gentle, step-by-step guide to the fundamental grammar of JavaScript—variables, data types, type coercion, operators, conditional branching, and loops.

---

## 1. Variables & Constants: `const`, `let`, and `var`

A variable is a labeled container in memory used to store data values so you can reference, update, and reuse them throughout your program.

```text
┌────────────────────────────────────────────────────────┐
│                        Memory                          │
│                                                        │
│   ┌────────────────────┐      ┌────────────────────┐   │
│   │  const appName     │      │   let score        │   │
│   │  "ProductEngineer" │      │   85               │   │
│   │  (Fixed / Locked)  │      │   (Can be updated) │   │
│   └────────────────────┘      └────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### The 3 Variable Keywords Compared

| Keyword | Can Reassign? | Can Redeclare? | Scope | When to Use |
| :--- | :--- | :--- | :--- | :--- |
| **`const`** | ❌ No | ❌ No | Block `{}` | **Always use by default** for all values, arrays, and objects |
| **`let`** | ✅ Yes | ❌ No | Block `{}` | Use **only** when you know the value must change (counters, accumulators) |
| **`var`** | ✅ Yes | ✅ Yes (bugs!) | Function | ❌ **Never use in modern JavaScript** (causes scoping bugs) |

### Practical Examples:
```javascript
// 1. Using 'const' (Constant Value)
const siteTitle = "The Product Engineer";
// siteTitle = "New Title"; // ❌ TypeError: Assignment to constant variable.

// Note: Objects and Arrays declared with 'const' CAN have their contents modified:
const user = { name: "Harshit", role: "Developer" };
user.role = "Senior Architect"; // ✅ Allowed! (Mutating property, not reassigning variable)

// 2. Using 'let' (Variable that will change)
let currentLevel = 1;
currentLevel = 2; // ✅ Allowed!
currentLevel += 1; // Now 3

// 3. Why 'var' is dangerous:
if (true) {
  var leakedVar = "I leaked outside the if block!";
  let safeVar = "I stay inside this block only.";
}
console.log(leakedVar); // "I leaked outside the if block!" (Pollutes outer scope)
// console.log(safeVar); // ❌ ReferenceError: safeVar is not defined
```

---

## 2. JavaScript Data Types: Primitives vs Objects

JavaScript has **8 Data Types** divided into two categories:

```text
Data Types in JavaScript
├── 1. Primitive Types (Stored directly by value, immutable)
│   ├── 1. String   -> Text wrapped in quotes: "Hello", 'World', `Template`
│   ├── 2. Number   -> Integers and decimals: 42, 3.14, -10
│   ├── 3. BigInt   -> Large integers beyond 2^53: 9007199254740995n
│   ├── 4. Boolean  -> Logical true or false
│   ├── 5. Undefined-> A variable that has been declared but not assigned a value
│   ├── 6. Null     -> Explicit representation of "no value" or "empty"
│   └── 7. Symbol   -> Guaranteed unique identifier
└── 2. Reference Type (Stored by reference in heap memory, mutable)
    └── 8. Object   -> Plain Objects {}, Arrays [], Functions function() {}
```

### Inspecting Types with `typeof`:
```javascript
console.log(typeof "Hello");     // "string"
console.log(typeof 100);         // "number"
console.log(typeof 3.14);        // "number"
console.log(typeof 9007199254n); // "bigint"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol("id"));// "symbol"
console.log(typeof { a: 1 });    // "object"
console.log(typeof [1, 2, 3]);   // "object" (Arrays are specialized objects)
console.log(typeof function(){});// "function"

// ⚠️ Famous Historic JavaScript Bug:
console.log(typeof null);        // "object" (Legacy bug from 1995 that cannot be changed)
```

---

## 3. Strings & Template Literals

Template literals (enclosed in backticks `` ` ``) allow you to embed variables and expressions directly into text using `${expression}`:

```javascript
const studentName = "Sarah";
const course = "Full Stack Web Development";
const score = 94;

// Modern Template Literal (Clean, readable, multi-line support)
const summary = `
  Student Report:
  Name: ${studentName}
  Course: ${course}
  Status: ${score >= 50 ? "Passed with Grade A" : "Needs Review"}
`;

console.log(summary);
```

---

## 4. Type Conversion & Coercion

### Explicit Conversion (You intentionally convert types):
```javascript
// String to Number
const strNum = "42";
const num1 = Number(strNum);      // 42
const num2 = parseInt("100px");   // 100
const num3 = parseFloat("12.5rem");// 12.5

// Number to String
const scoreVal = 99;
const strVal = String(scoreVal);  // "99"
const strVal2 = scoreVal.toString(); // "99"

// Value to Boolean
console.log(Boolean(1));       // true
console.log(Boolean(0));       // false
console.log(Boolean("hello")); // true
console.log(Boolean(""));      // false
```

### Implicit Coercion (JavaScript converts types automatically):
* The **`+` operator** with a string performs **String Concatenation**:
  ```javascript
  console.log("5" + 2); // "52" (number 2 is coerced to string "2")
  console.log(1 + 2 + "3"); // "33" ((1+2)=3 -> 3 + "3" = "33")
  ```
* Arithmetic operators (`-`, `*`, `/`, `%`) always convert strings to **Numbers**:
  ```javascript
  console.log("10" - 2);  // 8
  console.log("6" * "4"); // 24
  console.log("20" / "2");// 10
  ```

---

## 5. Truthy & Falsy Values

When evaluating conditions (`if`), values are coerced to `true` or `false`.

### The 6 Core Falsy Values:
1. `false`
2. `0` (and `-0`, `0n`)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN` (Not-a-Number)

**EVERYTHING ELSE IS TRUTHY!**
```javascript
// Even empty arrays and empty objects are TRUTHY:
if ([]) {
  console.log("Empty arrays [] are truthy!"); // Runs!
}
if ({}) {
  console.log("Empty objects {} are truthy!"); // Runs!
}
if (" ") {
  console.log("Strings with a space are truthy!"); // Runs!
}
```

---

## 6. Comparison Operators: Strict (`===`) vs Loose (`==`)

* **`===` (Strict Equality)**: Compares **value AND data type**.
* **`==` (Loose Equality)**: Coerces types before comparison (dangerous).

```javascript
console.log(10 === "10"); // false (Number vs String)
console.log(10 == "10");  // true (Dangerous coercion)

console.log(0 === false); // false
console.log(0 == false);  // true

console.log(null === undefined); // false
console.log(null == undefined);  // true
```

> [!IMPORTANT]
> **Always use `===` and `!==`** in your code to eliminate subtle bugs.

---

## 7. Conditional Control Flow

```javascript
// 1. if, else if, else
const temperature = 28;
if (temperature > 30) {
  console.log("Hot summer day!");
} else if (temperature >= 20) {
  console.log("Pleasant weather.");
} else {
  console.log("Chilly day.");
}

// 2. Ternary Operator (condition ? ifTrue : ifFalse)
const userRole = "admin";
const accessLevel = userRole === "admin" ? "Full Access" : "Read-Only";

// 3. Switch Statement
const day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the work week.");
    break;
  case "Friday":
    console.log("Weekend is approaching!");
    break;
  default:
    console.log("Mid-week day.");
}
```

---

## 8. Loops & Iteration

```javascript
// 1. Classic for loop (Index-based)
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}

// 2. while loop (Condition-driven)
let attempts = 0;
while (attempts < 3) {
  console.log(`Attempt #${attempts + 1}`);
  attempts++;
}

// 3. for...of loop (The modern standard for iterating Arrays)
const technologies = ["HTML", "CSS", "JavaScript", "React"];
for (const tech of technologies) {
  console.log(`Learning: ${tech}`);
}

// 4. break and continue
for (let i = 1; i <= 6; i++) {
  if (i === 3) continue; // Skip number 3
  if (i === 5) break;    // Stop the loop completely at 5
  console.log(i); // Outputs: 1, 2, 4
}
```
