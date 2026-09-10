# The CSS Box Model

The CSS Box Model is the foundational layout engine of the web. Every HTML element rendered on a web page is treated by the browser as a rectangular box consisting of four concentric layers: **Content**, **Padding**, **Border**, and **Margin**.

```
+---------------------------------------------------+
|                      MARGIN                       |
|   +-------------------------------------------+   |
|   |                  BORDER                   |   |
|   |   +-----------------------------------+   |   |
|   |   |              PADDING              |   |   |
|   |   |   +---------------------------+   |   |   |
|   |   |   |                           |   |   |   |
|   |   |   |          CONTENT          |   |   |   |
|   |   |   |                           |   |   |   |
|   |   |   +---------------------------+   |   |   |
|   |   +-----------------------------------+   |   |
|   +-------------------------------------------+   |
+---------------------------------------------------+
```

## The Four Concentric Layers

| Layer | Function | Background Visible? |
| :--- | :--- | :--- |
| **Content** | Holds text, child elements, media, or images. Dimensions are controlled via `width` and `height`. | Yes |
| **Padding** | Clear space surrounding content inside the border. | Yes (inherits element background) |
| **Border** | Stroke wrapped around the padding and content. | Yes (border styles) |
| **Margin** | Transparent space outside the border separating the element from sibling elements. | No (always transparent) |

## `content-box` vs `border-box` (`box-sizing`)

The `box-sizing` property determines how the browser calculates the total rendered width and height of an element.

### 1. `content-box` (Legacy Default)
The declared `width` applies **only to the content area**. Any added padding or borders expand the total element footprint outwards.

$$\text{Total Width} = \text{width} + \text{padding-left} + \text{padding-right} + \text{border-left} + \text{border-right}$$

```css
.card-content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid #4f46e5;
  /* Total rendered width = 300 + 40 + 10 = 350px! */
}
```

### 2. `border-box` (The Modern Standard)
The declared `width` includes **content + padding + border**. The content area shrinks inward automatically to preserve the exact requested dimensions.

$$\text{Total Width} = \text{width (constant 300px)}$$

```css
.card-border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid #4f46e5;
  /* Total rendered width remains exactly 300px. Content width is 250px. */
}
```

## The Universal Box-Sizing Reset

To prevent layout calculations from breaking when padding or borders are added, modern CSS projects use the universal inheritance box-sizing reset:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

## Margin Collapsing

When two vertical margins touch in normal document flow, they do not add together. Instead, they **collapse into a single margin** equal to the largest of the two margins.

```css
.card-top {
  margin-bottom: 30px;
}

.card-bottom {
  margin-top: 20px;
}

/* The space between card-top and card-bottom is 30px (NOT 50px!) */
```

### Margin Collapsing Rules & Exceptions
Margin collapsing occurs **only**:
- Between vertical block margins (`margin-top` and `margin-bottom`).
- In standard normal document flow.

Margin collapsing **never occurs** when:
- Margins are horizontal (`margin-left` and `margin-right`).
- Elements are inside **Flexbox** (`display: flex`) or **CSS Grid** (`display: grid`).
- Elements are positioned absolutely (`position: absolute` or `fixed`).
- Elements have `float` applied.
- A parent has `overflow: hidden`, `padding`, or `border` separating it from its child.

## Borders vs Outlines

| Feature | `border` | `outline` |
| :--- | :--- | :--- |
| **Box Model Space** | Occupies physical space within the box model | Sits on top of the element **without taking space** |
| **Layout Shift** | Adding a border can trigger reflow/shifts | Zero layout shifts |
| **Border Radius** | Curves with `border-radius` | Supports `border-radius` in modern browsers |
| **Offset Support** | No offset property | Supports `outline-offset: 4px;` |
| **Primary Use Case** | Permanent component decoration | Keyboard focus indicators (`:focus-visible`) |

```css
/* Accessible keyboard focus ring without layout shifts */
button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 3px;
}
```
