# DOM Events & Interactive UI Patterns

> Mastering event listeners, event bubbling/capturing, delegation, and building real-world interactive components: Counter, Modal, Todo List, and Accordion.

---

## 1. Adding Event Listeners (`addEventListener`)

```javascript
const button = document.querySelector("#action-btn");

function handleButtonClick(event) {
  console.log("Button clicked!");
  console.log("Clicked element (target):", event.target);
  console.log("Event type:", event.type); // "click"
}

// Attach listener
button.addEventListener("click", handleButtonClick);

// Remove listener (must reference the exact same function)
// button.removeEventListener("click", handleButtonClick);
```

---

## 2. Event Bubbling & The Event Delegation Pattern

When an element is clicked, the event triggers on the element, then **bubbles up** through all of its parent ancestors.

Instead of attaching 100 listeners to 100 buttons, attach **one listener to the parent container** (**Event Delegation**):

```javascript
const todoContainer = document.querySelector("#todo-list");

todoContainer.addEventListener("click", (event) => {
  // Check if a delete button was clicked
  const deleteBtn = event.target.closest(".btn-delete");
  if (!deleteBtn) return; // Exit if click was not on a delete button

  // Find and remove the parent todo item
  const todoItem = deleteBtn.closest(".todo-item");
  todoItem.remove();
  console.log("Todo item deleted!");
});
```

---

## 3. Real-World Interactive Project 1: The Interactive Counter

```html
<div class="counter-widget">
  <button id="decrement-btn">-</button>
  <span id="counter-value">0</span>
  <button id="increment-btn">+</button>
  <button id="reset-btn">Reset</button>
</div>
```

```javascript
let count = 0;
const valueDisplay = document.querySelector("#counter-value");
const incBtn = document.querySelector("#increment-btn");
const decBtn = document.querySelector("#decrement-btn");
const resetBtn = document.querySelector("#reset-btn");

function updateDisplay() {
  valueDisplay.textContent = count;
  valueDisplay.style.color = count > 0 ? "green" : count < 0 ? "red" : "black";
}

incBtn.addEventListener("click", () => { count++; updateDisplay(); });
decBtn.addEventListener("click", () => { count--; updateDisplay(); });
resetBtn.addEventListener("click", () => { count = 0; updateDisplay(); });
```

---

## 4. Real-World Interactive Project 2: Modal Popup with Backdrop

```javascript
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const modalOverlay = document.querySelector("#modal-overlay");

function openModal() {
  modalOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// Close when clicking the backdrop outside the dialog
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close when pressing the Escape key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
    closeModal();
  }
});
```

---

## 5. Real-World Interactive Project 3: Interactive Todo List with Filtering

```javascript
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop page reload
  const taskText = input.value.trim();
  if (!taskText) return;

  // Create list item
  const li = document.createElement("li");
  li.className = "todo-item";
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="btn-toggle">✓</button>
    <button class="btn-delete">✕</button>
  `;

  list.appendChild(li);
  input.value = ""; // Clear input
});

// Event delegation for toggle and delete actions
list.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;

  if (e.target.classList.contains("btn-toggle")) {
    item.classList.toggle("completed");
  } else if (e.target.classList.contains("btn-delete")) {
    item.remove();
  }
});
```
