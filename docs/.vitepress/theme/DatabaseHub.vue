<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="frontend-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Storage & Persistence</span>
      </div>
      <h1 class="hub-title">Database Engineering</h1>
      <p class="hub-subtitle">
        Master modern database systems—from running production-grade PostgreSQL in Docker and writing clean SQL queries to relational modeling, indexing, and transactions.
      </p>
    </header>

    <!-- Compact Cards Grid -->
    <div class="hub-grid">
      <!-- 1. PostgreSQL (Available) -->
      <a :href="withBase('/database/postgresql/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-postgres">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">PostgreSQL with Docker</h2>
            <span class="hub-pill pill-postgres">Complete Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Containerized setup with Docker & Compose, psql workflows, table schemas, data insertion, queries, updates, deletions, joins, and transactions.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Dockerized</span>
          <span class="hub-tag">Data Operations</span>
          <span class="hub-tag">Joins & Aggregates</span>
          <span class="hub-tag">ACID & Indexes</span>
        </div>
        <div class="hub-card-action">
          <span>Read PostgreSQL Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 2. Redis & Caching (Available) -->
      <a :href="withBase('/database/redis/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-redis">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Redis & Caching</h2>
            <span class="hub-pill pill-postgres">Complete Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Dockerized Redis, redis-cli commands, TTL expiration, Hashes, Lists, Sets, Sorted Sets, Cache-Aside pattern, and Pub/Sub.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">In-Memory</span>
          <span class="hub-tag">Cache-Aside</span>
          <span class="hub-tag">TTL Expiration</span>
          <span class="hub-tag">Pub/Sub</span>
        </div>
        <div class="hub-card-action">
          <span>Read Redis Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 3. Prisma & Drizzle ORM (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-orm">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Prisma & Drizzle ORM</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Type-safe database access in TypeScript, schema migrations, relations, connection pooling, and query generation.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Type-Safe SQL</span>
          <span class="hub-tag">Migrations</span>
          <span class="hub-tag">TypeScript</span>
        </div>
        <div class="hub-card-action disabled-action">
          <span>In Curriculum</span>
        </div>
      </div>

      <!-- 4. MongoDB & NoSQL (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-mongo">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">MongoDB & Document Stores</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          BSON document modeling, flexible collections, indexing, aggregation framework pipelines, and horizontal scaling.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Document Store</span>
          <span class="hub-tag">Aggregations</span>
          <span class="hub-tag">NoSQL</span>
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
  max-width: 1060px;
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
  border-radius: 8px;
  padding: 18px 16px;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.2s ease;
  position: relative;
}

.hub-card:hover:not(.disabled-card) {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -4px rgba(99, 102, 241, 0.12);
}

.disabled-card {
  background-color: #fafafa;
  border-style: dashed;
  cursor: default;
  opacity: 0.85;
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
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-postgres {
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  color: #2563eb;
}

.icon-redis {
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  color: #dc2626;
}

.icon-orm {
  background-color: #f5f3ff;
  border: 1px solid #ede9fe;
  color: #7c3aed;
}

.icon-mongo {
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  color: #16a34a;
}

.hub-card-meta {
  flex-grow: 1;
}

.hub-card-title {
  font-size: 1.025rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.015em;
  margin: 0;
  line-height: 1.25;
}

.hub-pill {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  margin-top: 3px;
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.pill-postgres {
  background-color: #ecfdf5;
  color: #059669;
  border-color: #a7f3d0;
}

.hub-card-desc {
  font-size: 0.84rem;
  color: #64748b;
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
  color: #475569;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 2px 7px;
  border-radius: 4px;
}

.hub-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #4f46e5;
}

.hub-card-action .arrow {
  transition: transform 0.15s ease;
}

.hub-card:hover .arrow {
  transform: translateX(3px);
}

.disabled-action {
  color: #94a3b8 !important;
  font-weight: 500;
}

@media (max-width: 640px) {
  .hub-grid {
    grid-template-columns: 1fr;
  }
}
</style>
