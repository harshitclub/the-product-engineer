# HTML Images

The `<img>` void element embeds visual media into an HTML document. Unlike text content, images are not embedded directly within the HTML file itself; the `<img>` tag creates an inline-level holding space that references an image file hosted on a local or remote server.

## Basic Syntax

```html
<img 
  src="/images/event-architecture.webp" 
  alt="System Architecture Diagram illustrating Next.js, Express, PostgreSQL, and Redis." 
  width="800" 
  height="450"
  loading="lazy"
>
```

## Essential Attributes Breakdown

### 1. `src` (Source Path)
The path to the image file. Can be a relative path (`/images/logo.png`) or an absolute URL (`https://cdn.example.com/photo.webp`).

### 2. `alt` (Alternative Text)
A descriptive text alternative for the image.

`alt` text serves three essential engineering requirements:
* **Accessibility**: Read aloud by screen readers for visually impaired engineers.
* **Network Fallback**: Rendered in the browser if the image URL fails to load, DNS breaks, or the user is on an extreme low-bandwidth connection.
* **Search Engine Optimization**: Indexed by Googlebot to understand image context and rank pages in Google Image Search.

> **Rule for Decorative Images**: If an image is purely decorative and provides no informational value (e.g. background flourishes or subtle divider icons), set `alt=""` (empty string) with `aria-hidden="true"`. Omitting `alt` entirely causes screen readers to read the raw file path, creating a poor user experience.

### 3. `width` and `height` (Preventing Cumulative Layout Shift)
Always specify explicit pixel dimensions for width and height on `<img>` tags:

```html
<img src="/banner.jpg" alt="Conference Stage" width="1200" height="630">
```

Before an image downloads over the network, the browser uses the `width` and `height` ratio to calculate the required vertical space and reserve it in the layout ahead of time. This completely eliminates **Cumulative Layout Shift (CLS)**, where text jumps abruptly down the screen when images pop in.

### 4. `loading="lazy"` (Native Lazy Loading)
Defers image loading until the user scrolls within a calculated threshold of the image's position in the viewport:

```html
<img src="/gallery-item-12.jpg" alt="Event photo" loading="lazy">
```

Native lazy loading dramatically accelerates initial page load times, conserves mobile data, and reduces server bandwidth for images situated "below the fold".

## Modern Responsive Images: The `<picture>` Element

When you need to serve different image formats or different resolutions based on screen sizes, use the `<picture>` element:

```html
<picture>
  <!-- Serve lightweight AVIF to modern browsers -->
  <source srcset="/banner.avif" type="image/avif">

  <!-- Serve WebP to browsers supporting WebP -->
  <source srcset="/banner.webp" type="image/webp">

  <!-- Fallback JPG for legacy browsers -->
  <img src="/banner.jpg" alt="Full Stack Bootcamp Banner" width="800" height="400">
</picture>
```

## Image Format Decision Guide

| Format | Best For | Key Advantage |
| :--- | :--- | :--- |
| **SVG** | Logos, icons, UI badges, vector diagrams | Infinite scalability without pixelation; minimal file size. |
| **WebP** | Photographs, banners, article illustrations | 30% superior compression compared to JPEG/PNG with transparency support. |
| **AVIF** | Ultra-high-fidelity photographs | Next-generation compression format with smaller file footprints than WebP. |
| **PNG** | Screenshots where crisp text edges are required | Lossless compression with alpha transparency. |
| **JPEG** | Legacy fallback photos | Universal compatibility across all older browsers. |
