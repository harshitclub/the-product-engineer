# 100 CSS Theoretical Interview Questions

> A comprehensive master collection of 100 theoretical CSS interview questions with in-depth technical explanations, categorized into 50 Basic and 50 Intermediate to Advanced questions.

---

## 📑 Index & Question Distribution

| Category | Range | Topics Covered |
| :--- | :--- | :--- |
| [**Part 1: Basic & Foundational CSS**](#part-1-basic-foundational-css-questions-1-50) | Q1 – Q50 | CSS syntax, 3 ways to add CSS, selectors, specificity basics, cascade rules, box-model, units (`px`, `rem`, `em`, `vw`, `vh`), colors, typography, margin collapse, `display`, basic positioning |
| [**Part 2: Intermediate & Advanced CSS**](#part-2-intermediate-to-advanced-css-questions-51-100) | Q51 – Q100 | Stacking contexts, BFC, Flexbox & Grid internals, Subgrid, Container Queries, Cascade Layers (`@layer`), CSS variables, `clamp()`, OKLCH colors, `:has()`, `:is()`, `:where()`, Reflow vs Repaint, CSS Containment |

---

# Part 1: Basic & Foundational CSS (Questions 1 – 50)

### Q1: What is CSS and how does the browser apply styles to the DOM?
**Answer:** CSS (Cascading Style Sheets) is a rule-based styling language used to describe the visual presentation of HTML documents. The browser parses stylesheets into the **CSS Object Model (CSSOM)**, matches CSS selectors against DOM nodes, resolves the cascade and specificity to calculate computed styles, and combines DOM and CSSOM to build the **Render Tree**.

---

### Q2: What are the three ways to include CSS in an HTML document, and what are their trade-offs?
1. **External Stylesheet (`<link rel="stylesheet">`):** Cached across pages, clean separation of concerns, optimal for production.
2. **Internal `<style>` Block:** Placed in `<head>`, useful for single-page critical CSS, but not cached independently.
3. **Inline Styles (`style="..."`):** Highest specificity, difficult to maintain, blocks browser caching, violates strict Content Security Policies (CSP).

---

### Q3: What is the CSS Box Model and what are its 4 layers?
**Answer:** Every element in CSS is represented as a rectangular box consisting of:
1. **Content:** The actual text, image, or child elements.
2. **Padding:** Transparent space clearing the area around the content (inside the border).
3. **Border:** The perimeter line wrapping the padding and content.
4. **Margin:** Transparent space outside the border separating the element from neighbors.

---

### Q4: What is the difference between `box-sizing: content-box` and `box-sizing: border-box`?
* **`content-box` (Browser Default):** `width` and `height` apply **only** to the content area. Padding and borders are added to the width:
  $$\text{Total Width} = \text{width} + \text{padding-left} + \text{padding-right} + \text{border-left} + \text{border-right}$$
* **`border-box`:** `width` and `height` include content, padding, and border:
  $$\text{Total Width} = \text{specified width (padding and borders shrink the content)}$$

---

### Q5: Why is the universal `*, *::before, *::after { box-sizing: border-box; }` reset recommended?
**Answer:** It ensures that when you set `width: 100%` or `width: 300px`, adding padding or borders will never cause the element to overflow its parent container or break grid/flex column layouts.

---

### Q6: What are CSS Selectors and what are the primary types?
* **Universal Selector:** `*`
* **Type (Element) Selector:** `h1`, `p`, `button`
* **Class Selector:** `.card`, `.btn-primary`
* **ID Selector:** `#main-header`
* **Attribute Selector:** `[type="email"]`, `[data-status="active"]`
* **Combinators:** Descendant (`div p`), Child (`ul > li`), Adjacent Sibling (`h2 + p`), General Sibling (`h2 ~ p`)

---

### Q7: What is the difference between Child Combinator (`>`) and Descendant Combinator (space)?
* **Descendant (`div p`):** Matches all `<p>` elements nested anywhere inside `<div>`, regardless of nesting depth.
* **Child (`div > p`):** Matches only `<p>` elements that are **direct, immediate children** of `<div>`.

---

### Q8: What is the difference between Adjacent Sibling (`+`) and General Sibling (`~`)?
* **Adjacent Sibling (`h2 + p`):** Matches the `<p>` element that appears **immediately after** `<h2>` sharing the same parent.
* **General Sibling (`h2 ~ p`):** Matches **all** `<p>` elements that appear after `<h2>` sharing the same parent.

---

### Q9: What is the CSS Cascade and how are style conflicts resolved?
**Answer:** The Cascade resolves conflicts based on three sequential criteria:
1. **Origin & Importance:** User-Agent styles < User styles < Author styles < `!important` declarations.
2. **Specificity:** The selector with the higher specificity weight wins.
3. **Source Order:** If specificity is identical, the rule declared **last** in the stylesheet wins.

---

### Q10: What is CSS Specificity and how is its numerical score calculated?
**Answer:** Specificity is calculated as a 4-part weight `(Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)`:
* **Inline styles (`style=""`):** (1, 0, 0, 0)
* **ID Selectors (`#header`):** (0, 1, 0, 0)
* **Class, Attribute, Pseudo-class (`.btn`, `[type="text"]`, `:hover`):** (0, 0, 1, 0)
* **Element & Pseudo-element (`div`, `p`, `::before`):** (0, 0, 0, 1)
* Universal selector (`*`) and combinators (`+`, `>`, `~`) have specificity (0, 0, 0, 0).

---

### Q11: What does `!important` do and why should it be avoided in production?
**Answer:** `!important` overrides normal cascade specificity calculations. Overusing it creates brittle stylesheets where developers must write increasingly specific `!important` rules to override previous ones, breaking modularity and component encapsulation.

---

### Q12: What is the difference between `px`, `rem`, and `em` units?
* **`px` (Pixel):** Absolute, fixed screen unit (1px = 1/96th of an inch). Does not scale when users change browser font preferences.
* **`em`:** Relative unit relative to the **font-size of its direct parent** (or its own font-size for margins/paddings). Can cause compounding scaling issues when deeply nested.
* **`rem` (Root EM):** Relative unit relative to the **font-size of the root element (`<html>`)** (default `1rem = 16px`). Scales predictably across the entire design system when user changes root font settings.

---

### Q13: What are Viewport Units (`vw`, `vh`, `vmin`, `vmax`)?
* `1vw`: 1% of the viewport width.
* `1vh`: 1% of the viewport height.
* `1vmin`: 1% of the smaller viewport dimension (width or height).
* `1vmax`: 1% of the larger viewport dimension.

---

### Q14: What is the difference between `100vh`, `100dvh`, `100svh`, and `100lvh`?
* **`100vh`:** Fixed 100% viewport height (causes content clipping on mobile when address bar expands).
* **`100svh` (Short Viewport Height):** Viewport height when mobile URL address bar is fully expanded.
* **`100lvh` (Large Viewport Height):** Viewport height when mobile URL address bar is collapsed/hidden.
* **`100dvh` (Dynamic Viewport Height):** Dynamically adjusts in real time as the user scrolls and the browser address bar expands or shrinks.

---

### Q15: What is Margin Collapsing and when does it occur?
**Answer:** Vertical margins of adjacent block-level elements in normal flow combine into a single margin equal to the largest individual margin, rather than adding together.  
**Occurs between:**
1. Adjacent siblings (`margin-bottom` of first element collapses with `margin-top` of second).
2. Parent and first/last child when there is no border, padding, or inline content separating them.
3. Empty block elements with both top and bottom margins.

---

### Q16: When do margins NOT collapse?
**Answer:** Margins do not collapse when elements are:
* Flex items (`display: flex`) or Grid items (`display: grid`).
* Positioned elements (`position: absolute` or `position: fixed`).
* Floating elements (`float: left/right`).
* Separated by padding or borders.
* Inside different Block Formatting Contexts (BFC) (e.g., `overflow: hidden`).
* Horizontal margins **never** collapse.

---

### Q17: What is the difference between `display: none` and `visibility: hidden`?
* **`display: none`:** Removes the element completely from the document flow and Render Tree. Occupies zero layout space and screen readers ignore it.
* **`visibility: hidden`:** Hides the element visually, but the element **still occupies its original layout space** in the document flow.

---

### Q18: What is the difference between `display: inline`, `display: block`, and `display: inline-block`?
* **`inline`:** Flows inside text lines. Ignores `width` and `height`; vertical margins/paddings do not push surrounding lines.
* **`block`:** Takes up full width on a new line; fully respects width, height, margins, and paddings.
* **`inline-block`:** Flows inline with text, but fully respects `width`, `height`, margins, and paddings like a block element.

---

### Q19: Explain the CSS `position` values: `static`, `relative`, `absolute`, `fixed`, `sticky`.
* **`static` (Default):** Normal document flow. `top`/`right`/`bottom`/`left`/`z-index` have no effect.
* **`relative`:** Positioned relative to its normal position. Still reserves its original space in document flow. Acts as a containing block for `absolute` children.
* **`absolute`:** Removed from normal flow. Positioned relative to its nearest non-static positioned ancestor (or viewport).
* **`fixed`:** Removed from normal flow. Positioned relative to the viewport window. Does not move when scrolling.
* **`sticky`:** Hybrid position; behaves as `relative` until scrolling passes a specified threshold (`top: 0`), then behaves as `fixed` within its parent container.

---

### Q20: What are the prerequisites for `position: sticky` to function properly?
**Answer:**
1. A directional threshold must be specified (e.g. `top: 0` or `bottom: 20px`).
2. No ancestor container can have `overflow: hidden`, `overflow: auto`, or `overflow: scroll` that clips the sticky boundary.
3. The parent container must have remaining height greater than the sticky element.

---

### Q21: What is the difference between Pseudo-classes (`:`) and Pseudo-elements (`::`)?
* **Pseudo-class (`:hover`, `:focus`, `:nth-child(2)`):** Selects an element based on its **state** or position in the DOM.
* **Pseudo-element (`::before`, `::after`, `::placeholder`):** Creates or styles a **virtual sub-element** that does not exist directly in the HTML markup.

---

### Q22: What is the mandatory CSS property required for `::before` and `::after` to render?
**Answer:** The **`content` property** is mandatory (e.g. `content: "";` or `content: "★";`). If `content` is omitted, the pseudo-element will not be generated in the render tree.

---

### Q23: What is the difference between `:nth-child(n)` and `:nth-of-type(n)`?
* **`:nth-child(n)`:** Selects the element if it is the $n$-th child of its parent, regardless of element tag name.
* **`:nth-of-type(n)`:** Filters by tag type first, selecting the $n$-th child of that specific tag type under the parent.

---

### Q24: What is the difference between `:hover`, `:focus`, `:active`, and `:focus-visible`?
* **`:hover`:** Triggered when the pointer device hovers over an element.
* **`:focus`:** Triggered when an element receives focus via mouse click, touch, or keyboard navigation.
* **`:active`:** Triggered during the active click/press state (between mousedown and mouseup).
* **`:focus-visible`:** Triggered **only** when focus is applied via keyboard navigation (Tab key) or assistive technology, suppressing focus rings on mouse clicks.

---

### Q25: What is the LVHA link styling order and why is it necessary?
**Answer:** **L**ink -> **V**isited -> **H**over -> **A**ctive (`:link`, `:visited`, `:hover`, `:active`).  
Because all four pseudo-classes have identical specificity weight, they must appear in this exact order so `:hover` can override `:visited`, and `:active` can override `:hover` based on cascade source order.

---

### Q26: What are CSS Colors: HEX, RGB, RGBA, HSL, HSLA?
* **HEX (`#4f46e5`):** 6 or 8-digit hexadecimal notation representing Red, Green, Blue, Alpha.
* **RGB / RGBA (`rgb(79, 70, 229)` / `rgba(79, 70, 229, 0.5)`):** Decimals 0–255 for Red, Green, Blue, and 0–1 for Alpha.
* **HSL / HSLA (`hsl(243, 75%, 59%)`):** Hue (0–360 degrees on color wheel), Saturation (0–100%), Lightness (0–100%). Easier for creating programmatic tint and shade palettes.

---

### Q27: What is the modern CSS Color syntax (CSS Color Level 4)?
```css
/* Space-separated channels with slash-separated alpha */
color: rgb(79 70 229 / 80%);
color: hsl(243deg 75% 59% / 0.8);
```
Eliminates the distinction between `rgb()` and `rgba()`.

---

### Q28: What is the difference between `inherit`, `initial`, `unset`, and `revert`?
* **`inherit`:** Explicitly takes the computed value of the property from its parent element.
* **`initial`:** Resets the property to its official default value defined in the W3C CSS specification.
* **`unset`:** Resets property to `inherit` if the property naturally inherits (e.g. `color`), or `initial` if it does not (e.g. `border`).
* **`revert`:** Rolls back the cascade to the browser's default user-agent stylesheet.

---

### Q29: What are Inherited vs Non-Inherited CSS properties?
* **Inherited Properties:** Automatically passed from parent to children (e.g., `color`, `font-family`, `font-size`, `line-height`, `letter-spacing`, `text-align`, `visibility`).
* **Non-Inherited Properties:** Apply only to target node (e.g., `background`, `border`, `margin`, `padding`, `width`, `height`, `display`, `position`).

---

### Q30: What is the difference between `opacity: 0`, `visibility: hidden`, and `display: none`?

| Property | Occupies Layout Space? | Receives Click Events? | Screen Reader Accessible? | Transitionable? |
| :--- | :--- | :--- | :--- | :--- |
| **`display: none`** | **No** | No | **No** | No |
| **`visibility: hidden`** | **Yes** | No | **No** | Yes (discrete) |
| **`opacity: 0`** | **Yes** | **Yes** (Unless `pointer-events: none`) | **Yes** | **Yes** (GPU smooth) |

---

### Q31: What is the difference between `border` and `outline`?
* **`border`:** Part of the Box Model. Occupies layout space, affects element dimensions, and supports individual side declarations (`border-top`).
* **`outline`:** Drawn outside the border edge. **Does not occupy layout space**, does not affect dimensions/reflow, wraps around the entire element perimeter uniformly, and supports `outline-offset`.

---

### Q32: What does `outline-offset` do?
**Answer:** Moves the outline outward (positive value) or inward (negative value) from the element's border edge without causing layout reflow, commonly used to create high-contrast, accessible focus indicators:
```css
button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 4px;
}
```

---

### Q33: What is the CSS `overflow` property and its values?
* `visible` (Default): Content overflows outside container bounds.
* `hidden`: Clips overflowing content with no scrollbars.
* `scroll`: Always renders scrollbars regardless of whether content overflows.
* `auto`: Renders scrollbars **only** when content exceeds container bounds.
* `clip`: Clips content without creating a scroll container or formatting context.

---

### Q34: What is the difference between `overflow-x` and `overflow-y`?
**Answer:** Controls clipping/scrolling independently on horizontal and vertical axes:
```css
.code-box {
  overflow-x: auto; /* Horizontal scroll for long lines */
  overflow-y: hidden; /* No vertical scrollbar */
}
```

---

### Q35: What is the difference between `word-break: break-all` and `overflow-wrap: break-word`?
* **`overflow-wrap: break-word` (Recommended):** Breaks words only when an entire word cannot fit on its own line without overflowing.
* **`word-break: break-all`:** Aggressively breaks words at the exact edge of the container between any two characters, even if the word could have fit on the next line.

---

### Q36: How does CSS `line-height` calculate with unitless numbers vs percentages/pixels?
* **Unitless number (`line-height: 1.5` - Recommended):** Children inherit the **multiplier** `1.5` and multiply it by their own computed `font-size`.
* **Pixels / Percentages (`line-height: 24px` or `150%`):** Children inherit the **computed absolute pixel value** (e.g. 24px), causing overlapping text if child headings have larger font sizes.

---

### Q37: What is the difference between `font-weight: 400`, `700`, `bold`, and `bolder`?
* `400`: Standard normal weight (`normal`).
* `700`: Standard bold weight (`bold`).
* `bolder`: Calculates relative bold weight relative to parent font weight.
* Variable fonts allow arbitrary integer weights (e.g., `font-weight: 540`).

---

### Q38: What does the `@font-face` rule do and what is `font-display: swap`?
**Answer:** `@font-face` downloads custom web fonts:
```css
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/fonts/jakarta.woff2') format('woff2');
  font-display: swap;
}
```
* **`font-display: swap`:** Renders a system fallback font immediately so text is visible during download (prevents Flash of Invisible Text - FOIT), then swaps in the custom web font when ready.

---

### Q39: What is the difference between FOIT and FOUT in font loading?
* **FOIT (Flash of Invisible Text):** Browser hides text with transparent space until custom font downloads.
* **FOUT (Flash of Unstyled Text):** Browser displays fallback system font immediately, then swaps in custom font once downloaded.

---

### Q40: What are CSS Gradients: Linear, Radial, Conic?
* **Linear Gradient:** Color transitions along a straight directional line (`linear-gradient(90deg, #4f46e5, #9333ea)`).
* **Radial Gradient:** Color transitions radiating outward from a central point (`radial-gradient(circle, #fff, #000)`).
* **Conic Gradient:** Color transitions rotated around a 360-degree center point (pie charts, color wheels).

---

### Q41: What is the CSS `background-size` property values: `cover` vs `contain`?
* **`cover`:** Scales image to completely cover the container while preserving aspect ratio (edges may be cropped).
* **`contain`:** Scales image so the entire image is visible inside the container without cropping (may leave empty letterbox space).

---

### Q42: What is the CSS `background-position` property?
**Answer:** Sets the initial position of the background image relative to background positioning area (`background-position: center center`, `top right`, `50% 50%`).

---

### Q43: What is the CSS `background-attachment: fixed` effect?
**Answer:** Fixes the background image relative to the viewport so the background remains stationary while foreground text scrolls over it (parallax-style effect).

---

### Q44: What are CSS Multi-column layouts (`columns`, `column-count`, `column-gap`)?
**Answer:** Splits text content into newspaper-style vertical columns that flow automatically:
```css
.article-text {
  column-count: 3;
  column-gap: 24px;
  column-rule: 1px solid #e2e8f0;
}
```

---

### Q45: What does the CSS `cursor` property do and name 5 common values?
**Answer:** Specifies the mouse cursor icon displayed when hovering over an element:
`pointer`, `default`, `not-allowed`, `grab`, `grabbing`, `text`, `wait`, `crosshair`, `zoom-in`.

---

### Q46: What does `pointer-events: none` do?
**Answer:** Makes the element completely transparent to click, hover, drag, and touch events. Pointer events pass through to whatever underlying DOM element is physically behind it.

---

### Q47: What is the difference between `user-select: none` and `pointer-events: none`?
* **`user-select: none`:** Prevents users from highlighting and copying text, but the element **still receives clicks and hover events**.
* **`pointer-events: none`:** Disables all click and hover interactions.

---

### Q48: What is `aspect-ratio` in CSS and why is it preferred over padding hacks?
**Answer:** Directly sets the width-to-height ratio of a box (`aspect-ratio: 16 / 9` or `1 / 1`). It replaces legacy `padding-top: 56.25%` wrapper hacks, preventing layout shifts before media loads.

---

### Q49: What is the CSS `resize` property and when does it work?
**Answer:** Controls whether an element is resizable by the user (`horizontal`, `vertical`, `both`, `none`). It **only** works on elements with `overflow` set to something other than `visible` (e.g. `<textarea>` or `overflow: auto`).

---

### Q50: How does CSS `white-space` property work (`normal`, `nowrap`, `pre`, `pre-wrap`)?
* `normal`: Collapses sequences of whitespace and wraps lines naturally.
* `nowrap`: Collapses whitespace but **never wraps lines** to a new row.
* `pre`: Preserves all whitespace and line breaks (like `<pre>`).
* `pre-wrap`: Preserves whitespace and newlines, but wraps lines when reaching container boundaries.

---

# Part 2: Intermediate to Advanced CSS (Questions 51 – 100)

### Q51: What is a Stacking Context in CSS and how is one created?
**Answer:** A Stacking Context is a 3D conceptual layering of HTML elements along the z-axis relative to the screen.  
**Created by:**
1. Root element `<html>`.
2. `position: relative/absolute` with `z-index` other than `auto`.
3. `position: fixed` or `position: sticky`.
4. `opacity` less than `1`.
5. `transform`, `filter`, `perspective`, `clip-path`, or `backdrop-filter` other than `none`.
6. `mix-blend-mode` other than `normal`.
7. `isolation: isolate`.
8. `will-change` specifying any property that creates a stacking context.

---

### Q52: Why does `z-index: 9999` sometimes fail to bring an element on top of another?
**Answer:** `z-index` values are evaluated **only within their own local Stacking Context**. If element A's parent is inside a lower stacking context than element B's parent, no `z-index` on element A will ever allow it to render in front of element B.

---

### Q53: What does `isolation: isolate` do?
**Answer:** Creates a brand new Stacking Context on an element without requiring positioning or transform hacks, preventing child `z-index` values from bleeding into or conflicting with parent page stacking contexts.

---

### Q54: What is a Block Formatting Context (BFC) and what problems does it solve?
**Answer:** A BFC is an isolated mini-layout environment where block boxes are laid out.  
**Created by:** `overflow: hidden/auto/clip`, `display: flow-root`, `display: flex/grid`, `position: absolute/fixed`, `float: left/right`.  
**Solves:**
1. Prevents margin collapsing between parent and children.
2. Clears internal floats automatically without clearfix hacks.
3. Prevents elements from overlapping adjacent floating elements.

---

### Q55: Why is `display: flow-root` the modern replacement for clearfix hacks?
**Answer:** `display: flow-root` creates a new Block Formatting Context explicitly without side effects (unlike `overflow: hidden` which clips popups, shadows, and tooltips).

---

### Q56: Explain the Flexbox Layout model: Main Axis vs Cross Axis.
* **Main Axis:** The primary direction flex items flow, defined by `flex-direction` (`row` = horizontal, `column` = vertical). Controlled by `justify-content`.
* **Cross Axis:** Perpendicular to the main axis. Controlled by `align-items` and `align-content`.

---

### Q57: What is the difference between `justify-content`, `align-items`, and `align-content` in Flexbox?
* **`justify-content`:** Distributes extra space along the **Main Axis** (`flex-start`, `center`, `space-between`, `space-around`, `space-evenly`).
* **`align-items`:** Aligns items along the **Cross Axis** inside a single flex line (`stretch`, `center`, `flex-start`, `flex-end`, `baseline`).
* **`align-content`:** Distributes space between multiple lines along the Cross Axis when `flex-wrap: wrap` is enabled.

---

### Q58: Explain the `flex` shorthand property (`flex: flex-grow flex-shrink flex-basis`).
* **`flex-grow`:** Factor determining how much extra available container space the item absorbs (default `0`).
* **`flex-shrink`:** Factor determining how much the item shrinks when container space is insufficient (default `1`).
* **`flex-basis`:** Initial size of the item along the main axis before extra space is distributed (default `auto`).
* `flex: 1` expands to `flex: 1 1 0%`.

---

### Q59: What is the difference between `flex-basis: 0` vs `flex-basis: auto`?
* **`flex-basis: 0`:** All items ignore their initial content width and distribute the **entire container width** evenly according to `flex-grow` ratios.
* **`flex-basis: auto`:** Items retain their content size first, and only the **remaining remaining space** is distributed according to `flex-grow`.

---

### Q60: Explain CSS Grid Layout: `grid-template-columns`, `grid-template-rows`, and the `fr` unit.
**Answer:** CSS Grid is a 2D layout system controlling both rows and columns simultaneously.  
* `1fr` (Fraction unit): Represents one share of available free space in the grid container.
```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 2fr; /* 200px sidebar, remainder split 1:2 */
  gap: 16px;
}
```

---

### Q61: What is the difference between `auto-fill` and `auto-fit` in CSS Grid?
```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```
* **`auto-fill`:** Fills the row with as many 200px column tracks as fit, creating **empty ghost columns** if space remains.
* **`auto-fit`:** Drops empty tracks and **expands existing items** to fill the full remaining width.

---

### Q62: What is CSS Subgrid (`grid-template-columns: subgrid`)?
**Answer:** Allows nested child grid items to align directly with the parent grid's column and row tracks, enabling uniform alignment of card headers, images, and footers across different cards regardless of varying content lengths.

---

### Q63: What are Container Queries (`@container`) and how do they differ from Media Queries (`@media`)?
* **`@media`:** Evaluates viewport dimensions (screen width). All components respond to the entire browser window size.
* **`@container`:** Evaluates the **parent container's width**. A component can adapt its layout depending on whether it is placed inside a narrow sidebar (300px) or a wide main feed (800px) on the same screen.

---

### Q64: How do you declare a Container Query in CSS?
```css
/* 1. Define container context on parent */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Query container width */
@container card (min-width: 500px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
```

---

### Q65: What are CSS Cascade Layers (`@layer`) and why are they used?
**Answer:** `@layer` defines explicit priority orders for entire stylesheets, independent of selector specificity.
```css
@layer reset, base, components, utilities;

@layer reset {
  a { color: red !important; } /* Low priority layer */
}
@layer components {
  .btn { color: blue; } /* Wins over reset layer regardless of specificity */
}
```
Styles in higher layers always override styles in lower layers.

---

### Q66: What are CSS Custom Properties (Variables) and how do they differ from SASS/SCSS variables?
* **SASS Variables (`$primary`):** Compiled at build-time to static strings. No runtime DOM awareness.
* **CSS Custom Properties (`--primary: #4f46e5;`):** Live in the DOM at runtime. Inherit down the DOM tree, can be scoped to components, and can be read/updated dynamically via JavaScript (`element.style.setProperty()`) and media queries.

---

### Q67: What does the CSS math function `clamp(min, preferred, max)` do?
**Answer:** Clamps a value between a lower bound and an upper bound:
```css
font-size: clamp(1.25rem, 4vw, 2.5rem);
```
* Never drops below `1.25rem`.
* Scales fluidly at `4vw`.
* Never exceeds `2.5rem`.

---

### Q68: What are `min()` and `max()` functions in CSS?
* **`width: min(100%, 800px);`:** Picks whichever value is smaller (replaces `max-width: 800px; width: 100%`).
* **`width: max(300px, 50vw);`:** Picks whichever value is larger (enforces minimum floor).

---

### Q69: What is the CSS `:has()` relational pseudo-class (Parent Selector)?
**Answer:** Selects an element based on its descendant or succeeding elements:
```css
/* Style article card ONLY if it contains a featured badge */
article:has(.featured-badge) {
  border: 2px solid gold;
}

/* Style form label when associated input is invalid */
label:has(+ input:invalid) {
  color: red;
}
```

---

### Q70: What is the difference between `:is()` and `:where()` pseudo-classes?
Both take a list of selectors to group rules cleanly (`:is(h1, h2, h3)`):
* **`:is()` Specificity:** Adopts the specificity of its **most specific argument** in the list.
* **`:where()` Specificity:** **Zero specificity** `(0, 0, 0, 0)`. Ideal for writing easily-overridable CSS resets.

---

### Q71: What is the OKLCH color space and why is it superior to RGB/HSL?
**Answer:** OKLCH is a perceptual color space:
```css
color: oklch(0.65 0.24 265); /* Lightness, Chroma, Hue */
```
* **Perceptual Uniformity:** Changing hue maintains consistent visual brightness (unlike HSL where pure yellow appears much brighter than pure blue).
* **Wide Gamut:** Accesses P3 wide-gamut colors unavailable in standard sRGB displays.

---

### Q72: Explain CSS Reflow (Layout), Repaint, and Composite.
* **Reflow (Layout):** Recomputing geometry and positions of nodes on screen (triggered by `width`, `height`, `margin`, `padding`, `font-size`, `display`, `top`). **Most expensive.**
* **Repaint:** Redrawing pixels without altering geometry (triggered by `color`, `background-color`, `visibility`, `box-shadow`).
* **Composite:** Repositioning GPU texture layers on screen (triggered by `transform` and `opacity`). **Fastest (60/120 FPS).**

---

### Q73: Why should animations use `transform` and `opacity` instead of `top`, `left`, `width`, or `height`?
**Answer:** `transform` and `opacity` are processed exclusively on the GPU compositor thread without triggering layout Reflow or Repaint on the main JavaScript UI thread, guaranteeing smooth 60fps / 120fps animations.

---

### Q74: What does `will-change` do and what are its risks?
**Answer:** Informs the browser GPU in advance that a property will animate (`will-change: transform`), allowing the engine to promote the element to its own dedicated compositor layer.  
**Risk:** Excessive `will-change` consumes heavy GPU VRAM memory and causes layer explosion bugs.

---

### Q75: What is CSS Containment (`contain: layout paint style`)?
**Answer:** Informs the rendering engine that an element's DOM subtree is isolated from the rest of the document:
* Changes inside the element will never trigger layout reflow outside its box boundary.
* Significantly improves performance for long lists and infinite scrolling feeds.

---

### Q76: What is `content-visibility: auto` and how does it boost page performance?
**Answer:** Skips rendering (layout and paint) of off-screen DOM elements until the user scrolls near them. Replaces virtualized list libraries for heavy DOM trees with pure CSS. Pair with `contain-intrinsic-size` to prevent scrollbar jumping.

---

### Q77: What does `contain-intrinsic-size` do?
**Answer:** Supplies an estimated placeholder dimension for elements with `content-visibility: auto` so the browser computes accurate page scrollbar lengths before off-screen elements render:
```css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 0 450px;
}
```

---

### Q78: What is `@media (prefers-reduced-motion: reduce)`?
**Answer:** Detects if the operating system has motion reduction enabled for users with vestibular disorders or motion sickness:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Q79: What is `@media (prefers-color-scheme: dark)`?
**Answer:** Detects whether the user's operating system is set to light or dark mode, allowing native CSS dark theme switching without JavaScript:
```css
:root {
  --bg: #ffffff;
  --text: #0f172a;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f8fafc;
  }
}
```

---

### Q80: What is CSS `scroll-behavior: smooth` and what is its accessibility gotcha?
**Answer:** Enables animated smooth scrolling for anchor link clicks (`html { scroll-behavior: smooth; }`).  
**Gotcha:** Must be wrapped inside `@media (prefers-reduced-motion: no-preference)` to respect motion sensitivity settings.

---

### Q81: What are CSS Scroll Snap properties (`scroll-snap-type`, `scroll-snap-align`)?
**Answer:** Creates native carousels and pagination sliders without JavaScript:
```css
.carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.slide {
  scroll-snap-align: center;
}
```

---

### Q82: What is CSS `accent-color`?
**Answer:** Styles the brand tint color of native HTML interactive elements (`<input type="checkbox">`, `<input type="radio">`, `<input type="range">`, `<progress>`) with a single CSS property:
```css
:root {
  accent-color: #4f46e5;
}
```

---

### Q83: What is the CSS `color-scheme` property?
**Answer:** Informs the browser that the page supports dark/light themes, causing native form controls, scrollbars, and system inputs to render with dark mode UI automatically:
```css
:root {
  color-scheme: light dark;
}
```

---

### Q84: What does the `:empty` pseudo-class match?
**Answer:** Matches elements that have **no child nodes whatsoever** (no child elements, no text, not even whitespace).

---

### Q85: What does the `:target` pseudo-class do?
**Answer:** Matches an element whose `id` matches the current URL's hash fragment (`#modal-1`), enabling pure-CSS tabs, accordions, and modals.

---

### Q86: What does the `:focus-within` pseudo-class do?
**Answer:** Matches an element if the element itself **or any of its descendants** currently has focus (e.g. highlighting an entire form card when an inner input is focused).

---

### Q87: What is the difference between `filter` and `backdrop-filter`?
* **`filter: blur(10px);`:** Blurs the element **and all of its child content**.
* **`backdrop-filter: blur(10px);`:** Blurs the **background content physically behind the element**, keeping the element's foreground text crisp (used for glassmorphism effects).

---

### Q88: What is `mix-blend-mode` vs `background-blend-mode`?
* **`mix-blend-mode`:** Blends an element with the content of its underlying parent elements.
* **`background-blend-mode`:** Blends multiple background images or colors on the same element with each other.

---

### Q89: What is `clip-path` in CSS?
**Answer:** Creates geometric clipping masks (circles, ellipses, polygons) so only the region inside the mask is visible:
```css
.hexagon {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
```

---

### Q90: What are CSS Transitions vs CSS Keyframe Animations?
* **Transitions:** Interpolate properties smoothly between two states when triggered by an event (e.g. `:hover`).
* **Keyframe Animations (`@keyframes`):** Multi-step, standalone animations that can run automatically, loop infinitely, and define granular timeline stages (`0%`, `50%`, `100%`).

---

### Q91: What is `animation-fill-mode` and its values?
* `none` (Default): Styles do not apply before animation starts or after it ends.
* `forwards`: Element retains computed styles from the **last keyframe** after animation ends.
* `backwards`: Element applies styles from the **first keyframe** during the `animation-delay` period.
* `both`: Applies both forwards and backwards rules.

---

### Q92: What are CSS Scroll-driven Animations?
**Answer:** Connects animation timeline progress directly to container scroll position instead of time duration:
```css
@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}
.progress-bar {
  animation: progress linear;
  animation-timeline: scroll(root);
}
```

---

### Q93: What is the CSS `grid-auto-flow: dense` algorithm?
**Answer:** Fills empty visual holes in a grid layout earlier in the grid if smaller items appear later in the DOM, creating gap-free masonry-style layouts.

---

### Q94: What is CSS View Transitions API?
**Answer:** Native browser API (`document.startViewTransition()`) that captures snapshots of old and new DOM states and generates smooth animated transitions between pages or states with minimal CSS.

---

### Q95: What does `@supports` (Feature Query) do?
**Answer:** Tests browser support for modern CSS features before applying rules:
```css
@supports (display: subgrid) {
  .grid-child {
    grid-template-columns: subgrid;
  }
}
```

---

### Q96: What is the difference between `:root` and `html` selector?
**Answer:** `:root` is a pseudo-class matching the document root (`<html>`), but has a **higher specificity weight (0, 0, 1, 0)** than the `html` element selector (0, 0, 0, 1).

---

### Q97: What is `text-wrap: balance` and `text-wrap: pretty`?
* **`text-wrap: balance`:** Balances text line lengths evenly across multiple lines to prevent orphan single-word lines in headings.
* **`text-wrap: pretty`:** Optimizes line breaking algorithm for body paragraphs to avoid typographic orphans.

---

### Q98: What does `scrollbar-gutter: stable` do?
**Answer:** Reserves layout space for the scrollbar track even when content does not overflow, preventing horizontal layout shifting when scrollbars appear or disappear dynamically.

---

### Q99: What is CSS Nesting?
**Answer:** Native CSS syntax to nest child rules inside parent selectors without preprocessors like SASS:
```css
.card {
  background: white;
  & h2 { color: #4f46e5; }
  &:hover { transform: scale(1.02); }
}
```

---

### Q100: What is the difference between `gap` in Flexbox vs Grid?
**Answer:** The `gap` (`row-gap`, `column-gap`) property works identically in both Flexbox and Grid, inserting clean gutters between items without requiring margin tricks or negative parent margins.
