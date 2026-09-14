# 100 JavaScript Practical & Coding Interview Questions

> A comprehensive master collection of 100 code-driven JavaScript interview challenges, algorithm implementations, real-world utility functions, and custom polyfills, categorized into 50 Basic and 50 Intermediate to Advanced coding problems.

---

## 📑 Index & Practice Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic Practical & Coding Challenges**](#part-1-basic-practical-coding-challenges-questions-1-50) | Q1 – Q50 | String manipulation, palindrome verification, anagrams, array deduplication, min/max calculations, FizzBuzz, factorials, Fibonacci, object checks, frequency maps, basic DOM events |
| [**Part 2: Intermediate & Advanced Coding Challenges**](#part-2-intermediate-advanced-coding-challenges-questions-51-100) | Q51 – Q100 | Custom polyfills (`myMap`, `myFilter`, `myReduce`, `myBind`), Promise polyfills (`Promise.all`, `Promise.race`), `debounce` & `throttle`, Deep Clone, LRU Cache, Memoization, Currying, Event Emitter, Flatten nested objects |

---

# Part 1: Basic Practical & Coding Challenges (Questions 1 – 50)

### Q1: Reverse a string in JavaScript.
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
// Example: reverseString("hello") -> "olleh"
```

---

### Q2: Check if a string is a palindrome.
```javascript
function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}
// Example: isPalindrome("A man, a plan, a canal: Panama") -> true
```

---

### Q3: Implement the classic FizzBuzz algorithm.
```javascript
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push('FizzBuzz');
    else if (i % 3 === 0) result.push('Fizz');
    else if (i % 5 === 0) result.push('Buzz');
    else result.push(i);
  }
  return result;
}
```

---

### Q4: Remove all duplicate values from an array.
```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
// Example: removeDuplicates([1, 2, 2, 3, 4, 4, 5]) -> [1, 2, 3, 4, 5]
```

---

### Q5: Find the maximum and minimum numbers in an array.
```javascript
function findMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}
// Example: findMinMax([14, 2, 99, -5, 42]) -> { min: -5, max: 99 }
```

---

### Q6: Check if two strings are anagrams.
```javascript
function areAnagrams(str1, str2) {
  const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}
// Example: areAnagrams("listen", "silent") -> true
```

---

### Q7: Count the number of vowels in a string.
```javascript
function countVowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}
// Example: countVowels("JavaScript") -> 3
```

---

### Q8: Capitalize the first letter of each word in a string (Title Case).
```javascript
function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
// Example: titleCase("the product engineer") -> "The Product Engineer"
```

---

### Q9: Calculate the factorial of a number using recursion.
```javascript
function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
// Example: factorial(5) -> 120
```

---

### Q10: Generate the Nth Fibonacci number.
```javascript
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}
// Example: fibonacci(7) -> 13
```

---

### Q11: Flatten a single-level nested array without using `.flat()`.
```javascript
function flattenArray(arr) {
  return arr.reduce((acc, item) => acc.concat(item), []);
}
// Example: flattenArray([[1, 2], [3, 4], [5]]) -> [1, 2, 3, 4, 5]
```

---

### Q12: Check if a given object is empty.
```javascript
function isEmptyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
// Example: isEmptyObject({}) -> true, isEmptyObject({ a: 1 }) -> false
```

---

### Q13: Count the occurrences of each element in an array.
```javascript
function countOccurrences(arr) {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}
// Example: countOccurrences(['apple', 'banana', 'apple']) -> { apple: 2, banana: 1 }
```

---

### Q14: Find the sum of all numbers in an array using `.reduce()`.
```javascript
function sumArray(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
// Example: sumArray([10, 20, 30, 40]) -> 100
```

---

### Q15: Find the longest word in a sentence.
```javascript
function findLongestWord(sentence) {
  const words = sentence.split(/\s+/);
  return words.reduce((longest, current) => 
    current.length > longest.length ? current : longest
  , '');
}
// Example: findLongestWord("Building scalable fullstack architectures") -> "architectures"
```

---

### Q16: Truncate a string with an ellipsis if it exceeds a maximum length.
```javascript
function truncateString(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
// Example: truncateString("Hello World", 5) -> "Hello..."
```

---

### Q17: Swap two variables without using a temporary variable.
```javascript
let a = 5, b = 10;
// Using array destructuring
[a, b] = [b, a];
// a = 10, b = 5
```

---

### Q18: Check if a number is an integer without using `Number.isInteger()`.
```javascript
function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
```

---

### Q19: Generate a random integer between a minimum and maximum (inclusive).
```javascript
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

### Q20: Find the second largest number in an array.
```javascript
function secondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique.length > 1 ? unique[1] : null;
}
// Example: secondLargest([10, 5, 20, 20, 8]) -> 10
```

---

### Q21: Check if an array is sorted in ascending order.
```javascript
function isSortedAscending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}
```

---

### Q22: Mask credit card digits (leaving only the last 4 visible).
```javascript
function maskCardNumber(cardNumber) {
  const str = String(cardNumber);
  if (str.length <= 4) return str;
  return '*'.repeat(str.length - 4) + str.slice(-4);
}
// Example: maskCardNumber("1234567812345678") -> "************5678"
```

---

### Q23: Chunk an array into smaller sub-arrays of a given size.
```javascript
function chunkArray(arr, size) {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}
// Example: chunkArray([1, 2, 3, 4, 5], 2) -> [[1, 2], [3, 4], [5]]
```

---

### Q24: Merge two sorted arrays into one sorted array.
```javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
    else merged.push(arr2[j++]);
  }
  return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
}
// Example: mergeSortedArrays([1, 3, 5], [2, 4, 6]) -> [1, 2, 3, 4, 5, 6]
```

---

### Q25: Find the intersection of two arrays (common elements).
```javascript
function arrayIntersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return [...new Set(arr1.filter(item => set2.has(item)))];
}
// Example: arrayIntersection([1, 2, 3], [2, 3, 4]) -> [2, 3]
```

---

### Q26: Find the difference of two arrays (elements in A but not in B).
```javascript
function arrayDifference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}
// Example: arrayDifference([1, 2, 3], [2, 3, 4]) -> [1]
```

---

### Q27: Check if a number is prime.
```javascript
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}
```

---

### Q28: Convert a query string to a JavaScript object.
```javascript
function parseQueryString(queryString) {
  const clean = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  return Object.fromEntries(new URLSearchParams(clean));
}
// Example: parseQueryString("?page=2&sort=asc") -> { page: "2", sort: "asc" }
```

---

### Q29: Convert an object into a URL query string.
```javascript
function objectToQueryString(obj) {
  return new URLSearchParams(obj).toString();
}
// Example: objectToQueryString({ user: "harshit", role: "admin" }) -> "user=harshit&role=admin"
```

---

### Q30: Remove all falsy values from an array.
```javascript
function compact(arr) {
  return arr.filter(Boolean);
}
// Example: compact([0, 1, false, 2, '', 3, 'a', NaN, undefined, null]) -> [1, 2, 3, 'a']
```

---

### Q31: Find the first non-repeating character in a string.
```javascript
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }
  for (const char of str) {
    if (counts[char] === 1) return char;
  }
  return null;
}
// Example: firstNonRepeatingChar("swiss") -> "w"
```

---

### Q32: Group an array of objects by a specific property.
```javascript
function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    const group = obj[key];
    acc[group] = acc[group] || [];
    acc[group].push(obj);
    return acc;
  }, {});
}
// Example: groupBy([{ role: 'admin' }, { role: 'user' }, { role: 'admin' }], 'role')
```

---

### Q33: Deep freeze an object (recursively freeze all nested objects).
```javascript
function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}
```

---

### Q34: Check if two arrays contain the exact same elements (regardless of order).
```javascript
function arraysHaveSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const count = {};
  for (const x of arr1) count[x] = (count[x] || 0) + 1;
  for (const x of arr2) {
    if (!count[x]) return false;
    count[x]--;
  }
  return true;
}
```

---

### Q35: Format a number as a currency string using `Intl.NumberFormat`.
```javascript
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(amount);
}
// Example: formatCurrency(1249.5) -> "$1,249.50"
```

---

### Q36: Implement a Linear Search algorithm.
```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
```

---

### Q37: Implement a Binary Search algorithm on a sorted array.
```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Example: binarySearch([10, 20, 30, 40, 50], 30) -> 2
```

---

### Q38: Calculate the sum of all digits in a number.
```javascript
function sumOfDigits(num) {
  return Math.abs(num)
    .toString()
    .split('')
    .reduce((sum, d) => sum + Number(d), 0);
}
// Example: sumOfDigits(456) -> 15
```

---

### Q39: Generate an array of numbers in a given range `[start, end]`.
```javascript
function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}
// Example: range(1, 5) -> [1, 2, 3, 4, 5]
```

---

### Q40: Check if a string contains only numeric characters.
```javascript
function isNumeric(str) {
  return /^\d+$/.test(str.trim());
}
```

---

### Q41: Pick specific keys from an object (similar to Lodash `pick`).
```javascript
function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}
// Example: pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) -> { a: 1, c: 3 }
```

---

### Q42: Omit specific keys from an object (similar to Lodash `omit`).
```javascript
function omit(obj, keys) {
  const keySet = new Set(keys);
  return Object.keys(obj)
    .filter(k => !keySet.has(k))
    .reduce((acc, k) => {
      acc[k] = obj[k];
      return acc;
    }, {});
}
// Example: omit({ a: 1, b: 2, c: 3 }, ['b']) -> { a: 1, c: 3 }
```

---

### Q43: Shuffle an array randomly (Fisher-Yates Shuffle algorithm).
```javascript
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
```

---

### Q44: Capitalize the first letter of a single string.
```javascript
function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

---

### Q45: Invert keys and values in an object.
```javascript
function invertObject(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    acc[val] = key;
    return acc;
  }, {});
}
// Example: invertObject({ a: 'x', b: 'y' }) -> { x: 'a', y: 'b' }
```

---

### Q46: Calculate the average (mean) of an array of numbers.
```javascript
function calculateAverage(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}
```

---

### Q47: Convert snake_case or kebab-case to camelCase.
```javascript
function toCamelCase(str) {
  return str.replace(/[-_]([a-z])/g, (_, char) => char.toUpperCase());
}
// Example: toCamelCase("product_engineer_handbook") -> "productEngineerHandbook"
```

---

### Q48: Count how many times a character appears in a string.
```javascript
function countCharacter(str, char) {
  return str.split(char).length - 1;
}
// Example: countCharacter("banana", "a") -> 3
```

---

### Q49: Sleep or delay execution in an `async` function.
```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Usage: await sleep(1000); // Pauses for 1 second
```

---

### Q50: Attach a delegated click event handler to a list of buttons using pure JavaScript.
```javascript
document.querySelector('#parent-container').addEventListener('click', (event) => {
  const button = event.target.closest('button.action-btn');
  if (button) {
    console.log('Clicked button ID:', button.dataset.id);
  }
});
```

---

# Part 2: Intermediate & Advanced Coding Challenges (Questions 51 – 100)

### Q51: Implement a custom `debounce` function.
```javascript
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

---

### Q52: Implement a custom `throttle` function.
```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

### Q53: Implement a comprehensive Deep Clone function without `structuredClone`.
```javascript
function deepClone(value, hash = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);

  // Handle circular references
  if (hash.has(value)) return hash.get(value);

  const clone = Array.isArray(value) ? [] : {};
  hash.set(value, clone);

  for (const key of Reflect.ownKeys(value)) {
    clone[key] = deepClone(value[key], hash);
  }
  return clone;
}
```

---

### Q54: Implement a polyfill for `Array.prototype.map`.
```javascript
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};
```

---

### Q55: Implement a polyfill for `Array.prototype.filter`.
```javascript
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

---

### Q56: Implement a polyfill for `Array.prototype.reduce`.
```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
  let accumulator = initialValue;
  let startIndex = 0;

  if (arguments.length < 2) {
    while (startIndex < this.length && !(startIndex in this)) {
      startIndex++;
    }
    if (startIndex >= this.length) throw new TypeError('Reduce of empty array with no initial value');
    accumulator = this[startIndex++];
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};
```

---

### Q57: Implement a polyfill for `Function.prototype.bind`.
```javascript
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFunc = this;
  return function (...calledArgs) {
    return originalFunc.apply(context, [...boundArgs, ...calledArgs]);
  };
};
```

---

### Q58: Implement a polyfill for `Function.prototype.call`.
```javascript
Function.prototype.myCall = function (context, ...args) {
  context = context ?? globalThis;
  const uniqueKey = Symbol();
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```

---

### Q59: Implement a polyfill for `Promise.all`.
```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve(results);

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(val => {
          results[index] = val;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}
```

---

### Q60: Implement a polyfill for `Promise.race`.
```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}
```

---

### Q61: Implement a polyfill for `Promise.allSettled`.
```javascript
function promiseAllSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
}
```

---

### Q62: Implement a Currying utility function `curry(fn)`.
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}
// Example:
// const add = (a, b, c) => a + b + c;
// const curriedAdd = curry(add);
// curriedAdd(1)(2)(3) -> 6
```

---

### Q63: Implement a function composition utility `pipe(...fns)`.
```javascript
function pipe(...fns) {
  return (initialValue) => fns.reduce((acc, fn) => fn(acc), initialValue);
}
// Example:
// const add2 = x => x + 2;
// const double = x => x * 2;
// pipe(add2, double)(5) -> (5 + 2) * 2 = 14
```

---

### Q64: Implement a Memoize utility function.
```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

### Q65: Flatten a deeply nested array to any depth.
```javascript
function flattenDeep(arr) {
  return arr.reduce((acc, item) => 
    Array.isArray(item) ? acc.concat(flattenDeep(item)) : acc.concat(item)
  , []);
}
// Example: flattenDeep([1, [2, [3, [4, 5]]]]) -> [1, 2, 3, 4, 5]
```

---

### Q66: Flatten a deeply nested object into dot notation keys.
```javascript
function flattenObject(obj, prefix = '', res = {}) {
  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      flattenObject(val, newKey, res);
    } else {
      res[newKey] = val;
    }
  }
  return res;
}
// Example: flattenObject({ user: { name: 'Alex', address: { city: 'NYC' } } })
// -> { 'user.name': 'Alex', 'user.address.city': 'NYC' }
```

---

### Q67: Implement a simple Event Emitter class.
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] = this.events[event] || []).push(listener);
    return () => this.off(event, listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(fn => fn(...args));
  }
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(fn => fn !== listener);
  }
}
```

---

### Q68: Implement a retry utility for asynchronous operations with backoff.
```javascript
async function retryWithBackoff(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}
```

---

### Q69: Implement an LRU (Least Recently Used) Cache.
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value); // Refresh position
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
```

---

### Q70: Deep equality checker between two arbitrary values.
```javascript
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}
```

---

### Q71: Solve the "Two Sum" problem in $O(n)$ time complexity.
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Example: twoSum([2, 7, 11, 15], 9) -> [0, 1]
```

---

### Q72: Asynchronous task queue with concurrency limits.
```javascript
async function asyncPool(limit, tasks) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = Promise.resolve().then(() => task());
    results.push(promise);
    executing.add(promise);

    const clean = () => executing.delete(promise);
    promise.then(clean, clean);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}
```

---

### Q73: Detect whether an object contains circular references.
```javascript
function hasCircularReference(obj, visited = new WeakSet()) {
  if (obj !== null && typeof obj === 'object') {
    if (visited.has(obj)) return true;
    visited.add(obj);
    for (const key of Object.keys(obj)) {
      if (hasCircularReference(obj[key], visited)) return true;
    }
  }
  return false;
}
```

---

### Q74: Implement a function to safely access deeply nested properties via string path (like Lodash `get`).
```javascript
function get(obj, path, defaultValue = undefined) {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}
// Example: get({ a: [{ b: { c: 3 } }] }, 'a[0].b.c') -> 3
```

---

### Q75: Implement a Pub/Sub (Publish-Subscribe) pattern.
```javascript
const PubSub = {
  topics: {},
  subscribe(topic, listener) {
    (this.topics[topic] = this.topics[topic] || []).push(listener);
    return () => {
      this.topics[topic] = this.topics[topic].filter(l => l !== listener);
    };
  },
  publish(topic, data) {
    if (!this.topics[topic]) return;
    this.topics[topic].forEach(listener => listener(data));
  }
};
```

---

### Q76: Find the longest substring without repeating characters.
```javascript
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLength = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++]);
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
// Example: lengthOfLongestSubstring("abcabcbb") -> 3 ("abc")
```

---

### Q77: Implement an asynchronous `timeout` wrapper on a Promise.
```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

---

### Q78: Implement auto-retry on a failed Fetch request.
```javascript
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      return await response.json();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
}
```

---

### Q79: Create a custom Observable implementation.
```javascript
class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  subscribe(observer) {
    return this._subscribe(observer);
  }
}
// Usage:
// const obs = new Observable(sub => { sub.next(1); sub.complete(); });
```

---

### Q80: Convert a flat list with parent IDs into a hierarchical tree.
```javascript
function listToTree(list) {
  const map = {}, roots = [];
  list.forEach(node => map[node.id] = { ...node, children: [] });
  list.forEach(node => {
    if (node.parentId && map[node.parentId]) {
      map[node.parentId].children.push(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  });
  return roots;
}
```

---

### Q81: Implement a function that merges deeply nested objects.
```javascript
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
}
```

---

### Q82: Implement a custom UUID generator (UUID v4 format).
```javascript
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

---

### Q83: Implement an HTML escape function to prevent XSS.
```javascript
function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return str.replace(/[&<>"']/g, m => map[m]);
}
```

---

### Q84: Traverse all nodes in a DOM subtree iteratively.
```javascript
function traverseDOM(root, callback) {
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    if (current) {
      callback(current);
      for (let i = current.children.length - 1; i >= 0; i--) {
        stack.push(current.children[i]);
      }
    }
  }
}
```

---

### Q85: Implement an async map that runs asynchronously in parallel.
```javascript
async function asyncMap(arr, asyncCallback) {
  return Promise.all(arr.map((item, idx) => asyncCallback(item, idx, arr)));
}
```

---

### Q86: Implement an async map that runs strictly in series (sequential).
```javascript
async function asyncSeries(arr, asyncCallback) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(await asyncCallback(arr[i], i, arr));
  }
  return results;
}
```

---

### Q87: Find all pairs of integers in an array whose sum equals a given number.
```javascript
function allTwoSumPairs(arr, target) {
  const seen = new Set();
  const pairs = [];
  for (const num of arr) {
    const diff = target - num;
    if (seen.has(diff)) pairs.push([diff, num]);
    seen.add(num);
  }
  return pairs;
}
```

---

### Q88: Implement a Promise waterfall (chaining array of functions that return promises).
```javascript
function promiseWaterfall(promiseFns) {
  return promiseFns.reduce(
    (chain, fn) => chain.then(result => fn(result)),
    Promise.resolve()
  );
}
```

---

### Q89: Count the frequency of all words in a paragraph (ignoring punctuation).
```javascript
function wordFrequency(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  return words.reduce((acc, w) => {
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});
}
```

---

### Q90: Implement a simple template parser (replacing `{{key}}` with object values).
```javascript
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key] ?? '');
}
// Example: renderTemplate("Hello {{name}}!", { name: "Alice" }) -> "Hello Alice!"
```

---

### Q91: Convert an RGB color string to Hex color code.
```javascript
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
// Example: rgbToHex(255, 99, 71) -> "#ff6347"
```

---

### Q92: Convert a Hex color string to RGB object.
```javascript
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}
```

---

### Q93: Create a function that runs only once (Lodash `once`).
```javascript
function once(fn) {
  let executed = false;
  let result;
  return function (...args) {
    if (!executed) {
      executed = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}
```

---

### Q94: Implement a function to find the depth of a nested object or array.
```javascript
function getDepth(value) {
  if (typeof value !== 'object' || value === null) return 0;
  const depths = Object.values(value).map(getDepth);
  return depths.length === 0 ? 1 : 1 + Math.max(...depths);
}
```

---

### Q95: Serialize and deserialize a binary search tree node.
```javascript
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function serialize(root) {
  if (!root) return 'null';
  return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}
```

---

### Q96: Generate all permutations of a string.
```javascript
function getPermutations(str) {
  if (str.length <= 1) return [str];
  const perms = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    for (const sub of getPermutations(remaining)) {
      perms.push(char + sub);
    }
  }
  return [...new Set(perms)];
}
```

---

### Q97: Implement `Array.prototype.flat` with customizable depth.
```javascript
function customFlat(arr, depth = 1) {
  if (depth <= 0) return arr.slice();
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) acc.push(...customFlat(item, depth - 1));
    else acc.push(item);
    return acc;
  }, []);
}
```

---

### Q98: Check if a given string contains balanced parentheses, brackets, and braces.
```javascript
function isBalanced(str) {
  const stack = [];
  const map = { '(': ')', '[': ']', '{': '}' };
  for (const char of str) {
    if (map[char]) stack.push(char);
    else if (char === ')' || char === ']' || char === '}') {
      if (map[stack.pop()] !== char) return false;
    }
  }
  return stack.length === 0;
}
// Example: isBalanced("{[()]}") -> true, isBalanced("{[(])}") -> false
```

---

### Q99: Find the missing number in an array containing integers from `1` to `N`.
```javascript
function findMissingNumber(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((a, b) => a + b, 0);
  return expectedSum - actualSum;
}
// Example: findMissingNumber([1, 2, 4, 5, 6], 6) -> 3
```

---

### Q100: Create an asynchronous generator that paginates through an API.
```javascript
async function* paginateApi(baseUrl) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${baseUrl}?page=${page}`);
    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      hasMore = false;
    } else {
      yield data.items;
      page++;
    }
  }
}

// Usage:
// for await (const batch of paginateApi('https://api.example.com/logs')) {
//   console.log('Received batch:', batch);
// }
```
