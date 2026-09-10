# JavaScript Strings, Regular Expressions & Numbers

> In-depth guide to text manipulation, string methods, RegExp pattern matching, IEEE-754 numbers, BigInt, and the Math object.

---

## 1. String Manipulation & Methods

Strings in JavaScript are immutable sequences of UTF-16 characters:

```javascript
const sentence = "   Modern JavaScript Full-Stack Architecture   ";

// 1. Trimming Whitespace
console.log(sentence.trim()); // "Modern JavaScript Full-Stack Architecture"

// 2. Searching & Checking
const text = "The quick brown fox jumps over the lazy dog";
console.log(text.includes("fox"));    // true
console.log(text.startsWith("The"));  // true
console.log(text.endsWith("dog"));    // true
console.log(text.indexOf("brown"));   // 10 (index)

// 3. Extracting Substrings
console.log(text.slice(4, 9));        // "quick"
console.log(text.slice(-3));          // "dog" (negative index starts from end)

// 4. Splitting and Joining
const csv = "apple,banana,cherry,grape";
const fruitList = csv.split(",");
console.log(fruitList); // ["apple", "banana", "cherry", "grape"]
console.log(fruitList.join(" • ")); // "apple • banana • cherry • grape"

// 5. Replacing
const announcement = "Dogs are great, dogs are loyal";
console.log(announcement.replaceAll(/dogs/gi, "Cats")); // "Cats are great, Cats are loyal"
```

---

## 2. Regular Expressions (RegExp) Basics

```javascript
// 1. Email validation regex pattern
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

console.log(emailRegex.test("user@example.com")); // true
console.log(emailRegex.test("invalid-email"));    // false

// 2. Extracting matches with matchAll()
const log = "Error on 2026-09-10 and warning on 2026-10-15";
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

for (const match of log.matchAll(datePattern)) {
  const { year, month, day } = match.groups;
  console.log(`Found Date: ${day}/${month}/${year}`);
}
```

---

## 3. Numbers & The Floating-Point Gotcha

In JavaScript, all numbers are double-precision 64-bit floating-point format (IEEE-754):

```javascript
// The famous precision quirk:
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false!

// Financial / Currency formatting solution:
const price1 = 0.1, price2 = 0.2;
const total = Number((price1 + price2).toFixed(2));
console.log(total); // 0.3

// Number inspection methods:
console.log(Number.isInteger(42));    // true
console.log(Number.isInteger(42.5));  // false
console.log(Number.isNaN(NaN));       // true
```

---

## 4. The `Math` Object

```javascript
// Rounding
console.log(Math.round(4.7)); // 5 (Standard rounding)
console.log(Math.floor(4.9)); // 4 (Always round down)
console.log(Math.ceil(4.1));  // 5 (Always round up)

// Random number in range [min, max]
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomNumber(1, 10)); // Random integer between 1 and 10

// Min & Max
console.log(Math.min(10, 5, 20, 1)); // 1
console.log(Math.max(10, 5, 20, 1)); // 20
```
