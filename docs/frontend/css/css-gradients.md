# CSS Gradients

CSS Gradients are dynamic graphical transitions between two or more colors. Because gradients are generated mathematically by the browser rendering engine, they scale infinitely to any resolution without bandwidth overhead.

## 1. Linear Gradients (`linear-gradient`)

Linear gradients transition colors along a straight directional axis.

$$\text{Syntax: } \text{linear-gradient}(\text{[direction/angle]}, \text{color-stop-1}, \text{color-stop-2}, \dots);$$

```css
/* Direction keywords: to top, to right, to bottom, to left, to bottom right */
.card-gradient-dir {
  background-image: linear-gradient(to right, #4f46e5, #06b6d4);
}

/* Explicit Degree Angles (0deg = bottom to top, 90deg = left to right, 135deg = diagonal) */
.card-gradient-angle {
  background-image: linear-gradient(135deg, #4f46e5, #9333ea);
}
```

### Color Stops & Positioning

```css
/* Color stops with explicit position percentages */
.custom-stops {
  background-image: linear-gradient(
    90deg,
    #4f46e5 0%,    /* Starts Indigo */
    #06b6d4 50%,   /* Pure Cyan at midpoint */
    #10b981 100%   /* Ends Emerald */
  );
}

/* Hard color stop split (color stripes without blur) */
.split-flag {
  background-image: linear-gradient(
    90deg,
    #4f46e5 0% 50%, /* Indigo from 0% to 50% */
    #ffffff 50% 100% /* White from 50% to 100% */
  );
}
```

## 2. Radial Gradients (`radial-gradient`)

Radial gradients radiate outwards from a central focal point.

$$\text{Syntax: } \text{radial-gradient}(\text{[shape/size]} \text{ at } \text{[position]}, \text{color-stops});$$

```css
/* Circular glow radiating from center */
.radial-glow {
  background-image: radial-gradient(circle at center, #4f46e5, #0f172a 70%);
}

/* Spotlight originating from top-right corner */
.spotlight-hero {
  background-image: radial-gradient(
    ellipse farthest-corner at top right,
    rgba(79, 70, 229, 0.4),
    rgba(15, 23, 42, 0.95) 80%
  );
}
```

## 3. Conic Gradients (`conic-gradient`)

Conic gradients sweep color transitions around a 360-degree rotational axis (like a color wheel or pie chart).

$$\text{Syntax: } \text{conic-gradient}(\text{from } \text{[angle]} \text{ at } \text{[position]}, \text{color-stops});$$

```css
/* Pure CSS Circular Donut / Pie Chart */
.pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: conic-gradient(
    #4f46e5 0deg 180deg,    /* 50% Indigo */
    #06b6d4 180deg 270deg,  /* 25% Cyan */
    #e2e8f0 270deg 360deg   /* 25% Slate */
  );
}
```

## 4. Repeating Gradients (Patterns & Stripes)

```css
/* Diagonal caution / barber stripe pattern */
.striped-bar {
  background-image: repeating-linear-gradient(
    45deg,
    #4f46e5,
    #4f46e5 10px,
    #4338ca 10px,
    #4338ca 20px
  );
}

/* Radar / concentric rings pattern */
.radar-rings {
  background-image: repeating-radial-gradient(
    circle at center,
    transparent,
    transparent 20px,
    rgba(79, 70, 229, 0.2) 20px,
    rgba(79, 70, 229, 0.2) 22px
  );
}
```

## 5. Modern Smooth Gradients with OKLCH Color Space

Traditional sRGB gradients often suffer from a muddy, dull "gray dead zone" in the middle of color transitions (e.g. between blue and yellow). Modern CSS eliminates this by interpolating gradients directly within the `in oklch` color space:

```css
/* Vibrant, perceptually uniform gradient without grayish muddy zones */
.vibrant-banner {
  background-image: linear-gradient(in oklch 90deg, #4f46e5, #10b981);
}
```
