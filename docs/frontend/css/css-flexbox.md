# CSS Flexbox (Flexible Box Layout)

CSS Flexible Box Layout (Flexbox) is a 1-dimensional layout model designed for distributing space and aligning items along a single axis (either horizontally as a row or vertically as a column).

## The Flexbox Architecture

Flexbox distinguishes strictly between the **Flex Container** (the parent) and **Flex Items** (direct children).

```
                 MAIN AXIS (flex-direction: row)
   ------------------------------------------------------------>
  +------------------------------------------------------------+
  |  +---------------+  +---------------+  +---------------+   |
C |  |  Flex Item 1  |  |  Flex Item 2  |  |  Flex Item 3  |   |
R |  +---------------+  +---------------+  +---------------+   |
O |                                                            |
S |                                                            |
S |                                                            |
  +------------------------------------------------------------+
  AXIS
```

## 1. Flex Container Properties

Applied to the parent element with `display: flex` or `display: inline-flex`.

### `flex-direction`
Establishes the main axis direction.

- `row` (Default): Left-to-right horizontal flow.
- `row-reverse`: Right-to-left horizontal flow.
- `column`: Top-to-bottom vertical flow.
- `column-reverse`: Bottom-to-top vertical flow.

### `justify-content` (Main Axis Alignment)
Controls how remaining space is distributed along the **main axis**.

```css
.container {
  display: flex;
  justify-content: flex-start;    /* Items packed at start */
  justify-content: flex-end;      /* Items packed at end */
  justify-content: center;        /* Items centered */
  justify-content: space-between; /* Equal space between items; edges touch container */
  justify-content: space-around;  /* Equal space around items; half-space at edges */
  justify-content: space-evenly;  /* Equal space between items and edges */
}
```

### `align-items` (Cross Axis Alignment)
Controls alignment across the **cross axis** within the current flex line.

```css
.container {
  align-items: stretch;     /* Default: Items stretch to fill container height */
  align-items: center;      /* Items centered on cross axis */
  align-items: flex-start;  /* Aligned at start edge */
  align-items: flex-end;    /* Aligned at end edge */
  align-items: baseline;    /* Aligned according to their text baselines */
}
```

### `flex-wrap` & `gap`

```css
.container {
  display: flex;
  flex-wrap: wrap; /* Allows items to break into multiple lines */
  gap: 1.5rem;     /* Row and column spacing between items without margins */
}
```

### `align-content` (Multi-Line Cross Axis Alignment)
Controls spacing between flex rows when `flex-wrap: wrap` causes content to span multiple lines.

```css
.container {
  align-content: space-between; /* Distributes rows evenly across vertical space */
}
```

## 2. Flex Item Properties

Applied directly to the child elements inside the flex container.

### `flex-grow`, `flex-shrink`, and `flex-basis`

| Property | Default | Description |
| :--- | :--- | :--- |
| **`flex-grow`** | `0` | Proportional ability of the item to expand into available positive free space. |
| **`flex-shrink`** | `1` | Proportional ability of the item to shrink when space is constrained. |
| **`flex-basis`** | `auto` | The initial default size of the item before remaining space is distributed. |

### The `flex` Shorthand Syntax

Always prefer the `flex` shorthand property instead of writing individual grow/shrink/basis declarations:

$$\text{Syntax: } \text{flex}: \text{[flex-grow]} \text{ [flex-shrink]} \text{ [flex-basis]};$$

```css
/* 1. Equal flexible column */
.item-fluid {
  flex: 1; /* Expands to: flex: 1 1 0%; */
}

/* 2. Rigid fixed-width item (never shrinks, never grows) */
.sidebar {
  flex: 0 0 280px; /* Fixed at 280px */
}

/* 3. Intrinsic auto-sizing item (scales with content) */
.item-auto {
  flex: 0 0 auto; /* Default browser-like behavior */
}
```

### `align-self`
Overrides the container's `align-items` setting for an individual item.

```css
.item-custom {
  align-self: flex-end; /* Sits at bottom edge while siblings stay centered */
}
```

### `order`
Changes visual rendering order without altering HTML DOM order (default is `0`).

```css
.badge-first {
  order: -1; /* Renders visually before standard items */
}
```

## 3. The `margin: auto` Flexbox Superpower

Inside a Flexbox container, setting `margin-left: auto` or `margin-inline-start: auto` on a single item consumes **all remaining positive space on that side**, pushing that item (and subsequent siblings) to the far edge.

```css
/* Navigation bar pattern */
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-brand {
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-left: 2rem;
}

.nav-user-profile {
  /* Automatically pushes profile button to the far right edge */
  margin-left: auto;
}
```

## 4. Perfect Centering Pattern

The cleanest way to center any content horizontally and vertically:

```css
.perfect-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```
