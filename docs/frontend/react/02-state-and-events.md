# 2. State, Events & Form Handling in React

> Understand the core engine of interactive React apps: mastering `useState`, event listeners, state immutability, and how to build production-grade, controlled forms with real-time validation using pure CSS.

---

## 1. Why Normal Variables Don't Work in React

In regular JavaScript, if you want to count clicks, you create a variable and update it:

```javascript
// Regular JavaScript variable
let clickCount = 0;

function handleClick() {
  clickCount = clickCount + 1;
  console.log(clickCount); // The variable changes in memory!
}
```

Now let's try doing that inside a React component:

```jsx
// ❌ THIS WILL NOT UPDATE THE SCREEN!
function Counter() {
  let count = 0;

  function handleIncrement() {
    count = count + 1;
    console.log("Count is:", count); // Changes in console, BUT NOT ON SCREEN!
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

### Why Did the Screen Stay at 0?

When you click the button, `count` really does change in computer memory. But **React has no idea it changed!**

React only updates the screen when a **Re-Render** occurs. Changing a normal variable (`let count = 0`) does not notify React. React never re-runs the `Counter()` function, so the screen remains frozen at `0`.

To tell React: *"Hey! My data changed, please redraw the screen with the new value!"*, we must use **State**.

---

## 2. What is State? The "Blueprint and Painting" Analogy

Think of a React component like an **artist painting on a canvas**:

1. **The Component Function** is the **Blueprint** or recipe.
2. **The Real Screen** is the **Painting** on the wall.
3. When your application first loads, React follows the blueprint and paints the screen (**Initial Render**).
4. Normal variables (`let x = 5`) are just scratch notes discarded once the painting is done.
5. **State** is special data remembered by React. When you update state, React calls your component function again with the new state and repaints the canvas (**Re-Render**).

```text
┌─────────────────────────────────────────────────────────────┐
│                 THE REACT RE-RENDER CYCLE                   │
│                                                             │
│   [ 1. User clicks button ]                                 │
│              │                                              │
│              ▼                                              │
│   [ 2. setState() called ]                                  │
│              │                                              │
│              ▼                                              │
│   [ 3. React detects state change ]                         │
│              │                                              │
│              ▼                                              │
│   [ 4. Component function re-executes with new state ]      │
│              │                                              │
│              ▼                                              │
│   [ 5. React updates the screen with fresh HTML ]           │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. The `useState` Hook in Depth

React gives us a special built-in function called **`useState`**. Functions provided by React that start with the word `use` are called **Hooks**.

### The Anatomy of `useState`

```jsx
import { useState } from 'react';

const [stateValue, setStateValue] = useState(initialValue);
```

Let's break down this syntax:
1. `useState(0)`: We call the hook and pass the **initial starting value** (e.g. `0`, `""`, `true`, or `[]`).
2. `useState` returns an array with exactly two elements:
   * **Element 1 (`stateValue`)**: The current value of this state.
   * **Element 2 (`setStateValue`)**: A setter function that updates the state and triggers a screen re-render.
3. `const [count, setCount] = ...`: This uses JavaScript **Array Destructuring** to give friendly names to both elements.

### The Working Counter Component

```jsx
import { useState } from 'react';

function Counter() {
  // Declare a state variable named "count" starting at 0
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1); // Updates count AND schedules a re-render!
  }

  function handleDecrement() {
    setCount(count - 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="counter-card">
      <h2>Current Count: {count}</h2>
      <div className="button-group">
        <button onClick={handleDecrement}>- Decrement</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleIncrement}>+ Increment</button>
      </div>
    </div>
  );
}

export default Counter;
```

---

## 4. The Golden Rule: State is Immutable (Never Mutate Directly!)

In JavaScript, you can easily change the contents of an object or array:

```javascript
// Regular JavaScript mutation:
user.name = "John";
items.push("New Item");
```

In React, **YOU MUST NEVER DO THIS!**

```jsx
// ❌ WRONG: Modifying state directly
count = count + 1; // Direct mutation! React won't know!
user.age = 25;     // Direct mutation! React won't re-render!
items.push("pen"); // Direct mutation! React won't re-render!
```

### Why?
React checks if state changed by comparing the **memory address (reference)** of the old state and the new state. If you mutate the existing object or array in place, its memory address remains identical. React thinks: *"Nothing changed!"* and refuses to re-render.

### How to Update Objects and Arrays Correctly
Always create a **new copy** using the spread operator (`...`):

```jsx
// 1. Updating an Object:
const [user, setUser] = useState({ name: "Harshit", age: 24 });

// ✅ CORRECT: Copy existing properties with ..., then override what changed
setUser({
  ...user,
  age: 25
});

// 2. Adding an item to an Array:
const [todos, setTodos] = useState(["Buy milk", "Learn React"]);

// ✅ CORRECT: Create a new array with ...
setTodos([...todos, "Build a project"]);

// 3. Deleting an item from an Array:
// ✅ CORRECT: Use .filter() which returns a brand new array
setTodos(todos.filter((item, index) => index !== 0));
```

---

## 5. The Functional State Update Pattern

What happens if you run this code?

```jsx
function addTwo() {
  setCount(count + 1);
  setCount(count + 1);
}
```

You might expect `count` to increase by `2`. But surprisingly, **it only increases by 1!**

### Why?
In React, state updates are batched asynchronously for performance. Inside the current render, `count` is fixed (for example, `0`). Both `setCount(count + 1)` calls are essentially doing `setCount(0 + 1)`.

### The Solution: Updater Functions
Whenever your new state depends on the previous state, pass a **callback function** to your setter:

```jsx
function addTwo() {
  // prev represents the guaranteed latest state value
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}
```

Now, React executes both updates sequentially: `0 -> 1 -> 2`.

---

## 6. Event Handling in React

React wraps native browser events in its own cross-browser wrapper called **Synthetic Events**.

### Common React Events:
* `onClick`: Fired when an element is clicked.
* `onChange`: Fired whenever an `<input>`, `<textarea>`, or `<select>` changes value.
* `onSubmit`: Fired when a `<form>` is submitted.
* `onKeyDown` / `onKeyUp`: Fired when keys are pressed.

### Passing Event Handlers Correctly

```jsx
// ✅ CORRECT: Passing the function reference
<button onClick={handleClick}>Click Me</button>

// ❌ WRONG: Calling the function immediately during render!
<button onClick={handleClick()}>Click Me</button>
```

If you add `()` like `onClick={handleClick()}`, the function runs immediately when the page renders—creating an infinite re-render loop if that function updates state!

### Passing Arguments to Event Handlers
If you need to pass an argument (like an `id`), wrap it in an arrow function:

```jsx
// ✅ Passing the item ID to the delete handler
<button onClick={() => handleDelete(item.id)}>
  Delete Item
</button>
```

---

## 7. Form Handling: Controlled Components Explained

In traditional HTML forms, the browser DOM stores the input value inside the `<input>` element itself. You only read the value at the very end when the user clicks submit.

In React, we use **Controlled Components**.

### What is a Controlled Component?
A controlled component is an input element whose value is **controlled entirely by React state**.
1. The input's `value` attribute is locked to a React state variable.
2. When the user types a character, the `onChange` event fires.
3. The event handler updates the React state.
4. React re-renders the input displaying the updated state.

```text
┌─────────────────────────────────────────────────────────────┐
│                 CONTROLLED INPUT DATA FLOW                  │
│                                                             │
│   User types letter 'A'                                     │
│            │                                                │
│            ▼                                                │
│   onChange event fires (e.target.value = "A")               │
│            │                                                │
│            ▼                                                │
│   setText("A") updates React state                          │
│            │                                                │
│            ▼                                                │
│   Input re-renders with value={text} ("A")                  │
│                                                             │
│      React is the Single Source of Truth for Form Data!     │
└─────────────────────────────────────────────────────────────┘
```

### Handling a Single Input

```jsx
import { useState } from 'react';

function SimpleSearch() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search engineering docs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>You are typing: <strong>{query}</strong></p>
    </div>
  );
}
```

---

## 8. Handling Multiple Form Inputs Like a Professional

What if your form has 5, 8, or 10 fields? Creating 10 separate `useState` hooks (`const [name, setName]`, `const [email, setEmail]`, `const [password, setPassword]`) quickly becomes messy and repetitive.

Professional React developers manage multiple form fields using a **single state object** and a **dynamic input handler**:

```jsx
import { useState } from 'react';

function MultiInputForm() {
  // 1. One clean state object for all fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'frontend',
    newsletter: true
  });

  // 2. One universal change handler for all inputs!
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      // If it's a checkbox use checked; otherwise use value
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  return (
    <form>
      {/* Notice name="fullName" matches the key in formData */}
      <input
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
      />

      {/* Notice name="email" matches the key in formData */}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
    </form>
  );
}
```

### How Does `[name]: value` Work?
This is ES6 **Computed Property Names**. If `e.target.name` is `"email"`, JavaScript evaluates `[name]: value` to `"email": "user@example.com"`, updating that exact field in state automatically!

---

## 9. Form Submission & Input Validation

When a user submits a form by clicking `<button type="submit">` or pressing Enter, the browser's default behavior is to **refresh the whole page**.

In a React Single Page Application, a page refresh clears all your React state and resets your application. We prevent this using **`e.preventDefault()`**:

```jsx
function handleSubmit(e) {
  e.preventDefault(); // 🛑 STOP the browser from refreshing!

  // Validate fields here
  if (!formData.email.includes('@')) {
    alert("Please enter a valid email address.");
    return;
  }

  console.log("Submitting sanitized form data:", formData);
}
```

---

## 10. Complete Practical Project: Interactive Registration Form

Let's build a complete, production-ready **Developer Registration & Feedback Form** from scratch.

This project includes:
- Text inputs with live character count
- Email validation with friendly error messages
- Dropdown select for developer role
- Checkbox terms agreement
- Real-time error messages in pure CSS
- A clean confirmation card when submitted

### The Pure CSS File (`src/components/RegistrationForm.css`)

```css
.form-card {
  max-width: 480px;
  margin: 30px auto;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: inherit;
}

.form-title {
  margin: 0 0 6px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
}

.form-subtitle {
  margin: 0 0 24px 0;
  font-size: 0.875rem;
  color: #64748b;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
}

.char-counter {
  font-weight: 400;
  font-size: 0.75rem;
  color: #94a3b8;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.925rem;
  color: #1e293b;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-input.input-error,
.form-textarea.input-error {
  border-color: #ef4444;
  background-color: #fff5f5;
}

.error-text {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 4px;
  font-weight: 500;
}

.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 22px;
}

.checkbox-input {
  margin-top: 3px;
  accent-color: #4f46e5;
  cursor: pointer;
}

.checkbox-label {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.4;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  padding: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.submit-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

/* Success Confirmation Banner */
.success-card {
  max-width: 480px;
  margin: 30px auto;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 28px;
  text-align: center;
}

.success-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.success-title {
  color: #166534;
  margin: 0 0 8px 0;
  font-size: 1.3rem;
}

.success-desc {
  color: #15803d;
  font-size: 0.9rem;
  margin-bottom: 18px;
}

.reset-btn {
  background-color: #16a34a;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
```

### The Component File (`src/components/RegistrationForm.jsx`)

```jsx
import { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
  // 1. Unified form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Frontend Engineer',
    bio: '',
    agreeTerms: false,
  });

  // 2. Validation errors state
  const [errors, setErrors] = useState({});

  // 3. Submission success state
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Universal field change handler
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    
    // Update form values
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear the error for this field as soon as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  // Validation function
  function validate() {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms to register.';
    }

    return newErrors;
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault(); // Stop page reload

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      // Validation failed: update errors state
      setErrors(validationErrors);
    } else {
      // Validation passed!
      setErrors({});
      setIsSubmitted(true);
      console.log('Registration submitted successfully:', formData);
    }
  }

  // Reset form handler
  function handleReset() {
    setFormData({
      username: '',
      email: '',
      role: 'Frontend Engineer',
      bio: '',
      agreeTerms: false,
    });
    setErrors({});
    setIsSubmitted(false);
  }

  // If already submitted, display success card
  if (isSubmitted) {
    return (
      <div className="success-card">
        <div className="success-icon">🎉</div>
        <h3 className="success-title">Welcome Aboard, {formData.username}!</h3>
        <p className="success-desc">
          Your developer profile has been registered as <strong>{formData.role}</strong>. A confirmation was sent to <strong>{formData.email}</strong>.
        </p>
        <button onClick={handleReset} className="reset-btn">
          Register Another Member
        </button>
      </div>
    );
  }

  // Default: Render the form
  return (
    <div className="form-card">
      <h2 className="form-title">Join The Engineering Community</h2>
      <p className="form-subtitle">Fill in your details below to create your profile.</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Username Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            <span>Username</span>
            <span className="char-counter">{formData.username.length}/20</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            maxLength={20}
            placeholder="e.g. harshitclub"
            value={formData.username}
            onChange={handleChange}
            className={`form-input ${errors.username ? 'input-error' : ''}`}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Role Select Dropdown */}
        <div className="form-group">
          <label className="form-label" htmlFor="role">Primary Focus</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full-Stack Architect">Full-Stack Architect</option>
            <option value="DevOps & Cloud">DevOps & Cloud</option>
          </select>
        </div>

        {/* Short Bio Textarea */}
        <div className="form-group">
          <label className="form-label" htmlFor="bio">
            <span>Short Bio (Optional)</span>
            <span className="char-counter">{formData.bio.length}/100</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            maxLength={100}
            placeholder="Tell us what you're building..."
            value={formData.bio}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="checkbox-group">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="checkbox-input"
          />
          <label htmlFor="agreeTerms" className="checkbox-label">
            I agree to the developer code of conduct and privacy terms.
          </label>
        </div>
        {errors.agreeTerms && (
          <div className="form-group" style={{ marginTop: '-14px' }}>
            <span className="error-text">{errors.agreeTerms}</span>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Complete Registration
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
```

---

## 11. Quick Summary & Best Practices

1. **State triggers re-renders**: Normal variables reset on every render; state is remembered by React.
2. **Never mutate state directly**: Always return new objects (`{ ...prev, newKey: value }`) and new arrays (`[...prev, newItem]`).
3. **Use updater functions** (`setCount(prev => prev + 1)`) when your next state depends on current state.
4. **Controlled components** bind the input's `value` to state and update state on `onChange`.
5. **Single state object pattern**: Group related inputs into an object and use `[e.target.name]: value` to keep your code clean and scalable.
6. **Always use `e.preventDefault()`** inside form submit handlers to prevent the browser from reloading the page.

Now that you know how to manage local state and handle user interactions, how do we load data from an external server or run code when a component appears on screen?

In the next chapter, we explore **Lifecycle & Fetching APIs with `useEffect`**!

👉 **[Continue to Chapter 3: Lifecycle & API Fetching →](/frontend/react/03-lifecycle-and-api-fetching)**
