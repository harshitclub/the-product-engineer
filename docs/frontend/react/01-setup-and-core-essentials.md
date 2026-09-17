# 1. Vite Setup & React Core Essentials

> A step-by-step guide to spinning up your first React application with Vite, understanding the project structure, and mastering JSX, components, props, conditional rendering, list keys, and pure CSS styling.

---

## 1. Why Vite? (Goodbye Create-React-App)

Years ago, developers used a tool called `create-react-app` (CRA) to build React applications. CRA used an older bundler called **Webpack**, which took 30 to 60 seconds just to start a local server and felt sluggish when you edited code.

In modern frontend development, the industry standard is **Vite** (pronounced *"veet"*, French for *"quick"*).

```text
┌─────────────────────────────────────────────────────────────┐
│                 WHY DEVELOPERS LOVE VITE                    │
├──────────────────────────────┬──────────────────────────────┤
│ Create-React-App (Webpack)   │ Vite (Modern Standard)       │
├──────────────────────────────┼──────────────────────────────┤
│ 🐢 Slow startup (30+ sec)    │ ⚡ Instant startup (<300ms)  │
│ 🐢 Slow rebuilds on edit     │ ⚡ Instant Hot Module Reload │
│ 📦 Bulky, unmaintained       │ 🛠️ Clean, lightweight        │
│ 📁 Hidden, heavy configs     │ 🚀 Minimal, readable config  │
└──────────────────────────────┴──────────────────────────────┘
```

Vite is faster because it leverages modern browser support for native ES Modules (`import` / `export`), meaning it only compiles the specific file you are editing instead of bundling your entire application every time.

---

## 2. Setting Up Your React Project Step-by-Step

Let's create a fresh React project from scratch. Make sure you have **Node.js** installed (run `node -v` in your terminal to verify).

### Step 1: Open Your Terminal & Run the Vite Creator

Open your terminal or command prompt, navigate to the folder where you keep your projects, and run:

```bash
npm create vite@latest my-react-app -- --template react
```

Here is what that command means:
* `npm create vite@latest`: Downloads and runs the newest Vite project generator.
* `my-react-app`: The name of the new folder that will be created.
* `-- --template react`: Tells Vite to configure pure React with JavaScript automatically (no extra setup questions needed!).

::: tip Alternative Interactive Setup
If you simply run `npm create vite@latest`, Vite will ask you two quick questions:
1. **Project name**: Enter `my-react-app`
2. **Select a framework**: Choose **React**
3. **Select a variant**: Choose **JavaScript**
:::

---

### Step 2: Navigate into the Folder and Install Dependencies

When Vite creates the project folder, it does not include the heavy `node_modules` folder. You install them by running:

```bash
cd my-react-app
npm install
```

This downloads React (`react` and `react-dom`) and the Vite development tools in just a few seconds.

---

### Step 3: Start the Local Development Server

Start the local server with:

```bash
npm run dev
```

You will see output like this in your terminal:

```text
  VITE v5.4.2  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Hold `Ctrl` (or `Cmd` on Mac) and click the link `http://localhost:5173/`, or paste it into your browser. You will see the default Vite + React starter page running live!

To stop the server at any time, press `Ctrl + C` in your terminal.

---

## 3. Understanding the Vite Project Anatomy

Open your newly created `my-react-app` folder in your code editor (e.g., VS Code). You will see the following files:

```text
my-react-app/
├── node_modules/         # Downloaded libraries (never edit manually)
├── public/               # Static assets (favicons, public images)
│   └── vite.svg
├── src/                  # YOUR CODE LIVES HERE!
│   ├── assets/           # Images, logos, and icons
│   │   └── react.svg
│   ├── App.css           # Pure CSS styling for the App component
│   ├── App.jsx           # Your main root React component
│   ├── index.css         # Global CSS styles reset
│   └── main.jsx          # JavaScript entry point that mounts React
├── index.html            # The single HTML page sent to the browser
├── package.json          # Project metadata, scripts, and dependencies
└── vite.config.js        # Vite configuration settings
```

### How Does the Code Actually Run?

Let's follow the journey from the HTML file to the screen:

```text
[ index.html ] ──▶ Contains <div id="root"></div>
       │
       ▼ loads
[ src/main.jsx ] ──▶ Grabs document.getElementById('root')
       │             Mounts the React root using ReactDOM.createRoot()
       ▼ renders
[ src/App.jsx ]  ──▶ Your main React component containing the visual UI
```

#### 1. The Single Mount Point (`index.html`)
Open `index.html`. Unlike traditional multi-page websites that have `about.html`, `contact.html`, and `services.html`, React is a **Single Page Application (SPA)**. It only has one HTML file:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My React App</title>
  </head>
  <body>
    <!-- React will inject your entire user interface inside this div! -->
    <div id="root"></div>

    <!-- This script tells the browser to run main.jsx -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### 2. The Mounting Engine (`src/main.jsx`)
Open `src/main.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Find the <div id="root"> in index.html and mount our React App inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

`React.StrictMode` is a development helper that runs extra checks to warn you about potential bugs. It does not affect production builds.

---

## 4. What is JSX? (JavaScript XML)

Look at `src/App.jsx`. You will see something that looks like HTML written inside a JavaScript file:

```jsx
function App() {
  return (
    <div className="container">
      <h1>Hello, React!</h1>
      <p>Welcome to the world of declarative UI.</p>
    </div>
  );
}

export default App;
```

This syntax is called **JSX** (JavaScript XML). It is a syntax extension that lets you write HTML-like structures directly inside JavaScript.

Under the hood, Vite automatically converts JSX into standard JavaScript function calls before sending it to the browser:

```javascript
// What you write (Clean & Readable):
<h1>Hello, React!</h1>

// What Vite compiles it to under the hood:
React.createElement('h1', null, 'Hello, React!');
```

### The 5 Golden Rules of JSX

Because JSX is JavaScript (not real HTML), there are 5 fundamental rules you must always follow:

#### Rule 1: Every Component Must Return a Single Root Element
A component cannot return multiple side-by-side elements without wrapping them:

```jsx
// ❌ WRONG: Will throw a syntax error!
function BadComponent() {
  return (
    <h1>First Heading</h1>
    <p>Second Paragraph</p>
  );
}

// ✅ CORRECT: Wrapped in a parent <div>
function GoodComponent() {
  return (
    <div>
      <h1>First Heading</h1>
      <p>Second Paragraph</p>
    </div>
  );
}

// 🌟 EVEN BETTER: Use a React Fragment (<>...</>) to avoid extra HTML divs
function CleanComponent() {
  return (
    <>
      <h1>First Heading</h1>
      <p>Second Paragraph</p>
    </>
  );
}
```

A **Fragment** (`<> ... </>`) lets you group multiple elements together without adding an unnecessary `<div>` to the real browser DOM.

---

#### Rule 2: All Tags Must Be Closed
In standard HTML, tags like `<img>` or `<input>` do not require a closing slash. In JSX, **every tag must be closed**:

```jsx
// ❌ WRONG
<img src="photo.jpg">
<input type="text">
<br>

// ✅ CORRECT: Use self-closing tags
<img src="photo.jpg" alt="Profile" />
<input type="text" />
<br />
```

---

#### Rule 3: Use `className` Instead of `class`
In JavaScript, `class` is a reserved keyword (used for creating object-oriented classes like `class Car {}`). Because JSX is JavaScript, you must use `className` to apply CSS classes:

```jsx
// ❌ WRONG
<div class="card">Hello</div>

// ✅ CORRECT
<div className="card">Hello</div>
```

Similarly, the HTML `for` attribute used on `<label>` elements becomes `htmlFor`:

```jsx
// ✅ CORRECT
<label htmlFor="username">Username:</label>
<input id="username" type="text" />
```

---

#### Rule 4: Attribute Names Use camelCase
HTML attributes with dashes are converted to **camelCase** in JSX:

| HTML Attribute | JSX Equivalent |
| :--- | :--- |
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `tabindex` | `tabIndex` |
| `autocomplete` | `autoComplete` |

---

#### Rule 5: Embed JavaScript Expressions Using Curly Braces `{}`
To inject any dynamic JavaScript value, variable, or calculation into your markup, wrap it in curly braces `{}`:

```jsx
function Greeting() {
  const userName = "Harshit";
  const unreadMessages = 5;

  return (
    <div className="welcome-banner">
      {/* 1. Printing a variable */}
      <h2>Welcome back, {userName}!</h2>

      {/* 2. Performing a calculation */}
      <p>You have {unreadMessages * 2} notification points today.</p>

      {/* 3. Calling JavaScript methods */}
      <p>Current Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

::: warning What Can Go Inside `{}`?
You can put any JavaScript **expression** inside `{}` (something that produces a value, like `2 + 2`, a string, a variable, or a function call). You **cannot** put statements like `if (...)` or `for (...)` directly inside `{}`.
:::

---

## 5. Functional Components: The Building Blocks of React

In React, a **Component** is simply a JavaScript function that returns JSX. Think of components like **custom LEGO bricks**: you build small pieces (like a Button, a Navbar, or a Card) and assemble them together to construct the full page.

```text
┌────────────────────────────────────────────────────────┐
│                   A MODULAR WEB PAGE                   │
├────────────────────────────────────────────────────────┤
│  <Navbar />                                            │
├──────────────────────────┬─────────────────────────────┤
│  <Sidebar />             │  <MainContent>              │
│                          │     <ProductCard />         │
│                          │     <ProductCard />         │
│                          │  </MainContent>             │
├──────────────────────────┴─────────────────────────────┤
│  <Footer />                                            │
└────────────────────────────────────────────────────────┘
```

### Creating Your First Component

Let's create a reusable button component:

```jsx
// src/components/PrimaryButton.jsx
function PrimaryButton() {
  return (
    <button className="btn-primary">
      Click Me
    </button>
  );
}

export default PrimaryButton;
```

### Component Rules to Remember:
1. **Component names MUST start with a Capital Letter (PascalCase)**:
   * `<PrimaryButton />` $\rightarrow$ React knows this is your custom component.
   * `<button>` $\rightarrow$ React knows this is a native HTML element.
   * If you name your component `function button()`, React will mistake it for native HTML and fail!
2. **One component per file (recommended)**: While you can write multiple components in one file, keeping each component in its own file under `src/components/` makes your project clean and organized.

---

## 6. Props: Passing Data into Components

Right now, our `PrimaryButton` always displays the text *"Click Me"*. What if we want one button to say *"Sign In"*, another to say *"Download PDF"*, and another to say *"Delete Account"*?

We do this using **Props** (short for *properties*). Props are to React components what HTML attributes are to HTML tags, or what arguments are to JavaScript functions:

```jsx
// Parent component passing props down:
<PrimaryButton text="Sign In" color="blue" />
<PrimaryButton text="Download PDF" color="green" />
<PrimaryButton text="Delete Account" color="red" />
```

### Receiving Props Inside the Component

React automatically passes all props as a single JavaScript object into your component function:

```jsx
// Option A: Receiving the props object
function PrimaryButton(props) {
  return (
    <button className={`btn btn-${props.color}`}>
      {props.text}
    </button>
  );
}
```

### Best Practice: Destructuring Props

Instead of writing `props.something` everywhere, modern React developers **destructure** the props directly in the function arguments:

```jsx
// Option B: Destructuring (Cleanest and most common!)
function PrimaryButton({ text, color = "blue" }) {
  return (
    <button className={`btn btn-${color}`}>
      {text}
    </button>
  );
}

export default PrimaryButton;
```

Notice that we gave `color` a default value: `color = "blue"`. If the parent does not pass a color, it defaults to blue automatically!

---

### The Special `children` Prop

Sometimes, you want to pass entire JSX elements inside a component, just like you nest HTML tags inside a `<div>`:

```jsx
<Card title="Announcement">
  <p>Our server will be undergoing maintenance tonight.</p>
  <button>Read More</button>
</Card>
```

React automatically provides whatever you put between the opening and closing tags via a special prop called **`children`**:

```jsx
function Card({ title, children }) {
  return (
    <div className="card-box">
      <h3 className="card-title">{title}</h3>
      <div className="card-body">
        {/* Anything placed inside <Card>...</Card> appears right here! */}
        {children}
      </div>
    </div>
  );
}
```

---

## 7. Conditional Rendering: Showing and Hiding UI

In real applications, you constantly need to show or hide elements based on conditions:
* If a user is logged in, show *"Welcome, Harshit"*; otherwise, show a *"Sign In"* button.
* If an item is on sale, show a *"Discount"* badge.

Here are the two primary ways to do conditional rendering in React:

### Method 1: The Ternary Operator (`condition ? true : false`)
Use this when you want to choose between **two different outputs**:

```jsx
function UserStatus({ isLoggedIn }) {
  return (
    <div className="status-bar">
      {isLoggedIn ? (
        <span className="badge success">Welcome back!</span>
      ) : (
        <button className="btn-login">Please Log In</button>
      )}
    </div>
  );
}
```

### Method 2: The Logical AND Operator (`condition && <Component />`)
Use this when you want to render something **only if the condition is true**, and render nothing if it is false:

```jsx
function NotificationBadge({ unreadCount }) {
  return (
    <div className="inbox">
      <span>Inbox</span>
      {/* Only show the red badge if there is at least 1 unread message */}
      {unreadCount > 0 && (
        <span className="unread-counter">{unreadCount}</span>
      )}
    </div>
  );
}
```

::: danger Watch Out for Number 0 with `&&`
In JavaScript, `0 && <p>Hello</p>` evaluates to `0`! If `unreadCount` is `0`, writing `{unreadCount && <span ... />}` will render the number `0` on your screen. Always use a boolean comparison like `{unreadCount > 0 && <span ... />}`.
:::

---

## 8. List Rendering & The Critical `key` Prop

In web development, data almost always arrives as an array of objects from a database:

```javascript
const products = [
  { id: 101, name: "Mechanical Keyboard", price: 89, inStock: true },
  { id: 102, name: "Wireless Mouse", price: 49, inStock: false },
  { id: 103, name: "UltraWide Monitor", price: 349, inStock: true }
];
```

To transform this array into JSX elements, we use the standard JavaScript **`.map()`** method:

```jsx
function ProductList() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h4>{product.name}</h4>
          <p>${product.price}</p>
          {product.inStock ? (
            <span className="badge-available">In Stock</span>
          ) : (
            <span className="badge-out">Out of Stock</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Why is the `key` Prop Strictly Required?

Notice `key={product.id}` in the code above. If you remove it, React will show a warning in your browser console:
> *"Warning: Each child in a list should have a unique 'key' prop."*

**Why does React need this?**
React uses an internal concept called the **Virtual DOM**. When an item in your list is added, deleted, or reordered, React compares the old list with the new list. 

* **With unique keys**: React instantly knows: *"Ah! Item #102 was deleted. I only need to remove that one specific DOM node from the screen."*
* **Without keys**: React has no way to track which item moved. It is forced to re-render and redraw the entire list from scratch, slowing down your application.

::: tip Golden Rule for Keys
Always use a **unique, stable identifier** from your data (such as `item.id`). Avoid using the array index (`map((item, index) => ... key={index})`) if the list can be sorted, filtered, or deleted, because the index of an item changes when items are removed!
:::

---

## 9. Styling with Pure CSS (No Tailwind Needed)

You do not need Tailwind or complicated CSS-in-JS libraries to style React applications. Modern, pure CSS is clean, powerful, and easy to maintain.

### Step 1: Create a CSS File
Create a file named `src/components/ProductCard.css`:

```css
/* src/components/ProductCard.css */
.card-container {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
  font-weight: 700;
}

.card-price {
  font-size: 1.25rem;
  font-weight: 800;
  color: #4f46e5;
  margin: 0;
}

.stock-tag {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.stock-tag.in-stock {
  background-color: #ecfdf5;
  color: #059669;
}

.stock-tag.out-of-stock {
  background-color: #fef2f2;
  color: #dc2626;
}
```

### Step 2: Import the CSS Directly into Your Component
In your component file, simply add `import './ProductCard.css';` at the top:

```jsx
// src/components/ProductCard.jsx
import './ProductCard.css';

function ProductCard({ title, price, inStock }) {
  return (
    <div className="card-container">
      <h3 className="card-title">{title}</h3>
      <p className="card-price">${price}</p>
      
      <span className={`stock-tag ${inStock ? 'in-stock' : 'out-of-stock'}`}>
        {inStock ? 'In Stock' : 'Sold Out'}
      </span>
    </div>
  );
}

export default ProductCard;
```

---

## 10. Complete Practical Example: Team Directory

Let's assemble everything we learned—Vite setup, JSX rules, components, props, conditional rendering, lists, and pure CSS—into a complete, working example.

### The Team Member Card Component (`src/components/MemberCard.jsx`)

```jsx
import './MemberCard.css';

function MemberCard({ name, role, isLead, skills }) {
  return (
    <div className="member-card">
      <div className="member-header">
        <h3 className="member-name">{name}</h3>
        {/* Conditional Rendering: Show "Lead" badge if isLead is true */}
        {isLead && <span className="lead-badge">Team Lead</span>}
      </div>

      <p className="member-role">{role}</p>

      <div className="skills-container">
        {/* List Rendering: Render skill tags */}
        {skills.map((skill, index) => (
          <span key={index} className="skill-pill">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MemberCard;
```

### The Pure CSS File (`src/components/MemberCard.css`)

```css
.member-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.member-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.member-name {
  margin: 0;
  font-size: 1.1rem;
  color: #1e293b;
}

.lead-badge {
  background-color: #fef3c7;
  color: #d97706;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.member-role {
  margin: 0 0 12px 0;
  font-size: 0.875rem;
  color: #64748b;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-pill {
  background-color: #f1f5f9;
  color: #475569;
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 500;
}
```

### The Main Application (`src/App.jsx`)

```jsx
import MemberCard from './components/MemberCard';
import './App.css';

const teamMembers = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Engineer",
    isLead: true,
    skills: ["React", "JavaScript", "CSS3"]
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UI/UX Designer",
    isLead: false,
    skills: ["Figma", "Design Systems", "HTML5"]
  },
  {
    id: 3,
    name: "Rohan Verma",
    role: "Backend Developer",
    isLead: false,
    skills: ["Node.js", "Express", "PostgreSQL"]
  }
];

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Engineering Team Directory</h1>
        <p>Built with React components, props, and pure CSS.</p>
      </header>

      <main className="team-grid">
        {teamMembers.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            isLead={member.isLead}
            skills={member.skills}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
```

---

## 11. Quick Summary & Key Takeaways

1. **Vite** is the modern, lightning-fast standard for building React projects: `npm create vite@latest my-app -- --template react`.
2. **JSX** is JavaScript that resembles HTML. Remember: close all tags, use `className` instead of `class`, and wrap dynamic values in `{}`.
3. **Components** are capital-letter functions returning JSX.
4. **Props** pass data down from parent components to child components like function arguments.
5. **Conditional Rendering** allows you to dynamically show or hide elements using the ternary operator `? :` or `&&`.
6. **List Rendering** uses `.map()` to generate elements and strictly requires a unique, stable `key` prop on the top-level element.
7. **Pure CSS** can be imported directly (`import './Component.css'`) without needing any utility frameworks.

Now that you understand components and props, what happens when a user clicks a button, types in an input box, or submits a form? In the next chapter, we dive into **State, Event Handling, and Forms**!

👉 **[Continue to Chapter 2: State, Events & Form Handling →](/frontend/react/02-state-and-events)**
