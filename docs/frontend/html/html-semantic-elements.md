# HTML Semantic Elements

**Semantic HTML** refers to the practice of using HTML tags that clearly describe their meaning and purpose to both the human developer, the browser rendering engine, search engine web crawlers, and assistive screen reader devices.

Prior to HTML5, websites were composed almost entirely of generic `<div>` tags with arbitrary class names (`<div id="header">`, `<div class="content">`, `<div class="footer">`). HTML5 introduced dedicated semantic tags that standardized document architecture across the entire web.

## Full Semantic Page Layout Architecture

```text
┌────────────────────────────────────────────────────────┐
│                        <header>                        │
│             <nav aria-label="Main Navigation">         │
├───────────────────────────────────┬────────────────────┤
│                                   │                    │
│              <main>               │      <aside>       │
│  ┌─────────────────────────────┐  │  (Sidebar, Ads,    │
│  │          <section>          │  │   Related Articles)│
│  │  <h2>Upcoming Events</h2>   │  │                    │
│  │   ┌───────────────────────┐ │  │                    │
│  │   │       <article>       │ │  │                    │
│  │   │  <h3>Next.js Conf</h3>│ │  │                    │
│  │   │  <time>2026-10-15</time>│ │                    │
│  │   └───────────────────────┘ │  │                    │
│  └─────────────────────────────┘  │                    │
│                                   │                    │
├───────────────────────────────────┴────────────────────┤
│                        <footer>                        │
└────────────────────────────────────────────────────────┘
```

## Detailed Breakdown of Semantic Landmark Elements

### 1. `<header>`
Represents introductory content or navigational aids. It typically contains the company logo, top-level search bar, and primary navigation links. A page can contain multiple `<header>` elements (e.g. one for the whole page, and one inside an `<article>`).

### 2. `<nav>`
Reserved for major blocks of navigation links (main site navigation, pagination controls, table of contents). Do not wrap all links on a page in `<nav>`; reserve it for major navigational clusters.

### 3. `<main>`
Encloses the primary, central content of the document.
* **Strict Rule**: There must only be **one visible `<main>` element** per document.
* Content inside `<main>` should be unique to the page and exclude repeating elements (like sidebars, copyright footers, or search headers).

### 4. `<section>`
Represents a standalone thematic grouping of content, typically introduced by an `<h2>` through `<h6>` heading (e.g. Features section, Testimonials section, Pricing section).

### 5. `<article>`
Represents a self-contained, independent composition that could theoretically be distributed or syndicated on its own (e.g. a blog post, a news story, a forum reply, or an event card).

### 6. `<aside>`
Represents content that is tangentially related to the content around it (e.g. sidebars, glossary side notes, author biographies, related links).

### 7. `<footer>`
Represents the footer for its nearest sectioning element. When placed at the document root, it contains author credits, copyright notices, terms of service links, and sitemaps.

### 8. `<figure>` and `<figcaption>`
Used to encapsulate media (images, diagrams, code snippets) alongside a semantic caption:

```html
<figure>
  <img src="/architecture.svg" alt="Distributed System Architecture Flow">
  <figcaption>Figure 1.1: Event-driven Redis Queue and Worker Pipeline</figcaption>
</figure>
```

### 9. `<time>`
Encapsulates human-readable dates and times alongside a machine-readable `datetime` attribute formatted in ISO 8601:

```html
<p>Registration opens on <time datetime="2026-10-15T09:00">October 15, 2026 at 9:00 AM</time>.</p>
```

## Three Concrete Engineering Benefits of Semantic HTML

1. **Accessibility (a11y)**: Screen reader users can jump directly across semantic landmarks (e.g. jumping straight to `<main>` to skip 50 header navigation links).
2. **Technical SEO**: Search crawlers use semantic tags to weigh the importance of content. Text inside `<article>` and `<main>` is weighted higher than boilerplate text in `<footer>`.
3. **Developer Maintainability**: Codebases are clean, intuitive, and self-documenting.
