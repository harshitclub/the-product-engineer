<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="landing-wrapper">
    <!-- Hero Section -->
    <header class="hero-container">
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        <span>Full Stack Engineering Handbook</span>
      </div>

      <h1 class="hero-main-title">The Product Engineer</h1>
      <div class="hero-gradient-subtitle">From Code to Scaled Architecture</div>

      <p class="hero-lead">
        A structured engineering handbook covering core client-side foundations, server runtimes, relational data modeling, distributed caching, and system design.
      </p>

      <div class="hero-cta-group">
        <a :href="withBase('/frontend/')" class="btn-primary-hero">
          <span>Explore Frontend Notes</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a :href="withBase('/interview/')" class="btn-secondary-hero">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <span>Interview Prep Bank</span>
        </a>
      </div>
    </header>

    <!-- Engineering Domains Grid -->
    <section class="tracks-section">
      <div class="section-header">
        <h2 class="section-heading">Engineering Domains</h2>
        <p class="section-subtext">Structured modules designed from web fundamentals to scalable production architecture.</p>
      </div>

      <div class="tracks-grid">
        <!-- 1. Frontend -->
        <a :href="withBase('/frontend/')" class="track-card active-track">
          <div class="track-card-header">
            <div class="track-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
            <span class="status-pill status-active">Available</span>
          </div>
          <h3 class="track-title">Frontend Architecture</h3>
          <p class="track-desc">Semantic HTML5, modern CSS3 layout systems (Flexbox & Grid), JavaScript ES6+ runtime mechanics, and Next.js App Router.</p>
          <div class="track-footer">
            <span class="track-link-text">Read Notes</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </a>

        <!-- 2. Backend -->
        <div class="track-card">
          <div class="track-card-header">
            <div class="track-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect><rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect><line x1="6" x2="6.01" y1="6" y2="6"></line><line x1="6" x2="6.01" y1="18" y2="18"></line></svg>
            </div>
            <span class="status-pill status-upcoming">Next Up</span>
          </div>
          <h3 class="track-title">Backend & APIs</h3>
          <p class="track-desc">Node.js asynchronous event loop, Express REST API architecture, request validation with Zod, and structured logging with Winston.</p>
          <div class="track-footer disabled-footer">
            <span>In Curriculum</span>
          </div>
        </div>

        <!-- 3. Databases -->
        <div class="track-card">
          <div class="track-card-header">
            <div class="track-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path></svg>
            </div>
            <span class="status-pill status-upcoming">Next Up</span>
          </div>
          <h3 class="track-title">Databases & Caching</h3>
          <p class="track-desc">PostgreSQL relational modeling, query optimization with indexes, ACID transactions, and Redis Cache-Aside patterns.</p>
          <div class="track-footer disabled-footer">
            <span>In Curriculum</span>
          </div>
        </div>

        <!-- 4. DevOps & System Design -->
        <div class="track-card">
          <div class="track-card-header">
            <div class="track-icon-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <span class="status-pill status-upcoming">Next Up</span>
          </div>
          <h3 class="track-title">DevOps & System Design</h3>
          <p class="track-desc">Docker containerization, BullMQ background queues, automated CI with GitHub Actions, and high-scale architecture principles.</p>
          <div class="track-footer disabled-footer">
            <span>In Curriculum</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Philosophy Section -->
    <section class="philosophy-section">
      <div class="section-header">
        <h2 class="section-heading">Why This Repository Exists</h2>
        <p class="section-subtext">Designed for engineers who want deep understanding, not just syntax memorization.</p>
      </div>

      <div class="philosophy-grid">
        <div class="philosophy-card">
          <div class="phil-number">01</div>
          <h4>Mental Models First</h4>
          <p>Every technology begins with its history, the exact problem it was created to solve, and why previous solutions failed.</p>
        </div>

        <div class="philosophy-card">
          <div class="phil-number">02</div>
          <h4>Production Standards</h4>
          <p>Architectural patterns that mirror real enterprise systems—safe database transactions, structured logging, and robust validations.</p>
        </div>

        <div class="philosophy-card">
          <div class="phil-number">03</div>
          <h4>Zero Fluff Notes</h4>
          <p>Clear, direct explanations paired with clean code snippets tailored for fast reference, daily lectures, and interview prep.</p>
        </div>
      </div>
    </section>
  </div>
</template>

