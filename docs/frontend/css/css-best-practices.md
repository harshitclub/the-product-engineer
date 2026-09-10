# Modern CSS Best Practices & Architecture

Writing maintainable, performant, and scalable CSS requires structured architectural conventions and defensive coding techniques.

## 1. Architectural Methodologies

### 1. Cascade Layers (`@layer`) — Modern Standard
Organize stylesheets into explicit architectural tiers to eliminate specificity conflicts:

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: 'Plus Jakarta Sans', sans-serif; color: #0f172a; }
  h1, h2, h3 { line-height: 1.2; }
}

@layer components {
  .btn { display: inline-flex; padding: 0.5rem 1rem; border-radius: 6px; }
}

@layer utilities {
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; }
}
```

### 2. BEM (Block, Element, Modifier) Naming
Maintains flat selector specificity (`0-1-0`) and explicit component encapsulation:

```css
/* Block: Independent component */
.card {}

/* Element: Dependent sub-part of block */
.card__title {}
.card__body {}
.card__button {}

/* Modifier: Variation or state flag */
.card--featured {}
.card__button--disabled {}
```

## 2. Defensive CSS Strategies

Defensive CSS is the practice of writing declarations that prevent UI layouts from breaking when real-world content fluctuates (e.g. unexpectedly long names, missing translations, or broken avatars).

```css
/* 1. Prevent long text / URLs from overflowing container cards */
.user-bio {
  overflow-wrap: break-word;
  hyphens: auto;
}

/* 2. Prevent avatar image distortion */
.avatar-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover; /* Prevents stretching/squishing when aspect ratios vary */
}

/* 3. Defensive container constraints */
.dialog-box {
  width: 100%;
  max-width: 540px; /* Never exceeds 540px on desktop */
  margin-inline: auto;
}

/* 4. Touch target accessibility */
.mobile-nav-link {
  min-height: 44px; /* Meets WCAG minimum touch target size */
  display: flex;
  align-items: center;
}
```

## 3. Rendering Performance Checklist

| Rule | Recommended Pattern | Antipattern to Avoid |
| :--- | :--- | :--- |
| **Animation Properties** | Animate `transform` and `opacity` (GPU accelerated) | Animating `top`, `left`, `margin`, `width`, `height` |
| **CSS Imports** | Link stylesheets via HTML `<link rel="stylesheet">` | `@import url(...)` inside CSS (blocks parallel network waterfall) |
| **Font Loading** | Use `.woff2` + `font-display: swap` | Large uncompressed `.ttf` / `.otf` fonts |
| **Selector Complexity** | Single class names (`.nav-link`) | Deep descendant chains (`body > div.app header nav ul li a`) |
| **Transitions** | Explicit properties (`transition: transform 0.2s`) | `transition: all 0.2s` |

## 4. Design System Tokens Setup

Consolidate all design tokens into standardized CSS Custom Properties:

```css
:root {
  /* Color Palette */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-surface: #ffffff;
  --color-background: #f8fafc;
  --color-text-main: #0f172a;
  --color-text-muted: #64748b;

  /* Typography Scale */
  --font-family-sans: 'Plus Jakarta Sans', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;

  /* Spacing Scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Elevation Shadows */
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
  --shadow-modal: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-full: 9999px;
}
```

## Summary Checklist for Production CSS

- Always use the universal `box-sizing: border-box` reset.
- Write mobile-first with `min-width` or modern `@media (width >= ...)` range queries.
- Use `rem` for typography and spacing; use `px` for thin borders and shadows.
- Isolate components and leverage CSS variables for dynamic theming.
- Animate only GPU-accelerated compositing properties (`transform` and `opacity`).
- Never use `!important` to fix specificity bugs in author stylesheets.
