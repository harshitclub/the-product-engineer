# CSS Fonts & Web Typography

Typography is one of the most critical aspects of digital interface design. CSS provides comprehensive control over font families, weights, variable axes, loading strategies, and rendering performance.

## 1. The `font-family` Property & Font Stacks

`font-family` accepts a prioritized list of font names called a **Font Stack**. The browser searches from left to right and renders using the first font installed locally or loaded via `@font-face`. The list must always conclude with a generic fallback family.

```css
body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

code, pre {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

### Generic Font Families

| Generic Family | Characteristics | Example Fonts |
| :--- | :--- | :--- |
| `sans-serif` | Clean, modern glyphs without decorative strokes | Inter, Arial, Helvetica |
| `serif` | Classical glyphs with decorative end strokes (serifs) | Merriweather, Georgia, Times New Roman |
| `monospace` | Every character occupies identical horizontal width | JetBrains Mono, Fira Code, Courier |
| `system-ui` | Native operating system UI typeface | Apple San Francisco, Windows Segoe UI |

## 2. Core Font Properties

```css
.heading {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 2rem;       /* Size: rem preferred */
  font-weight: 700;      /* Weight: 100 to 900 */
  font-style: normal;    /* normal, italic, oblique */
  font-variant: normal;  /* small-caps */
}

/* Shorthand: font: [style] [weight] [size]/[line-height] [family]; */
.lead-paragraph {
  font: italic 600 1.25rem/1.6 'Plus Jakarta Sans', sans-serif;
}
```

### Numeric Font Weights

| Value | Name | Value | Name |
| :--- | :--- | :--- | :--- |
| `100` | Thin / Hairline | `600` | Semi-Bold |
| `200` | Extra-Light | `700` | Bold |
| `300` | Light | `800` | Extra-Bold |
| `400` | Regular / Normal | `900` | Black / Heavy |
| `500` | Medium | | |

## 3. Custom Web Fonts with `@font-face`

The `@font-face` at-rule lets you load custom font files from your server or CDN.

```css
@font-face {
  font-family: 'CustomSans';
  src: url('/fonts/custom-sans-regular.woff2') format('woff2'),
       url('/fonts/custom-sans-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Critical for Web Vitals & performance */
}
```

### The `font-display` Property

`font-display` controls the browser's behavior while the custom web font is downloading:

| Value | Behavior | Core Web Vitals Impact |
| :--- | :--- | :--- |
| **`swap`** (Recommended) | Shows fallback system font immediately, then swaps to web font once downloaded. | Prevents invisible text (FOIT); fastest Largest Contentful Paint (LCP). |
| **`block`** | Hides text for up to 3 seconds until web font loads. | Causes Flash of Invisible Text (FOIT). |
| **`fallback`** | Hides text for ~100ms; if font is not ready, renders fallback permanently for the session. | Balances FOIT and FOFT. |
| **`optional`** | Gives font ~100ms to load from cache; skips download if network is slow. | Zero layout shifts. |

## 4. Modern Variable Fonts

Variable fonts package multiple weights, widths, and slant variations into a single compact binary file, replacing individual downloads for Regular, Bold, Italic, etc.

```css
@font-face {
  font-family: 'InterVariable';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900; /* Continuous weight range */
  font-display: swap;
}

/* Freely interpolate any numeric weight without separate font files */
.hero-title {
  font-family: 'InterVariable', sans-serif;
  font-weight: 642; /* Continuous weight between 100 and 900 */
}
```

## Typography Performance Best Practices

1. **Format Priority**: Always use **WOFF2** (`.woff2`) — it provides ~30% better compression than WOFF and is supported across all modern browsers.
2. **Preload Critical Fonts**: Add `<link rel="preload" href="/fonts/hero-font.woff2" as="font" type="font/woff2" crossorigin>` inside HTML `<head>`.
3. **Subset Glyphs**: Strip unused languages/symbols (e.g. Latin-only subsets) to reduce font file payload under `30KB`.
4. **Use `font-display: swap`**: Ensures text is readable immediately without delay.
