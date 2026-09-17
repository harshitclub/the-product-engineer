# 4. Client-Side Routing with React Router DOM

> Build seamless, lightning-fast multi-page web applications with React Router DOM: mastering `BrowserRouter`, `Routes`, `Route`, `Link`, active `NavLink` styling, dynamic URL parameters (`useParams`), programmatic navigation (`useNavigate`), and 404 pages using pure CSS.

---

## 1. What is Client-Side Routing? (SPA vs MPA)

In traditional web development, every time you click a link like `<a href="/about.html">`, the browser sends a request to the server, throws away the current page, and flashes a white screen while downloading the new page:

```text
TRADITIONAL MULTI-PAGE APPLICATION (MPA):
User clicks "/about" ──▶ Browser requests about.html ──▶ Server replies ──▶ Screen flashes white & reloads
```

In a **Single Page Application (SPA)** with **React Router**, there is only **one** HTML file. When the user clicks a link:
1. React Router intercepts the click.
2. It changes the URL in the browser's address bar.
3. It instantly unmounts the old page component and mounts the new page component—**without any page reload or white flash!**

```text
REACT ROUTER CLIENT-SIDE ROUTING (SPA):
User clicks "/about" ──▶ URL changes in address bar ──▶ React swaps component instantly (< 1ms!)
```

The user enjoys an instantaneous, desktop-app-like experience.

---

## 2. Installing React Router DOM

Inside your existing Vite React project folder (`my-react-app`), open your terminal and install the official library:

```bash
npm install react-router-dom
```

You can verify that it installed by checking your `package.json` under `"dependencies"`:

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.0"
}
```

---

## 3. The Core Building Blocks

React Router provides a small set of simple, intuitive components:

| Component | Purpose |
| :--- | :--- |
| `<BrowserRouter>` | The parent wrapper that connects React to the browser's URL address bar. |
| `<Routes>` | The container that checks the current URL and picks the matching route. |
| `<Route>` | Defines a single route with a `path` and an `element` to render. |
| `<Link>` | Replacement for `<a href="...">` that navigates without reloading the page. |
| `<NavLink>` | Same as `<Link>`, but knows when it is active (great for navbars!). |
| `<Outlet>` | A placeholder that renders child routes inside a shared layout. |

---

## 4. Setting Up Your First Route Map

Let's set up standard routes for a website with a **Home**, **About**, and **Contact** page.

### Step 1: Wrap Your Application with `<BrowserRouter>`
Open `src/main.jsx` and wrap `<App />` inside `<BrowserRouter>`:

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

---

### Step 2: Define Routes in `src/App.jsx`

Now open `src/App.jsx` and map URLs to components:

```jsx
import { Routes, Route } from 'react-router-dom';

// Simple page components
function Home() {
  return <h2>🏠 Welcome to the Home Page</h2>;
}

function About() {
  return <h2>ℹ️ Learn more About Us</h2>;
}

function Contact() {
  return <h2>📬 Get in touch with our Team</h2>;
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
```

Try typing `http://localhost:5173/about` or `http://localhost:5173/contact` in your browser. The page switches instantly!

---

## 5. Navigation: `<Link>` vs `<NavLink>`

Never use standard HTML `<a href="/about">` in React! If you use `<a>`, the browser will reload the entire webpage from scratch, destroying all existing React state.

Instead, use **`<Link>`**:

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      {/* ✅ Fast, client-side navigation without page refresh */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

---

### Highlighting the Active Tab with `<NavLink>`

On modern websites, the link for the page you are currently viewing has a colored underline or highlight. React Router makes this effortless with **`<NavLink>`**.

`<NavLink>` automatically passes an `isActive` boolean property to its `className` callback:

```jsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="site-navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        Contact
      </NavLink>
    </nav>
  );
}
```

### Pure CSS for Active Links (`Navbar.css`)

```css
.site-navbar {
  display: flex;
  gap: 16px;
  padding: 14px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #0f172a;
  background-color: #f1f5f9;
}

/* Active link style */
.nav-link.active {
  color: #4f46e5;
  background-color: #eef2ff;
  font-weight: 700;
}
```

---

## 6. Dynamic Routes with `useParams`

Imagine you are building an online store with 500 products. You don't want to create 500 separate routes like `<Route path="/product-1" />`, `<Route path="/product-2" />`!

Instead, we use a **Dynamic Route** with a colon `:` parameter:

```jsx
<Route path="/products/:productId" element={<ProductDetail />} />
```

The `:productId` acts as a placeholder that matches any value:
* `/products/101` $\rightarrow$ `productId` is `"101"`
* `/products/wireless-mouse` $\rightarrow$ `productId` is `"wireless-mouse"`

### Reading the URL Parameter with `useParams()`

Inside your `ProductDetail` component, call the `useParams` hook to read the value from the URL:

```jsx
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  // Grabs whatever value is currently in the :productId spot in the URL
  const { productId } = useParams();

  return (
    <div className="product-page">
      <h2>Product Details</h2>
      <p>Viewing details for item ID: <strong>{productId}</strong></p>
      
      <Link to="/products" className="back-link">← Back to All Products</Link>
    </div>
  );
}

export default ProductDetail;
```

---

## 7. Programmatic Navigation with `useNavigate`

Sometimes you need to change the page **from JavaScript code** rather than waiting for the user to click a link:
* After a user successfully submits a form.
* When a user logs out.
* Clicking a "Go Back" button.

We do this using the **`useNavigate`** hook:

```jsx
import { useNavigate } from 'react-router-dom';

function CheckoutButton() {
  const navigate = useNavigate();

  function handleCompleteOrder() {
    // 1. Process payment or order logic...
    console.log("Order processed successfully!");

    // 2. Redirect the user to the order confirmation page
    navigate('/order-confirmed');
  }

  return (
    <button onClick={handleCompleteOrder} className="checkout-btn">
      Place Order
    </button>
  );
}
```

### Going Back to the Previous Page:
You can pass `-1` to navigate backwards, just like clicking the browser's back button:

```jsx
<button onClick={() => navigate(-1)}>← Go Back</button>
```

---

## 8. Catch-All 404 "Page Not Found" Handling

What happens if a user types a URL that doesn't exist, like `/random-broken-link`?

In React Router, you can catch all unmatched URLs using an asterisk `*` path:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />

  {/* Catch-all route: MUST be placed at the very bottom of <Routes> */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

### The 404 Component (`NotFound.jsx`)

```jsx
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-card">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The engineering notes or page you are looking for does not exist.</p>
      <Link to="/" className="home-btn">Return to Home</Link>
    </div>
  );
}

export default NotFound;
```

---

## 9. Shared Layouts with `<Outlet>`

In most websites, the **Navbar** and **Footer** stay on screen at all times, while only the page content between them changes.

React Router provides the **`<Outlet>`** component to create persistent layouts without repeating `<Navbar />` in every single file:

```text
┌────────────────────────────────────────────────────────┐
│                   <Layout /> Component                 │
├────────────────────────────────────────────────────────┤
│  <Navbar /> (Persistent across all pages)              │
├────────────────────────────────────────────────────────┤
│  <Outlet />                                            │
│    ├── When URL is "/", renders <Home />               │
│    ├── When URL is "/about", renders <About />         │
│    └── When URL is "/products", renders <Products />   │
├────────────────────────────────────────────────────────┤
│  <Footer /> (Persistent across all pages)              │
└────────────────────────────────────────────────────────┘
```

### Creating the Layout Component (`src/components/Layout.jsx`)

```jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import './Layout.css';

function Layout() {
  return (
    <div className="site-wrapper">
      <Navbar />

      <main className="main-content">
        {/* The active route component is injected right here! */}
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© 2026 The Product Engineer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
```

---

## 10. Complete Multi-Page Project: Tech Gear Store

Let's assemble all routing features into a complete, working multi-page application.

### Project Structure:
```text
src/
├── components/
│   ├── Layout.jsx
│   ├── Layout.css
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── App.css
└── App.jsx
```

### 1. Pure CSS Styles (`src/components/Layout.css`)

```css
.site-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  font-family: inherit;
}

.site-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.site-logo {
  font-size: 1.15rem;
  font-weight: 800;
  color: #4f46e5;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #0f172a;
}

.nav-link.active {
  color: #4f46e5;
  background-color: #eef2ff;
  font-weight: 700;
}

.main-content {
  flex: 1;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 32px 16px;
}

.site-footer {
  text-align: center;
  padding: 20px;
  color: #94a3b8;
  font-size: 0.85rem;
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;
}

/* Page Card Common Styling */
.page-container {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.page-title {
  margin: 0 0 10px 0;
  color: #0f172a;
}

.page-text {
  color: #475569;
  line-height: 1.6;
}

/* Products Grid */
.product-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
  margin-top: 24px;
}

.product-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-item h3 {
  margin: 0 0 6px 0;
  font-size: 1.05rem;
  color: #1e293b;
}

.product-item p {
  color: #4f46e5;
  font-weight: 700;
  margin: 0 0 14px 0;
}

.view-btn {
  display: inline-block;
  text-align: center;
  background-color: #f1f5f9;
  color: #334155;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.view-btn:hover {
  background-color: #e2e8f0;
}
```

---

### 2. The Products Page (`src/pages/Products.jsx`)

```jsx
import { Link } from 'react-router-dom';

const sampleProducts = [
  { id: 'mechanical-keyboard', name: 'Mechanical Keyboard (RGB)', price: 89 },
  { id: 'ergonomic-mouse', name: 'Ergonomic Wireless Mouse', price: 49 },
  { id: 'noise-cancelling-headphones', name: 'Studio Headphones', price: 179 },
];

function Products() {
  return (
    <div className="page-container">
      <h1 className="page-title">Hardware & Peripherals</h1>
      <p className="page-text">
        Click on any product to see dynamic routing in action using <code>useParams</code>.
      </p>

      <div className="product-cards-grid">
        {sampleProducts.map((p) => (
          <div key={p.id} className="product-item">
            <div>
              <h3>{p.name}</h3>
              <p>${p.price}</p>
            </div>
            <Link to={`/products/${p.id}`} className="view-btn">
              View Product Specs →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
```

---

### 3. The Dynamic Product Detail Page (`src/pages/ProductDetail.jsx`)

```jsx
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="view-btn" style={{ marginBottom: '16px' }}>
        ← Go Back
      </button>

      <h1 className="page-title">Product Details</h1>
      <p className="page-text">
        Currently viewing item with URL parameter:
      </p>
      
      <div style={{ background: '#eef2ff', padding: '16px', borderRadius: '8px', color: '#4338ca', fontWeight: 600 }}>
        Route Parameter ID: {productId}
      </div>
    </div>
  );
}

export default ProductDetail;
```

---

### 4. The Contact Form with Redirection (`src/pages/Contact.jsx`)

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return;

    // Perform form action...
    alert('Message sent! Navigating you back to Home page...');
    navigate('/'); // Programmatic redirect using useNavigate
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Contact the Engineering Team</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <textarea
          rows="4"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
        ></textarea>
        
        <button
          type="submit"
          style={{ marginTop: '12px', background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
```

---

### 5. Connecting Everything with Nested Routes in `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

function Home() {
  return (
    <div className="page-container">
      <h1 className="page-title">Welcome to Tech Store</h1>
      <p className="page-text">A multi-page React application powered by React Router DOM and pure CSS.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-container" style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '3rem', color: '#ef4444', margin: 0 }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you requested could not be located.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Parent layout route that renders the Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        {/* Child routes injected into <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
```

---

## 11. Quick Summary & Bridge to Next.js

1. **Client-side routing** eliminates slow browser reloads by swapping components instantly in memory.
2. **`<BrowserRouter>`** must wrap your application so components can listen to the URL.
3. **Use `<Link>` and `<NavLink>`** instead of `<a href>`. Use `<NavLink>` when you need an `.active` class for navbars.
4. **Dynamic routing** uses `:parameterName` (e.g. `/products/:id`), which you read using the `useParams()` hook.
5. **Programmatic navigation** uses `useNavigate()` to change routes through code (like after a form submission).
6. **`<Outlet>`** allows you to build persistent layouts with a single Navbar and Footer.
7. **How this prepares you for Next.js**:
   * In React Router, you manually configure `<Route path="...">`.
   * In **Next.js**, routing is **file-system based**: creating a folder `app/products/[id]/page.js` creates the route automatically!
   * Knowing how client navigation, parameters, and layouts work makes learning the Next.js App Router an effortless transition.

---

## Congratulations! 🎉

You have mastered the foundational pillars of pure React:
- Setting up fast projects with **Vite**
- Understanding **JSX**, **Components**, and **Props**
- Managing state and re-renders with **`useState`**
- Building robust, controlled **Forms** with real-time validation
- Running side effects and fetching GET APIs safely with **`useEffect`**
- Client-side navigation and layouts with **React Router DOM**

You are now 100% prepared to take your skills to full-stack production with **Next.js**!

👉 **[Start the Next.js Masterclass Track →](/frontend/nextjs/)**
