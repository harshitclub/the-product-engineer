# CSS Pseudo-Elements

A **Pseudo-Element** is a keyword preceded by a double colon (`::`) that lets you style a specific sub-part of an element's content, or insert generated cosmetic content into the DOM without adding extra HTML tags.

```
Pseudo-Class (:hover)      --> Targets the STATE of an existing element
Pseudo-Element (::before)  --> Creates or targets a SUB-PART of an element
```

## 1. Generated Content: `::before` & `::after`

`::before` and `::after` insert a virtual pseudo-box inside the target element as its first or last child.

> [!IMPORTANT]
> The `content: ""` property is **mandatory**. Without declaring `content` (even an empty string `content: '';`), the browser will not generate the pseudo-element in the render tree.

```css
/* Decorative badge dot */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981; /* Green active status indicator */
}

/* Tooltip arrow pattern */
.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #0f172a;
}
```

## 2. Text Content Pseudo-Elements

### `::first-letter` (Drop Caps)
Styles the first letter of a block of text.

```css
.editorial-article > p:first-of-type::first-letter {
  font-size: 3.5rem;
  float: left;
  line-height: 0.8;
  margin-right: 0.5rem;
  font-weight: 700;
  color: #4f46e5;
}
```

### `::first-line`
Applies styles exclusively to the first line of text rendered in the container (automatically adjusts if browser width resizes).

```css
.lead-intro::first-line {
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.02em;
}
```

## 3. UI Customization Pseudo-Elements

### `::selection` (Text Highlight)
Customizes the background color and text color when a user highlights text on the page.

```css
::selection {
  background-color: #4f46e5;
  color: #ffffff;
}
```

### `::placeholder`
Styles the ghost placeholder text inside `<input>` and `<textarea>` elements.

```css
input::placeholder {
  color: #94a3b8;
  font-style: italic;
  opacity: 1; /* Normalize Firefox default opacity */
}
```

### `::marker`
Styles the list bullet dot or numeric index on `<li>` items.

```css
ul.custom-bullets li::marker {
  color: #4f46e5;
  font-size: 1.2em;
}
```

### `::file-selector-button`
Styles the button inside `<input type="file">`.

```css
input[type="file"]::file-selector-button {
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #4338ca;
}
```

### `::backdrop` (Native Modal Dialog Backdrop)
Styles the background area behind native HTML `<dialog>` elements or elements opened in fullscreen mode (`requestFullscreen`).

```css
dialog::backdrop {
  background-color: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px); /* Modern blurred frosted glass */
}
```
