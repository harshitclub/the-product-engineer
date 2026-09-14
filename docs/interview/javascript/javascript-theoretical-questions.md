# 100 JavaScript Theoretical Interview Questions

> A comprehensive master collection of 100 theoretical JavaScript interview questions with in-depth technical explanations, categorized into 50 Basic and 50 Intermediate to Advanced questions.

---

## 📑 Index & Question Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic & Foundational JavaScript**](#part-1-basic-foundational-javascript-questions-1-50) | Q1 – Q50 | JavaScript engine overview, `var` vs `let` vs `const`, primitive vs reference types, hoisting, execution context, type coercion, `==` vs `===`, scope, functions, arrays, objects, JSON, template literals |
| [**Part 2: Intermediate & Advanced JavaScript**](#part-2-intermediate-to-advanced-javascript-questions-51-100) | Q51 – Q100 | Closures, Event Loop (call stack, microtasks vs macrotasks), `this` binding (`call`/`apply`/`bind`), Prototype chain & inheritance, Promises, `async/await`, Garbage Collection & memory leaks, Currying, Debounce vs Throttle, WeakMap/WeakSet, ES6+ modules |

---

# Part 1: Basic & Foundational JavaScript (Questions 1 – 50)

### Q1: What is JavaScript and what is its role in modern web development?
**Answer:** JavaScript is a high-level, interpreted (or Just-In-Time compiled), multi-paradigm, single-threaded, dynamically typed language. In web architecture, while HTML defines the document structure and CSS defines the visual presentation, JavaScript provides the runtime behavior, enabling dynamic DOM manipulation, asynchronous communication with servers, user interaction handling, and full-stack application development.

---

### Q2: What are the primary data types available in modern JavaScript?
**Answer:** JavaScript has 8 built-in data types divided into two categories:
* **7 Primitive Types (Immutable & stored by value):**
  1. `string`: Sequence of characters.
  2. `number`: 64-bit floating-point numbers.
  3. `bigint`: Arbitrary precision integers.
  4. `boolean`: `true` or `false`.
  5. `undefined`: Variable declared but not assigned.
  6. `null`: Intentional absence of any object value.
  7. `symbol`: Unique and immutable identifier.
* **1 Non-Primitive / Reference Type (Stored by reference in the memory heap):**
  8. `object`: Keyed collections and complex entities (including Arrays, Functions, Dates, RegExp).

---

### Q3: What is the difference between `null` and `undefined`?
* **`undefined`:** Represents the default state of a variable that has been declared but not yet initialized with a value. Functions without an explicit `return` statement also return `undefined`. Its `typeof` is `'undefined'`.
* **`null`:** An intentional assignment value representing "no value" or "empty object reference". Its `typeof` evaluates to `'object'` (a historical bug in early JavaScript that cannot be changed for backward compatibility).

---

### Q4: What is the difference between `var`, `let`, and `const`?
| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function Scope | Block Scope (`{}`) | Block Scope (`{}`) |
| **Hoisting** | Hoisted and initialized with `undefined` | Hoisted into Temporal Dead Zone (TDZ) | Hoisted into Temporal Dead Zone (TDZ) |
| **Re-declaration** | Allowed in same scope | Disallowed (SyntaxError) | Disallowed (SyntaxError) |
| **Re-assignment** | Allowed | Allowed | Disallowed (TypeError) |

---

### Q5: What is Hoisting in JavaScript?
**Answer:** Hoisting is the JavaScript engine's behavior during the compilation/creation phase of the Execution Context, where variable and function declarations are recorded in memory before the code executes line-by-line.
* Function declarations are hoisted with their complete implementation.
* `var` declarations are hoisted and initialized with `undefined`.
* `let` and `const` declarations are hoisted but remain uninitialized in the **Temporal Dead Zone (TDZ)**; accessing them before declaration throws a `ReferenceError`.

---

### Q6: What is the Temporal Dead Zone (TDZ)?
**Answer:** The Temporal Dead Zone is the period between the start of a block's execution context and the actual line of code where a `let` or `const` variable is declared and initialized. Accessing the variable within this window throws a `ReferenceError`.

---

### Q7: What is the difference between Primitive and Reference types in memory?
* **Primitive Types:** Stored directly in the **Call Stack** because their size is fixed and known in advance. When copied, a completely independent copy of the value is created.
* **Reference Types (Objects, Arrays):** Stored in the **Memory Heap** because their size is dynamic. The variable in the stack holds only a pointer/reference to the heap memory address. Copying a reference type copies only the memory address, meaning both variables point to the same underlying object.

---

### Q8: What is the difference between `==` (Loose Equality) and `===` (Strict Equality)?
* **`==` (Loose Equality):** Compares values after performing implicit **Type Coercion** if the operands are of different types (e.g., `'5' == 5` is `true`, `null == undefined` is `true`).
* **`===` (Strict Equality):** Compares both value and type without coercion. If types differ, it immediately returns `false` (e.g., `'5' === 5` is `false`).

---

### Q9: What are Falsy values in JavaScript? List all of them.
**Answer:** In JavaScript, any value that coerces to `false` in a boolean context is falsy. There are exactly 8 falsy values:
1. `false`
2. `0` and `-0`
3. `0n` (BigInt zero)
4. `""` (Empty string)
5. `null`
6. `undefined`
7. `NaN` (Not a Number)
8. `document.all` (Legacy browser artifact)  
*All other values, including empty arrays `[]` and empty objects `{}`, are truthy!*

---

### Q10: What is `NaN` and how can you reliably check for it?
**Answer:** `NaN` stands for "Not-a-Number", but its `typeof` is ironically `'number'`. It is produced when an arithmetic operation fails (e.g., `'abc' / 2`).
`NaN` is the **only value in JavaScript that is not equal to itself** (`NaN === NaN` is `false`).  
To check for it reliably, use `Number.isNaN(value)`, because the global `isNaN()` coerces strings first and can give false positives (`isNaN('hello')` is `true`, but `Number.isNaN('hello')` is correctly `false`).

---

### Q11: What is Type Coercion and what is the difference between Implicit and Explicit coercion?
* **Implicit Coercion:** The JavaScript engine automatically converts types during evaluation (e.g., `'5' + 2` becomes `'52'` via string concatenation, but `'5' - 2` becomes `3` via numeric subtraction).
* **Explicit Coercion:** The programmer deliberately converts a value using built-in constructors (e.g., `Number('42')`, `String(100)`, `Boolean(1)`).

---

### Q12: What is an Execution Context in JavaScript?
**Answer:** An Execution Context is an abstract environment created by the JavaScript engine to evaluate and execute code. It contains:
1. **Variable Environment:** Stores variables and function declarations.
2. **Lexical Environment:** Includes local variables and a reference to the outer parent environment (scope chain).
3. **`this` Binding:** The reference pointing to the object calling the code.

There are three types: Global Execution Context (GEC), Function Execution Context (FEC), and Eval Execution Context.

---

### Q13: What are the two phases of an Execution Context?
1. **Creation (Compilation) Phase:**
   * Allocates memory for variables and functions (hoisting).
   * Creates the Scope Chain.
   * Determines the initial `this` value.
2. **Execution Phase:**
   * Assigns values to variables.
   * Executes statements and function calls line-by-line.

---

### Q14: What is the Call Stack?
**Answer:** The Call Stack is a LIFO (Last In, First Out) data structure used by the JavaScript engine to keep track of function execution contexts. When a function is called, its context is pushed onto the stack. When the function returns, its context is popped off the top of the stack.

---

### Q15: What is a Stack Overflow?
**Answer:** A Stack Overflow occurs when the Call Stack exceeds its maximum allocated memory limit, typically caused by infinite recursion without a valid base termination condition (e.g., `function foo() { foo(); } foo();`).

---

### Q16: What is the difference between Global Scope, Function Scope, and Block Scope?
* **Global Scope:** Variables declared outside any function or block, accessible anywhere in the program.
* **Function Scope:** Variables declared with `var`, `let`, or `const` inside a function are accessible only within that function.
* **Block Scope:** Variables declared with `let` or `const` inside a `{}` block (like `if`, `for`, `while`) are accessible only within that block.

---

### Q17: What is the Scope Chain?
**Answer:** When code references a variable, the JavaScript engine first searches within the current local lexical environment. If not found, it traverses upward to the outer enclosing environment, repeating until it reaches the Global Scope. This hierarchical chain of lexical parent links is the Scope Chain. If the variable is not found globally, a `ReferenceError` is thrown.

---

### Q18: What is the difference between Function Declarations and Function Expressions?
* **Function Declaration:** Defined with the `function` keyword as a standalone statement (`function add(a, b) { return a + b; }`). Fully hoisted, meaning it can be invoked before its definition in the code.
* **Function Expression:** An anonymous or named function assigned to a variable (`const add = function(a, b) { return a + b; };`). Only the variable declaration is hoisted, not the function assignment, so calling it before the line throws an error.

---

### Q19: What is an Anonymous Function and where is it used?
**Answer:** An anonymous function is a function without a name identifier (`function() { ... }`). They are typically used as inline callbacks (e.g., `array.map(function(item) { ... })`), inside Immediately Invoked Function Expressions (IIFEs), or assigned to variables.

---

### Q20: What is an IIFE (Immediately Invoked Function Expression)?
**Answer:** An IIFE is a function that runs immediately after it is defined:
```javascript
(function() {
  const privateVar = 'Hidden';
})();
```
Before ES6 `let`/`const` block scoping, IIFEs were the standard design pattern used to create private variables and prevent polluting the global namespace.

---

### Q21: What are Arrow Functions and how do they differ from Regular Functions?
**Answer:** Introduced in ES6, arrow functions provide a concise syntax (`() => {}`). Key differences:
1. **No own `this`:** Arrow functions inherit `this` lexically from their enclosing scope.
2. **No `arguments` object:** Must use rest parameters (`...args`).
3. **Cannot be constructors:** Cannot be invoked with `new`.
4. **No `prototype` property.**

---

### Q22: What are Pure Functions?
**Answer:** A Pure Function is a function that:
1. Always produces the **exact same output** given the same input arguments (deterministic).
2. Produces **no side effects** (does not mutate external variables, alter DOM, make network requests, or write to files).

---

### Q23: What are Higher-Order Functions (HOF)?
**Answer:** A Higher-Order Function is a function that either:
1. Takes one or more functions as arguments (e.g., `setTimeout`, `map`, `filter`).
2. Returns another function as its result (e.g., curried functions or factory functions).

---

### Q24: What is the difference between `.map()`, `.forEach()`, and `.filter()`?
* **`.forEach()`:** Iterates over each item, executes a callback for side-effects, and always returns `undefined`.
* **`.map()`:** Iterates over each item, transforms each element via the callback, and returns a **new array** of identical length.
* **`.filter()`:** Tests each element against a boolean condition and returns a **new array** containing only elements that evaluate to `true`.

---

### Q25: What does `.reduce()` do and what are its parameters?
**Answer:** `.reduce()` executes a reducer callback on each element of the array, resulting in a single accumulated output value.
Parameters: `array.reduce((accumulator, currentValue, currentIndex, array) => { ... }, initialValue)`.

---

### Q26: What is the difference between `.find()` and `.findIndex()`?
* **`.find()`:** Returns the **first element** in the array that satisfies the provided testing condition, or `undefined` if none match.
* **`.findIndex()`:** Returns the **index** of the first element that satisfies the condition, or `-1` if none match.

---

### Q27: What is the difference between `.some()` and `.every()`?
* **`.some()`:** Returns `true` if **at least one** element passes the predicate condition.
* **`.every()`:** Returns `true` only if **all** elements in the array pass the predicate condition.

---

### Q28: What is the difference between mutating and non-mutating array methods?
* **Mutating (Modifies original array in-place):** `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `reverse()`, `sort()`.
* **Non-Mutating (Returns a new array, leaving original untouched):** `concat()`, `slice()`, `map()`, `filter()`, `flat()`, `toSorted()`, `toReversed()`.

---

### Q29: What is the difference between `slice()` and `splice()`?
* **`slice(start, end)`:** Returns a shallow copy of a portion of an array into a new array. Non-mutating.
* **`splice(start, deleteCount, ...items)`:** Adds, removes, or replaces elements directly in the original array and returns the array of removed elements. Mutating.

---

### Q30: What is Array Destructuring and how does it work?
**Answer:** An ES6 syntax that unpacks values from arrays into distinct variables:
```javascript
const [first, second, ...rest] = [10, 20, 30, 40];
// first = 10, second = 20, rest = [30, 40]
```

---

### Q31: What is Object Destructuring and how does property renaming work?
**Answer:** Unpacks properties from an object into distinct variables. Renaming is done using a colon:
```javascript
const user = { name: 'Alice', age: 25 };
const { name: userName, age } = user;
// userName = 'Alice', age = 25
```

---

### Q32: What is the Spread Operator (`...`) and where is it used?
**Answer:** The spread operator expands an iterable (like an array or string) into individual elements, or unpacks object keys into a new object:
* Array merging: `const combined = [...arr1, ...arr2];`
* Object copying: `const copy = { ...user, active: true };`
* Function argument passing: `Math.max(...numbers);`

---

### Q33: What are Rest Parameters (`...args`)?
**Answer:** The rest parameter syntax allows a function to accept an indefinite number of arguments as a real JavaScript Array:
```javascript
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

---

### Q34: What is the difference between Shallow Copy and Deep Copy?
* **Shallow Copy:** Copies top-level primitive values, but nested objects/arrays are copied by reference. Modifying nested properties in the clone modifies the original. (Created with `Object.assign({}, obj)` or `{ ...obj }`).
* **Deep Copy:** Recursively clones all nested objects and arrays, creating a completely independent duplicate in memory. (Created with `structuredClone(obj)` or `JSON.parse(JSON.stringify(obj))`).

---

### Q35: What is `structuredClone()`?
**Answer:** A modern, built-in global JavaScript API that creates deep copies of structured data. Unlike `JSON.parse(JSON.stringify())`, `structuredClone` correctly preserves `Date`, `RegExp`, `Map`, `Set`, and cyclic references without breaking.

---

### Q36: What are Template Literals and Tagged Template Literals?
* **Template Literals:** Strings enclosed in backticks (`` ` ``) supporting multi-line strings and expression interpolation (`${variable}`).
* **Tagged Templates:** Advanced syntax where a function tags a template literal to parse its strings and expressions (e.g., `styled.div` in styled-components or SQL sanitization).

---

### Q37: What is the Optional Chaining operator (`?.`)?
**Answer:** Safely accesses nested object properties without throwing a `TypeError` if an intermediate reference is `null` or `undefined`. Instead of throwing, it short-circuits and returns `undefined`:
```javascript
const street = user?.address?.street;
```

---

### Q38: What is the Nullish Coalescing operator (`??`) and how does it differ from `||`?
* **`||` (Logical OR):** Returns the right-hand value if the left operand is **any falsy value** (`false`, `0`, `""`, `null`, `undefined`).
* **`??` (Nullish Coalescing):** Returns the right-hand value **only if the left operand is nullish** (`null` or `undefined`). It preserves valid values like `0`, `false`, and `""`.

---

### Q39: What is the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?
* **`Object.keys(obj)`:** Returns an array of the object's own enumerable property names (keys).
* **`Object.values(obj)`:** Returns an array of the object's own enumerable values.
* **`Object.entries(obj)`:** Returns an array of `[key, value]` pairs.

---

### Q40: What is `Object.freeze()` vs `Object.seal()`?
* **`Object.freeze(obj)`:** Makes an object completely immutable: cannot add, delete, or modify existing properties.
* **`Object.seal(obj)`:** Prevents adding or deleting properties, but existing writable properties can still be modified.

---

### Q41: What is JSON and how do `JSON.stringify()` and `JSON.parse()` work?
**Answer:** JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format.
* `JSON.stringify(object)`: Serializes a JavaScript value into a valid JSON string.
* `JSON.parse(string)`: Deserializes a valid JSON string back into a JavaScript object.

---

### Q42: What is the `typeof` operator and what are its quirks?
**Answer:** Returns a string indicating the type of the unevaluated operand.
Known quirks:
* `typeof null === 'object'` (Historical engine bug).
* `typeof NaN === 'number'`.
* `typeof function() {} === 'function'` (Even though functions are objects).
* `typeof [] === 'object'`.

---

### Q43: What is the `instanceof` operator?
**Answer:** Tests whether the `prototype` property of a constructor function appears anywhere in the prototype chain of an object.
Example: `[1, 2] instanceof Array` evaluates to `true`.

---

### Q44: What are Default Parameters in functions?
**Answer:** ES6 feature allowing function parameters to be initialized with default values if no value or `undefined` is passed:
```javascript
function greet(name = 'Guest') {
  return `Hello, ${name}`;
}
```

---

### Q45: What is the difference between `for...in` and `for...of` loops?
* **`for...in`:** Iterates over the **keys (property names)** of an object (including inherited enumerable prototype properties). Best for plain objects.
* **`for...of`:** Iterates over the **values** of an **iterable** collection (Arrays, Strings, Sets, Maps, NodeLists). Cannot iterate over plain objects unless using `Object.entries()`.

---

### Q46: What is a `Set` in JavaScript?
**Answer:** An ES6 built-in collection of **unique values**. Duplicate values are ignored.
Key methods: `.add()`, `.has()`, `.delete()`, `.size`.
Common use: deduplicating an array (`[...new Set(array)]`).

---

### Q47: What is a `Map` in JavaScript and how does it differ from a Plain Object?
* **Key Types:** In a Plain Object, keys must be Strings or Symbols. In a `Map`, keys can be **any type**, including functions, objects, and numbers.
* **Order:** A `Map` strictly remembers the original insertion order of entries.
* **Size:** A `Map` has a built-in `.size` property; objects require manual counting via `Object.keys(obj).length`.

---

### Q48: What is Event Bubbling and Event Capturing?
**Answer:** The two phases of event propagation in the DOM:
1. **Capturing Phase (Trickling):** The event travels down from `window` $\rightarrow$ `document` $\rightarrow$ `<body>` $\rightarrow$ target element.
2. **Target Phase:** The event arrives at the target element that initiated the action.
3. **Bubbling Phase:** The event bubbles up from the target element $\rightarrow$ parent containers $\rightarrow$ `document` $\rightarrow$ `window`.

---

### Q49: What is `event.stopPropagation()` vs `event.preventDefault()`?
* **`event.stopPropagation()`:** Stops the event from continuing to bubble up or capture down the DOM tree to parent listeners.
* **`event.preventDefault()`:** Prevents the browser's default native action (e.g., prevents a link from navigating or a form from submitting with a full page reload).

---

### Q50: What is Event Delegation?
**Answer:** A performance optimization pattern where instead of attaching event listeners to dozens of individual child elements, a single event listener is attached to their common parent. When children are clicked, the event bubbles up to the parent, which inspects `event.target` to identify which child was clicked.

---

# Part 2: Intermediate & Advanced JavaScript (Questions 51 – 100)

### Q51: What is a Closure in JavaScript?
**Answer:** A Closure is the combination of a function bundled together with references to its surrounding lexical environment. In simple terms: **a closure gives an inner function access to an outer function's variables, even after the outer function has finished executing and returned**.

---

### Q52: Provide a practical use case for Closures.
**Answer:** Data privacy and encapsulation (creating private variables):
```javascript
function createCounter() {
  let count = 0; // Private variable
  return {
    increment() { return ++count; },
    get() { return count; }
  };
}
const counter = createCounter();
counter.increment(); // 1
// count variable cannot be accessed or modified directly from outside!
```

---

### Q53: How does the JavaScript Event Loop work?
**Answer:** JavaScript is single-threaded, meaning it has one call stack and executes one command at a time. The **Event Loop** continuously monitors two things:
1. The **Call Stack**.
2. The **Task Queues** (Microtask Queue and Macrotask Queue).

Whenever the Call Stack becomes completely empty, the Event Loop takes waiting tasks from the queues and pushes them onto the Call Stack to be executed.

---

### Q54: What is the difference between the Microtask Queue and the Macrotask (Callback) Queue?
* **Microtask Queue:** High priority. Includes `Promise.then()`, `catch()`, `finally()`, `queueMicrotask()`, and `MutationObserver`.
* **Macrotask Queue:** Lower priority. Includes `setTimeout()`, `setInterval()`, `setImmediate()`, and I/O events.
* **Rule:** The Event Loop **empties the ENTIRE Microtask Queue** before picking up the next single macrotask!

---

### Q55: What will be logged to the console and in what exact order?
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
```
**Answer:** `1, 4, 3, 2`
* **Step 1:** Synchronous statements run first: prints `1`, then `4`.
* **Step 2:** `setTimeout` is pushed to the Macrotask Queue.
* **Step 3:** Promise resolution is pushed to the Microtask Queue.
* **Step 4:** Call stack empties. Microtask runs first: prints `3`.
* **Step 5:** Macrotask runs next: prints `2`.

---

### Q56: How is `this` determined in JavaScript?
**Answer:** In JavaScript, the value of `this` is not determined when a function is declared, but **how and where the function is called (invoked)** at runtime:
1. **Implicit Binding:** Inside an object method (`obj.greet()`), `this` points to `obj`.
2. **Explicit Binding:** Using `call()`, `apply()`, or `bind()`, `this` is explicitly passed.
3. **`new` Binding:** Inside a constructor invoked with `new`, `this` points to the newly created instance.
4. **Default Binding:** In standalone functions in non-strict mode, `this` is `window`/`global`; in strict mode (`'use strict'`), it is `undefined`.
5. **Lexical Binding (Arrow Functions):** Arrow functions do not have their own `this`; they retain the `this` value of their enclosing lexical context.

---

### Q57: What is the difference between `.call()`, `.apply()`, and `.bind()`?
* **`.call(thisArg, arg1, arg2, ...)`:** Invokes the function immediately with the specified `this` context and arguments passed individually.
* **`.apply(thisArg, [argsArray])`:** Invokes the function immediately with the specified `this` context and arguments passed as an array.
* **`.bind(thisArg, arg1, ...)`:** Does **not** invoke the function immediately. Instead, it returns a **new function** with `this` permanently bound to `thisArg`.

---

### Q58: What is the Prototype Chain in JavaScript?
**Answer:** Every object in JavaScript has an internal link to another object called its **prototype** (`[[Prototype]]`, accessible via `Object.getPrototypeOf()` or `__proto__`). When a property or method is accessed on an object, JavaScript first looks for it on the object itself. If not found, it traverses up the prototype chain until it either finds the property or reaches `null` (the end of `Object.prototype`).

---

### Q59: What is the difference between `__proto__` and `prototype`?
* **`prototype`:** A property that exists **only on constructor functions and classes**. It is the blueprint object that will become the `[[Prototype]]` of any instances instantiated with `new`.
* **`__proto__`:** An accessor property on every object instance that points to the prototype object it inherited from.

---

### Q60: How does prototypal inheritance work compared to classical OOP inheritance?
* **Classical Inheritance (Java/C++):** Classes are rigid blueprints. Instances are created by copying all methods and fields into a new memory instance.
* **Prototypal Inheritance (JavaScript):** Objects inherit directly from other objects through live reference links. If a method on `Array.prototype` is modified, all arrays immediately have access to that modification without recompiling.

---

### Q61: What are JavaScript Classes and are they truly classical?
**Answer:** ES6 Classes are **syntactic sugar** over JavaScript's existing prototypal inheritance model. Under the hood, declaring `class User { ... }` still creates a constructor function and attaches methods to `User.prototype`. It makes the syntax cleaner and more familiar to developers from classical OOP backgrounds.

---

### Q62: What is a Promise and what are its three states?
**Answer:** A Promise is an object representing the eventual completion or failure of an asynchronous operation.
The 3 states:
1. **Pending:** Initial state; neither fulfilled nor rejected.
2. **Fulfilled:** The operation completed successfully (calls `.then()`).
3. **Rejected:** The operation failed (calls `.catch()`).
*Once settled (fulfilled or rejected), a promise's state is immutable.*

---

### Q63: What is the difference between `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()`?
* **`Promise.all(promises)`:** Resolves when **all** promises fulfill; rejects immediately if **any single** promise rejects (fail-fast).
* **`Promise.allSettled(promises)`:** Waits for **all** promises to settle (either fulfill or reject) and returns an array of status objects.
* **`Promise.race(promises)`:** Settles as soon as the **first** promise settles (whether fulfilled or rejected).
* **`Promise.any(promises)`:** Resolves as soon as the **first** promise **fulfills**; rejects only if *all* promises reject.

---

### Q64: How does `async/await` work under the hood?
**Answer:** `async/await` is syntactic sugar built on top of **Promises and Generators**.
* An `async` function always returns a Promise.
* The `await` keyword pauses execution of the async function, yielding control back to the event loop, and resumes once the promise settles.

---

### Q65: What is Currying in JavaScript?
**Answer:** Currying is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of nested functions that each take a single argument:
```javascript
// Normal: f(a, b, c)
// Curried: f(a)(b)(c)
const add = a => b => a + b;
const addFive = add(5);
addFive(10); // 15
```

---

### Q66: What is Debouncing?
**Answer:** Debouncing is an optimization technique that ensures a function is not executed until a specified period of inactivity has elapsed since the last time it was invoked.
*Use case:* Search auto-complete inputs (wait until user stops typing for 300ms before sending an API request).

---

### Q67: What is Throttling?
**Answer:** Throttling is an optimization technique that guarantees a function is executed at most once within a specified time window, regardless of how many times the event is triggered.
*Use case:* Scroll events, infinite scrolling triggers, or window resizing handlers.

---

### Q68: What is the difference between Debounce and Throttle?
* **Debounce:** Groups a flurry of events together and runs the handler **once at the end** after a pause.
* **Throttle:** Regulates the execution rate, running the handler **at regular intervals** continuously during ongoing activity.

---

### Q69: How does Garbage Collection work in modern JavaScript engines (V8)?
**Answer:** JavaScript uses automatic garbage collection primarily based on the **Mark-and-Sweep** algorithm:
1. The engine starts from the "Roots" (global variables, call stack, currently executing functions).
2. It traverses and "marks" every object reachable from the roots.
3. Any object in memory that is not reachable is deemed inaccessible and its memory is "swept" (reclaimed).

---

### Q70: What are the most common causes of Memory Leaks in JavaScript?
1. **Accidental Global Variables:** Assigning to an undeclared variable attaches it to the global `window` object, preventing garbage collection.
2. **Forgotten Timers / Callbacks:** `setInterval` holding references to outer variables without `clearInterval`.
3. **Uncleared Event Listeners:** Attaching listeners to DOM elements without removing them when elements are discarded.
4. **Detached DOM Nodes:** Retaining references to removed DOM elements in a JavaScript array or object.
5. **Closures:** Unintentionally holding large data structures in outer scopes.

---

### Q71: What is a WeakMap and how does it differ from a regular Map?
* **Keys:** In a `WeakMap`, keys **must be objects** (primitives are not allowed).
* **Weak References:** References to the key objects are held "weakly". If there are no other references to the key object, it is eligible for garbage collection.
* **Not Iterable:** A `WeakMap` cannot be iterated, has no `.size` property, and has no `.clear()` method.
* *Use case:* Associating private metadata with DOM nodes or objects without causing memory leaks.

---

### Q72: What is a WeakSet?
**Answer:** An ES6 collection holding weakly referenced objects. Just like `WeakMap`, items must be objects, are garbage collected when no other references exist, and cannot be iterated.

---

### Q73: What is the difference between CommonJS and ES Modules (ESM)?
| Feature | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| **Syntax** | `require()` and `module.exports` | `import` and `export` |
| **Loading** | Synchronous at runtime | Asynchronous and static at parse time |
| **Tree Shaking** | Difficult / impossible | Fully supported (dead-code elimination) |
| **Environment** | Default in legacy Node.js | Modern standard in browsers and modern Node |

---

### Q74: What is Tree Shaking?
**Answer:** A dead-code elimination optimization performed by modern module bundlers (like Rollup, Webpack, Vite, Turbopack). Because ES Modules (`import`/`export`) have a static structure determined before runtime, the bundler can detect which exported functions are never imported, completely removing them from the final production bundle.

---

### Q75: What is a Generator Function and what does `yield` do?
**Answer:** A Generator function (declared with `function*`) can be paused and resumed on-demand. Calling a generator returns an Iterator object. When `.next()` is called on the iterator, execution proceeds until it hits the `yield` keyword, which returns a value and suspends execution.

---

### Q76: What is an Iterator and the Iterable Protocol?
* **Iterable Protocol:** An object is iterable if it implements a method named `[Symbol.iterator]` that returns an iterator.
* **Iterator Protocol:** An object is an iterator if it has a `.next()` method returning `{ value: any, done: boolean }`.
* Built-in iterables include: Arrays, Strings, Maps, Sets.

---

### Q77: What are Symbols in JavaScript and why are they used?
**Answer:** A Symbol is a unique, immutable primitive data type. Every `Symbol()` created is guaranteed to be globally unique:
```javascript
Symbol('id') === Symbol('id'); // false!
```
Uses:
1. Creating unique object keys that will never collide with other libraries.
2. Well-Known Symbols (`Symbol.iterator`, `Symbol.toPrimitive`) for hooking into native language algorithms.

---

### Q78: What is a Proxy in JavaScript?
**Answer:** A `Proxy` object wraps another target object and allows you to intercept and customize fundamental operations performed on it (such as property lookup, assignment, enumeration, function invocation).
It accepts two parameters: `new Proxy(target, handler)`. The handler contains "traps" like `get`, `set`, and `deleteProperty`.

---

### Q79: What is the `Reflect` API?
**Answer:** A built-in object that provides methods for interceptable JavaScript operations. Its methods match the traps of `Proxy` objects (e.g., `Reflect.get`, `Reflect.set`), providing cleaner, safer alternatives to older object manipulation methods.

---

### Q80: What is the difference between Shallow Routing and Full Navigation?
**Answer:**
* **Full Navigation:** Causes the browser to make a fresh network request for a new HTML page, re-parsing scripts and stylesheets.
* **Shallow Routing (Client Routing):** Updates the browser URL (via `history.pushState`) and updates components in-memory without refreshing the page or making duplicate server document requests.

---

### Q81: What is the difference between `Object.create()` and the `new` operator?
* **`Object.create(proto)`:** Creates a brand-new object and explicitly sets its prototype to `proto` without running any constructor function code.
* **`new Constructor()`:** Creates a brand-new object, links its prototype to `Constructor.prototype`, binds `this` to the new instance, executes the constructor body, and returns the instance.

---

### Q82: What is the Critical Rendering Path and what causes Reflow vs Repaint?
* **Reflow (Layout):** Occurs when geometric properties of elements change (e.g., `width`, `height`, `margin`, `padding`, font size). The browser recalculates positions of elements on the entire page. Very expensive!
* **Repaint:** Occurs when visual styles change without altering element geometry (e.g., `color`, `background-color`, `visibility`). Less expensive than reflow.

---

### Q83: How do `async` and `defer` attributes affect script execution?
* **Normal `<script>`:** Pauses HTML parsing immediately, downloads the script over network, executes it, then resumes HTML parsing. Blocks parsing.
* **`<script defer>`:** Downloads the script asynchronously in the background while HTML continues parsing. Executes only after HTML parsing is complete, preserving script order.
* **`<script async>`:** Downloads the script asynchronously in the background. Executes immediately the instant it finishes downloading, pausing HTML parsing. Does not guarantee execution order.

---

### Q84: What is Event Loop Starvation?
**Answer:** Occurs when long-running synchronous code or an infinite recursive microtask loop (e.g., endlessly queueing microtasks with `queueMicrotask` or unresolved promises) monopolizes the Call Stack. This prevents the Event Loop from ever processing UI rendering or macrotasks, freezing the browser interface.

---

### Q85: What are Web Workers?
**Answer:** A browser API that allows JavaScript scripts to run in background worker threads separate from the main execution thread. Heavy calculations (image processing, data sorting, encryption) can run in a worker without freezing or dropping frames in the main user interface.

---

### Q86: Can Web Workers access the DOM?
**Answer:** **No.** Web Workers run in a separate global context (`DedicatedWorkerGlobalScope`). They do not have access to the `window`, `document`, or DOM nodes. They communicate with the main thread strictly through message passing (`postMessage` and `onmessage`).

---

### Q87: What is the difference between `localStorage`, `sessionStorage`, and Cookies?
| Feature | `localStorage` | `sessionStorage` | `Cookies` |
| :--- | :--- | :--- | :--- |
| **Capacity** | ~5MB – 10MB | ~5MB | ~4KB |
| **Lifespan** | Persistent until explicitly deleted | Cleared when browser tab is closed | Configurable via `Expires` / `Max-Age` |
| **Server Access** | Client-side only | Client-side only | Sent automatically with every HTTP request |

---

### Q88: What is Cross-Site Scripting (XSS) and how do you prevent it in JavaScript?
**Answer:** An injection attack where malicious scripts are executed in a victim's browser, allowing attackers to steal session cookies or auth tokens.
Prevention:
1. Always sanitize and escape untrusted user input before rendering.
2. Use `textContent` or `innerText` instead of `innerHTML`.
3. Enforce a strict Content Security Policy (CSP).
4. Store authentication tokens in `HttpOnly` cookies rather than `localStorage`.

---

### Q89: What is Cross-Site Request Forgery (CSRF)?
**Answer:** An attack where a malicious website tricks a user's browser into performing unwanted actions on a trusted site where the user is currently authenticated.
Prevention: SameSite cookie attributes (`SameSite=Strict` or `Lax`), Anti-CSRF verification tokens, and Custom Request Headers.

---

### Q90: What is Content Security Policy (CSP)?
**Answer:** An HTTP response header (`Content-Security-Policy`) that allows site administrators to restrict the domains from which scripts, styles, images, and fonts can be loaded and executed, mitigating XSS attacks.

---

### Q91: What is the purpose of `'use strict'`?
**Answer:** Enables ECMAScript Strict Mode, which:
1. Eliminates silent errors by throwing exceptions (e.g., assigning to undeclared variables).
2. Disables confusing features (like `with` statements).
3. Changes default `this` in standalone functions to `undefined` instead of `window`.
4. Prevents duplicate parameter names in functions.

---

### Q92: What is Function Borrowing?
**Answer:** A pattern where an object borrows a method from another object without copying it, using `call()`, `apply()`, or `bind()`.
Example:
```javascript
const numbers = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.push.call(numbers, 'c');
```

---

### Q93: What is the difference between Function Composition and Pipelining?
* **Composition (`f(g(x))`):** Applies functions right-to-left. The output of the inner function is passed as input to the outer function.
* **Pipelining (`x |> g |> f`):** Passes an initial value left-to-right through a sequence of functions, making code read sequentially.

---

### Q94: What is Tail Call Optimization (TCO)?
**Answer:** An engine optimization where if the last action of a function is a call to another function (or itself recursively), the engine reuses the current stack frame instead of creating a new one, preventing Stack Overflow in recursive algorithms. (Part of the ES6 specification, implemented in Safari WebKit).

---

### Q95: What is Monkey Patching and why is it dangerous?
**Answer:** Dynamically overriding or modifying built-in methods on prototypes at runtime (e.g., `Array.prototype.customMethod = ...`).
Danger: Breaks interoperability with third-party libraries, causes subtle bugs when specifications add standard methods with the same name, and ruins engine performance optimizations.

---

### Q96: What is a Polyfill vs a Transpiler?
* **Polyfill:** A piece of code that provides modern functionality in older browsers that lack native support for that API (e.g., polyfilling `Promise` or `Array.prototype.flat`).
* **Transpiler (Babel/SWC):** A tool that converts modern JavaScript syntax (like optional chaining `?.` or arrow functions) into older syntax compatible with legacy engines.

---

### Q97: What is the Internationalization API (`Intl`)?
**Answer:** A built-in ECMAScript namespace providing language-sensitive string comparison, number formatting (currencies, percentages), date/time formatting, and pluralization rules without requiring heavy external libraries like Moment.js.

---

### Q98: What are Object Getters and Setters?
**Answer:** Methods that bind an object property to a function when that property is accessed or set:
```javascript
const person = {
  first: 'Jane',
  last: 'Doe',
  get fullName() { return `${this.first} ${this.last}`; },
  set fullName(name) { [this.first, this.last] = name.split(' '); }
};
```

---

### Q99: What is the difference between deep equality check and shallow equality check in objects?
* **Shallow Equality:** Compares object references (`obj1 === obj2`) or compares only top-level primitive property keys and values.
* **Deep Equality:** Recursively compares every nested key, array, and object value across both hierarchies to verify identical data structures.

---

### Q100: How does modern V8 execute JavaScript code from source to machine code?
**Answer:**
1. **Parser:** Converts raw JavaScript source text into an Abstract Syntax Tree (AST).
2. **Ignition (Interpreter):** Compiles the AST into bytecode and starts executing immediately.
3. **Profiler:** Collects profiling telemetry during execution, identifying "hot" (frequently called) functions.
4. **TurboFan (Optimizing Compiler):** Takes hot bytecode and type feedback, aggressively compiling it into highly optimized native Machine Code.
5. **Deoptimization:** If runtime types unexpectedly change (e.g., a function expecting integers receives a string), TurboFan deoptimizes the machine code back to interpreted bytecode.
