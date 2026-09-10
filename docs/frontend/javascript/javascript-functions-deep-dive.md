# JavaScript Functions Deep Dive: All 12 Types, Scope & Closures

> A comprehensive, beginner-friendly masterclass on every type of JavaScript function, parameters, lexical scope, hoisting, closures, and the `this` keyword.

---

## 1. What is a Function?

A **function** is a reusable block of code designed to perform a specific task. You define the function once, and can execute ("call" or "invoke") it as many times as needed with different inputs.

```javascript
// Simple function: input -> processing -> output
function calculateArea(width, height) {
  return width * height;
}

const room1 = calculateArea(10, 12); // 120
const room2 = calculateArea(15, 20); // 300
console.log(room1, room2);
```

---

## 2. All 12 Types of JavaScript Functions

### 1. Function Declaration (Named Function)
Hoisted completely to the top of its scope. Can be called before its line of definition.
```javascript
function greetUser(name) {
  return `Hello, ${name}!`;
}
console.log(greetUser("Alex"));
```

### 2. Function Expression
A function assigned to a variable. Not hoisted before its declaration.
```javascript
const addNumbers = function(a, b) {
  return a + b;
};
console.log(addNumbers(5, 10)); // 15
```

### 3. Arrow Function (ES6)
Concise syntax, implicit returns, and lexical `this` binding. The modern standard in React and modern JS.
```javascript
// Explicit return with block:
const multiply = (a, b) => {
  return a * b;
};

// Implicit one-line return (no return keyword or {} needed):
const double = x => x * 2;

// Returning an object literal implicitly (wrap object in parentheses):
const makeUser = (name, role) => ({ name, role, active: true });

console.log(double(25)); // 50
console.log(makeUser("Sarah", "Engineer")); // { name: "Sarah", role: "Engineer", active: true }
```

### 4. Anonymous Function
A function without a name, typically used as an inline callback:
```javascript
setTimeout(function() {
  console.log("Executed anonymously after 1 second!");
}, 1000);
```

### 5. Immediately Invoked Function Expression (IIFE)
A function that runs immediately upon definition. Historically used to create private scope:
```javascript
(function() {
  const privateSecret = "KEY_987";
  console.log("IIFE executed immediately with private key:", privateSecret);
})();
```

### 6. Callback Function
A function passed into another function as an argument to be called later:
```javascript
function processUserData(userId, callback) {
  console.log(`Fetching data for user ${userId}...`);
  const userData = { id: userId, username: "harshit_dev" };
  callback(userData);
}

processUserData(101, (user) => {
  console.log(`Callback received user: ${user.username}`);
});
```

### 7. Higher-Order Function (HOF)
A function that either **takes another function as an argument** OR **returns a function**:
```javascript
function createGreeting(greetingWord) {
  return function(personName) {
    return `${greetingWord}, ${personName}!`;
  };
}

const sayHello = createGreeting("Hello");
const sayNamaste = createGreeting("Namaste");

console.log(sayHello("Jordan"));   // "Hello, Jordan!"
console.log(sayNamaste("Harshit")); // "Namaste, Harshit!"
```

### 8. Constructor Function (Classic OOP)
Used with the `new` keyword to construct object instances:
```javascript
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
  this.speed = 0;
}

Car.prototype.accelerate = function() {
  this.speed += 10;
  return `${this.brand} speed is now ${this.speed} km/h`;
};

const myCar = new Car("Toyota", "Supra");
console.log(myCar.accelerate()); // "Toyota speed is now 10 km/h"
```

### 9. Factory Function
A regular function that creates and returns a new object without needing the `new` keyword:
```javascript
function createPlayer(name, score = 0) {
  return {
    name,
    score,
    gainPoints(pts) {
      this.score += pts;
      console.log(`${this.name} has ${this.score} points`);
    }
  };
}

const player1 = createPlayer("Alex", 100);
player1.gainPoints(50); // "Alex has 150 points"
```

### 10. Generator Function (`function*`)
A function that can pause execution using `yield` and resume later:
```javascript
function* numberSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const sequence = numberSequence();
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
```

### 11. Recursive Function
A function that calls itself until it hits a base exit condition:
```javascript
function factorial(n) {
  if (n <= 1) return 1; // Base condition
  return n * factorial(n - 1); // Recursive step
}

console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 = 120
```

### 12. Pure Function vs Impure Function
* **Pure Function**: Always produces the same output for identical inputs and causes **no side effects** (does not alter global variables or I/O).
* **Impure Function**: Modifies external state or relies on external random/time values.

```javascript
// ✅ Pure Function (Predictable, testable):
function calculateTotal(price, taxRate) {
  return price + (price * taxRate);
}

// ❌ Impure Function (Modifies external global state):
let globalDiscount = 5;
function calculateDiscountedPrice(price) {
  globalDiscount += 2; // Side effect!
  return price - globalDiscount;
}
```

---

## 3. Function Parameters: Defaults & Rest (`...args`)

```javascript
// 1. Default Parameters
function sendEmail(to, subject = "No Subject", isUrgent = false) {
  return `Sending email to ${to} | Subject: ${subject} | Urgent: ${isUrgent}`;
}
console.log(sendEmail("test@example.com"));

// 2. Rest Parameters (Collects unlimited arguments into an array)
function calculateAverage(...grades) {
  const total = grades.reduce((sum, g) => sum + g, 0);
  return (total / grades.length).toFixed(1);
}
console.log(calculateAverage(85, 90, 78, 92, 88)); // "86.6"
```

---

## 4. Scope & Lexical Scope Chain

```text
┌────────────────────────────────────────────────────────┐
│                      Global Scope                      │
│   const globalSecret = "global_123";                   │
│                                                        │
│   ┌────────────────────────────────────────────────┐   │
│   │                 Function Scope                 │   │
│   │   const functionSecret = "fn_456";             │   │
│   │                                                │   │
│   │   ┌────────────────────────────────────────┐   │   │
│   │   │              Block Scope               │   │   │
│   │   │   if (true) {                          │   │   │
│   │   │     const blockSecret = "block_789";   │   │   │
│   │   │     // Can access block, fn, & global! │   │   │
│   │   │   }                                    │   │   │
│   │   └────────────────────────────────────────┘   │   │
│   └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

---

## 5. Closures Explained Simply

A **Closure** gives an inner function access to its outer function's scope, **even after that outer function has finished executing**.

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private enclosed variable

  return {
    deposit(amount) {
      balance += amount;
      return `Deposited $${amount}. New balance: $${balance}`;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds!";
      balance -= amount;
      return `Withdrew $${amount}. Remaining: $${balance}`;
    },
    getBalance() {
      return `Current balance: $${balance}`;
    }
  };
}

const myAccount = createBankAccount(100);
console.log(myAccount.deposit(50));   // "Deposited $50. New balance: $150"
console.log(myAccount.withdraw(30));  // "Withdrew $30. Remaining: $120"
console.log(myAccount.getBalance());  // "Current balance: $120"
console.log(myAccount.balance);       // undefined (Cannot be directly tampered with from outside!)
```
