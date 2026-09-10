# CSS Lists & Markers

HTML unordered (`<ul>`) and ordered (`<ol>`) lists have default browser user-agent paddings, margins, and marker styles. CSS provides comprehensive control over list appearance, bullet positioning, and custom counters.

## 1. Core List Style Properties

```css
ul.custom-list {
  list-style-type: disc;      /* Bullet shape / numbering type */
  list-style-position: outside; /* inside vs outside */
  list-style-image: none;     /* Custom image bullet */
}

/* Shorthand: list-style: [type] [position] [image]; */
ol.custom-numbers {
  list-style: decimal-leading-zero inside;
}
```

### Common `list-style-type` Values

| Unordered (`<ul>`) Types | Ordered (`<ol>`) Types | Custom Characters |
| :--- | :--- | :--- |
| `disc` (Default solid dot) | `decimal` (`1, 2, 3...`) | `'→ '` (String literal) |
| `circle` (Hollow circle) | `decimal-leading-zero` (`01, 02...`) | `'✓ '` (Checkmark) |
| `square` (Solid square) | `lower-alpha` (`a, b, c...`) | `none` (Removes markers) |
| `none` (No markers) | `upper-roman` (`I, II, III...`) | |

## 2. `list-style-position`: `outside` vs `inside`

```
outside (Default):
  • Bullet sits outside the text block.
    Wrapped lines indent cleanly aligned with the first word.

inside:
  • Bullet sits inline with the text.
    Wrapped lines wrap all the way beneath the bullet.
```

## 3. Styling Bullets with `::marker`

The modern `::marker` pseudo-element allows direct styling of list bullets and numbering independently from the list item text content.

```css
/* Custom color and font weight for bullets without extra HTML tags */
ul.feature-list li::marker {
  color: #4f46e5;
  font-size: 1.25em;
}

ol.step-list li::marker {
  font-weight: 700;
  color: #0f172a;
  font-family: 'JetBrains Mono', monospace;
}
```

## 4. Resetting Lists for Navigation Bars

When building navigation menus or tag lists, remove default user-agent margins, paddings, and markers:

```css
/* Standard Navigation List Reset */
.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
```

## 5. Breadcrumb Navigation Pattern

```css
.breadcrumbs {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

/* Insert divider between breadcrumb items */
.breadcrumbs li:not(:last-child)::after {
  content: '/';
  margin-left: 0.5rem;
  color: #cbd5e1;
}

.breadcrumbs a {
  color: #4f46e5;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
```
