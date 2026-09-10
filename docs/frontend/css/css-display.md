# CSS Display Property

The `display` property is the most fundamental property for determining how an element behaves in the document flow and how its children are laid out.

## 1. Traditional Display Values

| Value | Starts on New Line? | Width Behavior | Respects `width` / `height`? | Respects Vertical Margin / Padding? |
| :--- | :--- | :--- | :--- | :--- |
| **`block`** | **Yes** | Expands to 100% of parent | **Yes** | **Yes** |
| **`inline`** | **No** | Shrinks to fit content | **No** (ignored) | Padding works visually; **vertical margins are ignored** |
| **`inline-block`** | **No** | Shrinks to fit content | **Yes** | **Yes** |
| **`none`** | N/A (removed from flow) | Hidden completely | N/A | N/A |

### Code Comparison

```css
/* Block elements (div, p, h1, section) */
.block-element {
  display: block;
  width: 100%;
  margin-block: 1rem;
}

/* Inline elements (span, a, strong) */
.inline-element {
  display: inline;
  /* width: 200px;  -> Ignored by browser! */
  /* margin-top: 20px; -> Ignored by browser! */
}

/* Inline-block: Flows with text while allowing custom box sizing */
.badge-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  width: 120px;
  height: 40px;
}
```

## 2. Layout Container Displays: Flex & Grid

Setting `display: flex` or `display: grid` turns the element into a formatting context container for its immediate children.

```css
/* Flex container: 1-dimensional row or column layout */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid container: 2-dimensional row and column system */
.photo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Inline variants: Behaves like inline-block externally, but flex/grid internally */
.inline-tag-list {
  display: inline-flex;
  gap: 0.5rem;
}
```

## 3. Special Display Values

### `display: none` vs `visibility: hidden`

| Property | Present in DOM? | Occupies Layout Space? | Accessible to Screen Readers? |
| :--- | :--- | :--- | :--- |
| `display: none` | Yes | **No** (completely collapsed) | **No** (ignored) |
| `visibility: hidden` | Yes | **Yes** (empty invisible gap remains) | **No** |
| `opacity: 0` | Yes | **Yes** (fully interactive unless disabled) | **Yes** |

```css
/* Accessible screen-reader-only utility (visually hidden but accessible) */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### `display: contents`

`display: contents` removes the container box from the render tree while keeping all its child elements intact. The child elements render as if they were direct children of the parent's parent.

```css
/* Card wrapper disappears; children become direct grid items of .grid-parent */
.card-wrapper {
  display: contents;
}
```

### `display: flow-root` (Modern BFC Creation)

Creates a new **Block Formatting Context (BFC)**. It cleanly contains internal floated elements and prevents margin collapsing with parent containers without the unwanted side-effects of `overflow: hidden`.

```css
.container-clear {
  display: flow-root; /* Contains all internal floats & clears margins cleanly */
}
```

## 4. Modern Multi-Keyword `display` Syntax

Modern CSS specifications divide `display` into two explicit roles:
1. **Outer Display**: How the box interacts with its siblings (`block` or `inline`).
2. **Inner Display**: How the box formats its children (`flow`, `flex`, `grid`).

```css
/* Traditional single keywords */
display: flex;         /* Outer: block,  Inner: flex */
display: inline-flex;  /* Outer: inline, Inner: flex */

/* Modern explicit 2-keyword syntax (Supported in modern browsers) */
.modern-box {
  display: block flex;   /* Block outer container with flexbox children */
}

.modern-badge {
  display: inline flex;  /* Inline outer container with flexbox children */
}
```
