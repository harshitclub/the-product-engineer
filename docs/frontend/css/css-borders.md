# CSS Borders & Radius

Borders define the boundary of an element's box model, providing structural separation, emphasis, and rounded geometry.

## Border Properties & Shorthand

A complete border declaration requires three components: **width**, **style**, and **color**.

```css
/* Individual properties */
.card {
  border-width: 2px;
  border-style: solid;
  border-color: #cbd5e1;
}

/* Shorthand: border: [width] [style] [color]; */
.card {
  border: 2px solid #cbd5e1;
}
```

### Available Border Styles

```css
.solid   { border-style: solid; }   /* Most common: continuous stroke */
.dashed  { border-style: dashed; }  /* Dashed stroke (file dropzones) */
.dotted  { border-style: dotted; }  /* Series of round dots */
.double  { border-style: double; }  /* Two parallel lines (requires >= 3px width) */
.none    { border-style: none; }    /* Removes border */
```

## Directional & Logical Borders

You can target specific edges individually using directional or modern logical properties:

```css
/* Target individual physical edges */
.sidebar {
  border-right: 1px solid #e2e8f0;
}

/* Modern logical border: adapts to reading direction */
.blockquote {
  border-inline-start: 4px solid #4f46e5; /* Left in LTR, Right in RTL */
  padding-inline-start: 1rem;
}

.footer {
  border-block-start: 1px solid #e2e8f0; /* Top border */
  padding-block-start: 2rem;
}
```

## `border-radius` & Corner Geometry

The `border-radius` property curves the outer corners of an element and clips the background and borders accordingly.

### 1. Uniform & Multi-Corner Values
Like margin and padding, `border-radius` follows clockwise order starting from the **top-left corner**:

```css
/* Uniform corner radius */
.card {
  border-radius: 8px; /* All 4 corners = 8px */
}

/* Clockwise: [top-left] [top-right] [bottom-right] [bottom-left] */
.asymmetric-badge {
  border-radius: 12px 0 12px 0;
}
```

### 2. Common UI Radius Patterns

```css
/* 1. Perfect Circle (requires identical width and height) */
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* 2. Pill / Capsule Badge (arbitrarily large radius) */
.pill-button {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px; /* Automatically caps at half the element height */
}

/* 3. Elliptical Corners (Horizontal / Vertical radii) */
.egg-shape {
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
```

## Border vs Outline vs Ring Shadow

When building interactive states (like focus rings or selected cards), choosing the right boundary technique prevents accidental layout shifts:

| Technique | Syntax | Box Model Impact | Rounded Corners? |
| :--- | :--- | :--- | :--- |
| **`border`** | `border: 2px solid #4f46e5;` | Occupies space (can cause 2px layout jitter if toggled) | Yes |
| **`outline`** | `outline: 2px solid #4f46e5;` | Floats outside without taking layout space | Yes (modern browsers) |
| **`box-shadow`** | `box-shadow: 0 0 0 2px #4f46e5;` | Zero layout impact; can layer multiple rings | Yes |

```css
/* Professional interactive card: Zero layout shifts on hover */
.interactive-card {
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.interactive-card:hover {
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px #4f46e5; /* Crisp simulated border */
}
```
