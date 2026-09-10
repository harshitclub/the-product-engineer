# HTML Inline Elements

**Inline elements** are designed to format and decorate text fragments without breaking the natural reading flow of a paragraph. They only occupy as much horizontal width as required by their inner content.

## Characteristics of Inline Elements

```text
Sentence start [Inline 1] and [Inline 2] continues within the same line.
```

1. **No Line Break**: Does not start on a new line; sits side-by-side with adjacent text and other inline tags.
2. **Content-Driven Dimensions**: Only expands to fit the width and height of its inner text/content.
3. **Restricted Box Model**:
   * Horizontal spacing (`margin-left`, `margin-right`, `padding-left`, `padding-right`) works normally.
   * Vertical spacing (`margin-top` and `margin-bottom`) **has no effect** on pushing surrounding lines up or down.
   * Explicit CSS `width` and `height` properties are ignored by browsers on pure inline elements.
4. **Nesting Constraints**: Inline elements should only contain text nodes or other nested inline elements. They must **never** wrap block-level elements.

## Common Inline Elements

| Category | Elements |
| :--- | :--- |
| **Generic Text Span** | `<span>` |
| **Hyperlinks** | `<a>` |
| **Text Emphasis** | `<strong>`, `<em>`, `<b>`, `<i>`, `<mark>`, `<small>` |
| **Code & Technical** | `<code>`, `<kbd>`, `<samp>`, `<var>` |
| **Form Controls** | `<input>`, `<label>`, `<button>`, `<select>`, `<textarea>` |
| **Media (Replaced)** | `<img>`, `<svg>`, `<canvas>`, `<audio>`, `<video>` |
| **Punctuation & Edits** | `<q>`, `<cite>`, `<del>`, `<ins>`, `<sub>`, `<sup>` |

## Inline vs. Inline-Block

When you need an element to flow inline with surrounding text but require explicit control over `width`, `height`, or top/bottom `margin`, use CSS `display: inline-block`:

```css
/* Badges & Pill Tags */
.status-pill {
  display: inline-block; /* Honors width, height, and vertical margins */
  padding: 4px 12px;
  margin-right: 8px;
  border-radius: 4px;
}
```

## Summary Comparison Matrix

| Property | Block Elements (`<div>`, `<p>`, `<h1>`) | Inline Elements (`<span>`, `<a>`, `<strong>`) |
| :--- | :--- | :--- |
| **Starts on New Line** | Yes | No |
| **Default Width** | 100% of parent container | Width of its content |
| **Honors `width` / `height`** | Yes | No (ignored) |
| **Honors `margin-top` / `bottom`** | Yes | No (ignored) |
| **Can contain Block Elements** | Yes | No (Invalid HTML) |
