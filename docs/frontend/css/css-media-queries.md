# CSS Media Queries & User Preferences

Media Queries are CSS conditional directives that apply specific style declarations based on device characteristics, viewport dimensions, screen resolutions, and operating system accessibility preferences.

## 1. Syntax: Traditional vs Modern Range Syntax

Modern CSS supports mathematical comparison operators (`>=`, `<=`, `<`), which are more intuitive than legacy `min-width` / `max-width` syntax.

```css
/* Traditional Syntax */
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .sidebar { width: 240px; }
}

/* Modern Range Syntax (Supported across all modern browsers) */
@media screen and (768px <= width < 1024px) {
  .sidebar { width: 240px; }
}

@media (width >= 1024px) {
  .container { max-width: 960px; }
}
```

## 2. Standard Responsive Breakpoints

While breakpoints should ideally be guided by content rather than specific device models, standard industry benchmarks provide a dependable baseline:

| Breakpoint Token | Width Boundary | Device Category Target |
| :--- | :--- | :--- |
| `sm` | `width >= 640px` | Large smartphones / phablets (landscape) |
| `md` | `width >= 768px` | Tablets (portrait) |
| `lg` | `width >= 1024px` | Laptops / Tablets (landscape) |
| `xl` | `width >= 1280px` | Standard desktop monitors |
| `2xl` | `width >= 1536px` | Large widescreen monitors |

## 3. Detecting Touch vs Pointer Input (`hover` & `pointer`)

Relying solely on screen width to differentiate between mobile phones and desktops is flawed (e.g. iPad Pro has desktop resolution but touch input). Use pointer interaction media queries instead:

```css
/* Apply hover effects ONLY on devices that actually have a mouse/stylus */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}

/* Touchscreens (smartphones, tablets) */
@media (pointer: coarse) {
  .nav-link,
  .button {
    min-height: 44px; /* Ensure accessible touch target size */
    padding: 0.75rem 1rem;
  }
}
```

## 4. User Preference Queries (Accessibility & OS Settings)

### `prefers-color-scheme` (Dark Mode)
Detects whether the user has enabled Dark Mode in their operating system.

```css
:root {
  --bg-color: #ffffff;
  --text-color: #0f172a;
  --card-bg: #f8fafc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #0b0f19;
    --text-color: #f8fafc;
    --card-bg: #1e293b;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

### `prefers-reduced-motion` (Motion Sensitivity)
Mandatory for accessibility (WCAG). Respects users who experience vertigo, vestibular disorders, or motion sickness from animations.

```css
/* Disable animations and smooth scrolling for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### `prefers-contrast`
Detects high-contrast accessibility mode in Windows or macOS.

```css
@media (prefers-contrast: more) {
  .button {
    border: 2px solid #000000;
  }
}
```

## 5. Print Media Stylesheet (`@media print`)

Styles applied when a user prints or saves a webpage to PDF:

```css
@media print {
  /* Hide non-printable navigation, sidebars, and ads */
  header, nav, footer, .sidebar, .ads {
    display: none !important;
  }

  /* Force clean black text on white background to save ink */
  body {
    background: #ffffff !important;
    color: #000000 !important;
    font-size: 12pt;
  }

  /* Print link URLs next to anchor text */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
  }
}
```
