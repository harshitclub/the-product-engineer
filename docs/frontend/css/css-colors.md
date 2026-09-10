# CSS Colors

CSS provides multiple color models and notations to define visual styles, ranging from classic hexadecimal strings to modern wide-gamut, perceptually uniform color spaces like `oklch()`.

## CSS Color Formats Overview

| Format | Syntax Example | Gamut Support | Perceptually Uniform? | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Named** | `rebeccapurple`, `navy` | sRGB | No | Quick prototyping |
| **Hex** | `#4f46e5`, `#ffffff` | sRGB | No | Traditional design tokens |
| **RGB** | `rgb(79 70 229 / 0.8)` | sRGB | No | Screen-based pixel modeling |
| **HSL** | `hsl(243 75% 59% / 0.8)` | sRGB | No | Human-readable adjustments |
| **OKLCH** | `oklch(0.55 0.22 278 / 0.8)` | Display P3 & Wide Gamut | **Yes** | Modern design systems |

## 1. Hexadecimal Colors (Hex)

Hex notation specifies red, green, and blue components using base-16 notation (`0-9`, `a-f`).

```css
/* 6-digit Hex: #RRGGBB */
.primary { color: #4f46e5; }

/* 8-digit Hex: #RRGGBBAA (with alpha transparency) */
.primary-translucent { color: #4f46e5cc; /* 80% opacity */ }

/* 3-digit shorthand: #RGB (expands to #RRGGBB) */
.white { color: #fff; /* #ffffff */ }

/* 4-digit shorthand: #RGBA */
.glass { color: #fff8; /* #ffffff88 */ }
```

## 2. RGB & RGBA

Modern CSS uses space-separated values with an optional forward slash `/` for alpha opacity.

```css
/* Modern space-separated syntax */
.badge {
  background-color: rgb(79 70 229);
  border-color: rgb(79 70 229 / 0.25); /* 25% opacity */
}

/* Legacy comma-separated syntax (supported everywhere) */
.badge-legacy {
  background-color: rgba(79, 70, 229, 0.25);
}
```

## 3. HSL (Hue, Saturation, Lightness)

HSL models colors in a human-friendly cylindrical coordinate space:
- **Hue ($H$)**: Degree on the color wheel from `0deg` to `360deg` (0 = Red, 120 = Green, 240 = Blue).
- **Saturation ($S$)**: Color intensity from `0%` (grayscale) to `100%` (vivid).
- **Lightness ($L$)**: Brightness from `0%` (pure black) to `100%` (pure white).

```css
.button {
  background-color: hsl(243 75% 59%);
}

.button:hover {
  /* Effortlessly lighten or darken by adjusting lightness parameter */
  background-color: hsl(243 75% 48%);
}
```

## 4. Modern OKLCH (The New Standard)

`oklch()` is the modern CSS standard for building consistent, accessible color palettes and design systems.

- **Lightness ($L$)**: `0%` to `100%` (or `0.0` to `1.0`) — **Perceptually uniform** (equal numbers mean equal perceived brightness across all hues).
- **Chroma ($C$)**: Color vibrancy/saturation (`0.0` to `~0.4`).
- **Hue ($H$)**: Hue angle (`0` to `360`).

```css
:root {
  /* Primary brand color */
  --color-primary: oklch(0.55 0.22 278);

  /* Hover state: predictably darker without shifting hue or contrast */
  --color-primary-hover: oklch(0.45 0.22 278);

  /* Subtle background tint */
  --color-primary-subtle: oklch(0.96 0.04 278);
}
```

> [!TIP]
> In legacy HSL, pure yellow (`hsl(60, 100%, 50%)`) looks significantly brighter to human eyes than pure blue (`hsl(240, 100%, 50%)`), making automated contrast calculation difficult. In `oklch`, lightness `0.6` in blue has the **exact same perceived luminance** as lightness `0.6` in yellow.

## 5. Special Keywords & Modern Functions

### `currentcolor`
Dynamically references the computed value of the element's current `color` property. Extremely useful for icons, SVG fills, and borders.

```css
.card {
  color: #4f46e5;
  /* Border and SVG automatically inherit #4f46e5 */
  border: 2px solid currentcolor;
}

.card svg {
  fill: currentcolor;
}
```

### `transparent`
Equivalent to `rgba(0, 0, 0, 0)`.

```css
button {
  background-color: transparent;
  border: 1px solid #cbd5e1;
}
```

### `color-mix()`
Enables dynamic blending of two colors directly in CSS without a build step or preprocessor.

```css
/* Mix 80% primary brand with 20% white for a soft hover tone */
.card-hover {
  background-color: color-mix(in srgb, #4f46e5 80%, #ffffff);
}

/* Mix brand color with transparent to create a modern glass overlay */
.overlay {
  background-color: color-mix(in srgb, #4f46e5 15%, transparent);
}
```

## Opacity vs Alpha Channel Transparency

| Technique | CSS Property | Visual Behavior |
| :--- | :--- | :--- |
| **Alpha Channel** | `rgb(r g b / 0.5)` or `oklch(L C H / 0.5)` | Only affects the background color; child text and icons remain **100% crisp and opaque**. |
| **Element Opacity** | `opacity: 0.5;` | Renders the entire element and **all its child contents** semi-transparent. |

```css
/* Preferred for backgrounds: Child text remains 100% opaque */
.modal-header {
  background-color: rgba(15, 23, 42, 0.75);
}

/* Fades the whole node and its descendants */
.disabled-item {
  opacity: 0.5;
  pointer-events: none;
}
```
