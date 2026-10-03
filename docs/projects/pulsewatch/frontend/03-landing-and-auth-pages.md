---
title: "03. Landing & Authentication Pages"
description: "Build the public marketing hero page with automatic dashboard redirect, and build controlled login and registration forms in Next.js."
---

# 03. Landing & Authentication Pages 🚪

In this chapter, we will build the public face of PulseWatch:
1. **The Landing Page (`app/page.js`)**: An attractive hero section featuring feature highlights and an automatic redirect to `/dashboard` if an authenticated user visits.
2. **The Login Page (`app/login/page.js`)**: A controlled form capturing credentials, authenticating with the backend, storing the JWT token, and navigating to the dashboard.
3. **The Register Page (`app/register/page.js`)**: An account creation form handling validation errors, loading states, and instant sign-in.

---

## 1. Landing Page (`app/page.js`)

Create `app/page.js` inside your `frontend/` directory:

```javascript
// ==============================================================================
// Landing Page (frontend/app/page.js) - Client Component
// ==============================================================================
// Welcoming hero page that introduces PulseWatch and provides quick links
// to Login and Register. If a token is already stored, it redirects to /dashboard.
// ==============================================================================

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken } from '../lib/api';

export default function HomePage() {
  const router = useRouter();

  // If already logged in, automatically go to the dashboard!
  useEffect(() => {
    if (getToken()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div>
      {/* Top Header */}
      <header className="navbar">
        <div className="nav-brand">
          <span>📡</span>
          <span>PulseWatch</span>
        </div>
        <div className="nav-actions">
          <Link href="/login" className="btn btn-secondary">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ textAlign: 'center', marginTop: '60px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', letterSpacing: '-1px' }}>
          Know When Your Websites Go Down <br />
          <span style={{ color: 'var(--primary)' }}>Before Your Users Do</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '650px', margin: '0 auto 32px auto' }}>
          PulseWatch pings your websites and APIs around the clock. Track uptime, response latency, and health history on a simple, beautiful dashboard.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '60px' }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '16px' }}>
            🚀 Create Free Account
          </Link>
          <Link href="/login" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '16px' }}>
            Sign In
          </Link>
        </div>

        {/* Feature Highlights (Using Simple Flexbox) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <div className="stat-box" style={{ textAlign: 'left', flex: '1 1 280px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚡</div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Real-Time Health Checks</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Background workers ping your URLs every minute and record HTTP status codes and response times.
            </p>
          </div>

          <div className="stat-box" style={{ textAlign: 'left', flex: '1 1 280px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🚀</div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Redis In-Memory Caching</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Supercharged dashboard response times using in-memory Redis caching with automatic invalidation.
            </p>
          </div>

          <div className="stat-box" style={{ textAlign: 'left', flex: '1 1 280px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Latency Logs & History</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Inspect detailed historical heartbeat checks and measure millisecond latency for each endpoint.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 2. Login Page (`app/login/page.js`)

Create `app/login/page.js` inside your `frontend/` directory:

```javascript
// ==============================================================================
// Login Page (frontend/app/login/page.js)
// ==============================================================================
// Simple login form that collects email and password, sends them to our Express
// backend (POST /api/auth/login), saves the returned JWT token, and redirects to dashboard.
// ==============================================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiLogin, setToken, setUser } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiLogin(email, password);

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Save token and user info into localStorage
      setToken(data.token);
      setUser(data.user);

      // Navigate to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Could not connect to backend server. Make sure it is running on port 5000.');
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* Back to Home Link */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          &larr; Back to Home
        </Link>
      </div>

      <div className="form-card">
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Sign in to your PulseWatch monitor dashboard.
        </p>

        {/* Display Error Message if any */}
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
```

---

## 3. Register Page (`app/register/page.js`)

Create `app/register/page.js` inside your `frontend/` directory:

```javascript
// ==============================================================================
// Register Page (frontend/app/register/page.js)
// ==============================================================================
// User registration form that collects name, email, and password, sends them
// to our Express backend (POST /api/auth/register), saves the token, and goes to dashboard.
// ==============================================================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRegister, setToken, setUser } from '../../lib/api';

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRegister(name, email, password);

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      // Save token and user info into localStorage
      setToken(data.token);
      setUser(data.user);

      // Navigate to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Could not connect to backend server. Make sure it is running on port 5000.');
      setLoading(false);
    }
  }

  return (
    <div className="container">
      {/* Back to Home Link */}
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          &larr; Back to Home
        </Link>
      </div>

      <div className="form-card">
        <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Create an Account</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
          Start monitoring your website uptime in seconds.
        </p>

        {/* Display Error Message if any */}
        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password (min 6 characters)</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
```

---

## 4. Key React & JavaScript Concepts Explained

### 1. Controlled Form Inputs
In both `LoginPage` and `RegisterPage`, input fields are tied directly to React state:
```jsx
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```
Every keystroke updates the component state, giving us complete control over validation, submission data, and UI feedback.

### 2. Loading State Disabling
When a user clicks "Sign In" or "Create Account", `setLoading(true)` disables the button and updates the button label (`"Signing in..."` / `"Creating Account..."`). This prevents impatient users from double-submitting forms and triggering duplicate network requests.

### 3. Client-Side Auth Guard
In `HomePage`:
```javascript
useEffect(() => {
  if (getToken()) {
    router.push('/dashboard');
  }
}, [router]);
```
If a logged-in user visits `http://localhost:3000/`, they skip the landing page and jump straight to their live monitoring dashboard.

---

🎉 **Auth pages are complete!** Now proceed to **[Chapter 4: Monitoring Dashboard & History Modal](./04-dashboard-and-modals.md)** to build the main dashboard.
