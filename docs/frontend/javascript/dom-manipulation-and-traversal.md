# DOM Manipulation & Tree Traversal

> Step-by-step guide to the Document Object Model: element selection, tree traversal, modifying text/HTML, managing classes, and dynamic node creation.

---

## 1. What is the DOM?

The **Document Object Model (DOM)** is the browser's live, tree-structured representation of your HTML document. JavaScript interacts with this tree to read and change the webpage dynamically.

```text
                  window
                    │
                 document
                    │
                 <html>
             ┌──────┴──────┐
             ▼             ▼
          <head>        <body>
                         ┌─┴─────────────┐
                         ▼               ▼
                      <header>         <main>
                         │               │
                        <h1>           <ul id="list">
                                       ┌─┴──────────┐
                                       ▼            ▼
                                      <li>         <li>
```

---

## 2. Selecting Elements from the DOM

Always use modern CSS selectors:

```javascript
// 1. document.querySelector() -> Returns FIRST matching element (or null)
const mainTitle = document.querySelector("#main-title");
const searchInput = document.querySelector("input[type='search']");
const activeBtn = document.querySelector(".btn.active");

// 2. document.querySelectorAll() -> Returns a static NodeList of ALL matches
const allCards = document.querySelectorAll(".product-card");

// Loop over matching elements:
allCards.forEach((card, index) => {
  console.log(`Card #${index + 1}: ${card.textContent}`);
});
```

---

## 3. Changing Text, HTML & Attributes

```javascript
const banner = document.querySelector("#banner");

// 1. textContent (Safe & Fast - Recommended!)
banner.textContent = "Welcome, Product Engineers!";

// 2. innerHTML (Use with caution - parses HTML markup)
banner.innerHTML = "<strong>Welcome</strong>, <em>Product Engineers</em>!";

// 3. Attributes & Dataset
banner.setAttribute("aria-live", "polite");
console.log(banner.getAttribute("id")); // "banner"

// Reading data-* attributes (e.g. <div data-user-id="123">)
console.log(banner.dataset.userId);
```

---

## 4. Managing CSS Classes & Styles

```javascript
const modal = document.querySelector("#dialog-modal");

// classList methods
modal.classList.add("open");         // Adds class
modal.classList.remove("hidden");    // Removes class
modal.classList.toggle("dark-theme");// Adds if absent, removes if present
console.log(modal.classList.contains("open")); // true

// Direct inline styles (camelCase)
modal.style.backgroundColor = "#1e293b";
modal.style.borderRadius = "12px";
```

---

## 5. Creating & Appending Elements Dynamically

```javascript
// Creating a complete dynamic Product Card component:
function createProductCard(title, price) {
  // 1. Create container
  const card = document.createElement("div");
  card.className = "card product-card";

  // 2. Create title
  const h3 = document.createElement("h3");
  h3.textContent = title;

  // 3. Create price tag
  const p = document.createElement("p");
  p.textContent = `$${price.toFixed(2)}`;

  // 4. Create button
  const btn = document.createElement("button");
  btn.textContent = "Add to Cart";
  btn.className = "btn-primary";

  // 5. Assemble and return
  card.append(h3, p, btn);
  return card;
}

// Attach to container in the DOM:
const grid = document.querySelector("#products-grid");
grid.appendChild(createProductCard("Mechanical Keyboard", 120));
```

---

## 6. Performance Batching with `DocumentFragment`

When inserting 500 items, appending them one-by-one causes 500 browser layout reflows. Use a **`DocumentFragment`** to batch them into a single reflow:

```javascript
const list = document.querySelector("#user-list");
const fragment = document.createDocumentFragment(); // Lightweight in-memory container

for (let i = 1; i <= 500; i++) {
  const li = document.createElement("li");
  li.textContent = `Engineer #${i}`;
  fragment.appendChild(li); // No page reflow triggered yet
}

// Single instant reflow:
list.appendChild(fragment);
```
