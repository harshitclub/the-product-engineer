# CSS Shadows & Elevation

Shadows create depth, visual hierarchy, and elevation cues across user interfaces. CSS provides three distinct shadow mechanisms: `box-shadow`, `text-shadow`, and `filter: drop-shadow()`.

## 1. `box-shadow` Anatomy

The `box-shadow` property casts a shadow from an element's rectangular frame.

$$\text{Syntax: } \text{box-shadow}: \text{[inset]} \text{ [offset-x]} \text{ [offset-y]} \text{ [blur-radius]} \text{ [spread-radius]} \text{ [color]};$$

```css
.card {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
```

### Parameter Breakdown

| Parameter | Meaning | Positive Value | Negative Value |
| :--- | :--- | :--- | :--- |
| **`inset`** (Optional) | Changes shadow from outer drop to internal well shadow. | Inside element | Outside element |
| **`offset-x`** (Required) | Horizontal displacement. | Right | Left |
| **`offset-y`** (Required) | Vertical displacement. | Down | Up |
| **`blur-radius`** | Softness of the shadow edge ($0 = \text{sharp}$). | Soft Gaussian blur | Not allowed |
| **`spread-radius`** | Expands or contracts the shadow size. | Expands outwards | Shrinks inwards |
| **`color`** | Color with alpha transparency. | e.g. `rgba(15, 23, 42, 0.08)` | |

## 2. Multi-Layer Shadows (Natural Depth)

A single harsh shadow looks artificial. Modern design systems layer 2 to 4 subtle shadows with negative spread radii to simulate natural ambient light diffusion:

```css
:root {
  /* Level 1: Resting card / subtle elevation */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  /* Level 2: Interactive card resting */
  --shadow-md:
    0 4px 6px -1px rgba(0, 0, 0, 0.08),
    0 2px 4px -2px rgba(0, 0, 0, 0.04);

  /* Level 3: Dropdowns & popovers */
  --shadow-lg:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 4px 6px -4px rgba(0, 0, 0, 0.04);

  /* Level 4: Floating Modals & Dialogs */
  --shadow-xl:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.04);
}

.card {
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

## 3. Inset Shadows & Well Effects

```css
/* Sunken search input well */
.input-well {
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
}

/* Pressed active button state */
.btn:active {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2);
}
```

## 4. `filter: drop-shadow()` vs `box-shadow`

| Feature | `box-shadow` | `filter: drop-shadow()` |
| :--- | :--- | :--- |
| **Geometry** | Casts shadow around the **rectangular box model** | Casts shadow around the **actual visible pixels** (transparent PNGs, SVGs, speech bubbles) |
| **Speech Bubble Triangles** | Ignores pseudo-element pointers | Perfectly shadows both the container **and** its `::after` triangle arrow |
| **Performance** | Highly optimized | Slightly higher GPU paint cost |
| **Spread Radius Support** | Supported | Not supported in standard spec |

```css
/* Perfect shadow conforming to transparent SVG logo / icon */
.transparent-logo {
  filter: drop-shadow(0 4px 8px rgba(79, 70, 229, 0.3));
}

/* Speech bubble with triangle: seamless unified shadow */
.speech-bubble {
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  /* Shadow wraps both bubble and its ::after pointer cleanly! */
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.speech-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 24px;
  border: 8px solid transparent;
  border-top-color: #ffffff;
}
```

## 5. `text-shadow`

Applies shadows behind typography glyphs.

```css
/* Shorthand: text-shadow: [offset-x] [offset-y] [blur-radius] [color]; */
.hero-heading-contrast {
  /* Subtle dark shadow to ensure legibility over busy background images */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* Neon glow effect using multi-layer text-shadow */
.neon-text {
  color: #ffffff;
  text-shadow:
    0 0 5px #4f46e5,
    0 0 10px #4f46e5,
    0 0 20px #06b6d4;
}
```
