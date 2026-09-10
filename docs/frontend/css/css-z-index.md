# CSS Z-Index & Stacking Contexts

The `z-index` property controls the vertical stacking order of elements along the virtual Z-axis (depth perpendicular to the screen).

While `z-index` seems straightforward, stacking issues often arise due to **Stacking Contexts**.

```
Screen Surface (User Viewpoint)
         ↑
       [ Z: 10 ]  Top Layer (Modals)
       [ Z: 5  ]  Middle Layer (Dropdowns)
       [ Z: 1  ]  Base Layer (Cards)
       [ Z: 0  ]  Default Flow
         ↓
Screen Background
```

## 1. When Does `z-index` Work?

`z-index` is **ignored** on static elements in normal flow. It only takes effect on:
1. Positioned elements (`position: relative`, `absolute`, `fixed`, or `sticky`).
2. Direct children of **Flexbox** (`display: flex`) or **CSS Grid** (`display: grid`) containers (even with `position: static`).

```css
/* Ignored: z-index has no effect because element is static */
div {
  z-index: 100; 
}

/* Works: Positioned element */
.dropdown {
  position: relative;
  z-index: 10;
}

/* Works: Direct flex child */
.flex-parent {
  display: flex;
}
.flex-parent > .badge {
  z-index: 5; /* Valid without position: relative */
}
```

## 2. What is a Stacking Context?

A **Stacking Context** is a three-dimensional boundary formed by an element in the DOM tree.

Inside a stacking context, child elements are stacked relative to each other. However, the entire context is flattened and treated as a single atomic unit within its parent stacking context.

> [!IMPORTANT]
> **The Stacking Context Trap**: A child element with `z-index: 999999` can **never** appear above a sibling container with `z-index: 2` if the child's parent container has a `z-index: 1`.

```
Root Stacking Context
├── Container A (z-index: 1)
│   └── Tooltip (z-index: 999999)  <-- Trapped inside Container A!
└── Container B (z-index: 2)       <-- Wins over Tooltip because Container B > Container A
```

## 3. What Triggers a Stacking Context?

A new stacking context is formed by any of the following conditions:

- The root element of the document (`<html>`).
- `position: absolute` or `relative` with a `z-index` other than `auto`.
- `position: fixed` or `sticky`.
- `opacity` with a value less than `1`.
- `transform`, `filter`, `perspective`, `clip-path`, or `mask` with a value other than `none`.
- `contain` with `layout`, `paint`, or `strict`.
- `isolation: isolate` (The clean, intentional way to create a stacking context).

## 4. Solving Stacking Bugs with `isolation: isolate`

Instead of using hacks like `position: relative; z-index: 0; transform: translateZ(0);`, modern CSS provides the `isolation: isolate` property to explicitly establish a fresh stacking context without modifying coordinates or rendering pipelines.

```css
/* Cleanly traps all internal pseudo-elements & child layers */
.card-component {
  isolation: isolate;
  position: relative;
}

.card-component::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #4f46e5, #06b6d4);
  z-index: -1; /* Safely stays behind card text without disappearing behind page body */
}
```

## 5. Design System Z-Index Scale Strategy

Avoid arbitrary `z-index` numbers (`100`, `999`, `999999`). Define structured design tokens using CSS Custom Properties:

```css
:root {
  --z-negative: -1;
  --z-base: 0;
  --z-elevated: 10;
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-drawer: 700;
  --z-modal-backdrop: 900;
  --z-modal: 1000;
  --z-popover: 1100;
  --z-toast: 1200;
  --z-tooltip: 1300;
}

/* Clear, predictable layering */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal-backdrop);
}

.modal-dialog {
  position: fixed;
  z-index: var(--z-modal);
}
```
