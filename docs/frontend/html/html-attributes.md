# HTML Attributes

**HTML Attributes** are special keywords placed inside the opening tag of an element to provide additional configuration, metadata, or behavior. Attributes modify how the element behaves, controls how it is styled, or establishes connections with JavaScript and assistive technologies.

## Attribute Syntax & Structure

Attributes are always written inside the opening tag and typically follow a `name="value"` format:

```html
<tagname name="value" another-name="value">Content</tagname>
```

```html
<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
```

* **Attribute Name (`href`, `target`, `rel`)**: The standardized property name (always lowercase by convention).
* **Equals Sign (`=`)**: Assigns the value to the attribute.
* **Attribute Value (`"https://github.com"`)**: The value enclosed in double quotation marks.

## Category Breakdown of Attributes

### 1. Element-Specific Attributes
These attributes only work on specific elements and have no meaning elsewhere:

* `src`, `alt`, `loading` on `<img>`
* `href`, `target`, `download` on `<a>`
* `type`, `placeholder`, `value`, `required` on `<input>`
* `action`, `method`, `enctype` on `<form>`
* `controls`, `poster`, `autoplay` on `<video>`

### 2. Global Attributes
Global attributes are universal and can be placed on **any valid HTML element**:

| Global Attribute | Description | Code Example |
| :--- | :--- | :--- |
| `id` | Unique document-wide identifier | `<section id="pricing">` |
| `class` | Reusable style and DOM selector | `<div class="card active">` |
| `style` | Inline CSS declarations | `<p style="color: #4f46e5;">` |
| `title` | Tooltip text displayed on hover | `<span title="More information">` |
| `hidden` | Hides the element from display | `<div hidden>Collapsed Content</div>` |
| `tabindex` | Controls keyboard focus order | `<button tabindex="0">` |
| `lang` | Declares language of element content | `<p lang="fr">Bonjour</p>` |
| `contenteditable` | Allows user to edit text directly | `<div contenteditable="true">` |
| `dir` | Text direction (`ltr` or `rtl`) | `<p dir="rtl">` |

### 3. Boolean Attributes
Boolean attributes represent true/false states. If the attribute is present on the tag, its value is considered `true`; if omitted, it is `false`.

```html
<!-- All three represent TRUE in HTML5 -->
<input type="text" required>
<input type="text" required="">
<input type="text" required="required">

<!-- Disabled button -->
<button type="submit" disabled>Submitting...</button>

<!-- Checked checkbox -->
<input type="checkbox" checked>
```

### 4. Custom Data Attributes (`data-*`)
HTML5 allows developers to store custom data directly on elements without affecting the page layout. JavaScript can access these values at runtime via the DOM `dataset` API:

```html
<article 
  class="event-card" 
  data-event-id="1084" 
  data-category="tech" 
  data-ticket-price="49"
>
  <h3>Next.js Conf 2026</h3>
</article>
```

```javascript
// Accessing data-* attributes in JavaScript
const card = document.querySelector('.event-card');
console.log(card.dataset.eventId);     // "1084"
console.log(card.dataset.category);    // "tech"
console.log(card.dataset.ticketPrice); // "49"
```

## Attribute Best Practices

1. **Always Use Lowercase Names**: HTML attribute names are case-insensitive, but lowercase (`class="card"` instead of `CLASS="card"`) is the universal standard across modern codebases.
2. **Always Use Double Quotes**: While single quotes or unquoted values are permitted in certain contexts, double quotes (`name="value"`) prevent parsing errors when values contain spaces or special characters.
3. **Ensure `id` Values are Unique**: Never duplicate the same `id` value on multiple elements in the same document. Use `class` for shared groupings.
