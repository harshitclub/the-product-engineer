# HTML Block-Level Elements

In the HTML display model, elements historically default to either **Block-level** or **Inline-level** rendering behavior. Understanding this distinction is essential for mastering document layout, box model calculations, and CSS formatting contexts.

## Characteristics of Block-Level Elements

A block-level element exhibits four core rendering behaviors by default:

```text
┌────────────────────────────────────────────────────────┐
│ Block Element (Starts on new line & expands 100% width) │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│ Next Block Element (Starts on its own new line)        │
└────────────────────────────────────────────────────────┘
```

1. **New Line Initiation**: Always begins on a new line, pushing previous content above and subsequent content below.
2. **Full Width Expansion**: Expands horizontally to occupy the entire available width (`100%`) of its parent container, regardless of how short its inner text content is.
3. **Full Box Model Support**: Honors all CSS `width`, `height`, `margin` (top/bottom/left/right), and `padding` rules.
4. **Permissive Nesting**: Can contain inline elements, text nodes, and other block-level elements.

## Common Block-Level Elements

| Category | Elements |
| :--- | :--- |
| **Document Structure** | `<html>`, `<body>` |
| **Semantic Landmarks** | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| **Typography Blocks** | `<h1>` through `<h6>`, `<p>`, `<blockquote>`, `<pre>`, `<address>` |
| **Lists** | `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>` |
| **Grouping & Containers** | `<div>`, `<hr>`, `<figure>`, `<figcaption>` |
| **Forms & Tables** | `<form>`, `<fieldset>`, `<table>` |

## Visualizing Block Element Box Model

```html
<div class="block-demo">
  <h2>Block Level Heading</h2>
  <p>Paragraph text inside a block container.</p>
</div>
```

In the CSS box model, block elements generate a rectangular box that participates in the Normal Flow of the document:

```text
┌─────────────────────────────────────────────────┐  ▲
│ Margin                                          │  │
│  ┌───────────────────────────────────────────┐  │  │
│  │ Border                                    │  │  │
│  │  ┌─────────────────────────────────────┐  │  │  │ Full
│  │  │ Padding                             │  │  │  │ Box
│  │  │  ┌───────────────────────────────┐  │  │  │  │ Height
│  │  │  │ Content (Text, Child Elements)│  │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │  │
│  │  └─────────────────────────────────────┘  │  │  │
│  └───────────────────────────────────────────┘  │  │
└─────────────────────────────────────────────────┘  ▼
◄──────────────── Full Parent Width ──────────────►
```

## Modifying Block Behavior with CSS

While an element has a default HTML block behavior, its rendering mode can be altered using the CSS `display` property:

* `display: block`: Enforces block behavior.
* `display: inline`: Converts element to flow inline.
* `display: inline-block`: Flows inline with text, but respects custom `width` and `height` dimensions.
* `display: flex` / `display: grid`: Establishes modern 1D or 2D layout formatting contexts for child nodes.
