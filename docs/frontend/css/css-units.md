# CSS Units & Measurements

CSS uses various measurement units to express lengths, typography sizes, spacing, and viewport dimensions. Choosing the correct unit ensures responsive, accessible, and fluid layouts across mobile and desktop devices.

## 1. Absolute Units

Absolute units are fixed physical dimensions. They are not influenced by user zoom settings, browser preferences, or parent element sizing.

| Unit | Name | Real-world Equivalent |
| :--- | :--- | :--- |
| `px` | Pixels | $1\text{px} = 1/96\text{th of an inch}$ (device-independent standard) |
| `pt` | Points | $1\text{pt} = 1/72\text{th of an inch}$ (used in print stylesheets) |
| `cm` / `mm` | Centimeters / Millimeters | Physical print measurement |

```css
/* Good for 1px crisp borders, shadows, or fixed hardware constraints */
.card {
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

> [!WARNING]
> Never set body `font-size` in `px`. If a user with visual impairments increases their browser's default font size from `16px` to `24px`, hardcoded `px` values ignore their setting and harm accessibility.

## 2. Font-Relative Units (`rem` vs `em`)

### `rem` (Root EM)
Calculated relative to the `font-size` of the root `<html>` element (default browser root is `16px`).

```css
/* If root font-size is 16px (browser standard):
   1rem  = 16px
   1.25rem = 20px
   1.5rem  = 24px
   2rem  = 32px
*/

h1 {
  font-size: 2rem;    /* 32px */
  margin-bottom: 1rem; /* 16px */
}
```

### `em` (Element EM)
Calculated relative to the `font-size` of the **current element** (or its immediate parent if used for `font-size`).

```css
/* em creates compound multiplication when nested */
.button {
  font-size: 14px;
  padding: 0.5em 1em; /* padding: 7px 14px (scales with button font size) */
}

.button-large {
  font-size: 20px;
  padding: 0.5em 1em; /* padding: 10px 20px (scales automatically!) */
}
```

### Character Units (`ch`, `ex`)
- `ch`: Width of the `0` (zero) glyph in the current font. Ideal for limiting line lengths for optimal readability (45–75 characters per line).
- `ex`: Height of lowercase `x` in the current font.

```css
/* Optimal readability container */
article p {
  max-width: 65ch;
  line-height: 1.7;
}
```

## 3. Viewport-Relative Units

Viewport units scale relative to the browser window dimensions ($1\text{vw} = 1\%\text{ of viewport width}$).

```
Viewport: 100vw wide, 100vh tall
1vw = 1% of viewport width
1vh = 1% of viewport height
```

| Unit | Meaning |
| :--- | :--- |
| `vw` | 1% of browser viewport width |
| `vh` | 1% of browser viewport height |
| `vmin` | 1% of the **smaller** dimension (`min(vw, vh)`) |
| `vmax` | 1% of the **larger** dimension (`max(vw, vh)`) |

## 4. Modern Mobile Viewport Units (`dvh`, `svh`, `lvh`)

On mobile browsers, the URL address bar and bottom navigation expand and collapse dynamically, causing `100vh` to overflow and hide content beneath browser toolbars. Modern CSS solves this with three distinct viewport modes:

| Unit | Name | Behavior |
| :--- | :--- | :--- |
| `svh` / `svw` | **Small Viewport** | Height when mobile URL bar is **fully expanded** (safest minimum area). |
| `lvh` / `lvw` | **Large Viewport** | Height when mobile URL bar is **hidden/collapsed**. |
| `dvh` / `dvw` | **Dynamic Viewport** | Height **adapts in real-time** as user scrolls and bars shrink/grow. |

```css
/* Full height mobile modal screen without toolbar overflow */
.hero-full-screen {
  min-height: 100dvh;
}
```

## 5. Container Query Units (`cqw`, `cqh`, `cqi`, `cqb`)

Container query units allow components to size themselves based on the dimensions of their parent container rather than the global browser window.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Sized relative to the parent container width */
.card-title {
  font-size: clamp(1rem, 5cqw, 2rem);
}
```

## 6. Percentages (`%`)

Percentage values resolve against different parent properties depending on what property they are applied to:

| Property | Percentage Resolves Relative To |
| :--- | :--- |
| `width`, `max-width`, `min-width` | Parent container's **width** |
| `height`, `max-height`, `min-height` | Parent container's **explicit height** |
| `padding`, `margin` (both vertical & horizontal!) | Parent container's **width** |
| `transform: translate(-50%, -50%)` | **The element's own** dimensions |
| `top`, `bottom` (positioned) | Containing block's **height** |
| `left`, `right` (positioned) | Containing block's **width** |

## Best Practices Matrix: When to Use What

| Layout Context | Recommended Unit | Reason |
| :--- | :--- | :--- |
| **Typography (`font-size`)** | `rem` | Respects user OS & browser accessibility font scaling. |
| **Paddings & Spacings** | `rem` | Maintains balanced rhythm consistent with font scale. |
| **Component Buttons / Badges** | `em` (padding) | Button padding automatically scales when font size changes. |
| **Readable Paragraph Width** | `ch` (`60ch`–`75ch`) | Prevents excessive line lengths and reading fatigue. |
| **Fluid Hero Sections** | `dvh` / `vw` | Adapts cleanly to mobile toolbars and screen sizes. |
| **Grid & Multi-column** | `fr`, `%`, `flex` | Distributes available spatial fractions predictably. |
| **Hairline Borders & Outlines** | `px` | Predictable physical rendering without rounding distortions. |
