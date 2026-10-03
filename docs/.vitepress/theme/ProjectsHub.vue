<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="projects-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Full-Stack Capstone</span>
      </div>
      <h1 class="hub-title">Projects</h1>
      <p class="hub-subtitle">
        Real-world full-stack applications designed to teach core software engineering, system architecture, caching strategies, and database modeling from the ground up.
      </p>
    </header>

    <!-- Projects Grid -->
    <div class="projects-single-wrapper">
      <a :href="withBase('/projects/linkpulse/overview')" class="project-featured-card">
        <div class="card-top">
          <div class="icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <div class="card-meta">
            <div class="title-row">
              <h2 class="card-title">LinkPulse</h2>
              <span class="status-badge">Available Now</span>
            </div>
            <p class="card-tagline">Full-Stack URL Management & Real-Time Analytics Engine</p>
          </div>
        </div>

        <p class="card-description">
          A complete, production-grade URL shortener and click-analytics platform designed specifically for students and beginners. Learn how to combine Next.js, Express, PostgreSQL, Redis caching, BullMQ message queues, and Docker into one cohesive system.
        </p>

        <div class="card-highlights">
          <div class="highlight-item">
            <span class="highlight-label">Frontend:</span>
            <span class="highlight-val">Next.js & React</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Backend:</span>
            <span class="highlight-val">Node.js & Express</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Database:</span>
            <span class="highlight-val">PostgreSQL</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Caching & Queues:</span>
            <span class="highlight-val">Redis & BullMQ</span>
          </div>
        </div>

        <div class="tech-tags">
          <span class="tag">Next.js</span>
          <span class="tag">Node.js</span>
          <span class="tag">Express</span>
          <span class="tag">PostgreSQL</span>
          <span class="tag">Redis</span>
          <span class="tag">BullMQ</span>
          <span class="tag">Docker</span>
          <span class="tag">Zod</span>
        </div>

        <div class="card-action">
          <span>Read Full LinkPulse Guide & Architecture</span>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>

      <!-- PulseWatch Card -->
      <a :href="withBase('/projects/pulsewatch/overview')" class="project-featured-card">
        <div class="card-top">
          <div class="icon-box" style="background-color: #eff6ff; border-color: #bfdbfe; color: #2563eb;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div class="card-meta">
            <div class="title-row">
              <h2 class="card-title">PulseWatch</h2>
              <span class="status-badge">Available Now</span>
            </div>
            <p class="card-tagline">Full-Stack Website Uptime & Health Monitor</p>
          </div>
        </div>

        <p class="card-description">
          A production-ready website uptime and latency monitoring application inspired by UptimeRobot. Built to teach background workers, BullMQ scheduling, Redis in-memory caching, JWT authentication, and Next.js 16 dashboards.
        </p>

        <div class="card-highlights">
          <div class="highlight-item">
            <span class="highlight-label">Frontend:</span>
            <span class="highlight-val">Next.js & React 19</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Backend:</span>
            <span class="highlight-val">Node.js & Express</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Database:</span>
            <span class="highlight-val">PostgreSQL & Sequelize</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-label">Worker & Cache:</span>
            <span class="highlight-val">Redis & BullMQ</span>
          </div>
        </div>

        <div class="tech-tags">
          <span class="tag">Next.js</span>
          <span class="tag">React 19</span>
          <span class="tag">Node.js</span>
          <span class="tag">Express</span>
          <span class="tag">PostgreSQL</span>
          <span class="tag">Sequelize</span>
          <span class="tag">Redis</span>
          <span class="tag">BullMQ</span>
          <span class="tag">Docker</span>
          <span class="tag">Zod</span>
        </div>

        <div class="card-action">
          <span>Read Full PulseWatch Guide & Architecture</span>
          <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.projects-hub-container {
  max-width: 900px;
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
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin: 0 0 10px;
  line-height: 1.2;
}

.hub-subtitle {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.projects-single-wrapper {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.project-featured-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 28px 26px;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.project-featured-card:hover {
  border-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -4px rgba(79, 70, 229, 0.12);
}

.card-top {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.icon-box {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: #f5f3ff;
  border: 1px solid #e0e7ff;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-meta {
  flex-grow: 1;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin: 0;
}

.status-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.card-tagline {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  margin: 4px 0 0;
}

.card-description {
  font-size: 0.925rem;
  color: #334155;
  line-height: 1.6;
  margin: 0 0 20px;
}

.card-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 20px;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.highlight-label {
  font-size: 0.725rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.highlight-val {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0f172a;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #4f46e5;
  background-color: #f5f3ff;
  border: 1px solid #e0e7ff;
  padding: 3px 8px;
  border-radius: 4px;
}

.card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4f46e5;
}

.arrow-icon {
  transition: transform 0.15s ease;
}

.project-featured-card:hover .arrow-icon {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .project-featured-card {
    padding: 20px 16px;
  }
  .card-highlights {
    grid-template-columns: 1fr;
  }
}
</style>
