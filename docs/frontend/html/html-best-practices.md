# HTML Best Practices & Industry Standards

Writing clean, valid, and semantic HTML is the foundation of high-performance frontend engineering. Following standard industry conventions prevents browser rendering quirks, ensures universal accessibility, and maintains high code quality across large engineering teams.

## The 10 Commandments of Professional HTML Engineering

### 1. Always Declare `<!DOCTYPE html>`
Place `<!DOCTYPE html>` on line 1 of every document to force modern standards mode and avoid quirks mode bugs.

### 2. Always Declare the Document Language
Declare `lang="en"` (or the appropriate ISO language code) on the root `<html>` element for screen readers and search crawlers.

### 3. Maintain a Single `<h1>` per Document
Use exactly one `<h1>` tag representing the primary subject of the document, and follow a strict descending hierarchy (`<h2>` $\rightarrow$ `<h3>` $\rightarrow$ `<h4>`).

### 4. Use Lowercase Tag Names and Attribute Names
HTML is case-insensitive, but lowercase tags and attributes (`<section class="card">` instead of `<SECTION CLASS="CARD">`) represent the universal modern standard.

### 5. Always Quote Attribute Values
Enclose all attribute values in double quotes (`class="active"`). Unquoted attributes break when values contain spaces or special symbols.

### 6. Always Provide `alt` Text on Images
Every `<img>` must have an `alt` attribute. Use descriptive text for informational images, and `alt=""` for purely decorative graphics.

### 7. Explicitly Bind `<label>` to `<input>`
Always connect labels to inputs using matching `for` and `id` attributes to guarantee screen reader announcements and click-to-focus behavior.

### 8. Use Semantic Landmarks Over Generic `<div>` Tags
Rely on `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` to structure page regions. Reserve `<div>` strictly for non-semantic CSS styling wrappers.

### 9. Always Secure External Links Opened in New Tabs
Whenever using `target="_blank"`, include `rel="noopener noreferrer"` to prevent reverse tabnabbing security vulnerabilities and isolate execution threads.

### 10. Prevent Layout Shift (CLS) on Media
Always specify explicit `width` and `height` dimensions on `<img>`, `<video>`, and `<iframe>` elements to allow the browser to reserve space before assets load.

## Production HTML Code Quality Checklist

| Check | Requirement | Standard Rule |
| :--- | :--- | :--- |
| **Doctype** | `<!DOCTYPE html>` | Required on Line 1 |
| **Language** | `<html lang="en">` | Required on root tag |
| **Encoding** | `<meta charset="UTF-8">` | Top of `<head>` |
| **Viewport** | `<meta name="viewport" ...>` | Required for mobile |
| **Title** | `<title>Page Title</title>` | 50–60 chars, unique per page |
| **Headings** | Single `<h1>`, sequential order | No skipped levels |
| **Images** | `alt`, `width`, `height`, `loading="lazy"` | Zero missing alt attributes |
| **Forms** | Explicit `<label for="...">` | Matching input `id` |
| **Buttons** | `<button type="...">` | Never use `<div onclick>` |
| **Validation** | Pass W3C Nu HTML Validator | Zero syntax errors |
