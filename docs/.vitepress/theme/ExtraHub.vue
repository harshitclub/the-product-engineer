<script setup>
import { withBase } from 'vitepress';
</script>

<template>
  <div class="frontend-hub-container">
    <!-- Hub Header -->
    <header class="hub-header">
      <div class="hub-badge">
        <span class="hub-badge-dot"></span>
        <span>Specialized Engineering Tracks</span>
      </div>
      <h1 class="hub-title">Extra Mastery Hub</h1>
      <p class="hub-subtitle">
        Accelerate your engineering journey with essential disciplines: crafting high-precision AI prompts to build real-world software, and designing robust, scalable backend systems.
      </p>
    </header>

    <!-- Cards Grid -->
    <div class="hub-grid">
      <!-- 1. AI & Prompt Engineering -->
      <a :href="withBase('/extra/ai/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-ai">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <path d="M4.93 4.93l2.83 2.83"></path>
              <path d="M16.24 16.24l2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="M4.93 19.07l2.83-2.83"></path>
              <path d="M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">AI & Prompt Engineering</h2>
            <span class="hub-pill pill-ai">Beginner Guide</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Learn prompt engineering designed specifically for developers. Master personas, context framing, Few-Shot examples, Chain-of-Thought, and structured JSON outputs to build anything with AI.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">5 Golden Pillars</span>
          <span class="hub-tag">Few-Shot & CoT</span>
          <span class="hub-tag">Structured JSON</span>
          <span class="hub-tag">Code Generation</span>
        </div>
        <div class="hub-card-action">
          <span>Explore AI & Prompt Engineering</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </a>

      <!-- 2. System Design -->
      <a :href="withBase('/extra/system-design/')" class="hub-card">
        <div class="hub-card-header">
          <div class="hub-icon-wrap icon-sys">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
          </div>
          <div class="hub-card-meta">
            <h2 class="hub-card-title">System Design</h2>
            <span class="hub-pill pill-sys">Beginner to Intermediate</span>
          </div>
        </div>
        <p class="hub-card-desc">
          Understand how large-scale web systems work from the ground up: Horizontal vs. Vertical Scaling, Load Balancers, Redis Cache-Aside, DB Sharding, CAP Theorem, and Message Queues.
        </p>
        <div class="hub-tags">
          <span class="hub-tag">Load Balancing</span>
          <span class="hub-tag">Caching & Redis</span>
          <span class="hub-tag">DB Sharding</span>
          <span class="hub-tag">Message Queues</span>
        </div>
        <div class="hub-card-action">
          <span>Explore System Design Notes</span>
          <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
}

.hub-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px 18px;
  text-decoration: none !important;
  color: inherit !important;
  transition: all 0.2s ease;
  position: relative;
}

.hub-card:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px -4px rgba(99, 102, 241, 0.12);
}

.hub-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.hub-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-ai {
  background-color: #f5f3ff;
  border: 1px solid #ddd6fe;
  color: #7c3aed;
}

.icon-sys {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
}

.hub-card-meta {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.hub-card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.01em;
  margin: 0;
}

.hub-pill {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
}

.pill-ai {
  background-color: #f5f3ff;
  color: #6d28d9;
  border: 1px solid #ddd6fe;
}

.pill-sys {
  background-color: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.hub-card-desc {
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
  margin: 0 0 16px;
  flex-grow: 1;
}

.hub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.hub-tag {
  font-size: 0.72rem;
  font-weight: 500;
  color: #475569;
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
}

.hub-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.825rem;
  font-weight: 600;
  color: #4f46e5;
}

.arrow {
  transition: transform 0.15s ease;
}

.hub-card:hover .arrow {
  transform: translateX(4px);
}
</style>
