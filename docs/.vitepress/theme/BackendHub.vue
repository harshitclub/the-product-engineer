<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="frontend-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Backend Architecture</span>
      </div>
      <h1 class="hub-title">Backend Engineering</h1>
      <p class="hub-subtitle">
        Comprehensive guides covering runtime internals, asynchronous I/O, native HTTP servers, REST API design, databases, and scalable distributed architectures.
      </p>
    </header>

    <!-- Compact Cards Grid -->
    <div class="hub-grid">
      <!-- 1. Node.js (Available) -->
      <a :href="withBase('/backend/nodejs/01-nodejs-basics-and-server')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-node">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Node.js Track</h2>
            <span class="hub-pill pill-node">Core Track</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Beginner-friendly server creation, file handling (sync & async), URL parsing, core modules, and lightweight API development.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Node Basics</span>
          <span class="hub-tag">File Handling</span>
          <span class="hub-tag">HTTP Server</span>
          <span class="hub-tag">URL Module</span>
        </div>
        <div class="hub-card-action">
          <span>Explore Node.js Track</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 2. Express.js & REST APIs (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-express">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="4"></rect>
              <line x1="8" y1="9" x2="16" y2="9"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
              <line x1="8" y1="15" x2="12" y2="15"></line>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Express.js & REST APIs</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Middleware pipelines, routing patterns, request validation with Zod, error handling wrappers, authentication (JWT), and rate limiting.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Middleware</span>
          <span class="hub-tag">Routing</span>
          <span class="hub-tag">Zod Validation</span>
        </div>
        <div class="hub-card-action disabled-action">
          <span>In Curriculum</span>
        </div>
      </div>

      <!-- 3. Databases & Caching (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-db">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Databases & Caching</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Relational modeling with PostgreSQL, indexing strategies, ACID transactions, Prisma/Drizzle ORM, and Redis Cache-Aside architecture.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">PostgreSQL</span>
          <span class="hub-tag">Redis</span>
          <span class="hub-tag">Indexing</span>
        </div>
        <div class="hub-card-action disabled-action">
          <span>In Curriculum</span>
        </div>
      </div>

      <!-- 4. Distributed Systems & Queues (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-queue">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Architecture & System Design</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Background job processing with BullMQ, message brokers, microservices decomposition, horizontal scaling, and fault tolerance.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">BullMQ</span>
          <span class="hub-tag">Message Queues</span>
          <span class="hub-tag">Microservices</span>
        </div>
        <div class="hub-card-action disabled-action">
          <span>In Curriculum</span>
        </div>
      </div>
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
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 16px;
}

.hub-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px;
  text-decoration: none !important;
  color: inherit;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  position: relative;
}

.hub-card:hover:not(.disabled-card) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  border-color: #cbd5e1;
}

.disabled-card {
  background-color: #f8fafc;
  opacity: 0.85;
  cursor: default;
}

.hub-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.hub-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-node {
  background-color: #f0fdf4;
  color: #16a34a;
}

.icon-express {
  background-color: #f5f3ff;
  color: #6366f1;
}

.icon-db {
  background-color: #f0f9ff;
  color: #0284c7;
}

.icon-queue {
  background-color: #fff7ed;
  color: #ea580c;
}

.hub-card-meta {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hub-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.015em;
  border: none;
  padding: 0;
}

.hub-pill {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  white-space: nowrap;
  background-color: #f1f5f9;
  color: #475569;
}

.pill-node {
  background-color: #dcfce7;
  color: #15803d;
}

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
  gap: 6px;
  margin-bottom: 16px;
}

.hub-tag {
  font-size: 0.7rem;
  font-weight: 500;
  background-color: #f1f5f9;
  color: #475569;
  padding: 2px 7px;
  border-radius: 4px;
}

.hub-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #4f46e5;
  border-top: 1px solid #f1f5f9;
  padding-top: 10px;
  margin-top: auto;
}

.hub-card-action .arrow {
  transition: transform 0.2s ease;
}

.hub-card:hover:not(.disabled-card) .hub-card-action .arrow {
  transform: translateX(4px);
}

.disabled-action {
  color: #94a3b8;
}

@media (max-width: 640px) {
  .frontend-hub-container {
    padding: 12px 8px 48px;
  }
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
