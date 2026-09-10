# CSS Debugging & DevTools Mastery

Debugging CSS requires systematic inspection using browser Developer Tools rather than guessing and adding random properties.

## 1. Browser DevTools Workflow

Right-click any element on the page and select **Inspect** (or press `F12` / `Cmd+Option+I`).

```
DevTools Elements Panel
├── DOM Tree View (Left)
└── CSS Styles & Computed Tabs (Right)
    ├── Styles Panel: Shows active declarations, crossed-out overridden rules, and file line numbers.
    ├── Computed Panel: Shows resolved final pixel values (e.g. font-size: 20px instead of 1.25rem).
    └── Box Model Visualizer: Interactive colored diagram of Content, Padding, Border, and Margin.
```

### Deciphering the Styles Panel

- **Strikethrough text (`~~color: red;~~`)**: The declaration was overridden by another rule higher in the cascade (higher specificity, cascade layer, or declared later in source order).
- **Warning triangle with yellow icon**: Syntax error or unsupported CSS property/value in that browser engine.
- **Faded / Grayed-out property**: Valid CSS property that has no effect on this specific element (e.g. `vertical-align` applied to a block element, or `top`/`left` on `position: static`).

## 2. Diagnosing Unwanted Horizontal Overflow (Horizontal Scroll Bug)

When a web page unexpectedly scrolls horizontally on mobile devices, finding the culprit element can be done with these two proven techniques:

### Technique A: Universal Debug Outline Script
Add this temporary rule to reveal which box model is breaking past the viewport boundary:

```css
/* Universal visual boundary debugger (Does not alter box model dimensions) */
* {
  outline: 1px solid rgba(239, 68, 68, 0.4) !important;
}
```

### Technique B: Console Audit Snippet
Run this snippet inside your browser DevTools Console to instantly log the exact DOM element that exceeds `document.documentElement.clientWidth`:

```javascript
document.querySelectorAll('*').forEach((el) => {
  if (el.offsetWidth > document.documentElement.clientWidth) {
    console.log('Overflowing Element:', el);
  }
});
```

## 3. DevTools Flexbox & Grid Overlay Badges

Modern browsers (Chrome, Edge, Firefox, Safari) feature specialized layout badges inside the Elements DOM tree:

- Click the **`flex`** badge next to an element to highlight its main axis, cross axis, gaps, and item boundaries.
- Click the **`grid`** badge to render numbered grid lines, named areas, track sizes, and subgrid boundaries directly on the canvas.

## 4. Debugging Stacking Contexts & Z-Index

If `z-index: 9999` is not appearing above another element:
1. Open the **Layers** panel in Chrome DevTools (`More Tools > Layers`).
2. Inspect the 3D visual composition tree to identify which ancestor element created the parent Stacking Context that is trapping your target node.
3. Check for unintended `transform`, `opacity < 1`, `filter`, or `clip-path` properties on parent containers.

## 5. Performance Diagnostics: Paint Flashing & Layout Shifts

Open the **Rendering** tab in Chrome DevTools (`Cmd+Shift+P` $\rightarrow$ type "Rendering"):

- **Paint Flashing**: Highlights screen areas in green whenever the GPU repaints pixels. If a hover animation flashes the whole page green, you are animating layout/paint properties (`top`/`margin`) instead of composited transforms (`translate`).
- **Layout Shift Regions**: Highlights elements causing Cumulative Layout Shifts (CLS) in blue to catch unstable asset loading.
