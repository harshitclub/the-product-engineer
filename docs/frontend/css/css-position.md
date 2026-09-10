# CSS Positioning (`position`)

The `position` property defines how an element is placed on the screen, whether it remains in normal document flow, and what coordinate system its offsets (`top`, `right`, `bottom`, `left`, `inset`) calculate against.

## Positioning Schemes Overview

| Value | In Normal Flow? | Reference / Containing Block | Common Use Case |
| :--- | :--- | :--- | :--- |
| **`static`** | **Yes** | Normal document layout flow | Default state for all elements |
| **`relative`** | **Yes** | Element's own natural position | Offset adjustments, parent anchor for `absolute` |
| **`absolute`** | **No** (Removed) | Nearest ancestor with `position != static` | Badges, tooltips, dropdown menus |
| **`fixed`** | **No** (Removed) | Browser viewport | Sticky floating action buttons, modal backdrops |
| **`sticky`** | **Yes** | Normal flow until scroll threshold inside parent | Sticky table headers, navigation bars |

## 1. `position: static` (Default)
Elements render in natural sequence according to block and inline flow rules. Coordinate offsets (`top`, `right`, `bottom`, `left`, `inset`) and `z-index` have **no effect**.

## 2. `position: relative`
The element remains in the normal document flow and retains its exact physical layout space. Setting offsets shifts its visual appearance relative to where it would naturally sit without affecting neighboring elements.

```css
/* Moves 10px down from its natural position without shifting siblings */
.offset-box {
  position: relative;
  top: 10px;
  left: 15px;
}

/* Most common use: Establishing a coordinate anchor for absolute children */
.card-container {
  position: relative; /* Anchor point for absolute badge child */
}
```

## 3. `position: absolute`
The element is **completely removed from normal document flow**. Other elements act as if it does not exist. It positions itself relative to the closest ancestor element that has `position` set to anything other than `static` (e.g. `relative`, `absolute`, `fixed`, `sticky`). If no positioned ancestor exists, it calculates against the initial viewport.

```css
.card {
  position: relative; /* Ancestor anchor */
  padding: 1.5rem;
}

/* Notification badge anchored to top-right corner of card */
.card .badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ef4444;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
}
```

## 4. `position: fixed`
Removed from normal document flow and positioned directly relative to the **browser viewport**. It remains stationary on screen even when the user scrolls.

```css
/* Floating Action Button (FAB) pinned to bottom-right corner */
.floating-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

/* Fullscreen modal backdrop overlay */
.modal-overlay {
  position: fixed;
  inset: 0; /* Shorthand for top: 0; right: 0; bottom: 0; left: 0; */
  background-color: rgba(15, 23, 42, 0.6);
  z-index: 999;
}
```

## 5. `position: sticky`
A hybrid between `relative` and `fixed`. An element behaves as `relative` inside its parent until a specified scroll offset is reached, at which point it "sticks" in place until the parent container scrolls out of view.

```css
/* Sticky navigation bar */
.navbar-sticky {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}
```

> [!CAUTION]
> For `position: sticky` to work:
> 1. You **must** specify at least one threshold offset property (e.g. `top: 0`).
> 2. No ancestor element can have `overflow: hidden`, `overflow: auto`, or `overflow: scroll`, as this traps the scroll boundary.
> 3. Sticky elements only stick within their **immediate parent container**. Once the parent scrolls past, the sticky item scrolls off-screen with it.

## The Modern `inset` Shorthand

Instead of writing four individual offset properties, use `inset`:

```css
/* Traditional 4-line full-bleed cover */
.overlay-old {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Modern clean equivalent */
.overlay-new {
  inset: 0;
}

/* 2-value inset: [inset-block (top/bottom)] [inset-inline (left/right)] */
.centered-floating-card {
  position: fixed;
  inset: 10vh 5vw;
}
```

## Absolute Centering Patterns

```css
/* Method 1: Modern CSS (Grid/Flex - Preferred) */
.parent {
  display: grid;
  place-items: center;
}

/* Method 2: Classic Absolute + Transform Centering */
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Method 3: Absolute + Inset 0 + Margin Auto Centering (with fixed dimensions) */
.modal-box {
  position: fixed;
  inset: 0;
  width: 400px;
  height: 300px;
  margin: auto;
}
```
