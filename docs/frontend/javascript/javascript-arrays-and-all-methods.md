# JavaScript Arrays & Complete Guide to ALL Array Methods

> The ultimate, beginner-friendly encyclopedia of JavaScript arrays: creation, indexing, mutator methods, accessor methods, iteration pipelines, and modern ES2023 immutable methods.

---

## 1. Array Basics & Indexing

An **Array** is an ordered list of values. In JavaScript, arrays are zero-indexed (the first element is at index `0`).

```javascript
const fruits = ["Apple", "Banana", "Cherry", "Mango"];

console.log(fruits[0]);        // "Apple" (First item)
console.log(fruits[1]);        // "Banana"
console.log(fruits.length);    // 4 (Total count)
console.log(fruits[fruits.length - 1]); // "Mango" (Last item)
console.log(fruits.at(-1));    // "Mango" (Modern clean way to get last item)
```

---

## 2. Mutator Methods (Modify Original Array in Place)

These methods **mutate (change)** the array directly:

| Method | What It Does | Return Value | Example |
| :--- | :--- | :--- | :--- |
| **`push(...items)`** | Adds item(s) to the **END** | New array length | `arr.push("Orange")` |
| **`pop()`** | Removes item from the **END** | The removed item | `arr.pop()` |
| **`unshift(...items)`**| Adds item(s) to the **START** | New array length | `arr.unshift("Strawberry")` |
| **`shift()`** | Removes item from the **START**| The removed item | `arr.shift()` |
| **`splice(start, deleteCount, ...add)`**| Adds/Removes at any position | Array of removed items | `arr.splice(1, 2, "New")` |
| **`reverse()`** | Reverses order in place | Mutated array | `arr.reverse()` |
| **`sort(compareFn)`** | Sorts elements in place | Mutated array | `arr.sort((a,b) => a-b)` |
| **`fill(val, start, end)`**| Fills elements with a value | Mutated array | `arr.fill(0)` |

```javascript
const queue = ["User1", "User2"];

// 1. push & pop
queue.push("User3"); // ["User1", "User2", "User3"]
const finished = queue.pop(); // finished = "User3", queue = ["User1", "User2"]

// 2. unshift & shift
queue.unshift("VIP_User"); // ["VIP_User", "User1", "User2"]
const firstServed = queue.shift(); // firstServed = "VIP_User"

// 3. splice(startIndex, howManyToDelete, ...itemsToInsert)
const colors = ["Red", "Green", "Blue", "Yellow"];
colors.splice(1, 2, "Purple", "Orange"); 
console.log(colors); // ["Red", "Purple", "Orange", "Yellow"]

// 4. sort()
const numbers = [40, 100, 1, 5, 25, 10];
// ⚠️ Warning: Default sort() treats elements as strings ("100" comes before "25")!
// Always provide a compare function:
numbers.sort((a, b) => a - b); // Ascending numeric sort
console.log(numbers); // [1, 5, 10, 25, 40, 100]
```

---

## 3. High-Yield Iteration & Transformation Methods (Must Know for React)

### 1. `map()` (Transform Every Element)
Creates a **brand new array** by applying a function to every item:
```javascript
const prices = [10, 20, 30, 40];
const pricesWithTax = prices.map(price => price * 1.18);
console.log(pricesWithTax); // [11.8, 23.6, 35.4, 47.2]

// In React: Mapping data to UI cards
const users = [{ id: 1, name: "Alex" }, { id: 2, name: "Maya" }];
const userNames = users.map(u => u.name); // ["Alex", "Maya"]
```

### 2. `filter()` (Keep Matching Elements)
Creates a **new array** containing only elements that return `true` from the test condition:
```javascript
const scores = [45, 82, 90, 30, 65, 95];
const passingScores = scores.filter(score => score >= 50);
console.log(passingScores); // [82, 90, 65, 95]
```

### 3. `reduce()` (Accumulate Down to Single Value)
Combines all items into a single total, object, or grouped structure:
```javascript
// Summing numbers
const cartPrices = [25, 15, 60, 100];
const grandTotal = cartPrices.reduce((total, price) => total + price, 0);
console.log(grandTotal); // 200

// Grouping objects by category
const inventory = [
  { name: "Laptop", category: "Electronics" },
  { name: "Shirt", category: "Apparel" },
  { name: "Phone", category: "Electronics" }
];

const grouped = inventory.reduce((acc, item) => {
  acc[item.category] ??= [];
  acc[item.category].push(item.name);
  return acc;
}, {});

console.log(grouped);
// { Electronics: ["Laptop", "Phone"], Apparel: ["Shirt"] }
```

---

## 4. Searching & Inspecting Methods

```javascript
const employees = [
  { id: 101, name: "Jordan", role: "Dev", active: true },
  { id: 102, name: "Sarah", role: "Design", active: false },
  { id: 103, name: "Devon", role: "Dev", active: true }
];

// 1. find() -> Returns FIRST matching element (or undefined)
const dev = employees.find(emp => emp.role === "Dev");
console.log(dev.name); // "Jordan"

// 2. findIndex() -> Returns index of first match (or -1)
const sarahIndex = employees.findIndex(emp => emp.id === 102);
console.log(sarahIndex); // 1

// 3. some() -> Returns true if AT LEAST ONE element matches
const hasInactive = employees.some(emp => !emp.active);
console.log(hasInactive); // true

// 4. every() -> Returns true if ALL elements match
const allActive = employees.every(emp => emp.active);
console.log(allActive); // false

// 5. includes() -> Primitive value membership check
const tags = ["javascript", "react", "css"];
console.log(tags.includes("react")); // true
console.log(tags.includes("python"));// false
```

---

## 5. Extracting, Combining & Flattening

```javascript
// 1. slice(start, end) -> Copies a portion without mutating original
const original = ["a", "b", "c", "d", "e"];
const subArray = original.slice(1, 4); // ["b", "c", "d"]

// 2. concat() or Spread [...] -> Combines arrays
const frontend = ["HTML", "CSS"];
const backend = ["Node.js", "SQL"];
const fullStack = [...frontend, ...backend]; // ["HTML", "CSS", "Node.js", "SQL"]

// 3. join(separator) -> Converts array into a string
const breadcrumb = ["Home", "Products", "Laptops"];
console.log(breadcrumb.join(" > ")); // "Home > Products > Laptops"

// 4. flat(depth) -> Flattens nested arrays
const nested = [1, [2, 3], [[4, 5]]];
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]

// 5. flatMap() -> Maps then flattens 1 level
const orders = [
  { id: 1, items: ["Keyboard", "Mouse"] },
  { id: 2, items: ["Monitor"] }
];
const allItems = orders.flatMap(o => o.items);
console.log(allItems); // ["Keyboard", "Mouse", "Monitor"]
```

---

## 6. Modern ES2023 Immutable Methods

React requires immutability. ES2023 introduced non-mutating counterparts:

```javascript
const numbersList = [3, 1, 4, 1, 5];

// toSorted (Does NOT mutate numbersList)
const sortedCopy = numbersList.toSorted((a, b) => a - b);
console.log(sortedCopy);   // [1, 1, 3, 4, 5]
console.log(numbersList);  // [3, 1, 4, 1, 5] (Original intact!)

// toReversed
const reversedCopy = numbersList.toReversed();

// with(index, newValue) -> Replaces single item immutably
const modifiedCopy = numbersList.with(0, 99);
console.log(modifiedCopy); // [99, 1, 4, 1, 5]
```
