# 3. Lifecycle, useEffect & Fetching APIs in React

> Master the `useEffect` hook, understand component lifecycles, and learn how to fetch backend GET APIs safely using the native `fetch` method with loading spinners, error handling, and pure CSS.

---

## 1. What are "Side Effects" in React?

React components are designed to be **pure rendering machines**: they receive props and state, and return JSX for the screen.

However, real-world web applications must perform tasks that reach outside React's visual rendering:
* Fetching data from a backend REST API over the internet.
* Setting a timer (like `setInterval` or `setTimeout`).
* Changing the browser tab title (`document.title = "New Message"`).
* Adding a global window listener (`window.addEventListener('resize', ...)`).

In programming, these external tasks are called **Side Effects** (or just *effects*).

```text
┌─────────────────────────────────────────────────────────────┐
│                 REACT PURE RENDER VS SIDE EFFECTS           │
├──────────────────────────────┬──────────────────────────────┤
│ Pure Rendering (Component)   │ Side Effects (useEffect)     │
├──────────────────────────────┼──────────────────────────────┤
│ Calculating JSX markup       │ Talking to backend servers   │
│ Displaying numbers & text    │ Setting timers/intervals     │
│ Fast, synchronous, pure      │ Asynchronous network calls   │
└──────────────────────────────┴──────────────────────────────┘
```

In React, the official tool for managing side effects is the **`useEffect`** hook.

---

## 2. The Mental Model of `useEffect`

The golden rule to remember about `useEffect` is:

> **React always renders the visual screen first, and then executes the code inside `useEffect` afterward.**

```text
┌─────────────────────────────────────────────────────────────┐
│                 THE EXECUTION TIMELINE                      │
│                                                             │
│   1. React evaluates your component function                │
│            │                                                │
│            ▼                                                │
│   2. React renders the HTML elements onto the screen        │
│            │                                                │
│            ▼                                                │
│   3. The user sees the page (e.g. "Loading data...")        │
│            │                                                │
│            ▼                                                │
│   4. React executes your useEffect() callback               │
│            │                                                │
│            ▼                                                │
│   5. Data arrives from the API -> setState() called         │
│            │                                                │
│            ▼                                                │
│   6. React re-renders with the real data!                   │
└─────────────────────────────────────────────────────────────┘
```

This prevents the browser from freezing while waiting for a slow network request to finish!

---

## 3. The 3 Dependency Array Patterns

The `useEffect` hook takes two arguments:
1. A **callback function** containing the effect code.
2. An optional **Dependency Array**:

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Your effect code goes here
}, [/* Dependency Array */]);
```

How and when your effect runs depends entirely on the **Dependency Array**:

### Pattern 1: No Dependency Array (Runs on EVERY Render)

```jsx
useEffect(() => {
  console.log("I run after every single render!");
});
```
* **When does it run?** When the component first loads, and after **every single state change or re-render**.
* **Danger**: If you update state inside this effect (`setCount(...)`), it will trigger a re-render, which triggers the effect, which updates state, creating an **infinite loop that crashes your browser tab!** You will rarely need this pattern.

---

### Pattern 2: Empty Dependency Array `[]` (Runs ONCE on Mount)

```jsx
useEffect(() => {
  console.log("I run ONLY ONCE when the component first appears!");
}, []); // Empty array
```
* **When does it run?** Exactly once when the component is first created and mounted onto the screen.
* **When to use?** This is the most common pattern for **fetching initial data from an API** when a page opens!

---

### Pattern 3: Array with Variables `[stateOrProp]` (Runs on Change)

```jsx
useEffect(() => {
  console.log(`User selected category: ${category}. Fetching new items...`);
}, [category]); // Runs on mount, AND whenever 'category' changes
```
* **When does it run?** Once on mount, and whenever any variable inside the array changes value.
* **When to use?** Perfect for search bars, category filters, pagination, or tab switching where changing an ID should fetch new data.

```text
┌──────────────────────────────────────────────────────────────────┐
│                   SUMMARY OF DEPENDENCY PATTERNS                 │
├───────────────────────┬──────────────────────────────────────────┤
│ useEffect(() => {})   │ Runs after EVERY render (Careful!)       │
├───────────────────────┼──────────────────────────────────────────┤
│ useEffect(() => {}, [])│ Runs ONCE when component mounts          │
├───────────────────────┼──────────────────────────────────────────┤
│ useEffect(() => {}, [x])│ Runs on mount + whenever 'x' changes   │
└───────────────────────┴──────────────────────────────────────────┘
```

---

## 4. The Cleanup Function: Stopping Memory Leaks

Sometimes, a side effect creates an ongoing background process:
* A timer (`setInterval`)
* A websocket connection
* A window resize event listener

If the user navigates away to another page while that timer is ticking, the timer continues running in the computer's memory forever! This is called a **Memory Leak**.

To prevent this, you can return a **Cleanup Function** from inside `useEffect`:

```jsx
import { useState, useEffect } from 'react';

function LiveClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // 1. Start the background interval timer
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // 2. Return a cleanup function:
    // React automatically runs this when the component unmounts (is removed from screen)
    return () => {
      clearInterval(intervalId); // Stop the timer!
      console.log("Clock removed from screen. Timer stopped.");
    };
  }, []);

  return <div className="clock-badge">Current Time: {time}</div>;
}
```

---

## 5. Fetching a GET API with the Native `fetch()` Method

Let's learn how to load data from an external server using JavaScript's native `fetch()` method.

### The 3 Mandatory States of Data Fetching
Whenever you fetch data from the internet, your user interface is always in one of three states:
1. **Loading State**: The request was sent; waiting for the server to reply. (Show a spinner or skeleton).
2. **Error State**: The internet went down, the URL is wrong, or the server crashed. (Show an error alert with a retry button).
3. **Success (Data) State**: The data arrived safely. (Render the list of items).

In React, we represent these 3 states with 3 `useState` variables:

```jsx
const [data, setData] = useState([]);      // Holds the fetched data
const [loading, setLoading] = useState(true); // Is it currently loading?
const [error, setError] = useState(null);  // Stores error message if failed
```

---

### Step-by-Step Native Fetch Implementation

Here is the clean, production-grade pattern for fetching data inside `useEffect`:

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController lets us cancel the network request if component unmounts
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        // Make the GET request
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });

        // ⚠️ CRITICAL: fetch does NOT reject on 404 or 500 errors!
        // You MUST check response.ok manually:
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status} (${response.statusText})`);
        }

        const json = await response.json();
        setUsers(json); // Store the data
      } catch (err) {
        // If aborted by cleanup, ignore the error
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while fetching users.');
        }
      } finally {
        setLoading(false); // Stop loading indicator regardless of success or failure
      }
    }

    fetchUsers();

    // Cleanup: cancel pending request if user navigates away
    return () => controller.abort();
  }, []); // Run once on mount

  // 1. Loading State UI
  if (loading) {
    return <div className="status-box">Loading users... Please wait.</div>;
  }

  // 2. Error State UI
  if (error) {
    return <div className="status-box error">Error: {error}</div>;
  }

  // 3. Success State UI
  return (
    <div>
      <h2>User List ({users.length})</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

::: warning Why Did We Write `async` Inside Instead of on `useEffect`?
You **cannot** make the `useEffect` callback itself async:
```jsx
// ❌ WRONG: Will throw an error!
useEffect(async () => { ... }, []);
```
Because `useEffect` expects either nothing or a cleanup function to be returned. An `async` function returns a Promise, not a cleanup function! Always declare your `async function` *inside* the effect and call it immediately.
:::

---

## 6. Complete Practical Project: Live User Directory

Let's build a real-world **User Directory Application** that fetches real profiles from the free public API `https://jsonplaceholder.typicode.com/users`.

### Features Included:
- Fetches real data on page mount
- Pure CSS loading spinner animation
- Error state banner with a functional **"Retry"** button
- Live **Search Filter** (filter by user name in real time)
- Pure CSS responsive card grid (no external UI libraries)

### The Pure CSS File (`src/components/UserDirectory.css`)

```css
.directory-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 16px;
  font-family: inherit;
}

.directory-header {
  text-align: center;
  margin-bottom: 28px;
}

.directory-header h1 {
  font-size: 1.8rem;
  color: #0f172a;
  margin: 0 0 6px 0;
}

.directory-header p {
  color: #64748b;
  margin: 0 0 20px 0;
  font-size: 0.95rem;
}

.search-box {
  width: 100%;
  max-width: 450px;
  padding: 10px 16px;
  font-size: 0.925rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-box:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* Loading Spinner */
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  gap: 16px;
  color: #475569;
}

.spinner {
  width: 38px;
  height: 38px;
  border: 4px solid #e2e8f0;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #991b1b;
  margin-bottom: 24px;
}

.retry-btn {
  margin-top: 12px;
  background-color: #dc2626;
  color: #ffffff;
  border: none;
  padding: 8px 18px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background-color: #b91c1c;
}

/* Card Grid */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.user-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #e0e7ff;
  color: #4f46e5;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.user-name {
  margin: 0;
  font-size: 1.1rem;
  color: #1e293b;
  font-weight: 700;
}

.user-username {
  color: #6366f1;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: -4px;
}

.user-meta {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.825rem;
  color: #64748b;
}

.empty-results {
  text-align: center;
  padding: 40px;
  color: #94a3b8;
  font-size: 0.95rem;
}
```

### The Component Code (`src/components/UserDirectory.jsx`)

```jsx
import { useState, useEffect } from 'react';
import './UserDirectory.css';

function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trigger state to manually re-run the effect if the user clicks Retry
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDirectory() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to load users: HTTP ${res.status}`);
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to connect to user database.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadDirectory();

    // Cleanup abort signal
    return () => controller.abort();
  }, [reloadToken]); // Re-runs if reloadToken increments!

  // Derived state: Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="directory-container">
      {/* Header & Search */}
      <header className="directory-header">
        <h1>Engineering Team Directory</h1>
        <p>Real-time data fetched from JSONPlaceholder using native fetch.</p>

        <input
          type="text"
          placeholder="Filter by name or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </header>

      {/* 1. Loading State */}
      {loading && (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <span>Retrieving user profiles...</span>
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button
            onClick={() => setReloadToken((prev) => prev + 1)}
            className="retry-btn"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* 3. Empty Search Results */}
      {!loading && !error && filteredUsers.length === 0 && (
        <div className="empty-results">
          No engineers matched your search for "{searchTerm}".
        </div>
      )}

      {/* 4. Loaded Cards Grid */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <h3 className="user-name">{user.name}</h3>
              <span className="user-username">@{user.username}</span>

              <div className="user-meta">
                <span>📧 {user.email}</span>
                <span>🏢 {user.company.name}</span>
                <span>🌐 {user.website}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDirectory;
```

---

## 7. Quick Summary & Next.js Connection

1. **`useEffect`** runs after the visual render has completed, keeping your UI responsive.
2. **Dependency array controls execution**:
   * No array $\rightarrow$ runs after every render.
   * Empty `[]` $\rightarrow$ runs once when mounted (ideal for initial data loading).
   * `[id]` $\rightarrow$ runs when `id` changes.
3. **Always return a cleanup function** to cancel subscriptions, intervals, or ongoing fetch requests (`AbortController`).
4. **Always manage 3 states for API calls**: `data`, `loading`, and `error`.
5. **Why this matters for Next.js**:
   * In Next.js Server Components, you can fetch data directly on the server without `useEffect`!
   * But when building interactive search bars, live chat boxes, or modals in Next.js, you still use `useState` and `useEffect` inside **Client Components** (`'use client'`). Understanding this foundation makes Next.js feel natural!

Now that our components can hold state and load external data, what happens when we want a real multi-page website with different URLs like `/`, `/about`, and `/products/123`?

In the final chapter of this track, we build full multi-page navigation using **React Router DOM**!

👉 **[Continue to Chapter 4: React Router DOM (Routing) →](/frontend/react/04-react-router-dom)**
