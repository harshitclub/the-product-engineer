# 100 HTML Theoretical Interview Questions

> A comprehensive master collection of 100 theoretical HTML interview questions with in-depth technical explanations, categorized into 50 Basic and 50 Intermediate to Advanced questions.

---

## 📑 Index & Question Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic & Foundational HTML**](#part-1-basic-foundational-html-questions-1-50) | Q1 – Q50 | Document skeleton, tags vs elements, void elements, block vs inline, links, lists, tables, text semantics, form basics |
| [**Part 2: Intermediate & Advanced HTML**](#part-2-intermediate-to-advanced-html-questions-51-100) | Q51 – Q100 | Quirks vs Standards mode, Critical Rendering Path, script loading (`async`/`defer`/`module`), `<picture>` & CLS, a11y & ARIA, Constraint Validation, `<dialog>` & Popover API, CSP, SEO, Web Components, bfcache |

---

# Part 1: Basic & Foundational HTML (Questions 1 – 50)

### Q1: What is HTML and what role does it play in web architecture?
**Answer:** HTML (HyperText Markup Language) is the standard declarative markup language that defines the semantic structure and content hierarchy of web documents. The browser's HTML parser processes raw markup bytes into the Document Object Model (DOM), which is combined with the CSSOM to construct the Render Tree and paint user interfaces.

---

### Q2: What is the purpose of the `<!DOCTYPE html>` declaration?
**Answer:** `<!DOCTYPE html>` informs the browser to parse the document in modern **Standards Mode** (No-Quirks Mode) following HTML5 specifications. Without it, browsers fall into **Quirks Mode**, emulating legacy 1990s browser rendering bugs and altering Box Model calculations.

---

### Q3: What is the difference between an HTML Tag, an Element, and an Attribute?
* **Tag:** The syntax delimiters that define the beginning or ending of an element (e.g., `<p>` and `</p>`).
* **Element:** The complete structural node including opening tag, attributes, inner content, and closing tag (e.g., `<p class="lead">Hello World</p>`).
* **Attribute:** Key-value properties defined in the opening tag that configure element behavior (e.g., `class="lead"`, `id="hero"`).

---

### Q4: What are Void (Self-Closing) Elements? List 8 examples.
**Answer:** Void elements cannot contain any child nodes or text content and do not have a closing tag. In HTML5, trailing slashes (e.g., `<img />`) are optional.  
Examples: `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>`, `<source>`, `<wbr>`.

---

### Q5: What is the difference between Block-level and Inline elements?
* **Block Elements** (`<div>`, `<p>`, `<h1>`, `<section>`): Start on a new line, occupy 100% of their parent container's width by default, and respect `width`, `height`, vertical margins, and paddings.
* **Inline Elements** (`<span>`, `<a>`, `<strong>`, `<em>`): Flow within text without starting a new line. They ignore explicit `width` and `height`, and vertical margins/paddings do not push surrounding block lines away.

---

### Q6: Can an inline element contain a block-level element in HTML5?
**Answer:** In older HTML4 specifications, this was strictly forbidden. In HTML5, the anchor tag (`<a>`) is explicitly permitted to wrap block-level containers (such as `<div>`, `<h3>`, or `<article>`) to make an entire card or banner clickable, provided it does not contain other interactive elements (`<button>` or nested `<a>`).

---

### Q7: What are Global Attributes in HTML? List 6 examples.
**Answer:** Global attributes can be used on **any** valid HTML element. Examples:
1. `id`: Unique identifier across the entire document.
2. `class`: Non-unique identifier for styling and DOM queries.
3. `style`: Inline CSS declarations.
4. `title`: Advisory information displayed as a native tooltip on hover.
5. `hidden`: Semantically hides the element visually and from screen readers.
6. `tabindex`: Controls keyboard Tab focus order.

---

### Q8: What is the difference between the `id` and `class` attributes?
* **`id`:** Must be strictly unique within the document. Used for unique DOM scripting (`document.getElementById`), fragment navigation (`href="#section"`), and form label association (`for="id"`).
* **`class`:** Non-unique identifier meant for grouping multiple elements for shared CSS rules and query selectors.

---

### Q9: What is the purpose of the `lang` attribute on the `<html>` root tag?
**Answer:**
1. **Accessibility:** Instructs screen readers which pronunciation engine and accent to use.
2. **SEO:** Helps search engines deliver localized search results to specific regions.
3. **Browser Translation:** Informs browser auto-translation tools when translation prompts are needed.

---

### Q10: Why must `<meta charset="UTF-8">` be placed within the first 1024 bytes of `<head>`?
**Answer:** It allows the browser parser to establish character byte decoding before processing any non-ASCII characters, avoiding expensive document re-parsing.

---

### Q11: What does `<meta name="viewport" content="width=device-width, initial-scale=1.0">` do?
**Answer:**
* `width=device-width`: Sets the virtual viewport width to match the physical device width in CSS pixels.
* `initial-scale=1.0`: Sets the initial zoom level to 100% on load, preventing mobile browsers from rendering the page at a zoomed-out 980px desktop canvas.

---

### Q12: What is the purpose of the `<title>` tag and where does it appear?
**Answer:** Defines the title of the document. It appears in:
1. The browser tab bar and window header.
2. Search engine result page (SERP) clickable headlines.
3. The default name when bookmarking a webpage.

---

### Q13: What is the difference between `<b>` vs `<strong>` and `<i>` vs `<em>`?
* **`<b>` & `<i>`:** Purely visual presentational tags (bold and italic) with zero semantic importance or screen reader inflection.
* **`<strong>`:** Semantic indicator of strong importance or urgency; screen readers pronounce with emphasis.
* **`<em>`:** Semantic indicator of stress emphasis that alters the linguistic meaning of a sentence.

---

### Q14: What is the difference between `<p>`, `<br>`, and `<hr>`?
* **`<p>`:** A block-level container representing a paragraph of text with automatic top/bottom margins.
* **`<br>`:** A void element that forces an inline line break within text (use only for poems or postal addresses).
* **`<hr>`:** A void element representing a thematic break or transition between topics in a section.

---

### Q15: What is the difference between `<ul>`, `<ol>`, and `<dl>`?
* **`<ul>`:** Unordered list where sequence does not alter meaning (bullet points).
* **`<ol>`:** Ordered list where chronological or numerical sequence matters (1, 2, 3).
* **`<dl>`:** Description list containing terms (`<dt>`) and descriptions (`<dd>`) (glossaries, key-value data).

---

### Q16: How do `start`, `reversed`, and `type` attributes work on `<ol>`?
```html
<ol start="5" reversed type="A">
  <li>Step Three</li> <!-- Displays "E" -->
  <li>Step Two</li>   <!-- Displays "D" -->
  <li>Step One</li>   <!-- Displays "C" -->
</ol>
```
* `start`: Starting integer value.
* `reversed`: Counts backwards.
* `type`: Numbering style (`1`, `a`, `A`, `i`, `I`).

---

### Q17: What are `<dt>` and `<dd>` elements?
**Answer:** Children of `<dl>` (Description List):
* `<dt>`: Description Term (the key or concept).
* `<dd>`: Description Details (the explanation, value, or definition).

---

### Q18: What is the purpose of the `alt` attribute on an `<img>` tag?
**Answer:** Provides alternative text:
1. Spoken aloud by screen readers for visually impaired users.
2. Displayed in the browser when an image fails to load or over slow connections.
3. Indexed by search engine crawlers for image search rankings.

---

### Q19: What happens when an `<img>` has an empty `alt=""` vs omitting `alt` entirely?
* **`alt=""` (Empty string):** Tells assistive technology that the image is purely decorative, causing screen readers to completely skip it.
* **Missing `alt` attribute:** Screen readers announce the full image file URL (e.g., `image-d83a1.png`), creating a poor accessibility experience.

---

### Q20: How do internal page fragment links (`href="#section"`) work?
**Answer:** The browser scrolls directly to the element whose `id` matches the hash fragment:
```html
<a href="#pricing">Go to Pricing</a>
...
<section id="pricing"><h2>Our Plans</h2></section>
```

---

### Q21: What does the `target` attribute on `<a>` do and what are its values?
**Answer:** Specifies where to open the linked document:
* `_self` (Default): Current browsing context (same tab).
* `_blank`: New tab or window.
* `_parent`: Parent frame.
* `_top`: Topmost browsing context (breaks out of all iframes).

---

### Q22: Why should you use `rel="noopener noreferrer"` with `target="_blank"`?
**Answer:** Prevents the newly opened tab from accessing `window.opener` on the originating page (tabnabbing attack) and prevents leaking the `Referer` header. Modern browsers apply `noopener` automatically to `target="_blank"`.

---

### Q23: How do `mailto:` and `tel:` URL protocols work in anchor tags?
```html
<a href="mailto:support@example.com?subject=Help">Email Support</a>
<a href="tel:+15551234567">Call Us</a>
```
They open the operating system's default email client or launch the phone dialer on mobile devices.

---

### Q24: What is the `<base>` tag and how does it work?
**Answer:** Defined inside `<head>`, it sets the base URL for all relative links, images, and scripts:
```html
<head>
  <base href="https://cdn.example.com/assets/" target="_blank">
</head>
```

---

### Q25: What is the purpose of the `<wbr>` (Word Break Opportunity) tag?
**Answer:** A void element specifying an exact position where the browser is permitted to break a long word or URL across multiple lines if needed to prevent horizontal overflow without adding a hyphen.

---

### Q26: What is the difference between `<pre>` and `<code>`?
* **`<pre>`:** Block-level tag that preserves all whitespace, indentation, and newlines exactly as written in a monospace font.
* **`<code>`:** Inline semantic tag indicating a snippet of computer code. Often nested: `<pre><code>const a = 1;</code></pre>`.

---

### Q27: Why are HTML Character Entities needed? Name 4 common entities.
**Answer:** Reserved characters (like `<` and `>`) conflict with HTML tag syntax. Entities represent these characters safely:
* `&lt;` -> `<`
* `&gt;` -> `>`
* `&amp;` -> `&`
* `&quot;` -> `"`
* `&copy;` -> `©`

---

### Q28: What is the difference between `<del>`, `<ins>`, and `<s>`?
* **`<del>`:** Text that has been deleted from a document.
* **`<ins>`:** Text that has been added/inserted into a document.
* **`<s>`:** Text that is no longer accurate or valid (e.g., old strikethrough price).

---

### Q29: What is the `<mark>` tag used for?
**Answer:** Represents text highlighted or marked for reference or relevance purposes (such as search query term matches in search results).

---

### Q30: What is the semantic purpose of the `<small>` tag?
**Answer:** Represents side-comments and small print, such as copyright text, legal disclaimers, terms of service, and licensing clauses.

---

### Q31: What is the `<abbr>` tag and its `title` attribute?
**Answer:** Semantically marks an abbreviation or acronym. The `title` attribute expands the full definition:
```html
<p><abbr title="HyperText Markup Language">HTML</abbr> is easy.</p>
```

---

### Q32: What is the difference between `<blockquote>` and `<q>`?
* **`<blockquote>`:** Block-level container for multi-line quotations from external sources. Supports `cite="URL"` attribute.
* **`<q>`:** Inline container for short quotes; browsers automatically wrap the content in quotation marks.

---

### Q33: What is the `<cite>` tag used for?
**Answer:** Represents the title of a creative work (e.g., a book, paper, movie, song, painting). It should **not** contain an author's name.

---

### Q34: What is the `<address>` tag and what content belongs inside?
**Answer:** Supplies contact information (email, phone, physical location, URL) for the author/owner of the document or closest `<article>`. It should not be used for generic mailing addresses.

---

### Q35: What is the difference between `<bdi>` and `<bdo>`?
* **`<bdi>` (Bi-Directional Isolation):** Isolates a span of text of unknown direction (like user-generated usernames in Arabic) so it does not corrupt surrounding text layout.
* **`<bdo>` (Bi-Directional Override):** Explicitly forces text direction: `<bdo dir="rtl">12345</bdo>`.

---

### Q36: What is the standard semantic structure of an HTML `<table>`?
**Answer:**
```html
<table>
  <caption>Monthly Revenue</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$10,000</td>
    </tr>
  </tfoot>
</table>
```

---

### Q37: What is the difference between `<th>` and `<td>`?
* **`<th>`:** Table Header cell containing column/row titles. Rendered bold and centered by default and announced as headers by screen readers.
* **`<td>`:** Table Data cell containing standard data.

---

### Q38: What does the `scope` attribute do on a `<th>` cell?
**Answer:** Explicitly specifies whether the header cell applies to a column (`scope="col"`), a row (`scope="row"`), a column group (`scope="colgroup"`), or a row group (`scope="rowgroup"`).

---

### Q39: What are `colspan` and `rowspan` attributes?
* **`colspan="N"`:** Merges a cell across $N$ horizontal columns.
* **`rowspan="N"`:** Merges a cell down across $N$ vertical rows.

---

### Q40: What are `<colgroup>` and `<col>` tags?
**Answer:** Allows applying shared styles, widths, or classes to entire table columns without repeating classes on every individual `<td>`:
```html
<table>
  <colgroup>
    <col class="col-highlight">
    <col span="2" class="col-standard">
  </colgroup>
  ...
</table>
```

---

### Q41: What is the basic anatomy of an HTML `<form>`?
```html
<form action="/api/login" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  <button type="submit">Log In</button>
</form>
```
* `action`: Destination endpoint URL where payload is sent.
* `method`: HTTP method (`GET` or `POST`).
* `name`: Key sent in the payload.

---

### Q42: What are the two ways to associate a `<label>` with an `<input>`?
1. **Explicit:** `<label for="email">Email</label><input id="email" name="email">`
2. **Implicit:** `<label>Email <input name="email"></label>`  
Clicking the label focuses the input and screen readers announce the label text upon input focus.

---

### Q43: Name 7 modern HTML5 input types and their advantages.
1. `type="email"`: Validates email pattern and provides `@` on mobile keyboards.
2. `type="tel"`: Displays numeric phone dialpad on mobile.
3. `type="url"`: Validates URL structure and provides `.com` on mobile keyboards.
4. `type="number"`: Restricts input to numerical values with `min`/`max`/`step`.
5. `type="date"`: Renders native OS date picker calendar.
6. `type="range"`: Renders a slider control.
7. `type="color"`: Renders native OS color picker palette.

---

### Q44: What is the difference between `placeholder` and `value` attributes?
* **`placeholder`:** Temporary hint text that disappears when the user begins typing. It is **not** submitted with the form and must not replace `<label>`.
* **`value`:** The actual data contained in the input, which is submitted with the form payload.

---

### Q45: What is the difference between `disabled` and `readonly` attributes?
* **`disabled`:** Greyed out, cannot be focused or modified, and **is NOT submitted** with form data.
* **`readonly`:** Cannot be modified, but **can receive focus**, allows text copying, and **IS submitted** with form data.

---

### Q46: What is the default `type` of a `<button>` inside a `<form>`?
**Answer:** The default is **`type="submit"`**.  
If you place `<button>Cancel</button>` inside a form without `type="button"`, clicking it will trigger form submission.

---

### Q47: What is the difference between `<input type="checkbox">` and `<input type="radio">`?
* **Checkbox:** Allows selecting zero, one, or multiple independent options.
* **Radio:** Allows selecting exactly one option from a mutually exclusive group.

---

### Q48: How do you group radio buttons so only one can be selected at a time?
**Answer:** Give all radio inputs in the group the **exact same `name` attribute**:
```html
<input type="radio" id="visa" name="payment" value="visa">
<input type="radio" id="paypal" name="payment" value="paypal">
```

---

### Q49: What is `<fieldset>` and `<legend>`?
**Answer:** `<fieldset>` groups logically related form controls together (e.g. shipping address fields, radio choices). `<legend>` provides the group caption, read aloud by screen readers for every control inside.

---

### Q50: What is `<select>`, `<option>`, and `<optgroup>`?
```html
<select name="country">
  <optgroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="uk">United Kingdom</option>
  </optgroup>
</select>
```
`<optgroup>` groups dropdown options under a non-selectable categorical header.

---

# Part 2: Intermediate to Advanced HTML (Questions 51 – 100)

### Q51: What is Quirks Mode vs Standards Mode vs Almost Standards Mode?
* **Standards Mode:** Complete compliance with modern W3C/WHATWG HTML and CSS specifications.
* **Quirks Mode:** Emulates legacy Navigator 4 and IE5 bugs for old documents without a doctype (e.g., borders/paddings included inside width).
* **Almost Standards Mode:** Follows standards for box models, but retains legacy behavior for vertical image alignment inside table cells.

---

### Q52: Explain the Critical Rendering Path (CRP) from HTML bytes to pixels.
1. **Bytes -> Tokens:** Tokenizer scans bytes into opening/closing tags.
2. **Tokens -> DOM Tree:** Node objects are constructed in a parent-child hierarchy.
3. **CSSOM Tree:** Stylesheets are parsed into CSS Object Model.
4. **Render Tree:** DOM and CSSOM are merged (omits `display: none` and `<head>`).
5. **Layout (Reflow):** Geometry and exact coordinates on screen are computed.
6. **Paint & Composite:** Rasterizes pixels onto GPU layers.

---

### Q53: What is the HTML tolerant parsing algorithm and why does it matter?
**Answer:** Unlike XML (which halts on syntax errors), HTML5 defines a standardized error-recovery parsing algorithm. If a tag is unclosed (e.g., `<b><i>text</b></i>`), the browser automatically fixes nesting to `<b><i>text</i></b><i></i>` to prevent complete document crashes while maintaining DOM tree consistency across different browsers.

---

### Q54: Explain the exact differences between `<script>`, `<script async>`, `<script defer>`, and `<script type="module">`.
* **Standard `<script>`:** Blocks HTML parsing immediately, fetches, and executes sequentially.
* **`<script async>`:** Fetches in parallel with HTML parsing. As soon as it finishes downloading, parsing pauses to execute the script immediately. Order is non-deterministic.
* **`<script defer>`:** Fetches in parallel with HTML parsing, but delays execution until the DOM is fully constructed (right before `DOMContentLoaded`). Preserves execution order.
* **`<script type="module">`:** Deferred by default, executes in strict mode, has isolated scope, and supports `import`/`export`.

---

### Q55: What are Resource Hints (`dns-prefetch`, `preconnect`, `preload`, `prefetch`, `prerender`)?
```html
<!-- 1. Resolve DNS early -->
<link rel="dns-prefetch" href="https://api.stripe.com">

<!-- 2. DNS + TCP + TLS handshake -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 3. High-priority fetch for CURRENT page (fonts/hero images) -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- 4. Low-priority fetch for NEXT page -->
<link rel="prefetch" href="/dashboard.js" as="script">
```

---

### Q56: What is `fetchpriority` and when should you use `fetchpriority="high"`?
**Answer:** Provides a hint to the browser's preload scanner to adjust network download priority. Use `fetchpriority="high"` on your primary **Largest Contentful Paint (LCP)** image to download it before other competing assets.

---

### Q57: What are HTML Landmark Roles and how do they map to the Accessibility Tree (AOM)?
**Answer:** HTML5 landmarks provide programmatic structure for assistive tools:
* `<header>` -> `role="banner"`
* `<nav>` -> `role="navigation"`
* `<main>` -> `role="main"`
* `<footer>` -> `role="contentinfo"`
* `<aside>` -> `role="complementary"`
* `<section>` with `aria-labelledby` -> `role="region"`

---

### Q58: What is the exact distinction between `<article>`, `<section>`, `<aside>`, and `<div>`?
* **`<article>`:** Self-contained, independently distributable content (blog post, news item, comment card).
* **`<section>`:** Thematic grouping of content, typically with a heading.
* **`<aside>`:** Tangentially related sidebars, advertisements, or related link groups.
* **`<div>`:** Non-semantic visual or layout wrapper with zero semantic meaning.

---

### Q59: Why should an HTML document have only one `<h1>`?
**Answer:** The `<h1>` represents the single primary topic of the page. Multiple `h1` elements create ambiguity in document outline algorithms, confuse screen reader navigation, and dilute technical SEO focus.

---

### Q60: How does `<details>` and `<summary>` create an interactive disclosure widget without JavaScript?
```html
<details>
  <summary>How do I cancel my subscription?</summary>
  <p>Go to Account Settings > Billing > Cancel Plan.</p>
</details>
```
The browser natively handles keyboard interaction, toggle events, and accessible `open` state.

---

### Q61: How does `<dialog>` work, and what is the difference between `dialog.showModal()` and `dialog.show()`?
* **`dialog.showModal()`:** Opens on the top layer, renders a `::backdrop`, traps keyboard focus inside, disables background page clicks (inert), and closes with the `Escape` key.
* **`dialog.show()`:** Opens as a non-modal popup without backdrop or focus trapping.

---

### Q62: What is the HTML5 Popover API and how does it differ from `<dialog>`?
**Answer:** The Popover API (`popover="auto"` or `popover="manual"`) allows any element to become a lightweight overlay:
```html
<button popovertarget="my-popover">Toggle Menu</button>
<div id="my-popover" popover>Popover Menu Content</div>
```
Unlike `<dialog>`, popovers are **non-modal** by default, handle light-dismiss (clicking outside automatically closes it), and do not require custom open/close JavaScript.

---

### Q63: What are `<template>` and `<slot>` elements in Web Components?
* **`<template>`:** Holds client-side HTML that is parsed but **not rendered** on load. Cloned via JavaScript (`template.content.cloneNode(true)`).
* **`<slot>`:** Placeholder inside Shadow DOM where consumer markup is projected.

---

### Q64: What is the Shadow DOM and how does `<slot>` project content?
**Answer:** Shadow DOM encapsulates a component's internal DOM tree and styles, preventing component CSS from leaking into the main document and vice-versa. `<slot>` elements allow external markup passed into the custom element to render inside designated insertion points.

---

### Q65: What is the difference between `<picture>` and `<img>` with `srcset` and `sizes`?
* **`<img> srcset` (Resolution Switching):** Supplies multiple densities/widths of the *same* image; the browser chooses optimal resolution based on DPR and viewport.
* **`<picture>` (Art Direction / Formats):** Enforces different image crops for mobile vs desktop or serves next-gen formats (`AVIF` -> `WebP` -> `JPG`).

---

### Q66: How do `srcset` and `sizes` work together on an `<img>` tag?
```html
<img 
  src="img-800.jpg"
  srcset="img-400.jpg 400w, img-800.jpg 800w, img-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Dashboard architecture"
>
```
`srcset` declares image pixel widths (`400w`), while `sizes` tells the parser what CSS slot width the image will occupy *before* stylesheets finish downloading.

---

### Q67: How do you prevent Cumulative Layout Shift (CLS) on images?
**Answer:** Always provide explicit **`width` and `height` attributes** on the `<img>` tag:
```html
<img src="banner.jpg" width="1200" height="600" alt="Banner" style="width: 100%; height: auto;">
```
Browsers use the `width`/`height` ratio to reserve the layout space before image bytes arrive.

---

### Q68: What is `loading="lazy"` on `<img>` and `<iframe>`?
**Answer:** Defers loading of off-screen images/iframes until they are within a calculated scroll threshold of the viewport, reducing initial network payload and improving page load speed.

---

### Q69: What does `decoding="async"` do on an `<img>` element?
**Answer:** Decodes the compressed raster image off the main JavaScript UI thread, preventing dropped animation frames and scroll stutter during image rendering.

---

### Q70: What is the difference between SVG (Retained Mode) and Canvas (Immediate Mode)?
* **SVG (Retained Mode):** XML elements exist directly in the DOM tree. Supports CSS styling, DOM event listeners, and scales without quality loss.
* **`<canvas>` (Immediate Mode):** Bitmap raster drawn via JavaScript (`CanvasRenderingContext2D` / `WebGL`). Fast for game loops and thousands of particles, but contains no DOM nodes.

---

### Q71: How does `<video>` handle `poster`, `playsinline`, and `muted autoplay`?
```html
<video controls poster="cover.jpg" playsinline muted autoplay loop>
  <source src="video.mp4" type="video/mp4">
</video>
```
* `poster`: Thumbnail before video plays.
* `playsinline`: Prevents automatic full-screen hijacking on iOS Safari.
* `muted autoplay`: Required by modern browsers to allow autoplay without user gestures.

---

### Q72: What is the `<track>` element and its WebVTT `kind` values?
**Answer:** Embeds timed text tracks for `<video>` / `<audio>`:
* `subtitles`: Translation of speech.
* `captions`: Speech + sound effects for hard of hearing.
* `descriptions`: Audio description of visual action.
* `chapters`: Chapter navigation links.

---

### Q73: How do you securely sandbox an `<iframe>`?
```html
<iframe 
  src="https://external-widget.com"
  sandbox="allow-scripts allow-same-origin"
  referrerpolicy="strict-origin-when-cross-origin"
  loading="lazy"
  title="Widget">
</iframe>
```
Omitting tokens inside `sandbox` blocks scripts, forms, popups, and top-level navigation.

---

### Q74: What is the difference between `srcdoc` and `src` on an `<iframe>`?
* **`src`:** Loads an external URL via HTTP.
* **`srcdoc`:** Overrides `src` with raw inline HTML strings, useful for instant previews in browser code playgrounds.

---

### Q75: How does the HTML5 Constraint Validation API work?
```javascript
const input = document.querySelector('#email');

// Check validity without UI
if (!input.checkValidity()) {
  console.log(input.validity.typeMismatch); // boolean
}

// Display native browser tooltip
input.reportValidity();

// Set custom error message
input.setCustomValidity('Please use your company email address');
```

---

### Q76: What are the three `enctype` values for forms and when is `multipart/form-data` mandatory?
1. `application/x-www-form-urlencoded` (Default URL-encoded format).
2. `multipart/form-data` (**Mandatory** when uploading files via `<input type="file">`).
3. `text/plain` (Unencoded plain text).

---

### Q77: What are `formaction`, `formmethod`, and `formnovalidate` button attributes?
**Answer:** Overrides the parent `<form>` attributes specifically for that submit button:
```html
<form action="/save-draft" method="POST">
  <button type="submit">Save Draft</button>
  <button type="submit" formaction="/publish" formnovalidate>Publish Now</button>
</form>
```

---

### Q78: How is `<input type="hidden">` used in Anti-CSRF protection?
**Answer:** Stores a server-generated cryptographic synchronization token:
```html
<input type="hidden" name="csrf_token" value="8f9a2b1c4e...">
```
The server validates this token against the user's session to ensure requests originate from authorized pages.

---

### Q79: What is the `<datalist>` tag and how does it differ from `<select>`?
**Answer:** Supplies auto-complete suggestions for an `<input>`, but still allows users to enter custom arbitrary values not present in the list.

---

### Q80: What is the `<output>` tag in HTML5?
**Answer:** Represents the result of a user calculation or script execution:
```html
<form oninput="total.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="10"> +
  <input type="number" id="b" value="20"> =
  <output name="total" for="a b">30</output>
</form>
```

---

### Q81: What is `<meter>` vs `<progress>`?
* **`<meter>`:** Scalar measurement within a known range (Disk usage 80%, battery level).
* **`<progress>`:** Progress completion of an ongoing task (file upload progress).

---

### Q82: What is the Accessibility Tree (AOM) and how is it constructed?
**Answer:** The browser engine maps DOM nodes to accessibility nodes containing accessible **Name**, **Role**, **State**, and **Value**, which screen readers use to navigate and announce content.

---

### Q83: What is the First Rule of ARIA?
> **"If you can use a native HTML element or attribute with the semantics and behavior you already require, do so instead of re-purposing an element and adding ARIA."**

---

### Q84: What is the difference between `aria-label`, `aria-labelledby`, and `aria-describedby`?
* **`aria-label="string"`:** Invisible label on elements without visible text (icon buttons).
* **`aria-labelledby="id"`:** Points to visible element(s) that name this element.
* **`aria-describedby="id"`:** Points to secondary explanatory help or error message elements.

---

### Q85: What is the difference between `aria-hidden="true"` and HTML `hidden` attribute?
* **`aria-hidden="true"`:** Hides the element from screen readers while leaving it visible on screen.
* **`hidden` attribute:** Hides the element both visually and from screen readers.

---

### Q86: What is `aria-live` and what is the difference between `polite` and `assertive`?
* **`aria-live="polite"`:** Waits until the user is idle before announcing dynamic DOM updates.
* **`aria-live="assertive"`:** Interrupts screen reader speech immediately for critical alerts.

---

### Q87: How does `tabindex` focus management work across `-1`, `0`, and positive numbers?
* **`tabindex="0"`:** Inserts element into natural sequential keyboard Tab order.
* **`tabindex="-1"`:** Removes element from keyboard tab order, but allows programmatic focus via `element.focus()`.
* **`tabindex="1+"`:** **Anti-pattern!** Disrupts natural document focus order.

---

### Q88: What are Accessible Skip Links and how are they implemented?
**Answer:** A hidden anchor tag placed as the first child of `<body>` that becomes visible on keyboard focus, allowing keyboard users to bypass long headers:
```html
<a href="#main" class="skip-link">Skip to main content</a>
...
<main id="main" tabindex="-1">...</main>
```

---

### Q89: What is the purpose of `role="presentation"` and `role="none"`?
**Answer:** Removes an element's semantic role from the Accessibility Tree without affecting visual layout (e.g. `<table role="presentation">` removes table semantics).

---

### Q90: What is a Canonical URL (`<link rel="canonical">`) and why is it essential for SEO?
**Answer:** Tells search engines which URL is the master authoritative version when identical content is accessible via multiple URLs (`/page`, `/page?ref=fb`, `/page/`), preventing duplicate content SEO penalties.

---

### Q91: What are Open Graph (OG) and Twitter Card metadata tags?
```html
<meta property="og:title" content="The Product Engineer">
<meta property="og:image" content="https://example.com/og-banner.jpg">
<meta property="og:url" content="https://example.com/interview">
<meta name="twitter:card" content="summary_large_image">
```
Controls the title, image preview, and summary card displayed when shared on Slack, Twitter, Facebook, and LinkedIn.

---

### Q92: What are `<meta name="robots">` directives?
* `index, follow` (Default): Index page and follow links.
* `noindex, nofollow`: Do not index page; do not follow links.
* `noarchive`: Do not cache a copy in search results.
* `nosnippet`: Do not display a description snippet in search results.

---

### Q93: What is Content Security Policy (CSP) and how is it defined in HTML?
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://trusted-cdn.com;
  img-src 'self' data: https:;
  frame-ancestors 'none';
">
```
Restricts approved origins for scripts, styles, images, and iframes to prevent Cross-Site Scripting (XSS).

---

### Q94: What is Clickjacking and how is it prevented?
**Answer:** Embedding a victim site in an invisible iframe to hijack clicks.  
**Mitigation:**
1. CSP: `frame-ancestors 'none';` (or `'self'`).
2. Legacy header: `X-Frame-Options: DENY`.

---

### Q95: What are `data-*` attributes and how are they accessed in JS and CSS?
```html
<article id="card" data-post-id="108" data-is-featured="true"></article>
```
* **JavaScript:** `document.querySelector('#card').dataset.postId` (`"108"`).
* **CSS:** `article[data-is-featured="true"] { border: 2px solid green; }`

---

### Q96: Compare `localStorage`, `sessionStorage`, `Cookies`, and `IndexedDB`.
| Storage API | Capacity | Lifetime | Sent with HTTP? | API Type |
| :--- | :--- | :--- | :--- | :--- |
| **`localStorage`** | ~5MB - 10MB | Persistent | No | Synchronous Key-Value |
| **`sessionStorage`**| ~5MB | Tab session | No | Synchronous Key-Value |
| **`Cookies`** | ~4KB | Configurable (`Expires`) | **Yes** (Every request) | Synchronous string |
| **`IndexedDB`** | > 250MB+ | Persistent | No | Asynchronous NoSQL Object Store |

---

### Q97: What is the document lifecycle sequence (`DOMContentLoaded` vs `load` vs `readystatechange`)?
* **`DOMContentLoaded`:** Fires when the HTML document is fully parsed into the DOM tree (stylesheets and images may still be loading).
* **`window.onload`:** Fires only after the DOM and all external resources (stylesheets, images, fonts) have fully finished loading.
* **`readystatechange`:** Transitions through `loading` -> `interactive` -> `complete`.

---

### Q98: What is the Back/Forward Cache (bfcache) and what breaks it?
**Answer:** An in-memory execution snapshot of a page enabling instant back/forward navigation.  
**What breaks bfcache:**
1. Attaching `window.onunload` event handlers (use `pagehide` instead).
2. `Cache-Control: no-store` on HTML document.
3. Open IndexedDB transactions or active Web Locks.

---

### Q99: What is the HTML Drag and Drop API?
**Answer:** Driven by global attribute `draggable="true"` and events: `dragstart`, `dragenter`, `dragover` (must call `e.preventDefault()` to allow drop), `dragleave`, `drop`, and `dragend`. Payload data is transferred using `event.dataTransfer`.

---

### Q100: How do HTML Web Workers execute background tasks?
**Answer:** Runs computational tasks on background worker threads without blocking the browser's main UI thread:
```javascript
const worker = new Worker('worker.js');
worker.postMessage({ data: payload });
worker.onmessage = (e) => console.log('Result:', e.data);
```
Workers cannot access the DOM or `window` directly, communicating purely via message passing.
