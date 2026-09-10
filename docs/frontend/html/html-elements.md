# HTML Elements

An **HTML Element** is the fundamental individual component used to build a web document. Elements tell the web browser how to interpret and render a piece of content, whether as a section heading, a body paragraph, an image, or an interactive button.

## Anatomy of an HTML Element

Most HTML elements consist of three distinct parts:

```html
<p class="lead">Web engineering starts with foundational markup.</p>
│      │                  │                                    │
│      └── Attribute      └── Inner Content                    └── Closing Tag
└── Opening Tag
```

1. **Opening Tag (`<tagname>`)**: Marks where the element begins. It contains the element name wrapped in angle brackets, along with any optional attributes.
2. **Content**: The text, media, or nested child elements encapsulated between the opening and closing tags.
3. **Closing Tag (`</tagname>`)**: Marks where the element ends. It has the same name as the opening tag, prefixed with a forward slash `/`.

## Element Classification

HTML elements are classified into two broad syntactic categories:

### 1. Paired (Container) Elements
These elements have both an opening tag and a closing tag because they encapsulate content or child nodes.

```html
<!-- Text containers -->
<h1>Main Title</h1>
<p>Paragraph text content.</p>

<!-- Layout containers -->
<section>
  <article>Nested article block</article>
</section>
```

### 2. Void (Self-Closing) Elements
Void elements cannot contain any text content or child elements. Therefore, they do not have a separate closing tag (`</tagname>`).

In HTML5, closing slashes on void tags are completely optional (both `<img src="...">` and `<img src="..." />` are valid, though omitting the slash is standard HTML5 convention).

| Void Tag | Purpose / Function |
| :--- | :--- |
| `<img>` | Embeds an image |
| `<input>` | Creates a user input field |
| `<br>` | Forces a single line break |
| `<hr>` | Creates a thematic break (horizontal separator) |
| `<meta>` | Defines document metadata |
| `<link>` | Connects external resources (CSS, icons) |
| `<source>` | Specifies audio/video media sources |

## Element Nesting & Hierarchy

HTML elements can be nested inside other elements to create complex document hierarchies.

### Proper Nesting (First In, Last Out)
When nesting elements, tags must close in the reverse order of how they were opened:

```html
<!-- Correct Nesting: <strong> is inside <p>, so <strong> closes before </p> -->
<p>This is a <strong>very important</strong> architectural concept.</p>
```

### Improper Nesting Antipattern
```html
<!-- Incorrect: Tags overlap and violate the DOM tree structure -->
<p>This is a <strong>broken hierarchy</p></strong>
```

## Nested Element Terminology (DOM Tree Relationships)

```html
<div class="card">
  <h2>Conference Ticket</h2>
  <p>General admission for <span>Alex Rivera</span>.</p>
</div>
```

* **Parent**: `<div class="card">` is the parent of `<h2>` and `<p>`.
* **Children**: `<h2>` and `<p>` are direct children of `<div class="card">`.
* **Siblings**: `<h2>` and `<p>` are siblings because they share the same parent.
* **Descendants**: `<span>` is a child of `<p>` and a descendant of `<div class="card">`.
* **Ancestor**: `<div class="card">` is an ancestor of `<span>`.

## Common Mistakes with HTML Elements

1. **Forgetting Closing Tags**: Omitting closing tags on paired elements (e.g. leaving `<p>` or `<div>` unclosed) forces the browser parser into error-recovery mode, which can unpredictably swallow adjacent content into child nodes.
2. **Placing Block Elements Inside Inline Elements**: Wrapping block-level elements (`<div>`, `<p>`) inside inline elements (like `<span>`) is invalid HTML.
3. **Attempting to Add Content to Void Tags**: Writing `<img src="...">Some Text</img>` is invalid because `<img>` is a void element.
