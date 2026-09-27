---
title: "04. Analytics Modal & Main Dashboard"
description: "Build the AnalyticsModal to aggregate click data and assemble the entire LinkPulse Dashboard page with search filtering, stats, and notifications."
---

# 04. Analytics Modal & Main Dashboard 📊

In this chapter, we build the **Analytics Modal** (which computes breakdown distributions for browsers, operating systems, and referrers) and assemble everything into the main **Dashboard Page** (`app/page.js`).

---

## 1. Analytics Modal Component (`components/AnalyticsModal.jsx`)

Create `components/AnalyticsModal.jsx`:

```jsx
'use client';

import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * AnalyticsModal Component
 * Modal popup that shows total clicks, browser breakdown, OS breakdown, and recent clicks history.
 */
export default function AnalyticsModal({ linkId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics for this link from backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const result = await api.getAnalytics(linkId);
        setData(result);
      } catch (err) {
        setError(err.message || 'Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };

    if (linkId) {
      fetchAnalytics();
    }
  }, [linkId]);

  // Compute breakdown stats from clicks array
  const clicks = data?.clicks || [];
  const totalClicks = data?.totalClicks || clicks.length;

  const browsers = {};
  const operatingSystems = {};
  const referrers = {};

  clicks.forEach((c) => {
    const b = c.browser || 'Unknown';
    const o = c.os || 'Unknown';
    const r = c.referrer || 'Direct';

    browsers[b] = (browsers[b] || 0) + 1;
    operatingSystems[o] = (operatingSystems[o] || 0) + 1;
    referrers[r] = (referrers[r] || 0) + 1;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Link Analytics</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {data?.link?.title || `/${data?.link?.shortCode || ''}`}
            </span>
          </div>
          <button onClick={onClose} className="btn-icon">✕</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {loading && <p style={{ textAlign: 'center', padding: '20px' }}>Loading analytics...</p>}
          {error && <p style={{ color: 'var(--danger-color)', textAlign: 'center' }}>⚠️ {error}</p>}

          {!loading && !error && data && (
            <>
              {/* Summary Stats Row */}
              <div className="analytics-stat-row">
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Total Clicks</div>
                  <div className="analytics-stat-val">{totalClicks}</div>
                </div>
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Top Browser</div>
                  <div className="analytics-stat-val" style={{ fontSize: '13px' }}>
                    {Object.keys(browsers)[0] || 'None'}
                  </div>
                </div>
                <div className="analytics-stat-item">
                  <div className="analytics-stat-label">Top OS</div>
                  <div className="analytics-stat-val" style={{ fontSize: '13px' }}>
                    {Object.keys(operatingSystems)[0] || 'None'}
                  </div>
                </div>
              </div>

              {/* Browsers Breakdown */}
              <div className="analytics-section-title">Browsers</div>
              {Object.keys(browsers).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(browsers).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} ({Math.round((count / (totalClicks || 1)) * 100)}%)
                    </span>
                  </div>
                ))
              )}

              {/* Operating Systems Breakdown */}
              <div className="analytics-section-title">Operating Systems</div>
              {Object.keys(operatingSystems).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(operatingSystems).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} ({Math.round((count / (totalClicks || 1)) * 100)}%)
                    </span>
                  </div>
                ))
              )}

              {/* Referrers Breakdown */}
              <div className="analytics-section-title">Referrer Sources</div>
              {Object.keys(referrers).length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No data yet</p>
              ) : (
                Object.entries(referrers).map(([name, count]) => (
                  <div key={name} className="stat-item-row">
                    <span>{name}</span>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {count} clicks
                    </span>
                  </div>
                ))
              )}

              {/* Recent Clicks History Table */}
              <div className="analytics-section-title">Recent Clicks (Last 10)</div>
              {clicks.length === 0 ? (
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No clicks recorded yet.</p>
              ) : (
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>Referrer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clicks.slice(0, 10).map((click) => (
                      <tr key={click.id}>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>
                          {new Date(click.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td>{click.browser || 'Unknown'}</td>
                        <td>{click.os || 'Unknown'}</td>
                        <td>{click.referrer || 'Direct'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Key JavaScript & UI Patterns:
1. **Preventing Backdrop Click Bubbling (`e.stopPropagation()`)**:  
   Clicking on the outer `.modal-backdrop` calls `onClose`. On the inner `.modal-box`, we add `onClick={(e) => e.stopPropagation()}` so clicking inside the modal does **not** close it.
2. **Dynamic Aggregation with `forEach`**:  
   We iterate through all clicks and accumulate frequency counts in hash map objects (`browsers`, `operatingSystems`).
3. **`Object.entries(browsers).map(([name, count]) => ...)`**:  
   Transforms an object `{ Chrome: 12, Safari: 4 }` into iterable key-value pairs to render percentage bars.

---

## 2. Main Dashboard Page (`app/page.js`)

Create `app/page.js`:

```jsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CreateLinkForm from '../components/CreateLinkForm';
import LinkCard from '../components/LinkCard';
import AnalyticsModal from '../components/AnalyticsModal';
import { api } from '../services/api';

/**
 * Main Dashboard Page
 * Connects all components: Navbar, Stats, CreateLinkForm, LinkList, Analytics, and Toasts.
 */
export default function Dashboard() {
  // State variables
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAnalyticsId, setActiveAnalyticsId] = useState(null);
  const [toastText, setToastText] = useState(null);

  // Helper to show temporary toast message
  const showToast = (message) => {
    setToastText(message);
    setTimeout(() => setToastText(null), 3000);
  };

  // Load all links from backend on page load
  const loadLinks = async () => {
    try {
      setLoading(true);
      const data = await api.getLinks();
      setLinks(data || []);
    } catch (error) {
      showToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // Add newly created link to state
  const handleLinkCreated = (newLink) => {
    setLinks((prevLinks) => [
      {
        ...newLink,
        totalClicks: 0,
      },
      ...prevLinks,
    ]);
  };

  // Remove deleted link from state
  const handleLinkDeleted = (deletedId) => {
    setLinks((prevLinks) => prevLinks.filter((l) => l.id !== deletedId));
  };

  // Calculate total clicks across all links
  const totalClicksCount = links.reduce((sum, item) => sum + (item.totalClicks || 0), 0);

  // Filter links by search query (title, shortCode, or URL)
  const filteredLinks = links.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.shortCode?.toLowerCase().includes(q) ||
      item.originalUrl?.toLowerCase().includes(q) ||
      item.title?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Top Navigation Bar */}
      <Navbar />

      <main className="container">
        {/* Hero Title Section */}
        <section className="hero">
          <h1>URL Management & Analytics</h1>
          <p>Create clean short links with instant redirects and real-time visitor stats.</p>
        </section>

        {/* Overview Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Links</div>
            <div className="stat-number">{links.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Clicks</div>
            <div className="stat-number">{totalClicksCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Clicks / Link</div>
            <div className="stat-number">
              {links.length > 0 ? (totalClicksCount / links.length).toFixed(1) : '0.0'}
            </div>
          </div>
        </div>

        {/* Create Link Form */}
        <CreateLinkForm onLinkCreated={handleLinkCreated} showToast={showToast} />

        {/* Links List Header & Search Bar */}
        <div className="list-header">
          <h2 style={{ fontSize: '14px', fontWeight: 600 }}>Your Short Links</h2>
          <input
            type="text"
            className="input search-box"
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Links List Container */}
        {loading ? (
          <div className="empty-message">Loading links...</div>
        ) : filteredLinks.length === 0 ? (
          <div className="empty-message">
            <p>No links found. Create your first short link above!</p>
          </div>
        ) : (
          <div className="links-container">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onLinkDeleted={handleLinkDeleted}
                onOpenAnalytics={(id) => setActiveAnalyticsId(id)}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </main>

      {/* Analytics Modal Popup */}
      {activeAnalyticsId && (
        <AnalyticsModal
          linkId={activeAnalyticsId}
          onClose={() => setActiveAnalyticsId(null)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastText && <div className="toast-box">{toastText}</div>}
    </div>
  );
}
```

### Core JavaScript Concepts in Dashboard:
1. **`Array.prototype.reduce()`**:  
   `links.reduce((sum, item) => sum + (item.totalClicks || 0), 0)` computes the sum of all clicks across all links in a single line.
2. **`Array.prototype.filter()`**:  
   Dynamically filters links matching `shortCode`, `originalUrl`, or `title` as the user types into the search box.
3. **Immutable State Updates (`setLinks(prev => [...])`)**:  
   Always creates new array references using `[newLink, ...prevLinks]` and `prevLinks.filter(l => l.id !== deletedId)` so React efficiently re-renders only what changed.

---

👉 **Next Step:** Continue to **[Chapter 5: Full-Stack Run & Verification](./05-run-and-test-fullstack.md)** to run the frontend and backend together!
