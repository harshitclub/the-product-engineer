# CSS Width & Height Sizing

Controlling dimensions is essential for fluid and responsive user interfaces. Modern CSS provides flexible sizing keywords and constraints beyond fixed pixel measurements.

## Core Dimension Properties

```css
.container {
  width: 100%;       /* Preferred width */
  max-width: 1200px; /* Upper constraint */
  min-width: 320px;  /* Lower constraint */

  height: auto;      /* Grows naturally with content */
  min-height: 100vh; /* Ensures full-screen background */
}
```

### The Min / Max Constraint Priority Rule

When `width`, `min-width`, and `max-width` conflict on the same element:
1. `min-width` **always wins** over `max-width` and `width`.
2. `max-width` wins over `width`.

$$\text{Final Rendered Width} = \max(\text{min-width}, \min(\text{width}, \text{max-width}))$$

## Modern Sizing Keywords

Modern CSS provides intrinsic sizing keywords that compute dimensions dynamically based on an element's child content:

| Keyword | Definition | Visual Result |
| :--- | :--- | :--- |
| `auto` | Default behavior. Block elements expand to fill container width; height expands with content. | Full available width |
| `max-content` | The intrinsic maximum width required if text never wraps. | Widest possible single line |
| `min-content` | The narrowest width without causing content overflow (wraps at longest word). | Width of longest single word |
| `fit-content` | Expands up to `max-content`, but clamps to available container width. | Wraps content neatly without overflowing |

```css
/* Badge button wraps tightly around its text without stretching */
.chip {
  width: fit-content;
  padding: 0.25rem 0.75rem;
  background-color: #f1f5f9;
}

/* Callout bubble shrinks to content width while preventing overflow */
.chat-bubble {
  width: fit-content;
  max-width: 80%;
}
```

## The Modern `aspect-ratio` Property

The `aspect-ratio` property lets you define a fixed proportion (width-to-height ratio) that is preserved automatically during responsive resizing without requiring legacy zero-height padding hacks.

$$\text{Syntax: } \text{aspect-ratio}: \text{width} / \text{height};$$

```css
/* Standard 16:9 widescreen video embed */
.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* 1:1 Square avatar thumbnail */
.avatar {
  width: 80px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
}

/* 4:3 Product showcase card */
.product-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```

## Logical Sizing Properties (`inline-size` & `block-size`)

In internationalized modern layouts supporting left-to-right (LTR), right-to-left (RTL), or vertical writing modes (e.g. Japanese/Chinese), logical properties replace physical directions:

| Physical Property | Logical Property | Meaning in Standard LTR English |
| :--- | :--- | :--- |
| `width` | `inline-size` | Horizontal dimension along text flow |
| `height` | `block-size` | Vertical dimension stacked perpendicular to text |
| `min-width` | `min-inline-size` | Minimum horizontal dimension |
| `max-width` | `max-inline-size` | Maximum horizontal dimension |
| `min-height` | `min-block-size` | Minimum vertical dimension |

```css
/* Standardized responsive wrapper using logical properties */
.article-wrapper {
  max-inline-size: 72rem; /* Equivalent to max-width: 1152px */
  margin-inline: auto;    /* Equivalent to margin-left: auto; margin-right: auto */
}
```

## Responsive Container Strategy Pattern

A best practice for clean, responsive page layout wrappers:

```css
.page-container {
  /* 1. Fluid width with safe viewport margin */
  width: 100%;

  /* 2. Maximum constraint to prevent overly long reading lines on 4K monitors */
  max-width: 1200px;

  /* 3. Automatic horizontal centering */
  margin-inline: auto;

  /* 4. Defensive inner gutter padding for small mobile screens */
  padding-inline: 1.5rem;
}
```
