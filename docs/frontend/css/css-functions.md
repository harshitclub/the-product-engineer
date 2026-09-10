# CSS Functions & Mathematical Expressions

CSS provides powerful built-in mathematical, color, filter, and reference functions that allow dynamic calculation directly in the browser without preprocessor compilation.

## 1. Math Functions: `calc()`, `min()`, `max()`, and `clamp()`

### `calc()`
Performs arithmetic operations (`+`, `-`, `*`, `/`) across different mixed units (e.g., percentages and pixels).

```css
/* Sidebar offset calculation */
.content-area {
  width: calc(100% - 280px);
  margin-left: 280px;
}

/* Full height minus fixed header */
.main-view {
  min-height: calc(100vh - 64px);
}
```

> [!IMPORTANT]
> In `calc()`, operators `+` and `-` **must have whitespace around them** (e.g. `calc(100% - 20px)` is valid; `calc(100%-20px)` will fail to parse).

### `min()` and `max()`
Selects the smallest or largest computed value from a comma-separated list of expressions.

```css
/* Container shrinks with screen, but never exceeds 1200px */
.container {
  width: min(100% - 2rem, 1200px);
}

/* Button width expands with content, but is at least 140px wide */
.button {
  width: max(140px, 20vw);
}
```

### `clamp()` (Bounded Fluid Scaling)
Constrains a preferred fluid value between an explicit minimum and maximum bound:

$$\text{clamp}(\text{MIN}, \text{PREFERRED}, \text{MAX}) \equiv \max(\text{MIN}, \min(\text{PREFERRED}, \text{MAX}))$$

```css
.fluid-card {
  /* Scales smoothly with viewport width, clamped between 300px and 600px */
  width: clamp(300px, 50vw, 600px);
  padding: clamp(1rem, 3vw, 2.5rem);
}
```

## 2. Modern Stepped & Trigonometric Math Functions

Modern CSS natively supports advanced mathematical calculations:

```css
/* Rounding to nearest step */
.stepped-box {
  width: round(nearest, 33.3%, 50px);
}

/* Trigonometric functions for circular UI positioning */
.orbiting-icon {
  --radius: 120px;
  --angle: 45deg;
  left: calc(50% + var(--radius) * cos(var(--angle)));
  top: calc(50% + var(--radius) * sin(var(--angle)));
}

/* Power & square root */
.hypot-diagonal {
  width: hypot(300px, 400px); /* Exactly 500px (Pythagorean theorem!) */
}
```

## 3. Graphical Filter Functions (`filter` & `backdrop-filter`)

Filter functions apply visual effects to elements or the backdrop content behind them:

| Function | Example | Visual Effect |
| :--- | :--- | :--- |
| `blur(px)` | `blur(8px)` | Gaussian softening |
| `brightness(n)` | `brightness(1.2)` | Multiplies luminance (>1 lightens, <1 darkens) |
| `contrast(n)` | `contrast(1.5)` | Increases or decreases color contrast |
| `grayscale(n)` | `grayscale(100%)` | Converts full image to black and white |
| `drop-shadow()` | `drop-shadow(0 4px 6px rgba(0,0,0,0.1))` | Renders shadow following SVG/PNG alpha contours |
| `hue-rotate(deg)` | `hue-rotate(90deg)` | Shifts color wheel hue angle |
| `invert(n)` | `invert(100%)` | Inverts all color channels |

```css
/* Frosted Glass UI Effect (Glassmorphism) */
.frosted-nav {
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}
```

## 4. Modern Color & Image Functions

```css
/* Dynamic Color Mixing */
.tinted-surface {
  background-color: color-mix(in srgb, #4f46e5 15%, #ffffff);
}

/* External Resource Loading */
.hero-image {
  background-image: url('/assets/hero.webp');
}
```
