# 100 CSS Practical & Coding Interview Questions

> A comprehensive hands-on practice handbook containing 100 code-driven CSS interview challenges, real-world bug fixes, layout recipes, responsive patterns, and hardware-accelerated animation techniques.

---

## 📑 Index & Practice Distribution

| Category | Range | Practical Focus |
| :--- | :--- | :--- |
| [**Part 1: Basic Practical & Layout Challenges**](#part-1-basic-practical-layout-challenges-1-50) | Q1 – Q50 | Centering techniques, sticky footer, text truncation, custom checkboxes, card grids, aspect ratio, ribbons, focus rings |
| [**Part 2: Advanced Architecture & Animations**](#part-2-advanced-architecture-animations-51-100) | Q51 – Q100 | Grid Holy Grail, fluid clamp() formulas, Subgrid card alignment, Container Queries, CSS variables dark mode, `:has()` patterns, scroll animations |

---

# Part 1: Basic Practical & Layout Challenges (1 – 50)

### Q1: Center a child `div` horizontally and vertically using Flexbox.
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

---

### Q2: Center a child `div` horizontally and vertically using CSS Grid.
```css
.parent {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
```

---

### Q3: Center an absolutely positioned element without knowing its width or height.
```css
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

---

### Q4: Implement a modern CSS reset for universal box-sizing and margin resets.
```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

---

### Q5: Implement a Sticky Footer layout (footer stays at bottom of viewport when content is short).
```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1; /* Pushes footer to bottom */
}
```

---

### Q6: Truncate single-line text with an ellipsis (`...`).
```css
.truncate-single {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}
```

---

### Q7: Truncate multi-line text after exactly 3 lines with an ellipsis.
```css
.truncate-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

---

### Q8: Build a responsive card grid that automatically wraps without media queries.
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
```

---

### Q9: Code an aspect-ratio responsive image card that maintains a 16:9 ratio.
```css
.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}
```

---

### Q10: Style an accessible custom checkbox using pure CSS.
```html
<label class="custom-check">
  <input type="checkbox" name="agree">
  <span class="checkmark"></span>
  I agree to the terms
</label>

<style>
.custom-check {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.custom-check input {
  position: absolute;
  opacity: 0;
}
.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  transition: all 0.15s ease;
}
.custom-check input:checked + .checkmark {
  background-color: #4f46e5;
  border-color: #4f46e5;
}
.custom-check input:focus-visible + .checkmark {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
</style>
```

---

### Q11: Style a high-contrast focus indicator using `:focus-visible`.
```css
button:focus-visible, a:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 3px;
  border-radius: 4px;
}

button:focus:not(:focus-visible) {
  outline: none; /* No outline on mouse clicks */
}
```

---

### Q12: Code a Glassmorphism card effect with `backdrop-filter`.
```css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 24px;
}
```

---

### Q13: Position a "NEW" badge ribbon at the top-right corner of a product card.
```html
<div class="product-card">
  <span class="ribbon-badge">NEW</span>
  <h3>Enterprise Cluster</h3>
</div>

<style>
.product-card {
  position: relative;
  border: 1px solid #e2e8f0;
  padding: 24px;
}
.ribbon-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}
</style>
```

---

### Q14: Create zebra-striped table rows with hover highlights.
```css
table {
  width: 100%;
  border-collapse: collapse;
}
tbody tr:nth-child(even) {
  background-color: #f8fafc;
}
tbody tr:hover {
  background-color: #f1f5f9;
}
```

---

### Q15: Style custom cross-browser sleek scrollbars.
```css
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

---

### Q16: Code a linear gradient text effect in CSS.
```css
.gradient-headline {
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: 800;
}
```

---

### Q17: Create a smooth hover button with an animated fill effect.
```css
.animated-btn {
  position: relative;
  background: transparent;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  padding: 10px 24px;
  font-weight: 600;
  overflow: hidden;
  transition: color 0.3s ease;
  z-index: 1;
}

.animated-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background: #4f46e5;
  transition: width 0.3s ease;
  z-index: -1;
}

.animated-btn:hover {
  color: #ffffff;
}

.animated-btn:hover::before {
  width: 100%;
}
```

---

### Q18: Code a pulsing online status dot.
```html
<span class="status-dot"></span>

<style>
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  position: relative;
}
.status-dot::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  border: 2px solid #10b981;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.2); opacity: 0; }
}
</style>
```

---

### Q19: Prevent image drag selection on web cards.
```css
.card img {
  user-select: none;
  -webkit-user-drag: none;
}
```

---

### Q20: Style circular user avatars with `border-radius` and `object-fit`.
```css
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e2e8f0;
}
```

---

### Q21: Code a responsive 2-column form layout that stacks on mobile.
```css
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

---

### Q22: Hide an element accessibly for screen readers only (`.sr-only`).
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

### Q23: Create a smooth transition on hover without layout jank.
```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
```

---

### Q24: Style an unstyled list into a horizontal breadcrumb.
```html
<ul class="breadcrumb-list">
  <li><a href="/">Home</a></li>
  <li><a href="/docs">Docs</a></li>
  <li>Architecture</li>
</ul>

<style>
.breadcrumb-list {
  display: flex;
  list-style: none;
  gap: 8px;
  padding: 0;
}
.breadcrumb-list li+li::before {
  content: "/";
  margin-right: 8px;
  color: #94a3b8;
}
</style>
```

---

### Q25: Create a frosted glass navigation bar pinned to top.
```css
.header-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e2e8f0;
}
```

---

### Q26: Code a fixed aspect ratio video wrapper without the `aspect-ratio` property (Legacy padding trick).
```css
.video-wrapper-legacy {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 ratio (9/16 = 0.5625) */
}
.video-wrapper-legacy iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

---

### Q27: Add a triangle speech bubble pointer with CSS borders.
```css
.speech-bubble {
  position: relative;
  background: #0f172a;
  color: #fff;
  padding: 12px 16px;
  border-radius: 6px;
}
.speech-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20px;
  border-width: 8px;
  border-style: solid;
  border-color: #0f172a transparent transparent transparent;
}
```

---

### Q28: Code an animated loading skeleton placeholder.
```html
<div class="skeleton-box"></div>

<style>
.skeleton-box {
  width: 100%;
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
```

---

### Q29: Style a badge counter overlapping an icon.
```html
<div class="icon-container">
  <svg width="24" height="24">...</svg>
  <span class="badge-count">3</span>
</div>

<style>
.icon-container {
  position: relative;
  display: inline-block;
}
.badge-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

---

### Q30: Style placeholder text inside inputs with `::placeholder`.
```css
input::placeholder {
  color: #94a3b8;
  font-style: italic;
  opacity: 1;
}
```

---

### Q31: Implement CSS smooth scrolling with reduced-motion support.
```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

---

### Q32: Prevent text selection across interactive toolbar buttons.
```css
.toolbar-button {
  user-select: none;
  -webkit-user-select: none;
}
```

---

### Q33: Code an interactive card with a gradient border.
```css
.gradient-border-card {
  border: 2px solid transparent;
  background: 
    linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(135deg, #4f46e5, #9333ea) border-box;
  border-radius: 8px;
  padding: 20px;
}
```

---

### Q34: Code an image zoom effect on card hover with overflow clipping.
```css
.card-media {
  overflow: hidden;
  border-radius: 8px;
}
.card-media img {
  transition: transform 0.3s ease;
}
.card-media:hover img {
  transform: scale(1.08);
}
```

---

### Q35: Create a customizable CSS checkmark list.
```css
ul.check-list {
  list-style: none;
  padding: 0;
}
ul.check-list li {
  position: relative;
  padding-left: 28px;
  margin-bottom: 8px;
}
ul.check-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}
```

---

### Q36: Code a CSS-only hamburger icon.
```html
<div class="hamburger">
  <span></span>
  <span></span>
  <span></span>
</div>

<style>
.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  width: 24px;
}
.hamburger span {
  display: block;
  height: 2px;
  background: #0f172a;
  border-radius: 2px;
}
</style>
```

---

### Q37: Style native form elements with a unified brand color using `accent-color`.
```css
:root {
  accent-color: #4f46e5;
}
```

---

### Q38: Create a circular progress spinner with `@keyframes`.
```html
<div class="spinner"></div>

<style>
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
```

---

### Q39: Style disabled buttons with `not-allowed` cursor and reduced opacity.
```css
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

### Q40: Style the native dialog backdrop.
```css
dialog::backdrop {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
}
```

---

### Q41: Center an icon and text inside a button with Flexbox.
```css
.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
}
```

---

### Q42: Align the last child of a flex container to the right using `margin-left: auto`.
```html
<div class="nav-bar">
  <span>Logo</span>
  <a href="/docs">Docs</a>
  <button class="logout-btn">Log Out</button>
</div>

<style>
.nav-bar {
  display: flex;
  gap: 16px;
}
.logout-btn {
  margin-left: auto; /* Pushes button to right edge */
}
</style>
```

---

### Q43: Force equal-width columns in Flexbox with `flex: 1`.
```css
.flex-row > * {
  flex: 1 1 0;
}
```

---

### Q44: Wrap long URL strings inside a card to prevent container blowout.
```css
.card-url {
  overflow-wrap: break-word;
  word-break: break-word;
}
```

---

### Q45: Code a divider with centered text.
```html
<div class="divider">OR</div>

<style>
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #94a3b8;
}
.divider::before, .divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}
.divider:not(:empty)::before { margin-right: 12px; }
.divider:not(:empty)::after { margin-left: 12px; }
</style>
```

---

### Q46: Style text highlight selection with `::selection`.
```css
::selection {
  background-color: #c7d2fe;
  color: #1e1b4b;
}
```

---

### Q47: Prevent layout shifts when scrollbars toggle using `scrollbar-gutter`.
```css
html {
  scrollbar-gutter: stable;
}
```

---

### Q48: Style first letters of article paragraphs with drop caps.
```css
article > p:first-of-type::first-letter {
  font-size: 3.5rem;
  float: left;
  line-height: 0.8;
  margin-right: 8px;
  font-weight: 800;
  color: #4f46e5;
}
```

---

### Q49: Create an animated dotted background pattern.
```css
.dotted-canvas {
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

### Q50: Code a CSS-only tooltip with `data-tooltip` attribute.
```html
<button class="has-tooltip" data-tooltip="Ctrl + K to search">Quick Search</button>

<style>
.has-tooltip {
  position: relative;
}
.has-tooltip:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
```

---

# Part 2: Advanced Architecture & Animations (51 – 100)

### Q51: Build a Holy Grail layout using CSS Grid with named template areas.
```html
<div class="holy-grail">
  <header>Header</header>
  <nav>Nav</nav>
  <main>Main Content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>

<style>
.holy-grail {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
header { grid-area: header; }
nav    { grid-area: nav; }
main   { grid-area: main; }
aside  { grid-area: aside; }
footer { grid-area: footer; }

@media (max-width: 768px) {
  .holy-grail {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}
</style>
```

---

### Q52: Write a fluid typography formula with `clamp()` that scales between mobile and desktop viewports.
```css
:root {
  /* Scales smoothly from 1.5rem (24px) at 375px viewport to 3rem (48px) at 1440px viewport */
  --headline-fluid: clamp(1.5rem, 1.05rem + 1.87vw, 3rem);
}

h1 {
  font-size: var(--headline-fluid);
  line-height: 1.15;
}
```

---

### Q53: Align card footers perfectly across varying content heights using CSS Subgrid.
```html
<div class="cards-grid">
  <article class="card">
    <h3>Short Title</h3>
    <p>Brief text.</p>
    <button>Action</button>
  </article>
  <article class="card">
    <h3>Much Longer Multi-Line Engineering Article Title</h3>
    <p>Extensive description that takes up multiple rows of vertical layout space...</p>
    <button>Action</button>
  </article>
</div>

<style>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 3; /* Title, Body, Button align across sibling cards */
  border: 1px solid #e2e8f0;
  padding: 16px;
}
</style>
```

---

### Q54: Build a Container Query responsive component that shifts layout based on its parent container width.
```html
<div class="widget-container">
  <article class="user-card">
    <img src="/avatar.jpg" alt="Avatar">
    <div class="details">
      <h3>Harshit Kumar</h3>
      <p>Staff Architect</p>
    </div>
  </article>
</div>

<style>
.widget-container {
  container-type: inline-size;
  container-name: usercard;
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@container usercard (min-width: 450px) {
  .user-card {
    flex-direction: row;
    align-items: center;
  }
}
</style>
```

---

### Q55: Implement a complete Theme Design System using CSS Custom Properties with light/dark mode switching.
```css
:root {
  --color-bg: #ffffff;
  --color-text: #0f172a;
  --color-brand: #4f46e5;
  --color-card: #f8fafc;
  --color-border: #e2e8f0;
}

[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f172a;
    --color-text: #f8fafc;
    --color-brand: #6366f1;
    --color-card: #1e293b;
    --color-border: #334155;
  }
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

---

### Q56: Style a parent card dynamically based on child state using `:has()`.
```css
/* Highlights parent card if an inner checkbox is checked */
.card-item:has(input[type="checkbox"]:checked) {
  border-color: #4f46e5;
  background-color: #f5f3ff;
}

/* Adds red error border to form field container when input is invalid */
.form-group:has(input:invalid:not(:placeholder-shown)) {
  border-left: 4px solid #ef4444;
}
```

---

### Q57: Build a sticky table header AND sticky first column with CSS.
```html
<div class="table-container">
  <table>
    <thead>
      <tr>
        <th class="sticky-col">Employee</th>
        <th>Role</th>
        <th>Department</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="sticky-col">Harshit</th>
        <td>Architect</td>
        <td>Engineering</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
.table-container {
  overflow: auto;
  max-height: 400px;
}
thead th {
  position: sticky;
  top: 0;
  background: #f8fafc;
  z-index: 2;
}
.sticky-col {
  position: sticky;
  left: 0;
  background: #ffffff;
  z-index: 1;
}
thead th.sticky-col {
  z-index: 3; /* Top-left corner cell highest */
}
</style>
```

---

### Q58: Create a pure CSS scroll-driven reading progress bar across the top of a page.
```html
<div class="reading-progress"></div>

<style>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #4f46e5;
  width: 100%;
  transform-origin: left;
  transform: scaleX(0);
  animation: grow-progress linear;
  animation-timeline: scroll();
  z-index: 1000;
}

@keyframes grow-progress {
  to { transform: scaleX(1); }
}
</style>
```

---

### Q59: Optimize off-screen render performance for 1000 cards with `content-visibility`.
```css
.feed-card {
  content-visibility: auto;
  contain-intrinsic-size: 0 350px;
}
```

---

### Q60: Code an accessible multi-level hover/focus dropdown menu without JavaScript.
```html
<nav class="dropdown-nav">
  <ul>
    <li class="menu-item">
      <a href="/products" aria-haspopup="true">Products</a>
      <ul class="sub-menu">
        <li><a href="/products/cloud">Cloud Infrastructure</a></li>
        <li><a href="/products/db">Database Engine</a></li>
      </ul>
    </li>
  </ul>
</nav>

<style>
.sub-menu {
  display: none;
  position: absolute;
}
.menu-item:hover .sub-menu,
.menu-item:focus-within .sub-menu {
  display: block;
}
</style>
```

---

### Q61: Code an accessible skip-link with animated slide-down focus.
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: #4f46e5;
  color: #fff;
  padding: 8px 16px;
  z-index: 9999;
  transition: top 0.2s ease;
}
.skip-link:focus {
  top: 16px;
}
```

---

### Q62: Build a 3D perspective flip card on hover with `transform-style: preserve-3d`.
```html
<div class="flip-card">
  <div class="flip-inner">
    <div class="flip-front">Front Content</div>
    <div class="flip-back">Back Content</div>
  </div>
</div>

<style>
.flip-card {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}
.flip-card:hover .flip-inner {
  transform: rotateY(180deg);
}
.flip-front, .flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.flip-back {
  transform: rotateY(180deg);
}
</style>
```

---

### Q63: Organize large CSS codebases using CSS Cascade Layers (`@layer`).
```css
@layer reset, base, layout, components, utilities;

@layer reset {
  * { margin: 0; box-sizing: border-box; }
}
@layer base {
  body { font-family: sans-serif; }
}
@layer components {
  .btn { background: #4f46e5; color: #fff; }
}
@layer utilities {
  .u-hidden { display: none !important; }
}
```

---

### Q64: Style an interactive star rating input with the sibling combinator `~`.
```html
<div class="star-rating">
  <input type="radio" id="s5" name="rate" value="5"><label for="s5">★</label>
  <input type="radio" id="s4" name="rate" value="4"><label for="s4">★</label>
  <input type="radio" id="s3" name="rate" value="3"><label for="s3">★</label>
  <input type="radio" id="s2" name="rate" value="2"><label for="s2">★</label>
  <input type="radio" id="s1" name="rate" value="1"><label for="s1">★</label>
</div>

<style>
.star-rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
.star-rating input { display: none; }
.star-rating label { font-size: 2rem; color: #cbd5e1; cursor: pointer; }
.star-rating input:checked ~ label,
.star-rating label:hover,
.star-rating label:hover ~ label {
  color: #f59e0b;
}
</style>
```

---

### Q65: Prevent parent stacking context leaks using `isolation: isolate`.
```css
.isolated-modal-root {
  isolation: isolate; /* Localizes all child z-index values */
}
```

---

### Q66: Build a responsive Masonry-style grid layout using `grid-auto-flow: dense`.
```css
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 150px;
  grid-auto-flow: dense;
  gap: 16px;
}
.card-wide { grid-column: span 2; }
.card-tall { grid-row: span 2; }
```

---

### Q67: Code a GPU-accelerated infinite horizontal marquee with CSS transforms.
```html
<div class="marquee-track">
  <div class="marquee-content">
    <span>React</span> <span>Next.js</span> <span>Node.js</span> <span>PostgreSQL</span>
  </div>
</div>

<style>
.marquee-track {
  overflow: hidden;
  white-space: nowrap;
}
.marquee-content {
  display: inline-block;
  animation: scroll-marquee 15s linear infinite;
  will-change: transform;
}
@keyframes scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
```

---

### Q68: Build an accessible pure CSS accordion with `:checked` and hidden radio inputs.
```html
<div class="accordion">
  <div class="item">
    <input type="radio" name="acc" id="acc1" checked>
    <label for="acc1">Section 1</label>
    <div class="content"><p>Details for section 1.</p></div>
  </div>
  <div class="item">
    <input type="radio" name="acc" id="acc2">
    <label for="acc2">Section 2</label>
    <div class="content"><p>Details for section 2.</p></div>
  </div>
</div>

<style>
.accordion input { display: none; }
.accordion .content { display: none; padding: 12px; }
.accordion input:checked ~ .content { display: block; }
</style>
```

---

### Q69: Code an animated ripple button effect using pseudo-elements.
```css
.ripple-btn {
  position: relative;
  overflow: hidden;
}
.ripple-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}
.ripple-btn:focus:not(:active)::after {
  animation: ripple 0.8s ease-out;
}
@keyframes ripple {
  0% { transform: scale(0, 0); opacity: 0.5; }
  100% { transform: scale(40, 40); opacity: 0; }
}
```

---

### Q70: Create a responsive image comparison slider container.
```css
.image-compare-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.image-before, .image-after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image-before {
  clip-path: inset(0 50% 0 0); /* Reveals 50% split */
}
```

---

### Q71: Write a CSS rule that matches every element EXCEPT the first and last child.
```css
.list-item:not(:first-child):not(:last-child) {
  border-top: 1px solid #e2e8f0;
}
```

---

### Q72: Code an automatic badge counter using CSS `counter-increment`.
```css
ol.numbered-chapters {
  counter-reset: chapter-counter;
  list-style: none;
}
ol.numbered-chapters li {
  counter-increment: chapter-counter;
}
ol.numbered-chapters li::before {
  content: "Chapter " counter(chapter-counter) ": ";
  font-weight: bold;
  color: #4f46e5;
}
```

---

### Q73: Style unvisited external links with an automatic external icon.
```css
a[href^="http"]:not([href*="theproductengineer.dev"])::after {
  content: " ↗";
  font-size: 0.8em;
  color: #64748b;
}
```

---

### Q74: Implement a CSS scroll-snap carousel with page indicators.
```css
.carousel-view {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 16px;
}
.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}
```

---

### Q75: Code a custom checkbox that disables the submit button using CSS `:has()`.
```css
/* Visual disabled state styling */
form:not(:has(#terms:checked)) button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
}
```

---

### Q76: Style the active navigation link based on the current page section with CSS `:target`.
```css
:target {
  scroll-margin-top: 80px;
  animation: highlight-target 1.5s ease;
}
@keyframes highlight-target {
  0% { background-color: #fef08a; }
  100% { background-color: transparent; }
}
```

---

### Q77: Code a high-contrast mode media query (`forced-colors`).
```css
@media (forced-colors: active) {
  .btn-primary {
    border: 2px solid ButtonText;
  }
}
```

---

### Q78: Implement a 1px border that renders razor-sharp on Retina / High-DPR screens.
```css
.retina-border {
  position: relative;
}
.retina-border::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #e2e8f0;
  transform: scaleY(0.5); /* Half-pixel scaling on 2x DPR */
}
```

---

### Q79: Code a multi-color gradient border that animates around a card on hover.
```css
.anim-border-card {
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  z-index: 1;
}
.anim-border-card::before {
  content: "";
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: linear-gradient(45deg, #4f46e5, #ec4899, #f59e0b, #10b981);
  background-size: 400%;
  border-radius: 10px;
  z-index: -1;
  animation: glow 8s linear infinite;
}
@keyframes glow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

### Q80: Prevent line breaks from leaving single-word orphans in headings using `text-wrap`.
```css
h1, h2, h3 {
  text-wrap: balance;
}
p {
  text-wrap: pretty;
}
```

---

### Q81: Build a CSS-only parallax scrolling section.
```html
<div class="parallax-container">
  <div class="parallax-layer bg"></div>
  <div class="parallax-layer fg">Content</div>
</div>

<style>
.parallax-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px;
}
.parallax-layer.bg {
  position: absolute;
  transform: translateZ(-1px) scale(2);
  z-index: -1;
}
</style>
```

---

### Q82: Code an accessible custom radio button card selector.
```html
<div class="plan-cards">
  <label class="plan-card">
    <input type="radio" name="plan" value="starter">
    <div class="plan-content">
      <h4>Starter</h4>
      <p>$9/month</p>
    </div>
  </label>
</div>

<style>
.plan-card input { position: absolute; opacity: 0; }
.plan-card:has(input:checked) .plan-content {
  border: 2px solid #4f46e5;
  background: #f5f3ff;
}
</style>
```

---

### Q83: Create a dynamic grid with minimum 3 columns and maximum 6 columns based on viewport.
```css
.flexible-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(150px, 100%/6), 1fr));
  gap: 16px;
}
```

---

### Q84: Style an alert box that smoothly collapses its height to 0 with CSS Grid.
```html
<div class="collapsible-alert open">
  <div class="inner-alert">Critical infrastructure alert!</div>
</div>

<style>
.collapsible-alert {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.3s ease;
}
.collapsible-alert.closed {
  grid-template-rows: 0fr;
}
.inner-alert {
  overflow: hidden;
}
</style>
```

---

### Q85: Implement an animated gradient background banner.
```css
.animated-hero {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient-shift 12s ease infinite;
}
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

### Q86: Style a custom circular cursor following the pointer with CSS variables.
```css
.custom-cursor {
  position: fixed;
  width: 24px;
  height: 24px;
  border: 2px solid #4f46e5;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(calc(var(--mouse-x, 0) * 1px - 12px), calc(var(--mouse-y, 0) * 1px - 12px));
  transition: transform 0.05s linear;
}
```

---

### Q87: Code a full-screen background video that covers the viewport without scrollbars.
```css
.bg-video {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
  object-fit: cover;
}
```

---

### Q88: Style an element with OKLCH color and create a 20% lighter hover variant using color functions.
```css
:root {
  --brand-color: oklch(0.6 0.22 260);
}
.button-primary {
  background-color: var(--brand-color);
}
.button-primary:hover {
  background-color: oklch(from var(--brand-color) calc(l + 0.1) c h);
}
```

---

### Q89: Build an expandable search bar that expands on focus.
```css
.search-input {
  width: 180px;
  transition: width 0.3s ease;
}
.search-input:focus {
  width: 320px;
}
```

---

### Q90: Create a staggered list entrance animation with CSS variables.
```html
<ul class="stagger-list">
  <li style="--i: 1">Item 1</li>
  <li style="--i: 2">Item 2</li>
  <li style="--i: 3">Item 3</li>
</ul>

<style>
.stagger-list li {
  animation: fadeIn 0.4s ease forwards;
  animation-delay: calc(var(--i) * 0.1s);
  opacity: 0;
  transform: translateY(10px);
}
@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}
</style>
```

---

### Q91: Style an element that hides automatically when empty with `:empty`.
```css
.notification-banner:empty {
  display: none;
}
```

---

### Q92: Code a button with an animated gradient shine swipe on hover.
```css
.shine-btn {
  position: relative;
  overflow: hidden;
}
.shine-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: all 0.5s ease;
}
.shine-btn:hover::before {
  left: 150%;
}
```

---

### Q93: Create a dynamic grid where the middle column takes priority space and sidebars fit content.
```css
.layout-grid {
  display: grid;
  grid-template-columns: max-content 1fr min-content;
  gap: 16px;
}
```

---

### Q94: Implement CSS native nesting for a component card.
```css
.product-card {
  border: 1px solid #e2e8f0;
  padding: 16px;

  & .title {
    font-weight: 700;
  }

  &:hover {
    border-color: #4f46e5;

    & .title {
      color: #4f46e5;
    }
  }
}
```

---

### Q95: Code a custom checkbox switch with smooth slide animation.
```html
<label class="switch">
  <input type="checkbox">
  <span class="slider"></span>
</label>

<style>
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; inset: 0;
  background-color: #cbd5e1; border-radius: 24px; transition: 0.3s;
}
.slider::before {
  content: ""; position: absolute; height: 18px; width: 18px;
  left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: 0.3s;
}
input:checked + .slider { background-color: #4f46e5; }
input:checked + .slider::before { transform: translateX(20px); }
</style>
```

---

### Q96: Style text with automatic hyphenation to improve responsive readability.
```css
.article-body {
  hyphens: auto;
  text-align: justify;
}
```

---

### Q97: Create an overlay backdrop that dims the entire screen except for a spotlighted card.
```css
.spotlight-card {
  position: relative;
  z-index: 1000;
  box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.75);
}
```

---

### Q98: Build a horizontal scrolling tag list with gradient fade edges.
```css
.tag-container {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent);
}
```

---

### Q99: Implement a floating label input animation with `:placeholder-shown`.
```html
<div class="floating-group">
  <input type="text" id="fname" placeholder=" " required>
  <label for="fname">First Name</label>
</div>

<style>
.floating-group { position: relative; padding-top: 12px; }
.floating-group input { width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 4px; }
.floating-group label {
  position: absolute; left: 8px; top: 20px; color: #94a3b8;
  transition: all 0.2s ease; pointer-events: none;
}
.floating-group input:focus + label,
.floating-group input:not(:placeholder-shown) + label {
  top: 0; left: 4px; font-size: 0.75rem; color: #4f46e5;
}
</style>
```

---

### Q100: Build a complete responsive full-screen dashboard layout with CSS Grid.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>System Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, sans-serif; color: #0f172a; }

    .dashboard-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: 60px 1fr;
      grid-template-areas:
        "sidebar header"
        "sidebar main";
      height: 100vh;
    }

    aside {
      grid-area: sidebar;
      background: #0f172a;
      color: #fff;
      padding: 20px;
    }

    header {
      grid-area: header;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
    }

    main {
      grid-area: main;
      background: #f8fafc;
      padding: 24px;
      overflow-y: auto;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .metric-card {
      background: #ffffff;
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }

    @media (max-width: 768px) {
      .dashboard-layout {
        grid-template-columns: 1fr;
        grid-template-areas:
          "header"
          "main";
      }
      aside { display: none; }
    }
  </style>
</head>
<body>
  <div class="dashboard-layout">
    <aside>
      <h2>Admin Portal</h2>
    </aside>
    <header>
      <h3>Infrastructure Status</h3>
      <span>Logged in as Admin</span>
    </header>
    <main>
      <div class="metrics-grid">
        <div class="metric-card"><h4>CPU Utilization</h4><p>24%</p></div>
        <div class="metric-card"><h4>Memory Load</h4><p>4.2 GB / 16 GB</p></div>
        <div class="metric-card"><h4>Active Nodes</h4><p>12 Clusters</p></div>
      </div>
    </main>
  </div>
</body>
</html>
```
