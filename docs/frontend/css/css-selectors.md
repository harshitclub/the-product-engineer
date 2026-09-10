# CSS Selectors

CSS Selectors define the pattern matching rules used by the browser to target elements within the Document Object Model (DOM) and apply style declarations.

Mastering selectors allows you to write precise, high-performance, and maintainable CSS architectures without polluting HTML markup with unnecessary utility classes or ID hooks.

## 1. Basic & Simple Selectors

### Universal Selector (`*`)
Matches every single element in the document tree. Often used in CSS resets and global box-sizing rules.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

### Type (Element) Selector
Matches elements by their HTML tag name.

```css
h1 {
  font-size: 2rem;
  letter-spacing: -0.025em;
}

p {
  line-height: 1.6;
  color: #334155;
}
```

### Class Selector (`.className`)
Matches elements containing the specified class attribute. An element can have multiple classes separated by spaces.

```css
.card {
  border-radius: 8px;
  background-color: #ffffff;
}

/* Chained class selector: matches element with BOTH classes */
.card.featured {
  border: 2px solid #4f46e5;
}
```

### ID Selector (`#idName`)
Matches a unique element with the exact `id` attribute. IDs must be unique per HTML document.

```css
#site-header {
  position: sticky;
  top: 0;
  z-index: 50;
}
```

> [!WARNING]
> Avoid overusing ID selectors for styling because of their high specificity weight (`0-1-0-0`), which makes them difficult to override later. Prefer class selectors.

## 2. Grouping Selectors

When multiple selectors share identical declarations, group them with a comma `,` to eliminate code duplication.

```css
h1,
h2,
h3,
h4 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0f172a;
  font-weight: 700;
}
```

## 3. Combinator Selectors

Combinators express spatial and hierarchical relationships between two or more selectors in the DOM tree.

```
       Parent
      /      \
  Child 1    Child 2
  /    \        \
Sub 1  Sub 2   Sub 3
```

| Combinator | Syntax | Description | Example |
| :--- | :--- | :--- | :--- |
| **Descendant** | `A B` | Matches `B` anywhere inside `A` at any nesting depth | `nav a` |
| **Direct Child** | `A > B` | Matches `B` only if it is an immediate child of `A` | `ul > li` |
| **Adjacent Sibling** | `A + B` | Matches `B` immediately following `A` (same parent) | `h2 + p` |
| **General Sibling** | `A ~ B` | Matches any `B` that comes after `A` under same parent | `h2 ~ p` |

### Practical Combinator Examples

```css
/* Direct Child: Only top-level items in navigation list */
nav.menu > ul > li {
  display: inline-block;
}

/* Adjacent Sibling: Lead paragraph directly following an H1 */
h1 + p {
  font-size: 1.25rem;
  color: #475569;
}

/* General Sibling: Apply top margin to all paragraphs that follow an alert */
.alert ~ p {
  margin-top: 1.5rem;
}
```

## 4. Attribute Selectors

Attribute selectors target elements based on the presence, exact value, or partial value of HTML attributes.

| Selector | Meaning | Example | Target Match |
| :--- | :--- | :--- | :--- |
| `[attr]` | Has attribute `attr` | `[required]` | `<input required>` |
| `[attr="val"]` | Attribute equals exact value | `[type="email"]` | `<input type="email">` |
| `[attr~="val"]` | Value in space-separated list | `[class~="active"]` | `<div class="btn active">` |
| `[attr^="val"]` | Value **starts with** string | `a[href^="https://"]` | `<a href="https://...">` |
| `[attr$="val"]` | Value **ends with** string | `a[href$=".pdf"]` | `<a href="doc.pdf">` |
| `[attr*="val"]` | Value **contains** substring | `[class*="icon-"]` | `<span class="app-icon-home">` |
| `[attr="val" i]` | Case-**insensitive** matching | `[data-status="active" i]` | `<div data-status="Active">` |

### Practical Attribute Patterns

```css
/* External link styling */
a[href^="https://"]::after {
  content: ' ↗';
  font-size: 0.85em;
}

/* Downloadable document indicators */
a[href$=".pdf"] {
  background: url('/icons/pdf-icon.svg') no-repeat left center;
  padding-left: 20px;
}

/* Target custom data attributes */
[data-theme="dark"] {
  background-color: #0f172a;
  color: #f8fafc;
}
```

## 5. Modern Functional Pseudo-Selectors

Modern CSS introduces powerful logical selector functions: `:is()`, `:where()`, `:has()`, and `:not()`.

### `:is()` (Matches Any in List)
Simplifies long compound selector lists while adopting the highest specificity of its argument list.

```css
/* Traditional verbose syntax */
header h1, header h2, header h3,
footer h1, footer h2, footer h3 {
  color: #1e293b;
}

/* Modern clean syntax */
:is(header, footer) :is(h1, h2, h3) {
  color: #1e293b;
}
```

### `:where()` (Zero Specificity Matcher)
Functions identically to `:is()`, but **always has specificity 0-0-0**. Ideal for design systems and CSS resets because consumers can override rules effortlessly without specificity fights.

```css
/* Easily overridable base typography */
:where(h1, h2, h3, h4, h5, h6) {
  font-family: 'Plus Jakarta Sans', sans-serif;
  margin-top: 0;
}
```

### `:not()` (Negation Selector)
Targets elements that do **not** match the given selector.

```css
/* Style all buttons except disabled ones */
button:not(:disabled):hover {
  cursor: pointer;
  background-color: #4338ca;
}

/* Target list items except the last one to add borders */
.list-item:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}
```

### `:has()` (The Parent & Relational Selector)
Often called the "CSS Parent Selector", `:has()` lets an element target its parent or preceding siblings based on children or descendants.

```css
/* Style a card container when it contains an image */
.card:has(img) {
  padding-top: 0;
}

/* Form group label turns red if the input inside is invalid */
.form-group:has(input:invalid) label {
  color: #ef4444;
}

/* Style previous sibling using :has() + sibling combinator */
h2:has(+ .featured-badge) {
  margin-bottom: 0.25rem;
}
```

## Performance and Selector Efficiency

Browsers parse CSS selectors from **right to left** (from the key selector to ancestors).

```css
/* Browser evaluates:
   1. Find all <a> elements (Key selector)
   2. Check if parent is <li>
   3. Check if ancestor is <ul>
   4. Check if ancestor is nav#main-nav
*/
nav#main-nav ul li a { ... } /* Overly specific and slower */

/* Better, faster, cleaner: */
.nav-link { ... }
```

### Selector Best Practices
- Keep selector specificity as low and flat as possible.
- Avoid deep descendant chains (`body div.container main .post p a`).
- Use classes for structural styling and attributes for state (`[aria-expanded="true"]`).
- Leverage `:where()` for resets to guarantee zero specificity conflicts.
