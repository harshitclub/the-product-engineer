# CSS Backgrounds

CSS background properties allow you to apply solid colors, images, gradients, and multiple layered graphic elements to any box model container.

## Core Background Properties

```css
.hero-banner {
  background-color: #0f172a;
  background-image: url('/images/hero-pattern.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
}
```

### 1. `background-size` (`cover` vs `contain`)

| Value | Behavior | Common Use Case |
| :--- | :--- | :--- |
| **`cover`** | Scales the image to fill the entire container, clipping edges if aspect ratios differ. | Hero banners, full-screen backdrops |
| **`contain`** | Scales image to fit completely within container without clipping (may leave empty space). | Logos, product photos, icons |
| **`auto`** | Displays image at original intrinsic pixel resolution. | Small repeat patterns |
| **`100% auto`** | Stretches width to 100% while scaling height proportionally. | Full-width banners |

```css
/* Perfect full-bleed hero banner */
.hero {
  min-height: 80vh;
  background-image: url('/images/hero.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
```

### 2. `background-position`

Specifies the starting coordinate of the background image within the container.

```css
.card-icon {
  background-position: top right;
  background-position: 50% 50%; /* Center */
  background-position: right 20px bottom 15px; /* Offset coordinates */
}
```

### 3. `background-attachment` (Parallax Effects)

- `scroll` (Default): Background scrolls along with the main page.
- `fixed`: Background stays fixed relative to the viewport, creating a classic CSS parallax window effect.
- `local`: Background scrolls along with the element's internal scrollable content.

```css
.parallax-section {
  background-image: url('/images/landscape.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
}
```

## `background-clip` & Gradient Text

The `background-clip` property defines how far the background extends behind borders, padding, or content.

```css
.box {
  background-clip: border-box;  /* Extends behind border (default) */
  background-clip: padding-box; /* Extends to inside edge of border */
  background-clip: content-box; /* Clips strictly to content box */
}
```

### Modern Gradient Text Effect
By combining `background-clip: text` with a transparent text color, you can render smooth gradient typography:

```css
.gradient-heading {
  background-image: linear-gradient(135deg, #4f46e5, #06b6d4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 3rem;
  font-weight: 800;
}
```

## Multiple Layered Backgrounds

CSS allows comma-separated background layers. Layers are stacked with the **first listed image on top** and the background color at the very bottom:

```css
.hero-layered {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)), /* Top: Tint overlay */
    url('/images/grid-pattern.svg'),                                /* Middle: Grid */
    url('/images/hero-photo.jpg');                                   /* Bottom: Photo */

  background-position:
    center center,
    top left,
    center center;

  background-size:
    auto,
    40px 40px,
    cover;

  background-repeat:
    no-repeat,
    repeat,
    no-repeat;

  background-color: #0f172a; /* Fallback base color */
}
```

## Background Shorthand Syntax

```css
/* Shorthand Order:
   [color] [image] [position] / [size] [repeat] [attachment] [origin] [clip]
*/
.card {
  background: #ffffff url('/pattern.png') center / cover no-repeat;
}
```

> [!IMPORTANT]
> When using the shorthand syntax with `background-size`, the size **must** follow `background-position` separated by a forward slash `/` (e.g. `center / cover`).
