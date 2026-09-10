# HTML Search Engine Optimization (SEO)

**Technical SEO** refers to optimizing the structural HTML, metadata, and rendering architecture of a website so search engine web crawlers (like Googlebot and Bingbot) can efficiently discover, parse, understand, and index your content.

Search engines evaluate HTML structure directly to determine content relevance, page quality, and user intent matching.

## Technical SEO Architecture Checklist

### 1. Document Title (`<title>`)
The `<title>` tag is the single most influential on-page SEO signal:

```html
<title>PostgreSQL Indexing Strategies & Query Optimization — Full Stack Notes</title>
```

* **Character Limit**: Keep between 50 and 60 characters to prevent truncation in Google search results.
* **Format Convention**: `Primary Keyword — Secondary Keyword | Brand Name`.
* **Uniqueness**: Every single URL across your site must have a unique title.

### 2. Meta Description (`<meta name="description">`)
While meta descriptions do not directly influence search ranking algorithms, they dictate the snippet shown in search results and directly drive **Click-Through Rate (CTR)**:

```html
<meta name="description" content="Master PostgreSQL indexing, B-Tree vs GIN indexes, and query execution plans with EXPLAIN ANALYZE for high-scale databases.">
```

* **Character Limit**: Keep between 140 and 160 characters.
* **Actionable Intent**: Include a clear call to action or explicit summary of what the engineer will learn.

### 3. Heading Hierarchy & Single `<h1>`
Search engine algorithms build a thematic outline of your document by analyzing heading weights:

```html
<!-- Exactly 1 H1 defining the master topic -->
<h1>PostgreSQL Indexing Mastery</h1>

<!-- Major sub-sections in descending order -->
<h2>1. B-Tree vs. GIN Index Architecture</h2>
<h3>B-Tree Index Internal Mechanics</h3>
<h3>GIN Indexes for JSONB Data</h3>

<h2>2. Analyzing Queries with EXPLAIN ANALYZE</h2>
```

### 4. Canonical URLs (`<link rel="canonical">`)
Prevents duplicate content penalties when tracking parameters, session IDs, or multiple URLs point to the same content:

```html
<link rel="canonical" href="https://example.com/notes/postgresql-indexing">
```

### 5. Structured Data with JSON-LD (Schema.org)
Structured Data provides machine-readable metadata directly to search engines, enabling **Rich Snippets** (star ratings, event schedules, pricing badges, course info) on search engine result pages:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "The Product Engineer: From Code to Scaled Architecture",
  "description": "60-Hour Industry-Oriented Full Stack Engineering Training.",
  "provider": {
    "@type": "Organization",
    "name": "CampusSutras"
  }
}
</script>
```

### 6. Semantic Anchor Text
Search engines evaluate the anchor text of incoming and outgoing hyperlinks to understand the topic of the linked document:

* ❌ Bad: `For more information on Redis caching, <a href="/redis">click here</a>.`
* ✅ Good: `Read our in-depth guide on <a href="/redis">Redis Cache-Aside and Invalidation Strategies</a>.`

### 7. Core Web Vitals (HTML Performance Factors)
* **CLS (Cumulative Layout Shift)**: Always provide explicit `width` and `height` attributes on all `<img>` and `<iframe>` elements.
* **LCP (Largest Contentful Paint)**: Avoid lazy-loading your primary hero banner image (`loading="lazy"` on hero images delays LCP; use `<link rel="preload">` instead).
