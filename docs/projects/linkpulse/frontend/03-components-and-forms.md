---
title: "03. Core UI Components"
description: "Build Navbar with live server health polling and theme toggling, CreateLinkForm with controlled inputs, and LinkCard with clipboard copy and deletion."
---

# 03. Core UI Components 🧩

In this chapter, we will build the three primary interactive components of our application:
1. **`Navbar.jsx`**: Displays brand, live backend health status, and theme toggle.
2. **`CreateLinkForm.jsx`**: Controlled form for creating new shortened URLs.
3. **`LinkCard.jsx`**: List item card with one-click URL copying, analytics trigger, and deletion.

---

## 1. The Navbar Component (`components/Navbar.jsx`)

Create `components/Navbar.jsx`:

```jsx
'use client';

import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Navbar Component
 * Displays brand logo, backend connection status, and theme toggle button.
 */
export default function Navbar() {
  const [isOnline, setIsOnline] = useState(false);
  const [theme, setTheme] = useState('light'); // Default to light mode

  // Check if backend API is reachable every 10 seconds
  useEffect(() => {
    const checkServer = async () => {
      const active = await api.checkHealth();
      setIsOnline(active);
    };

    checkServer();
    const timer = setInterval(checkServer, 10000);
    return () => clearInterval(timer);
  }, []);

  // Update data-theme attribute on <html> element when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle between light and dark mode
  const handleToggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        {/* Brand Logo & Name */}
        <div className="brand">
          <span className="brand-badge">LP</span>
          <span>LinkPulse</span>
        </div>

        <div className="nav-actions">
          {/* Backend Connection Indicator */}
          <div className="status-pill" title="Backend Server Status">
            <span className={`status-dot ${isOnline ? 'active' : ''}`} />
            <span>{isOnline ? 'API Connected' : 'API Offline'}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleToggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}
```

### React Concepts Explained:
- **`'use client'`**: Marks this component as a React Client Component in Next.js, allowing it to use React hooks (`useState`, `useEffect`) and browser events (`onClick`).
- **`setInterval` and Cleanup**: `setInterval(checkServer, 10000)` checks if the backend is alive every 10 seconds. The `return () => clearInterval(timer)` cleanup function stops the timer when the component unmounts, preventing memory leaks.
- **`document.documentElement.setAttribute('data-theme', theme)`**: Sets `data-theme="dark"` or `data-theme="light"` on the root `<html>` tag, activating the corresponding CSS rules in `globals.css`.

---

## 2. Link Creation Form (`components/CreateLinkForm.jsx`)

Create `components/CreateLinkForm.jsx`:

```jsx
'use client';

import { useState } from 'react';
import { api } from '../services/api';

/**
 * CreateLinkForm Component
 * Form to input destination URL, optional title, and optional custom alias.
 */
export default function CreateLinkForm({ onLinkCreated, showToast }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Simple validation
    if (!url.trim()) {
      setErrorMessage('Please enter a destination URL.');
      return;
    }

    setLoading(true);

    try {
      // Call backend API to create link
      const newLink = await api.createLink({
        url: url.trim(),
        title: title.trim() || undefined,
        customCode: customCode.trim() || undefined,
      });

      // Clear input fields
      setUrl('');
      setTitle('');
      setCustomCode('');

      // Update parent list and show toast
      onLinkCreated(newLink);
      showToast('Short link created successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-heading">Create Short Link</h2>

      <form onSubmit={handleSubmit}>
        {/* Destination URL Input */}
        <div className="form-group">
          <label className="form-label">Destination URL *</label>
          <input
            type="url"
            className="input"
            placeholder="https://example.com/long-page-link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        {/* Optional Title and Custom Alias */}
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Title (Optional)</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. My Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Custom Alias (Optional)</label>
            <div className="input-with-prefix">
              <span className="input-prefix">/</span>
              <input
                type="text"
                className="input"
                placeholder="my-link"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p style={{ color: 'var(--danger-color)', fontSize: '12px', marginBottom: '10px' }}>
            ⚠️ {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>
      </form>
    </div>
  );
}
```

### React Concepts Explained:
- **Controlled Components**: Every input's value is bound to React state (`value={url}` and `onChange={(e) => setUrl(e.target.value)}`). React is the single source of truth for form data.
- **`e.preventDefault()`**: Prevents the standard HTML form submission that reloads the whole browser window.
- **Lifting State Up (`onLinkCreated`)**: Instead of managing the global list inside the form, the form triggers the parent's `onLinkCreated(newLink)` callback function, allowing the parent dashboard to prepend the new link to the list.

---

## 3. Link Card Component (`components/LinkCard.jsx`)

Create `components/LinkCard.jsx`:

```jsx
'use client';

import { useState } from 'react';
import { api } from '../services/api';

/**
 * LinkCard Component
 * Displays a single short link with its click count, copy button, analytics trigger, and delete button.
 */
export default function LinkCard({ link, onLinkDeleted, onOpenAnalytics, showToast }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Full URL for the short link (e.g. http://localhost:5000/my-alias)
  const shortUrl = api.getShortUrl(link.shortCode);

  // Copy short URL to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      showToast('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Failed to copy link');
    }
  };

  // Delete link
  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Delete short link "/${link.shortCode}"?`);
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await api.deleteLink(link.id);
      onLinkDeleted(link.id);
      showToast('Link deleted');
    } catch (error) {
      showToast(error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="link-row">
      <div className="link-info">
        {/* Title and Clicks Badge */}
        <div className="link-top">
          <span className="link-title">{link.title || link.shortCode}</span>
          <span className="click-badge">
            {link.totalClicks || 0} {link.totalClicks === 1 ? 'click' : 'clicks'}
          </span>
        </div>

        {/* Short URL & Original URL */}
        <div className="link-urls">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="short-url"
            title="Open short link in new tab"
          >
            {shortUrl.replace(/^https?:\/\//, '')} ↗
          </a>
          <span className="destination-url" title={link.originalUrl}>
            ↳ {link.originalUrl}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="link-actions">
        {/* Copy Button */}
        <button onClick={handleCopy} className="btn btn-secondary btn-sm">
          {copied ? '✓ Copied' : 'Copy'}
        </button>

        {/* Analytics Button */}
        <button
          onClick={() => onOpenAnalytics(link.id)}
          className="btn btn-secondary btn-sm"
        >
          Analytics
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          disabled={deleting}
        >
          {deleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
```

### JavaScript Concepts Explained:
- **`navigator.clipboard.writeText(shortUrl)`**: The native browser Async Clipboard API that copies text straight to the user's operating system clipboard.
- **Temporary UI Feedback**: When copied, `setCopied(true)` changes button text to `"✓ Copied"`, and `setTimeout(() => setCopied(false), 2000)` reverts it back after 2 seconds.
- **`window.confirm(...)`**: Prompts the user before irreversible deletion.

---

👉 **Next Step:** Continue to **[Chapter 4: Analytics Modal & Main Dashboard](./04-analytics-modal-and-dashboard.md)** to calculate stats, aggregate metrics, and assemble the full dashboard page!
