# Responsive Web Design (RWD)

Responsive Web Design (RWD) is the practice of designing web layouts that adapt fluidly across devices of varying screen sizes, pixel densities, and orientations—from compact smartphones to ultra-wide desktop monitors.

## The Three Pillars of Responsive Design

```
Responsive Design
├── 1. Fluid Layout Grids (Flexbox, CSS Grid, Percentages, fr)
├── 2. Flexible Media (Responsive images, videos, svgs)
└── 3. Media & Container Queries (Breakpoints & component-level queries)
```

## 1. The Mandatory Viewport Meta Tag

Without this meta tag inside HTML `<head>`, mobile browsers render pages at a legacy virtual desktop width of `980px` and scale it down, resulting in tiny, unreadable text.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `width=device-width`: Matches the page width to the screen's physical device-independent pixels.
- `initial-scale=1.0`: Sets initial zoom scale to 1:1 on page load.

## 2. Mobile-First vs Desktop-First Strategy

### Mobile-First (Industry Standard Practice)
Styles are written for small mobile screens first as the baseline default. Larger screens are progressively enhanced using `min-width` media queries.

```css
/* Baseline default: Mobile single-column */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and above: 2 columns */
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop and above: 4 columns */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

> [!TIP]
> Mobile-first architecture results in cleaner, more performant CSS because mobile devices (which often have lower CPU power and mobile data constraints) execute the base stylesheet rules without processing multiple desktop overrides.

## 3. Modern Fluid Typography with `clamp()`

Rather than writing multiple media queries for font sizes at every breakpoint, modern CSS uses `clamp()` for mathematical, fluid scaling between minimum and maximum bounds:

$$\text{Syntax: } \text{font-size}: \text{clamp}(\text{MIN}, \text{PREFERRED / FLUID}, \text{MAX});$$

```css
:root {
  /* Scales smoothly from 2rem (32px) on mobile up to 3.5rem (56px) on desktop */
  --font-hero: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);

  /* Scales smoothly from 1rem to 1.25rem */
  --font-body: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
}

h1.hero-title {
  font-size: var(--font-hero);
  line-height: 1.15;
}
```

## 4. Responsive Images & Media Rules

Prevent images and embedded media from overflowing their containers:

```css
/* Universal responsive image reset */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}
```

- `max-width: 100%`: Allows the image to shrink below its natural pixel width if the container narrows, but never stretch beyond its original size (preventing pixelation).
- `height: auto`: Preserves intrinsic aspect ratio.

## 5. Modern Container Queries (`@container`)

Media queries adapt to the **global browser viewport**. However, reusable UI components (like a profile card) often need to adapt based on the width of their **parent container** (e.g. placed in a narrow sidebar vs a wide main column).

```css
/* 1. Define container context on parent wrapper */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Component styles query the container size directly */
.user-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

/* When the card container has at least 450px available: */
@container card (min-width: 450px) {
  .user-card {
    flex-direction: row; /* Switch to horizontal layout */
    align-items: center;
    gap: 1.5rem;
  }
}
```
