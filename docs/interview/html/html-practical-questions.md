# 100 HTML Practical & Coding Interview Questions

> A comprehensive hands-on practice handbook containing 100 code-driven HTML interview challenges, real-world bug fixes, semantic refactorings, accessibility implementations, and advanced browser API patterns.

---

## 📑 Index & Practice Distribution

| Category | Range | Practical Focus |
| :--- | :--- | :--- |
| [**Part 1: Basic Practical & Markup Challenges**](#part-1-basic-practical-markup-challenges-1-50) | Q1 – Q50 | Boilerplate setup, semantic refactoring, accessible forms, tables with spans, navigation menus, media tags, character escaping |
| [**Part 2: Advanced Practical & Architecture Challenges**](#part-2-advanced-practical-architecture-challenges-51-100) | Q51 – Q100 | `<picture>` art direction, CLS elimination, Constraint Validation API, `<dialog>` modal flows, Popover API, CSP configuration, Web Components, ARIA patterns, Drag & Drop, Web Workers |

---

# Part 1: Basic Practical & Markup Challenges (1 – 50)

### Q1: Write the minimal, production-grade HTML5 document boilerplate.
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise Application</title>
    <link rel="stylesheet" href="/styles/main.css">
  </head>
  <body>
    <header>
      <h1>Application Dashboard</h1>
    </header>
    <main>
      <p>Main content area.</p>
    </main>
    <footer>
      <p>&copy; 2026 The Product Engineer</p>
    </footer>
    <script src="/scripts/app.js" defer></script>
  </body>
</html>
```

---

### Q2: Refactor this "div soup" into semantic HTML5 markup.
**Problem (Before):**
```html
<div class="header">
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/docs">Docs</a></div>
  </div>
</div>
<div class="content">
  <div class="title">Release Notes</div>
  <div class="body">Details about version 2.0...</div>
</div>
<div class="footer">Copyright 2026</div>
```
**Solution (After):**
```html
<header>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Release Notes</h1>
    <p>Details about version 2.0...</p>
  </article>
</main>
<footer>
  <p>&copy; 2026</p>
</footer>
```

---

### Q3: Code an accessible image with a visible caption.
```html
<figure>
  <img src="architecture.png" alt="High-level microservices topology diagram with API gateway and message queue" width="800" height="450">
  <figcaption>Figure 1.1: Scalable backend system architecture.</figcaption>
</figure>
```

---

### Q4: Create an accessible registration form with explicit label bindings.
```html
<form action="/register" method="POST">
  <div>
    <label for="reg-name">Full Name:</label>
    <input type="text" id="reg-name" name="name" required autocomplete="name">
  </div>
  <div>
    <label for="reg-email">Email Address:</label>
    <input type="email" id="reg-email" name="email" required autocomplete="email">
  </div>
  <div>
    <label for="reg-password">Password:</label>
    <input type="password" id="reg-password" name="password" minlength="8" required autocomplete="new-password">
  </div>
  <button type="submit">Create Account</button>
</form>
```

---

### Q5: Code a contact link that opens the user's email client with pre-filled subject and body.
```html
<a href="mailto:support@example.com?subject=Bug%20Report&body=Description%20of%20the%20issue:">
  Contact Support Team
</a>
```

---

### Q6: Implement an accessible external link that opens in a new tab safely.
```html
<a href="https://github.com/harshitclub" target="_blank" rel="noopener noreferrer">
  GitHub Profile
  <span class="sr-only">(opens in a new tab)</span>
</a>
```

---

### Q7: Build a multi-tier product pricing table with proper header scopes.
```html
<table>
  <caption>SaaS Subscription Pricing Comparison</caption>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Starter ($9/mo)</th>
      <th scope="col">Pro ($29/mo)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Max Projects</th>
      <td>5</td>
      <td>Unlimited</td>
    </tr>
    <tr>
      <th scope="row">Cloud Storage</th>
      <td>10 GB</td>
      <td>1 TB</td>
    </tr>
  </tbody>
</table>
```

---

### Q8: Code a table cell that spans 2 columns and another spanning 2 rows.
```html
<table>
  <tr>
    <th colspan="2">Merged Header across 2 Columns</th>
  </tr>
  <tr>
    <td rowspan="2">Merged Cell down 2 Rows</td>
    <td>Row 1 Data</td>
  </tr>
  <tr>
    <td>Row 2 Data</td>
  </tr>
</table>
```

---

### Q9: Implement a dropdown menu with categorical grouping.
```html
<label for="skills">Select Core Skillset:</label>
<select id="skills" name="skills">
  <optgroup label="Frontend">
    <option value="html">Semantic HTML5</option>
    <option value="css">Modern CSS3</option>
    <option value="js">JavaScript ES6+</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="pg">PostgreSQL</option>
  </optgroup>
</select>
```

---

### Q10: Code an accessible radio button group for payment method selection.
```html
<fieldset>
  <legend>Select Payment Method</legend>
  <div>
    <input type="radio" id="pay-card" name="payment_method" value="credit_card" checked>
    <label for="pay-card">Credit or Debit Card</label>
  </div>
  <div>
    <input type="radio" id="pay-paypal" name="payment_method" value="paypal">
    <label for="pay-paypal">PayPal</label>
  </div>
</fieldset>
```

---

### Q11: Create an autocompleting search input using `<datalist>`.
```html
<label for="country-search">Choose Destination Country:</label>
<input list="countries" id="country-search" name="country" placeholder="Type country name...">

<datalist id="countries">
  <option value="United States">
  <option value="United Kingdom">
  <option value="Canada">
  <option value="Germany">
  <option value="India">
</datalist>
```

---

### Q12: Build an accessible accordion widget without writing any JavaScript.
```html
<details>
  <summary>What is your refund policy?</summary>
  <p>We offer a 30-day money-back guarantee with zero questions asked.</p>
</details>
```

---

### Q13: Correct the syntax errors in this snippet.
**Broken Snippet:**
```html
<a href="https://example.com" target="_blank"><button>Click Me</div>
<img src="logo.png">
```
**Corrected Snippet:**
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  <span>Click Me</span>
</a>
<img src="logo.png" alt="Company Logo">
```
*Fixes:* Replaced illegal `<button>` inside `<a>` with `<span>`, closed `<a>`, added `rel="noopener noreferrer"`, and added required `alt` attribute.

---

### Q14: Code a blockquote with proper citation and author attribution.
```html
<figure>
  <blockquote cite="https://www.w3.org/standards/webdesign/accessibility">
    <p>"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."</p>
  </blockquote>
  <figcaption>— Tim Berners-Lee, <cite>W3C Director and Inventor of the World Wide Web</cite></figcaption>
</figure>
```

---

### Q15: Code an ordered list that numbers items as uppercase Roman numerals starting from 5.
```html
<ol type="I" start="5">
  <li>Architecture Foundations</li> <!-- Displays V -->
  <li>Database Indexing</li>          <!-- Displays VI -->
  <li>Distributed Caching</li>        <!-- Displays VII -->
</ol>
```

---

### Q16: Markup a technical glossary using Description Lists (`<dl>`).
```html
<dl>
  <dt>DOM</dt>
  <dd>Document Object Model: An object-oriented tree representation of structured HTML.</dd>

  <dt>CSSOM</dt>
  <dd>CSS Object Model: A map of all style selectors and cascade rules parsed from stylesheets.</dd>
</dl>
```

---

### Q17: Write an HTML form control for file uploads supporting multiple PDF/image documents.
```html
<label for="file-upload">Upload Resumes (.pdf, .png, .jpg):</label>
<input 
  type="file" 
  id="file-upload" 
  name="resumes" 
  accept=".pdf,image/png,image/jpeg" 
  multiple 
  required>
```

---

### Q18: Code a number input that accepts only currency amounts with 2 decimal precision between $5 and $500.
```html
<label for="donation">Donation Amount ($):</label>
<input 
  type="number" 
  id="donation" 
  name="donation" 
  min="5.00" 
  max="500.00" 
  step="0.01" 
  value="25.00" 
  required>
```

---

### Q19: Implement an accessible phone number input with mobile dialpad optimization.
```html
<label for="user-phone">Phone Number:</label>
<input 
  type="tel" 
  id="user-phone" 
  name="phone" 
  autocomplete="tel" 
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
  placeholder="123-456-7890" 
  required>
```

---

### Q20: Write an HTML audio player with native playback controls and fallback text.
```html
<audio controls preload="metadata">
  <source src="/audio/podcast-ep1.mp3" type="audio/mpeg">
  <source src="/audio/podcast-ep1.ogg" type="audio/ogg">
  <p>Your browser does not support the HTML5 audio element. <a href="/audio/podcast-ep1.mp3">Download the audio file</a>.</p>
</audio>
```

---

### Q21: Code a video tag with a preview poster, subtitles, and playsinline enabled.
```html
<video controls poster="/images/poster.jpg" playsinline preload="metadata" width="800" height="450">
  <source src="/video/intro.mp4" type="video/mp4">
  <source src="/video/intro.webm" type="video/webm">
  <track src="/subtitles/en.vtt" kind="subtitles" srclang="en" label="English" default>
  <p>Your browser does not support HTML5 video.</p>
</video>
```

---

### Q22: Code a multi-line code block displaying JavaScript source code.
```html
<pre><code class="language-javascript">function calculateHash(payload) {
  return crypto.createHash('sha256').update(payload).digest('hex');
}</code></pre>
```

---

### Q23: Write an inline line break inside a poetry stanza or address.
```html
<p>
  100 Infinite Loop Road<br>
  Building 4, Suite 200<br>
  Cupertino, CA 95014
</p>
```

---

### Q24: Implement an editable div with spellchecking enabled.
```html
<div 
  contenteditable="true" 
  spellcheck="true" 
  role="textbox" 
  aria-multiline="true" 
  aria-label="Rich text scratchpad">
  Type project scratch notes here...
</div>
```

---

### Q25: Safely display raw HTML tags on a webpage as literal text.
```html
<p>To declare a bold text in HTML, write &lt;strong&gt;Important&lt;/strong&gt;.</p>
```

---

### Q26: Code a date range picker with minimum and maximum allowed booking dates.
```html
<label for="checkin">Check-in Date:</label>
<input 
  type="date" 
  id="checkin" 
  name="checkin" 
  min="2026-09-01" 
  max="2026-12-31" 
  required>
```

---

### Q27: Write a slider range input with step increments of 5 between 0 and 100.
```html
<label for="volume">Output Volume Level:</label>
<input type="range" id="volume" name="volume" min="0" max="100" step="5" value="50">
```

---

### Q28: Code an address block with semantic `<address>` markup.
```html
<address>
  Written by <a href="mailto:harshit@example.com">Harshit Kumar</a>.<br>
  Visit our headquarters at: <a href="https://maps.example.com">Bangalore, India</a>
</address>
```

---

### Q29: Code an abbreviation that displays a tooltip expansion on hover.
```html
<p>The system communicates using <abbr title="Representational State Transfer">REST</abbr> APIs over HTTPS.</p>
```

---

### Q30: Implement a semantic time element with ISO 8601 machine-readable datetime.
```html
<p>Article published on <time datetime="2026-09-10T20:30:00Z">September 10, 2026</time>.</p>
```

---

### Q31: Implement a button that resets all inputs inside a form.
```html
<form>
  <input type="text" name="filter">
  <button type="reset">Clear Filter</button>
</form>
```

---

### Q32: Create an HTML color picker input.
```html
<label for="theme-color">Choose Accent Brand Color:</label>
<input type="color" id="theme-color" name="theme_color" value="#4f46e5">
```

---

### Q33: Code an input that triggers mobile SMS 2FA one-time code autofill.
```html
<label for="otp-code">Verification Code (SMS OTP):</label>
<input 
  type="text" 
  id="otp-code" 
  name="otp" 
  inputmode="numeric" 
  autocomplete="one-time-code" 
  pattern="[0-9]{6}" 
  required>
```

---

### Q34: Create a disabled text input and a readonly text input.
```html
<!-- Disabled: Cannot edit, cannot focus, NOT submitted -->
<input type="text" name="legacy_id" value="ID-9912" disabled>

<!-- Readonly: Cannot edit, CAN focus and copy, IS submitted -->
<input type="text" name="api_key" value="pk_live_d83a1b" readonly>
```

---

### Q35: Write an image link pointing to an external destination.
```html
<a href="https://vitepress.dev" target="_blank" rel="noopener noreferrer">
  <img src="/images/vitepress-logo.svg" alt="VitePress Documentation Portal" width="120" height="32">
</a>
```

---

### Q36: Code a hidden input field storing a CSRF security token.
```html
<input type="hidden" name="csrf_token" value="c8f1e9b2a4d3e5f6">
```

---

### Q37: Add an internal document skip-link.
```html
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header>...</header>
  <main id="main-content" tabindex="-1">
    <h1>Page Main Content</h1>
  </main>
</body>
```

---

### Q38: Markup a search form with native `type="search"`.
```html
<form action="/search" method="GET" role="search">
  <label for="site-search" class="sr-only">Search notes:</label>
  <input type="search" id="site-search" name="q" placeholder="Search engineering topics..." required>
  <button type="submit">Search</button>
</form>
```

---

### Q39: Code a progress bar indicating 75% download completion.
```html
<label for="download-progress">Downloading Build Artifacts (75%):</label>
<progress id="download-progress" max="100" value="75">75%</progress>
```

---

### Q40: Code a disk space meter widget measuring 82GB out of 100GB.
```html
<label for="disk-usage">Server Disk Usage:</label>
<meter id="disk-usage" min="0" max="100" low="30" high="80" optimum="20" value="82">82 GB out of 100 GB</meter>
```

---

### Q41: Markup a text snippet with bi-directional isolation for user-generated Arabic names.
```html
<p>User <bdi>أحمد</bdi> published 5 comments.</p>
```

---

### Q42: Code an inline SVG icon inside a button.
```html
<button type="button" aria-label="Refresh Dashboard">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
  <span>Refresh</span>
</button>
```

---

### Q43: Write HTML to embed a YouTube video or external map in a sandbox.
```html
<iframe 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="System Architecture Walkthrough" 
  width="560" 
  height="315" 
  sandbox="allow-scripts allow-same-origin allow-presentation" 
  loading="lazy" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
```

---

### Q44: Code a form submit button that overrides the form's destination action URL.
```html
<form action="/save-draft" method="POST">
  <button type="submit">Save Draft</button>
  <button type="submit" formaction="/publish-live">Publish to Production</button>
</form>
```

---

### Q45: Code a checkbox with a required agreement check.
```html
<div>
  <input type="checkbox" id="terms" name="terms_agreed" required>
  <label for="terms">I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a></label>
</div>
```

---

### Q46: Markup deleted and inserted text in a contract diff view.
```html
<p>The annual fee is <del>$120</del> <ins>$99</ins> when billed annually.</p>
```

---

### Q47: Create a word break opportunity within an ultra-long domain name.
```html
<p>https://subdomain.engineering<wbr>.cloud-provider<wbr>.datacenter<wbr>.internal/endpoint</p>
```

---

### Q48: Code a password input with minimum 8 characters and pattern requirement.
```html
<label for="user-pass">Secure Password:</label>
<input 
  type="password" 
  id="user-pass" 
  name="password" 
  minlength="8" 
  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
  title="Must contain at least one number, one uppercase letter, and one lowercase letter, with 8+ characters." 
  required>
```

---

### Q49: Add custom data attributes to an article card for client-side filtering.
```html
<article 
  data-category="database" 
  data-read-time="5" 
  data-is-premium="false">
  <h3>PostgreSQL Indexing Strategies</h3>
</article>
```

---

### Q50: Code a `<col>` group setting specific widths on table columns.
```html
<table>
  <colgroup>
    <col style="width: 30%;">
    <col style="width: 70%;">
  </colgroup>
  <tr>
    <td>Property</td>
    <td>Value</td>
  </tr>
</table>
```

---

# Part 2: Advanced Practical & Architecture Challenges (51 – 100)

### Q51: Implement a responsive `<picture>` element with WebP/AVIF format fallbacks and mobile art-direction crops.
```html
<picture>
  <!-- Dark mode preference -->
  <source srcset="/images/diagram-dark.avif" type="image/avif" media="(prefers-color-scheme: dark)">
  
  <!-- Mobile portrait crop in next-gen AVIF -->
  <source srcset="/images/diagram-mobile.avif" type="image/avif" media="(max-width: 640px)">
  
  <!-- Mobile portrait crop in WebP -->
  <source srcset="/images/diagram-mobile.webp" type="image/webp" media="(max-width: 640px)">
  
  <!-- Desktop wide landscape in AVIF -->
  <source srcset="/images/diagram-desktop.avif" type="image/avif">
  
  <!-- Desktop wide landscape in WebP -->
  <source srcset="/images/diagram-desktop.webp" type="image/webp">
  
  <!-- Fallback raster JPG for legacy browsers with fixed dimensions to prevent CLS -->
  <img src="/images/diagram-fallback.jpg" alt="Distributed Cache-Aside architecture topology" width="1200" height="675" loading="lazy" decoding="async">
</picture>
```

---

### Q52: Code an image with `srcset` and `sizes` to handle resolution switching across mobile, tablet, and desktop screens.
```html
<img 
  src="/images/hero-800.jpg" 
  srcset="
    /images/hero-400.jpg 400w,
    /images/hero-800.jpg 800w,
    /images/hero-1200.jpg 1200w,
    /images/hero-1600.jpg 1600w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Engineering team analyzing distributed trace metrics"
  width="1600"
  height="900"
  fetchpriority="high"
  decoding="async"
>
```

---

### Q53: Build an accessible modal with the native `<dialog>` element, backdrop styling, and focus trapping.
```html
<button id="open-modal-btn" type="button">Delete Cluster</button>

<dialog id="confirm-modal" aria-labelledby="modal-title" aria-describedby="modal-desc">
  <form method="dialog">
    <h2 id="modal-title">Delete Database Cluster?</h2>
    <p id="modal-desc">This action will destroy all nodes and cannot be undone.</p>
    <div class="modal-actions">
      <button type="button" id="cancel-btn">Cancel</button>
      <button type="submit" value="confirmed" class="danger-btn">Delete</button>
    </div>
  </form>
</dialog>

<script>
  const dialog = document.getElementById('confirm-modal');
  document.getElementById('open-modal-btn').addEventListener('click', () => dialog.showModal());
  document.getElementById('cancel-btn').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'confirmed') console.log('Cluster deleted');
  });
</script>
```

---

### Q54: Implement a lightweight dropdown menu using the modern HTML5 Popover API.
```html
<button popovertarget="user-menu" popovertargetaction="toggle" aria-haspopup="true">
  User Profile
</button>

<div id="user-menu" popover="auto" class="dropdown-panel">
  <nav aria-label="Profile actions">
    <ul>
      <li><a href="/profile">Account Settings</a></li>
      <li><a href="/billing">Billing</a></li>
      <li><button type="button">Log Out</button></li>
    </ul>
  </nav>
</div>
```

---

### Q55: Code a custom form validation script using the Constraint Validation API.
```html
<form id="auth-form" novalidate>
  <div>
    <label for="company-email">Company Email Address:</label>
    <input type="email" id="company-email" required autocomplete="email">
    <span class="error-msg" aria-live="polite"></span>
  </div>
  <button type="submit">Verify Domain</button>
</form>

<script>
  const form = document.getElementById('auth-form');
  const emailInput = document.getElementById('company-email');
  const errorMsg = emailInput.nextElementSibling;

  emailInput.addEventListener('input', () => {
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity('Please enter a valid format: user@company.com');
    } else if (emailInput.value.endsWith('@gmail.com') || emailInput.value.endsWith('@yahoo.com')) {
      emailInput.setCustomValidity('Personal email providers are not permitted. Please use corporate email.');
    } else {
      emailInput.setCustomValidity(''); // Valid!
    }
    errorMsg.textContent = emailInput.validationMessage;
  });

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      emailInput.reportValidity();
    }
  });
</script>
```

---

### Q56: Write a complete production `<head>` configuration for Technical SEO, Open Graph, and Twitter Cards.
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  
  <title>The Product Engineer | From Code to Scaled Architecture</title>
  <meta name="description" content="Comprehensive full-stack engineering handbook covering core client foundations, distributed systems, and cloud architecture.">
  <link rel="canonical" href="https://theproductengineer.dev/interview/html">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="The Product Engineer">
  <meta property="og:title" content="100 HTML Interview Questions & Answers">
  <meta property="og:description" content="Deep-dive theoretical and practical HTML interview preparation handbook.">
  <meta property="og:image" content="https://theproductengineer.dev/og-banner.png">
  <meta property="og:url" content="https://theproductengineer.dev/interview/html">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="@harshitclub">
  <meta name="twitter:title" content="100 HTML Interview Questions & Answers">
  <meta name="twitter:description" content="Deep-dive theoretical and practical HTML interview preparation handbook.">
  <meta name="twitter:image" content="https://theproductengineer.dev/og-banner.png">

  <!-- Resource Preconnections -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

---

### Q57: Implement a Content Security Policy (CSP) `<meta>` tag that prevents inline XSS attacks.
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://trusted.cdn.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  frame-ancestors 'none';
  object-src 'none';
  base-uri 'self';
">
```

---

### Q58: Build a Web Component with `<template>` and `<slot>` encapsulation.
```html
<template id="user-card-template">
  <style>
    .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-family: sans-serif; }
    ::slotted(h3) { color: #4f46e5; margin: 0 0 8px; }
  </style>
  <div class="card">
    <slot name="title"><h3>Default Member</h3></slot>
    <slot name="bio"><p>No biography provided.</p></slot>
  </div>
</template>

<user-card>
  <h3 slot="title">Harshit Kumar</h3>
  <p slot="bio">Staff Product Engineer & System Architect.</p>
</user-card>

<script>
  customElements.define('user-card', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const template = document.getElementById('user-card-template');
      shadow.appendChild(template.content.cloneNode(true));
    }
  });
</script>
```

---

### Q59: Implement an accessible live search status notification using `aria-live`.
```html
<form role="search">
  <label for="search-box">Filter Components:</label>
  <input type="search" id="search-box" autocomplete="off">
</form>

<!-- Polite live region announces updates after user stops typing -->
<div id="status-region" aria-live="polite" aria-atomic="true" class="sr-only"></div>

<script>
  const searchBox = document.getElementById('search-box');
  const statusRegion = document.getElementById('status-region');

  searchBox.addEventListener('input', (e) => {
    const matchesCount = 14; // calculated dynamically
    statusRegion.textContent = `${matchesCount} engineering results available for "${e.target.value}".`;
  });
</script>
```

---

### Q60: Implement HTML Drag and Drop for reordering cards.
```html
<div class="drag-zone">
  <div class="card" draggable="true" id="card-1">Card 1: Database Setup</div>
  <div class="card" draggable="true" id="card-2">Card 2: Caching Pipeline</div>
</div>

<script>
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.effectAllowed = 'move';
    });
  });

  const zone = document.querySelector('.drag-zone');
  zone.addEventListener('dragover', (e) => e.preventDefault()); // Mandatory to allow drop
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggedEl = document.getElementById(id);
    zone.appendChild(draggedEl);
  });
</script>
```

---

### Q61: Launch an off-main-thread Web Worker using JavaScript from HTML.
```html
<button id="calc-btn" type="button">Run Heavy Prime Calculation</button>
<output id="calc-result">Idle</output>

<script>
  const workerCode = `
    self.onmessage = function(e) {
      let count = 0;
      for (let i = 2; i < e.data.limit; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
          if (i % j === 0) { isPrime = false; break; }
        }
        if (isPrime) count++;
      }
      self.postMessage(count);
    };
  `;
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  document.getElementById('calc-btn').addEventListener('click', () => {
    document.getElementById('calc-result').textContent = 'Computing in background...';
    worker.postMessage({ limit: 1000000 });
  });

  worker.onmessage = (e) => {
    document.getElementById('calc-result').textContent = `Total primes found: ${e.data}`;
  };
</script>
```

---

### Q62: Configure an accessible icon-only button with full screen reader description.
```html
<button type="button" aria-label="Delete Server Instance" aria-describedby="delete-hint">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
</button>
<span id="delete-hint" class="sr-only">Pressing this will immediately terminate the virtual machine.</span>
```

---

### Q63: Refactor custom `div` buttons to follow WCAG 2.1 keyboard standards.
**Problem (Before):**
```html
<div class="custom-btn" onclick="save()">Save</div>
```
**Solution (After):**
```html
<!-- Native semantic button handles space, enter, focus, and state out of the box -->
<button type="button" class="custom-btn" onclick="save()">Save</button>
```

---

### Q64: Implement dynamic calculation output in an HTML form with `<output>`.
```html
<form oninput="total.value = (parseFloat(price.value) * (1 + parseFloat(tax.value) / 100)).toFixed(2)">
  <label for="price">Item Price ($):</label>
  <input type="number" id="price" name="price" value="100.00" step="0.01">

  <label for="tax">Tax Rate (%):</label>
  <input type="range" id="tax" name="tax" min="0" max="25" value="10" step="1">

  <label>Final Total Price ($):</label>
  <output name="total" for="price tax">110.00</output>
</form>
```

---

### Q65: Build a secure client-side file upload preview with FileReader.
```html
<input type="file" id="avatar" accept="image/*">
<img id="avatar-preview" src="/placeholder.png" alt="Avatar Preview" width="100" height="100">

<script>
  document.getElementById('avatar').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById('avatar-preview').src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
</script>
```

---

### Q66: Correctly link a table cell with multiple column and row header IDs.
```html
<table>
  <tr>
    <th id="quarter">Q3</th>
    <th id="region">North America</th>
    <th id="metric">Sales</th>
  </tr>
  <tr>
    <td headers="quarter region metric">$1,450,000</td>
  </tr>
</table>
```

---

### Q67: Configure a progressive Web Application (PWA) manifest link and iOS status bar meta.
```html
<head>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#4f46e5">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="apple-touch-icon" href="/icons/icon-192.png">
</head>
```

---

### Q68: Build a custom toggle switch using a native checkbox and semantic label.
```html
<label class="switch-container" for="dark-toggle">
  <input type="checkbox" id="dark-toggle" role="switch" aria-checked="false">
  <span class="slider"></span>
  <span class="switch-label">Enable Dark Mode</span>
</label>
```

---

### Q69: Securely embed an external untrusted widget using strict iframe sandbox directives.
```html
<iframe 
  src="https://untrusted-analytics-provider.com" 
  title="Analytics Dashboard" 
  sandbox="allow-scripts" 
  referrerpolicy="no-referrer" 
  loading="lazy" 
  width="100%" 
  height="400">
</iframe>
```

---

### Q70: Build an accessible password confirmation validation check.
```html
<form id="pass-form">
  <div>
    <label for="p1">New Password:</label>
    <input type="password" id="p1" required minlength="8">
  </div>
  <div>
    <label for="p2">Confirm Password:</label>
    <input type="password" id="p2" required>
    <span id="match-err" class="error-text"></span>
  </div>
  <button type="submit">Update Password</button>
</form>

<script>
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');
  function checkMatch() {
    if (p1.value !== p2.value) {
      p2.setCustomValidity('Passwords do not match');
    } else {
      p2.setCustomValidity('');
    }
  }
  p1.addEventListener('input', checkMatch);
  p2.addEventListener('input', checkMatch);
</script>
```

---

### Q71: Prevent Back/Forward Cache (bfcache) breakage caused by `unload` listeners.
```javascript
// ❌ BAD: Completely breaks bfcache in all modern browsers
// window.addEventListener('unload', () => saveAnalytics());

// ✅ GOOD: pagehide preserves bfcache and detects page freeze/restore
window.addEventListener('pagehide', (event) => {
  if (event.persisted) {
    console.log('Page is being cached in bfcache');
  }
  navigator.sendBeacon('/api/telemetry', JSON.stringify({ event: 'leave' }));
});
```

---

### Q72: Code a multi-language fallback block with `<bdi>` and `lang` switches.
```html
<p>English: Hello, <span lang="es">Hola</span>, <span lang="fr">Bonjour</span>.</p>
```

---

### Q73: Implement a canvas element with fallback content for screen readers.
```html
<canvas id="chart" width="600" height="300" role="img" aria-label="Bar chart displaying Q1 through Q4 revenue growth">
  <table>
    <caption>Quarterly Revenue Data Table</caption>
    <tr><th>Q1</th><td>$10k</td></tr>
    <tr><th>Q2</th><td>$25k</td></tr>
  </table>
</canvas>
```

---

### Q74: Write a search form that submits over `GET` without altering browser history state.
```html
<form action="/catalog" method="GET">
  <input type="search" name="keyword" placeholder="Search products...">
  <button type="submit">Filter</button>
</form>
```

---

### Q75: Implement CSS-only tooltips using `data-*` and CSS `attr()`.
```html
<button class="tooltip-btn" data-tooltip="Ctrl + S to save">Save File</button>

<style>
.tooltip-btn:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  background: #0f172a;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}
</style>
```

---

### Q76: Configure an `iframe` with `srcdoc` for instant rendering of user code in a sandbox.
```html
<iframe 
  srcdoc="<!DOCTYPE html><html><body><h1>Instant Live Preview</h1></body></html>" 
  title="Code Playground Preview" 
  sandbox="allow-scripts">
</iframe>
```

---

### Q77: Optimize an LCP hero image with preload and `fetchpriority`.
```html
<head>
  <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchpriority="high">
</head>
<body>
  <img src="/images/hero.webp" alt="Hero Banner" width="1200" height="600" fetchpriority="high">
</body>
```

---

### Q78: Implement an accessible progress indicator for a multi-step checkout wizard.
```html
<nav aria-label="Checkout Progress">
  <ol class="step-wizard">
    <li><a href="/cart">Cart (Completed)</a></li>
    <li aria-current="step">Shipping Address (Current Step)</li>
    <li>Payment (Upcoming)</li>
  </ol>
</nav>
```

---

### Q79: Code an accessible custom toggle button with `aria-pressed`.
```html
<button type="button" id="mute-btn" aria-pressed="false">
  Mute Notifications
</button>

<script>
  const btn = document.getElementById('mute-btn');
  btn.addEventListener('click', () => {
    const isMuted = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!isMuted));
    btn.textContent = !isMuted ? 'Unmute Notifications' : 'Mute Notifications';
  });
</script>
```

---

### Q80: Implement an accessible breadcrumb navigation trail.
```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/interview">Interview Hub</a></li>
    <li aria-current="page">HTML Questions</li>
  </ol>
</nav>
```

---

### Q81: Code a modal form that sends a `DELETE` request via a modern fetch interceptor.
```html
<form id="delete-form">
  <input type="hidden" name="resource_id" value="srv-9812">
  <button type="submit">Confirm Permanent Deletion</button>
</form>

<script>
  document.getElementById('delete-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = new FormData(e.target).get('resource_id');
    const res = await fetch(`/api/servers/${id}`, { method: 'DELETE' });
    if (res.ok) window.location.reload();
  });
</script>
```

---

### Q82: Build an accessible error summary block that receives focus on form failure.
```html
<div id="error-summary" class="error-box" role="alert" tabindex="-1" hidden>
  <h2>There are 2 errors with your submission:</h2>
  <ul>
    <li><a href="#user-email">Email must be valid format</a></li>
    <li><a href="#user-age">You must be at least 18 years old</a></li>
  </ul>
</div>

<script>
  function triggerErrors() {
    const box = document.getElementById('error-summary');
    box.hidden = false;
    box.focus(); // Transfer focus immediately
  }
</script>
```

---

### Q83: Create a clean semantic markup for a blog post with author bio and published date.
```html
<article>
  <header>
    <h1>Scaling Relational Databases with Read Replicas</h1>
    <p>Written by <a href="/author/harshit">Harshit Kumar</a></p>
    <p>Published on <time datetime="2026-09-10">September 10, 2026</time></p>
  </header>
  <section>
    <p>Database read replicas offload analytical queries from primary master...</p>
  </section>
  <aside>
    <h3>Related Articles</h3>
    <ul>
      <li><a href="/post/postgres-indexing">PostgreSQL Indexing</a></li>
    </ul>
  </aside>
</article>
```

---

### Q84: Implement an accessible multi-select checkbox group with "Select All" functionality.
```html
<fieldset>
  <legend>Notification Preferences</legend>
  <div>
    <input type="checkbox" id="select-all">
    <label for="select-all"><strong>Select All</strong></label>
  </div>
  <hr>
  <div>
    <input type="checkbox" class="pref-item" id="pref-email" name="notify" value="email">
    <label for="pref-email">Email Alerts</label>
  </div>
  <div>
    <input type="checkbox" class="pref-item" id="pref-sms" name="notify" value="sms">
    <label for="pref-sms">SMS Notifications</label>
  </div>
</fieldset>

<script>
  const master = document.getElementById('select-all');
  const items = document.querySelectorAll('.pref-item');
  master.addEventListener('change', () => {
    items.forEach(item => item.checked = master.checked);
  });
</script>
```

---

### Q85: Code a credit card input with proper auto-formatting constraints and autocomplete.
```html
<label for="cc-num">Credit Card Number:</label>
<input 
  type="text" 
  id="cc-num" 
  name="cardnumber" 
  inputmode="numeric" 
  autocomplete="cc-number" 
  pattern="[0-9\s]{13,19}" 
  maxlength="19" 
  placeholder="xxxx xxxx xxxx xxxx" 
  required>
```

---

### Q86: Create a form with a character counter using the `input` event and `maxlength`.
```html
<label for="feedback">Your Review (Max 200 chars):</label>
<textarea id="feedback" maxlength="200" rows="4"></textarea>
<p><span id="chars-left">200</span> characters remaining</p>

<script>
  const area = document.getElementById('feedback');
  const count = document.getElementById('chars-left');
  area.addEventListener('input', () => {
    count.textContent = 200 - area.value.length;
  });
</script>
```

---

### Q87: Write an HTML audio playlist with JavaScript track switching.
```html
<audio id="player" controls>
  <source id="audio-src" src="/tracks/track1.mp3" type="audio/mpeg">
</audio>

<ul class="playlist">
  <li><button type="button" data-src="/tracks/track1.mp3">Track 1: Foundations</button></li>
  <li><button type="button" data-src="/tracks/track2.mp3">Track 2: Scaled Systems</button></li>
</ul>

<script>
  const player = document.getElementById('player');
  const src = document.getElementById('audio-src');
  document.querySelectorAll('.playlist button').forEach(btn => {
    btn.addEventListener('click', () => {
      src.src = btn.dataset.src;
      player.load();
      player.play();
    });
  });
</script>
```

---

### Q88: Code a native SVG with gradients and accessible title/description tags.
```html
<svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-labelledby="svg-title svg-desc">
  <title id="svg-title">Gradient Sphere</title>
  <desc id="svg-desc">A 3D shaded sphere transitioning from indigo to purple.</desc>
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#9333ea;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
</svg>
```

---

### Q89: Implement an auto-expanding `<textarea>` without layout recalculation bugs.
```html
<textarea id="auto-expand" rows="1" placeholder="Write a comment..."></textarea>

<script>
  const tx = document.getElementById('auto-expand');
  tx.addEventListener('input', () => {
    tx.style.height = 'auto';
    tx.style.height = (tx.scrollHeight) + 'px';
  });
</script>
```

---

### Q90: Create an accessible password visibility toggle widget.
```html
<div class="password-wrap">
  <label for="pwd">Password:</label>
  <input type="password" id="pwd" name="password" required>
  <button type="button" id="toggle-pwd" aria-label="Show password as plain text">Show</button>
</div>

<script>
  const pwd = document.getElementById('pwd');
  const toggleBtn = document.getElementById('toggle-pwd');
  toggleBtn.addEventListener('click', () => {
    const isPass = pwd.type === 'password';
    pwd.type = isPass ? 'text' : 'password';
    toggleBtn.textContent = isPass ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password as plain text');
  });
</script>
```

---

### Q91: Code an accessible tablist interface matching WAI-ARIA authoring practices.
```html
<div class="tabs">
  <div role="tablist" aria-label="Account Settings">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Profile</button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">Security</button>
  </div>
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    <h3>Profile Information</h3>
  </div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <h3>Security Settings</h3>
  </div>
</div>
```

---

### Q92: Markup a file drag-and-drop dropzone with visual cue classes.
```html
<div id="dropzone" class="dropzone" role="region" aria-label="File Upload Dropzone">
  <p>Drag and drop documents here or <label for="file-picker" class="browse-link">browse</label></p>
  <input type="file" id="file-picker" multiple class="sr-only">
</div>

<script>
  const dz = document.getElementById('dropzone');
  ['dragenter', 'dragover'].forEach(name => {
    dz.addEventListener(name, (e) => { e.preventDefault(); dz.classList.add('active'); });
  });
  ['dragleave', 'drop'].forEach(name => {
    dz.addEventListener(name, (e) => { e.preventDefault(); dz.classList.remove('active'); });
  });
</script>
```

---

### Q93: Code an accessible custom slider using ARIA slider roles and keyboard listeners.
```html
<div 
  id="custom-slider" 
  role="slider" 
  tabindex="0" 
  aria-valuemin="0" 
  aria-valuemax="100" 
  aria-valuenow="40" 
  aria-label="Server CPU Threshold Percentage">
  <span class="thumb" style="left: 40%;"></span>
</div>
```

---

### Q94: Implement a copy-to-clipboard button using the modern Navigator Clipboard API.
```html
<div class="code-box">
  <code id="install-cmd">npm install the-product-engineer</code>
  <button type="button" id="copy-btn">Copy</button>
</div>

<script>
  document.getElementById('copy-btn').addEventListener('click', async function() {
    const text = document.getElementById('install-cmd').innerText;
    await navigator.clipboard.writeText(text);
    this.textContent = 'Copied!';
    setTimeout(() => this.textContent = 'Copy', 2000);
  });
</script>
```

---

### Q95: Code an HTML Geolocation permission check.
```html
<button id="geo-btn" type="button">Locate Nearest Server Node</button>
<p id="geo-status"></p>

<script>
  document.getElementById('geo-btn').addEventListener('click', () => {
    if (!navigator.geolocation) {
      document.getElementById('geo-status').textContent = 'Geolocation is not supported by your browser.';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        document.getElementById('geo-status').textContent = `Lat: ${pos.coords.latitude}, Lon: ${pos.coords.longitude}`;
      },
      (err) => {
        document.getElementById('geo-status').textContent = `Error: ${err.message}`;
      }
    );
  });
</script>
```

---

### Q96: Implement an accessible alert banner that can be dismissed.
```html
<div id="banner" role="status" class="alert-banner">
  <p>🚀 New architectural chapters published! Check out our System Design track.</p>
  <button type="button" aria-label="Dismiss banner" onclick="document.getElementById('banner').remove()">✕</button>
</div>
```

---

### Q97: Build a clean form that submits multipart data using JavaScript `FormData`.
```html
<form id="upload-form">
  <input type="text" name="title" value="Annual Architecture Report">
  <input type="file" name="pdf_file">
  <button type="submit">Upload</button>
</form>

<script>
  document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData // Automatically sets multipart/form-data boundary headers
    });
  });
</script>
```

---

### Q98: Code an HTML email input with a custom regex pattern enforcing organizational domains.
```html
<label for="corp-email">Corporate Email:</label>
<input 
  type="email" 
  id="corp-email" 
  name="corp_email" 
  pattern=".+@productengineer\.dev$" 
  title="Email must end with @productengineer.dev" 
  required>
```

---

### Q99: Implement a Web Component that uses Shadow DOM mode "closed".
```html
<custom-badge></custom-badge>

<script>
  customElements.define('custom-badge', class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'closed' });
      shadow.innerHTML = `<span style="background: #4f46e5; color: #fff; padding: 4px 8px; border-radius: 9999px;">Verified</span>`;
    }
  });
</script>
```

---

### Q100: Build a complete responsive HTML document layout with header, sidebar nav, main content, and footer.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Architecture Dashboard</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header>
    <a href="/" class="brand-logo">The Product Engineer</a>
    <nav aria-label="User Navigation">
      <a href="/profile">Profile</a>
      <a href="/logout">Logout</a>
    </nav>
  </header>

  <div class="layout-container">
    <aside aria-label="Sidebar Navigation">
      <nav>
        <ul>
          <li><a href="/frontend" aria-current="page">Frontend Architecture</a></li>
          <li><a href="/backend">Backend Systems</a></li>
          <li><a href="/interview">Interview Bank</a></li>
        </ul>
      </nav>
    </aside>

    <main id="main-content">
      <article>
        <h1>Distributed Caching Strategies</h1>
        <p>Details about Cache-Aside, Write-Through, and Cache Invalidation algorithms.</p>
      </article>
    </main>
  </div>

  <footer>
    <p>&copy; 2026 The Product Engineer. All rights reserved.</p>
  </footer>
</body>
</html>
```
