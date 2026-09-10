# CSS Grid Layout

CSS Grid is a two-dimensional layout system designed for structuring user interfaces in both rows and columns simultaneously.

Flexbox is ideal for **1D linear components** (navbars, button groups), while CSS Grid excels at **2D page layouts, multi-column cards, and dashboard architectures**.

```
+-------------------------------------------------------+
|  Col 1 (1fr)       |  Col 2 (1fr)       | Col 3 (1fr) |
|--------------------+--------------------+-------------|
|  Item 1            |  Item 2            | Item 3      |
|--------------------+--------------------+-------------|
|  Item 4 (Spans 2 columns)               | Item 5      |
+-------------------------------------------------------+
```

## 1. Grid Container Properties

```css
.grid-container {
  display: grid;
  grid-template-columns: 240px 1fr 300px; /* Fixed, Fluid, Fixed columns */
  grid-template-rows: auto 1fr auto;      /* Header, Main Content, Footer */
  gap: 1.5rem;                            /* Space between rows and columns */
}
```

### The `fr` (Fractional) Unit
The `fr` unit represents a fraction of the remaining free space in the grid container.

```css
/* 3 equal-width columns */
.equal-columns {
  grid-template-columns: 1fr 1fr 1fr;
  /* Shorthand equivalent: */
  grid-template-columns: repeat(3, 1fr);
}
```

## 2. The Auto-Fit Responsive Card Grid Pattern

Create a responsive, self-adapting card grid that adjusts column count based on viewport width **without writing a single media query**:

```css
.responsive-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

### `auto-fit` vs `auto-fill`

| Keyword | When Items Don't Fill Container Width |
| :--- | :--- |
| **`auto-fit`** (Most Common) | Empty tracks collapse to `0px`; existing items **stretch** to fill the full width. |
| **`auto-fill`** | Empty tracks are preserved as blank columns; items **keep their fixed width**. |

## 3. Named Layout Areas (`grid-template-areas`)

Visually diagram complete page layouts using ASCII-like template areas:

```css
.app-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 64px 1fr 60px;
  min-height: 100vh;
}

/* Assign items to areas */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

## 4. Positioning & Spanning Grid Items

Grid lines are numbered starting at `1` (positive from start) and `-1` (from end edge).

```css
.hero-card {
  /* Starts at column line 1 and spans across 2 columns */
  grid-column: 1 / span 2;
}

.full-bleed-banner {
  /* Spans across the entire grid width from first to last line */
  grid-column: 1 / -1;
}

.tall-sidebar {
  /* Spans from row 1 to row 3 */
  grid-row: 1 / 3;
}
```

## 5. Modern CSS Subgrid (`subgrid`)

In traditional CSS Grid, nested child cards cannot align their internal headers and footers with neighboring sibling cards because child elements live inside their own independent box model.

Modern CSS **Subgrid** allows a child grid to inherit the track definitions of its parent grid:

```css
.parent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.card {
  display: grid;
  /* Card rows span 3 parent tracks and inherit their row sizing! */
  grid-row: span 3;
  grid-template-rows: subgrid;
}

.card-header { /* Perfectly aligned across all 3 cards */ }
.card-body   { /* Flexibly stretches */ }
.card-footer { /* Pinned and aligned evenly at bottom across all 3 cards */ }
```

## 6. Grid Centering Shorthand

The fastest way to center any content in modern CSS:

```css
.center-box {
  display: grid;
  place-items: center; /* Centers both horizontally & vertically */
  min-height: 100vh;
}
```
