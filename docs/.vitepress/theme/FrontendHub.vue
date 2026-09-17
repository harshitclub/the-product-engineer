<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="frontend-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Curriculum Modules</span>
      </div>
      <h1 class="hub-title">Frontend Architecture</h1>
      <p class="hub-subtitle">
        Structured engineering notes from core client-side markup and styling to runtime mechanics and full-stack React systems.
      </p>
    </header>

    <!-- Compact Cards Grid -->
    <div class="hub-grid">
      <!-- 1. HTML5 -->
      <a :href="withBase('/frontend/html/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-html">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">HTML5</h2>
            <span class="hub-pill pill-html">Complete Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Core foundations, modern semantic layout tags, accessible forms, audio/video media, and full practical webpage project.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Core Essentials</span>
          <span class="hub-tag">Semantic HTML</span>
          <span class="hub-tag">Forms & Media</span>
        </div>
        <div class="hub-card-action">
          <span>Read HTML Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 2. CSS3 -->
      <a :href="withBase('/frontend/css/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-css">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Modern CSS3</h2>
            <span class="hub-pill pill-css">Complete Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Box Model, Flexbox, 2D CSS Grid, CSS variables, fluid clamp(), micro-animations, and full responsive project styling.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Flexbox & Grid</span>
          <span class="hub-tag">Variables</span>
          <span class="hub-tag">Responsive</span>
        </div>
        <div class="hub-card-action">
          <span>Read CSS Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 3. JavaScript -->
      <a :href="withBase('/frontend/javascript/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-js">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 18l6-6-6-6"></path>
              <path d="M8 6l-6 6 6 6"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">JavaScript ES6+</h2>
            <span class="hub-pill pill-js">3-Part Masterclass</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Core syntax, DOM events, modern ES6+ for React, the Event Loop, Promises, Fetch API, and Node.js backend bridge.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Core & DOM</span>
          <span class="hub-tag">ES6+ for React</span>
          <span class="hub-tag">Async & Node</span>
        </div>
        <div class="hub-card-action">
          <span>Explore JS Track</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 4. React.js -->
      <a :href="withBase('/frontend/react/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-react">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)"></ellipse>
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"></ellipse>
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"></ellipse>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">React.js</h2>
            <span class="hub-pill pill-react">4-Part Masterclass</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Vite setup, JSX essentials, components, props, useState, controlled forms, useEffect, native API fetching, and React Router DOM.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Vite Setup</span>
          <span class="hub-tag">useState & Forms</span>
          <span class="hub-tag">useEffect & Fetch</span>
          <span class="hub-tag">React Router</span>
        </div>
        <div class="hub-card-action">
          <span>Explore React Track</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 5. Next.js -->
      <a :href="withBase('/frontend/nextjs/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-next">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 14 14"></polyline>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Next.js</h2>
            <span class="hub-pill pill-next">4-Part Masterclass</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Full-stack web architecture: App Router, Server Components (RSC), Client hydration, dynamic routes, Server Actions, and complete multi-page site project.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">App Router</span>
          <span class="hub-tag">Server Actions</span>
          <span class="hub-tag">RSC & Hydration</span>
          <span class="hub-tag">SEO & Caching</span>
        </div>
        <div class="hub-card-action">
          <span>Explore Next.js Track</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.frontend-hub-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 16px 12px 64px;
}

.hub-header {
  text-align: center;
  margin-bottom: 32px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

.hub-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #f5f3ff;
  border: 1px solid #e0e7ff;
  color: #4f46e5;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  margin-bottom: 12px;
}

.hub-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #4f46e5;
}

.hub-title {
  font-size: clamp(1.65rem, 3.5vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 10px;
  line-height: 1.2;
}

.hub-subtitle {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0;
}

.hub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.hub-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 18px 20px;
  text-decoration: none !important;
  color: inherit !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: all 0.15s ease;
  min-height: 44px;
}

.hub-card:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px -2px rgba(99, 102, 241, 0.1);
}

.hub-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.hub-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-html {
  background-color: #fff1f2;
  border: 1px solid #ffe4e6;
  color: #e11d48;
}

.icon-css {
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  color: #2563eb;
}

.icon-js {
  background-color: #fefce8;
  border: 1px solid #fef08a;
  color: #ca8a04;
}

.icon-react {
  background-color: #ecfeff;
  border: 1px solid #cffafe;
  color: #0891b2;
}

.icon-next {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #0f172a;
}

.hub-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 8px;
}

.hub-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #0f172a;
  margin: 0;
}

.hub-pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  background-color: #f1f5f9;
  color: #475569;
  white-space: nowrap;
}

.pill-html { background-color: #fff1f2; color: #be123c; }
.pill-css { background-color: #eff6ff; color: #1d4ed8; }
.pill-js { background-color: #fefce8; color: #a16207; }
.pill-react { background-color: #ecfeff; color: #0e7490; }
.pill-next { background-color: #f8fafc; color: #334155; }

.hub-card-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 14px;
  flex-grow: 1;
}

.hub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 14px;
}

.hub-tag {
  font-size: 0.7rem;
  font-weight: 500;
  color: #4f46e5;
  background-color: #f5f3ff;
  padding: 2px 6px;
  border-radius: 3px;
}

.hub-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 10px;
  color: #4f46e5;
  font-size: 0.8125rem;
  font-weight: 600;
}

.arrow {
  transition: transform 0.15s ease;
}

.hub-card:hover .arrow {
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .frontend-hub-container {
    padding: 12px 8px 48px;
  }

  .hub-title {
    font-size: clamp(1.45rem, 5vw, 1.85rem);
  }

  .hub-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .hub-card {
    padding: 16px;
  }
}
</style>

