# CSS Overflow & Scroll Management

The `overflow` property controls what happens when an element's child content exceeds the boundaries of its allocated box model dimensions.

## 1. Overflow Property Values

```css
.container {
  overflow: auto; /* Shorthand for both X and Y axes */
}
```

| Value | When Content Fits | When Content Exceeds Dimensions | Notes |
| :--- | :--- | :--- | :--- |
| **`visible`** (Default) | No scrollbars | Content bleeds outside container boundaries | Can overlap adjacent elements |
| **`hidden`** | No scrollbars | Overflow content is clipped; programmatically scrollable | Creates a new BFC; can break sticky children |
| **`scroll`** | Permanent scrollbars | Permanent scrollbars (even if content fits) | May cause unnecessary UI clutter |
| **`auto`** | No scrollbars | Scrollbars appear **only when needed** | Best standard choice for scrollable containers |
| **`clip`** | No scrollbars | Clipped; **strictly non-scrollable** | Modern, more performant than `hidden` |

## 2. Directional Overflow (`overflow-x` & `overflow-y`)

```css
/* Horizontal scrollable carousel / code block */
.code-block {
  overflow-x: auto;  /* Allow horizontal swipe/scroll */
  overflow-y: hidden; /* Lock vertical axis */
  white-space: pre;
}

/* Chat feed: Lock width, scroll message history vertically */
.chat-messages {
  overflow-x: hidden;
  overflow-y: auto;
}
```

## 3. `overflow: clip` vs `overflow: hidden`

`overflow: clip` is a modern alternative to `overflow: hidden`. Unlike `hidden`, `clip` does **not** create a scroll container and does not create an unintended Block Formatting Context.

```css
/* overflow: clip allows fine-tuned overflow clipping margins */
.card-clipped {
  overflow: clip;
  overflow-clip-margin: 20px; /* Allows shadows/badges to bleed 20px before clipping */
}
```

## 4. Scroll Snapping (`scroll-snap-type` & `scroll-snap-align`)

CSS Scroll Snap creates native carousel and slider experiences without requiring external JavaScript libraries.

```css
/* Container */
.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory; /* Snap on horizontal axis */
  scroll-behavior: smooth;
  gap: 1rem;
  padding: 1rem;
}

/* Children */
.carousel-slide {
  flex: 0 0 85%;
  scroll-snap-align: center; /* Snaps card to center of viewport */
}
```

## 5. Preventing Scroll Chaining (`overscroll-behavior`)

When a user scrolls to the top or bottom of a modal or sidebar, browsers automatically transfer the scroll action to the background `<body>` document (scroll chaining / bounce). `overscroll-behavior: contain` traps the scroll action inside the active container:

```css
.modal-body,
.sidebar-scroll {
  overflow-y: auto;
  overscroll-behavior: contain; /* Traps scroll inside dialog; background page never scrolls */
}
```

## 6. Modern Scrollbar Styling

Modern CSS provides standardized properties for styling scrollbars across modern browsers.

```css
/* Standard W3C Scrollbar Styling */
.custom-scroll {
  scrollbar-width: thin; /* auto, thin, none */
  scrollbar-color: #94a3b8 #f1f5f9; /* [thumb color] [track color] */
}

/* WebKit vendor extensions for granular legacy customization */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```
