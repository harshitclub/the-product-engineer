# HTML Lists

Lists are structural elements used to group related items together. HTML provides three distinct types of lists, each designed for specific content relationships.

## 1. Unordered Lists (`<ul>`)

An unordered list is used when the chronological order or sequence of the items does not alter the meaning of the content. Browsers render unordered list items (`<li>`) with circular bullet points by default.

```html
<ul>
  <li>HTML5 Semantic Standards</li>
  <li>CSS3 Flexbox & Grid Systems</li>
  <li>Modern JavaScript (ES6+)</li>
  <li>Next.js App Router</li>
</ul>
```

### Common Production Use Cases:
* Website navigation bars (`<nav><ul><li>...</li></ul></nav>`)
* Feature lists on landing pages
* Category filters and tags

## 2. Ordered Lists (`<ol>`)

An ordered list is used when items follow a specific sequence, ranking, or step-by-step procedural workflow. Browsers automatically number each list item (`<li>`) numerically.

```html
<ol>
  <li>Initialize Git repository (<code>git init</code>)</li>
  <li>Install dependencies (<code>npm install</code>)</li>
  <li>Configure environment variables (<code>.env</code>)</li>
  <li>Start local development server (<code>npm run dev</code>)</li>
</ol>
```

### Ordered List Configuration Attributes
* **`type`**: Changes numbering style (`"1"` for numbers, `"A"` for uppercase letters, `"a"` for lowercase letters, `"I"` for Roman numerals).
* **`start`**: Specifies the beginning numerical value (e.g. `<ol start="5">`).
* **`reversed`**: Reverses the order of numbering (countdown sequences).

```html
<!-- Roman numeral countdown list starting from V -->
<ol type="I" start="5" reversed>
  <li>Final Deployment Verification</li>
  <li>Integration Testing</li>
  <li>Database Migration Execution</li>
</ol>
```

## 3. Description Lists (`<dl>`)

A description list represents an associative array of terms (`<dt>`) and their corresponding definitions or descriptions (`<dd>`).

```html
<dl>
  <dt>Event Loop</dt>
  <dd>The concurrency mechanism in JavaScript that coordinates execution, callbacks, and microtasks.</dd>

  <dt>Cache-Aside</dt>
  <dd>A caching pattern where the application reads from cache first, and loads from database on cache miss.</dd>

  <dt>ACID</dt>
  <dd>Atomicity, Consistency, Isolation, and Durability guarantees in relational databases.</dd>
</dl>
```

### Common Production Use Cases:
* Technical glossaries and FAQ sections
* Metadata value pairs (e.g. Author: Harshit Kumar, Published: 2026)
* E-commerce product specifications

## Nested Lists

Lists can be nested arbitrarily inside other `<li>` elements to represent multi-tier hierarchical trees:

```html
<ul>
  <li>Frontend Engineering
    <ul>
      <li>HTML5 & CSS3</li>
      <li>React & Next.js</li>
    </ul>
  </li>
  <li>Backend Engineering
    <ul>
      <li>Node.js & Express</li>
      <li>PostgreSQL & Redis</li>
    </ul>
  </li>
</ul>
```

> **Crucial Syntax Rule**: A nested `<ul>` or `<ol>` must always be placed **inside** an `<li>` tag, never directly between `<li>` tags.
