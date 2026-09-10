# CSS Custom Properties (Variables)

CSS Custom Properties (commonly called CSS Variables) are entities defined by CSS authors that contain specific values to be reused throughout a document.

Unlike static preprocessor variables (Sass/Less), CSS variables are **live DOM nodes**: they inherit down the document tree, update in real-time, respond to media queries, and can be read and mutated directly via JavaScript.

## 1. Syntax & Declaration

CSS custom property names must start with a double hyphen (`--`) and are **case-sensitive**.

```css
/* 1. Global Scope: Defined on root <html> element */
:root {
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --spacing-md: 1rem;
  --radius-lg: 12px;
}

/* 2. Consuming variables via var() */
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

### Fallback Values in `var()`
The `var()` function accepts an optional second argument as a fallback value if the requested variable is undefined:

```css
/* If --accent-color is not defined, uses #0f172a */
.badge {
  color: var(--accent-color, #0f172a);
}

/* Chained nested fallbacks */
.text {
  font-size: var(--user-font-size, var(--theme-font-size, 1rem));
}
```

## 2. Scope & Inheritance

Custom properties cascade and inherit through the DOM tree just like regular inherited CSS properties.

```css
:root {
  --card-bg: #ffffff; /* Global default */
}

.dark-theme-section {
  --card-bg: #1e293b; /* Local override for this subtree */
}

.card {
  background-color: var(--card-bg);
  /* Inside .dark-theme-section, card renders with #1e293b automatically! */
}
```

## 3. Dynamic Theming with Media Queries

Because CSS variables are dynamic, theming (like Dark Mode) only requires updating a few root tokens:

```css
:root {
  --bg-page: #f8fafc;
  --text-main: #0f172a;
  --border-subtle: #e2e8f0;
}

[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root {
    --bg-page: #0b0f19;
    --text-main: #f8fafc;
    --border-subtle: #1e293b;
  }
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
}
```

## 4. Real-time JavaScript Manipulation

JavaScript can dynamically inspect and update CSS custom properties at runtime:

```javascript
// Set a CSS custom property on the root
document.documentElement.style.setProperty('--brand-color', '#06b6d4');

// Get computed value of a custom property
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// Mouse follower effect: update coordinates on mouse move
window.addEventListener('pointermove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});
```

## 5. Typed CSS Variables with `@property`

Modern CSS allows you to register strongly typed custom properties using `@property`. This allows the browser to interpolate previously un-animatable properties, such as gradient angle stops!

```css
/* Register typed variable with syntax, inheritance, and initial value */
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.animated-gradient-border {
  --gradient-angle: 0deg;
  background: conic-gradient(from var(--gradient-angle), #4f46e5, #06b6d4, #4f46e5);
  animation: rotateGradient 4s linear infinite;
}

@keyframes rotateGradient {
  to {
    --gradient-angle: 360deg; /* Smoothly interpolated by browser! */
  }
}
```
