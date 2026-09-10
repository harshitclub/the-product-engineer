# CSS Text Formatting & Typography

Text formatting properties control the alignment, spacing, decoration, and overflow behavior of inline text content.

## 1. Text Alignment

```css
/* Physical alignment */
.text-center { text-align: center; }
.text-right  { text-align: right; }

/* Modern logical alignment (RTL/LTR adaptive) */
.text-start  { text-align: start; } /* Left in LTR, Right in RTL */
.text-end    { text-align: end; }   /* Right in LTR, Left in RTL */

/* Justified text (equal left & right edges) */
.article-body {
  text-align: justify;
  text-justify: inter-word;
}
```

## 2. Text Decoration

The `text-decoration` shorthand configures underlines, strikethroughs, colors, and offsets.

```css
/* Shorthand: text-decoration: [line] [style] [color] [thickness]; */
.link-custom {
  text-decoration: underline wavy #4f46e5 2px;
  /* Controls gap between text baseline and underline */
  text-underline-offset: 4px;
}

/* Strikethrough for discounted prices */
.price-original {
  text-decoration: line-through #ef4444 1.5px;
  color: #94a3b8;
}
```

## 3. Text Transformation & Spacing

```css
.badge-caps {
  text-transform: uppercase;   /* ALL CAPS */
  letter-spacing: 0.05em;      /* Tracking: space between characters */
}

.title-case {
  text-transform: capitalize;  /* Capitalizes First Letter Of Each Word */
}

p {
  line-height: 1.65;           /* Leading: line height without units (preferred) */
  word-spacing: 0.05em;        /* Space between individual words */
}
```

> [!TIP]
> Always declare `line-height` as a unitless multiplier (e.g. `1.5` or `1.65`) rather than fixed pixels (`24px`). Unitless line heights scale proportionally when child elements change font size.

## 4. Handling Long Words & URL Wrapping

Unbroken long strings (such as long URLs or code tokens) can cause horizontal container overflow if word breaks are not configured defensively:

```css
.card-content {
  /* Prevents long strings or URLs from blowing out container width */
  overflow-wrap: break-word; /* Standard modern property */
  hyphens: auto;             /* Inserts soft hyphens where appropriate */
}
```

## 5. Single-Line & Multi-Line Text Truncation

### Single-Line Ellipsis (`...`)
Truncates text after one line and appends an ellipsis.

```css
.truncate-single-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
```

### Modern Multi-Line Clamping (`line-clamp`)
Truncates text after a designated number of lines.

```css
.truncate-multi-line {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

```
+------------------------------------------+
| This is a long article summary that will |
| wrap across lines and automatically clip |
| with a clean ellipsis after three li...  |
+------------------------------------------+
```

## Typography Styling Checklist

- Always use unitless `line-height` (`1.5` for body text, `1.1` to `1.3` for headings).
- Use `text-underline-offset: 3px;` for legible, modern hyperlinks.
- Add `letter-spacing: 0.05em;` when using `text-transform: uppercase;`.
- Use `overflow-wrap: break-word;` inside flexible card and comment containers to prevent layout breakage from long URLs.
