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
        <a href="/frontend/" class="btn-primary-hero">
          <span>Explore Frontend Notes</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a href="https://github.com/harshitclub" target="_blank" rel="noopener noreferrer" class="btn-secondary-hero">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>GitHub Repository</span>
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
        <a href="/frontend/" class="track-card active-track">
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

<style scoped>
.landing-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  font-family: var(--vp-font-family-base);
  color: #0f172a;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 16px 56px;
  max-width: 820px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #f5f3ff;
  border: 1px solid #e0e7ff;
  color: #4f46e5;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 24px;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4f46e5;
}

.hero-main-title {
  font-size: clamp(2.4rem, 6vw, 3.85rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: #0f172a;
  margin: 0;
}

.hero-gradient-subtitle {
  font-size: clamp(1.35rem, 3.5vw, 1.85rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #4f46e5;
  margin-top: 12px;
}

.hero-lead {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: #475569;
  line-height: 1.65;
  max-width: 640px;
  margin: 20px auto 0;
  font-weight: 400;
}

.hero-cta-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #4f46e5;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 10px 22px;
  border-radius: 4px;
  text-decoration: none !important;
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.2);
  transition: all 0.15s ease;
}

.btn-primary-hero:hover {
  background-color: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-secondary-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  color: #1e293b !important;
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  text-decoration: none !important;
  transition: all 0.15s ease;
}

.btn-secondary-hero:hover {
  background-color: #f8fafc;
  border-color: #94a3b8;
  transform: translateY(-1px);
}

/* Engineering Domains Grid */
.tracks-section {
  margin-top: 40px;
  padding-top: 48px;
  border-top: 1px solid #f1f5f9;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-heading {
  font-size: 1.65rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0;
}

.section-subtext {
  font-size: 0.975rem;
  color: #64748b;
  margin: 8px 0 0;
}

.tracks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.track-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 24px;
  text-decoration: none !important;
  color: inherit !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.track-card.active-track {
  border-color: #c7d2fe;
  background-color: #fafafa;
}

.track-card.active-track:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px -2px rgba(99, 102, 241, 0.12);
}

.track-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.track-icon-box {
  width: 40px;
  height: 40px;
  background-color: #f5f3ff;
  border: 1px solid #e0e7ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-pill {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-active {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.status-upcoming {
  background-color: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.track-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.015em;
  margin: 0 0 8px;
}

.track-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.55;
  margin: 0 0 20px;
  flex-grow: 1;
}

.track-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4f46e5;
}

.disabled-footer {
  color: #94a3b8 !important;
  font-weight: 500;
}

/* Philosophy Section */
.philosophy-section {
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid #f1f5f9;
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.philosophy-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  padding: 24px;
}

.phil-number {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 12px;
}

.philosophy-card h4 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.philosophy-card p {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}
</style>
