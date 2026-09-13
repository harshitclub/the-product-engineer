<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="frontend-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Infrastructure Modules</span>
      </div>
      <h1 class="hub-title">DevOps Engineering</h1>
      <p class="hub-subtitle">
        Practical guides covering version control, containerization runtimes, automated CI/CD pipelines, and scaled production deployment.
      </p>
    </header>

    <!-- Compact Cards Grid -->
    <div class="hub-grid">
      <!-- 1. Git & GitHub (Available) -->
      <a :href="withBase('/devops/git/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-git">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="6" y1="3" x2="6" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Git & GitHub</h2>
            <span class="hub-pill pill-git">Complete Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Local checkpoints, staging, commits, branch workflows, pull requests, software releases (SemVer), and emergency rollbacks.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Version Control</span>
          <span class="hub-tag">Branching & PRs</span>
          <span class="hub-tag">SemVer Releases</span>
        </div>
        <div class="hub-card-action">
          <span>Read Git Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 2. Docker (Available / In Progress) -->
      <a :href="withBase('/devops/docker/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-docker">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 11h2v2H4z"></path>
              <path d="M7 11h2v2H7z"></path>
              <path d="M10 11h2v2h-2z"></path>
              <path d="M7 8h2v2H7z"></path>
              <path d="M10 8h2v2h-2z"></path>
              <path d="M13 8h2v2h-2z"></path>
              <path d="M10 5h2v2h-2z"></path>
              <path d="M2 14c0 3.5 3 6 8 6 6 0 9-3 10-6 .5-1.5 0-3-1-3.5-1-.5-2.5 0-3.5.5-1-1-2.5-1.5-4-1.5H2v4.5z"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Docker</h2>
            <span class="hub-pill pill-docker">Handbook</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Packaging applications into predictable lightweight containers, Dockerfiles, multi-container Compose, and image registries.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Containers</span>
          <span class="hub-tag">Dockerfiles</span>
          <span class="hub-tag">Compose</span>
        </div>
        <div class="hub-card-action">
          <span>Read Docker Guide</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>
      </a>

      <!-- 3. CI/CD Workflows (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-cicd">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">CI/CD Pipelines</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Automated test execution, quality lint checks, build artifacts, and continuous deployment workflows with GitHub Actions.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">GitHub Actions</span>
          <span class="hub-tag">Automation</span>
          <span class="hub-tag">Pipelines</span>
        </div>
        <div class="hub-card-action disabled-action">
          <span>In Curriculum</span>
        </div>
      </div>

      <!-- 4. Cloud & Production Deploy (Upcoming) -->
      <div class="hub-card disabled-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-cloud">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">Cloud Deployment</h2>
            <span class="hub-pill">Upcoming</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Reverse proxies with Nginx, cloud servers, edge CDNs, SSL/TLS certificates, and zero-downtime production rollouts.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Nginx</span>
          <span class="hub-tag">VPS & Cloud</span>
          <span class="hub-tag">Edge CDNs</span>
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

.icon-git {
  background-color: #fff1f2;
  color: #f43f5e;
}

.icon-docker {
  background-color: #eff6ff;
  color: #0284c7;
}

.icon-cicd {
  background-color: #f0fdf4;
  color: #16a34a;
}

.icon-cloud {
  background-color: #f8fafc;
  color: #64748b;
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

.pill-git {
  background-color: #ffe4e6;
  color: #e11d48;
}

.pill-docker {
  background-color: #e0f2fe;
  color: #0369a1;
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
