# HTML Paragraphs

The `<p>` element defines a block of body text (a paragraph). It is the most frequently used element for displaying written explanations, descriptions, and article prose.

Browsers automatically insert a default top and bottom margin around paragraph elements to visually separate chunks of text.

## Basic Syntax

```html
<p>
  Full stack engineering requires a balanced understanding of both client-side
  rendering constraints and server-side distributed architecture.
</p>

<p>
  Each technology in a production stack addresses a specific computational or
  networking bottleneck.
</p>
```

## Whitespace Collapsing in HTML

A critical fundamental rule of HTML rendering is **whitespace collapsing**. The browser parser compresses consecutive spaces, tabs, and newline characters into a single horizontal space.

```html
<!-- What you write in code: -->
<p>
  This      text        has
  multiple       spaces
  and new lines.
</p>

<!-- How the browser renders it: -->
<p>This text has multiple spaces and new lines.</p>
```

## Line Breaks (`<br>`) and Thematic Separators (`<hr>`)

### 1. The Line Break Tag (`<br>`)
The `<br>` void tag creates an explicit single line break without starting a new paragraph. It should be used only when a line break is part of the actual content (such as in street addresses or lines of poetry), not for creating vertical spacing.

```html
<p>
  CampusSutras Engineering Campus<br>
  Building 4, Tech Park Boulevard<br>
  San Francisco, CA 94107
</p>
```

### 2. The Thematic Break Tag (`<hr>`)
The `<hr>` void tag represents a thematic shift or topical scene break between paragraphs. Browsers typically render it as a subtle horizontal line.

```html
<p>Introduction to client-side rendering.</p>
<hr>
<p>Transitioning to backend API architecture.</p>
```

## Preformatted Text (`<pre>`)

When you need to preserve the exact whitespace, tabs, and carriage returns (e.g. for ASCII architecture diagrams, code blocks, or mathematical tables), use the `<pre>` (preformatted) element:

```html
<pre>
Client Request
      │
      ▼
Express Router ───► Database Pool
</pre>
```

The browser renders `<pre>` in a fixed-width (monospace) font and preserves all author-defined indentation and line breaks verbatim.

## Paragraph Best Practices

1. **Avoid Empty Paragraphs for Spacing**: Never insert `<p></p>` or `<br><br><br>` to push elements down on the page. Use CSS `margin` or `padding` for spacing.
2. **Do Not Nest Block Elements in Paragraphs**: A `<p>` element cannot contain other block-level elements (such as `<div>`, `<ul>`, `<table>`, or another `<p>`). If you place a `<div>` inside a `<p>`, browsers will prematurely terminate the paragraph.
