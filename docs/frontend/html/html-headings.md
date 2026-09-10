# HTML Headings

HTML headings define the hierarchical structure and outline of a document. There are six heading levels, ranging from `<h1>` (the highest importance level) down to `<h6>` (the lowest importance level).

Search engines, assistive technologies (screen readers), and web browsers rely on headings to understand what a page is about and how its sections relate to one another.

## The Heading Hierarchy

```html
<h1>Main Document Title</h1>
<h2>Major Topic / Module Section</h2>
<h3>Sub-topic Heading</h3>
<h4>Minor Sub-section</h4>
<h5>Detailed Component Heading</h5>
<h6>Lowest Level Heading</h6>
```

## Visual vs. Semantic Importance

| Tag | Semantic Level | Typical Role in Architecture |
| :--- | :--- | :--- |
| `<h1>` | Top-level Heading | The unique title of the entire document (e.g. Page Title / Article Name) |
| `<h2>` | Primary Section | Main chapters, module headings, or major page sections |
| `<h3>` | Subsection | Subtopics inside an `<h2>` section |
| `<h4>` | Sub-subsection | Specific feature groups or card component headings |
| `<h5>` | Minor Heading | Sidebar widget titles or fine-grained parameter groupings |
| `<h6>` | Micro Heading | Footnotes, fine print headers, or tertiary table groupings |

## The Single `<h1>` Rule for SEO

Every web page should have **exactly one `<h1>` element**.

Search engines (like Google) treat the `<h1>` tag as the primary thematic indicator of the page. Having multiple `<h1>` elements dilutes search relevance, while omitting `<h1>` entirely hurts discoverability.

```html
<!-- Correct Document Outline -->
<header>
  <h1>Enterprise Event Planner</h1>
</header>
<main>
  <section>
    <h2>Upcoming Conferences</h2>
    <article>
      <h3>Next.js Conf 2026</h3>
    </article>
    <article>
      <h3>Postgres Summit 2026</h3>
    </article>
  </section>

  <section>
    <h2>Pricing Plans</h2>
    <h3>Early Bird Tier</h3>
    <h3>VIP Access Tier</h3>
  </section>
</main>
```

## Heading Best Practices & Accessibility

### 1. Never Skip Heading Levels
Maintain a natural downward progression without skipping numbers:

```html
<!-- ❌ BAD: Skipping from h2 directly to h4 -->
<h2>Backend Services</h2>
<h4>PostgreSQL Indexing</h4>

<!-- ✅ GOOD: Logical sequential descending order -->
<h2>Backend Services</h2>
<h3>PostgreSQL Database</h3>
<h4>Indexing Strategies</h4>
```

### 2. Do Not Use Headings for Visual Sizing
Never use `<h3>` simply because you want text to look smaller, or `<h1>` because you want text to look bold. Headings exist strictly for **semantic document hierarchy**.

Use CSS to adjust font sizes:

```css
/* Style an h2 to look visually small if necessary */
h2.compact-title {
  font-size: 1rem;
  font-weight: 600;
}
```

### 3. Screen Reader Navigation
Screen reader users frequently press the `H` key to cycle through all headings on a page to scan the document before deciding what to read. A clear heading outline makes your website immediately navigable for visually impaired users.
