# HTML Text Formatting

HTML provides a suite of inline tags for formatting text. These tags fall into two distinct philosophical categories: **Semantic tags** (which communicate structural meaning and importance) and **Presentational tags** (which historically only altered visual appearance).

Modern web engineering emphasizes semantic tags because they allow assistive technologies (like screen readers) and automated search engines to understand the exact intent behind emphasized words.

## Semantic vs. Presentational Comparison

| Tag | Category | Semantic Purpose & Screen Reader Behavior |
| :--- | :--- | :--- |
| `<strong>` | Semantic | Indicates high importance, seriousness, or urgency. Screen readers read with strong vocal emphasis. |
| `<b>` | Presentational | Makes text bold stylistically without indicating extra importance. |
| `<em>` | Semantic | Indicates conversational stress emphasis, altering sentence meaning. Screen readers read with intonation. |
| `<i>` | Presentational | Makes text italic stylistically (used for taxonomic designations, foreign words, technical terms). |
| `<mark>` | Semantic | Highlights text for reference purposes (e.g. search term matches). |
| `<small>` | Semantic | Represents side comments, legal disclaimers, or copyright fine print. |
| `<del>` | Semantic | Represents deleted/deprecated text (typically rendered with strikethrough). |
| `<ins>` | Semantic | Represents newly inserted text (typically rendered with underline). |
| `<sub>` | Typography | Renders subscript text (e.g. chemical formulas: H<sub>2</sub>O). |
| `<sup>` | Typography | Renders superscript text (e.g. mathematical exponents: 2<sup>10</sup>). |

## Code Examples

```html
<!-- High importance vs stylistic bold -->
<p><strong>Warning:</strong> Deleting this production database cannot be undone.</p>
<p>The keyword <b>static</b> is used to declare class-level properties.</p>

<!-- Conversational emphasis -->
<p>I <em>specifically</em> asked for the PostgreSQL logs, not Redis.</p>

<!-- Text modifications (Changelogs & Pricing) -->
<p>Early Bird Ticket: <del>$99</del> <ins>$79</ins></p>

<!-- Mathematical / Chemical formulas -->
<p>Water Molecule: H<sub>2</sub>O</p>
<p>Total Combinations: 2<sup>8</sup> = 256</p>
```

## Computer Code & Technical Text Elements

For technical documentation and engineering notes, HTML provides dedicated elements:

```html
<!-- Inline code snippet -->
<p>Use the <code>fetch()</code> API to trigger asynchronous HTTP requests.</p>

<!-- Keyboard key representation -->
<p>Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> to open Developer Tools.</p>

<!-- Program output / Terminal feedback -->
<p>Server response: <samp>200 OK - Connection Established</samp></p>

<!-- Variable in mathematical / programming context -->
<p>Let <var>x</var> represent the total number of concurrent active connections.</p>
```

## Quotations: `<blockquote>` vs. `<q>`

```html
<!-- Block-level long quote with citation -->
<blockquote cite="https://www.w3.org">
  <p>The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.</p>
  <footer>— Tim Berners-Lee</footer>
</blockquote>

<!-- Short inline quote (automatically inserts localized quotation marks) -->
<p>He said, <q>Always validate input with Zod on the server</q>, before leaving.</p>
```
