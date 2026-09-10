# CSS Transitions

CSS Transitions provide smooth interpolations between two states of an element (such as resting vs `:hover` or `:focus`) without requiring complex keyframe scripts.

## The 4 Transition Sub-Properties

```css
.button {
  /* 1. Which property to animate */
  transition-property: transform, background-color, box-shadow;

  /* 2. How long the animation takes */
  transition-duration: 250ms;

  /* 3. Acceleration curve */
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  /* 4. Delay before animation begins */
  transition-delay: 0s;
}
```

### Transition Shorthand Syntax

$$\text{Syntax: } \text{transition}: \text{[property]} \text{ [duration]} \text{ [timing-function]} \text{ [delay]};$$

```css
/* Shorthand for a single property */
.card {
  transition: transform 0.2s ease-out;
}

/* Multi-property transition (comma-separated) */
.button {
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), /* Custom spring bounce */
    background-color 0.15s ease,
    box-shadow 0.2s ease;
}
```

> [!WARNING]
> Avoid using `transition: all 0.3s ease;` indiscriminately. Transitioning `all` forces the browser to monitor dozens of layout and paint properties, degrading rendering performance. Explicitly name the properties you want to transition (`transform`, `opacity`, `background-color`).

## Easing Curves & Timing Functions

Timing functions determine the rate of change over time:

| Timing Function | Visual Characteristic | Best Used For |
| :--- | :--- | :--- |
| `linear` | Constant speed from start to finish | Color cycling, infinite spinners |
| `ease-out` | Starts fast, decelerates gently at the end | **Incoming UI elements** (modals entering, tooltips) |
| `ease-in` | Starts slow, accelerates at the end | **Exiting UI elements** (cards disappearing offscreen) |
| `ease-in-out` | Slow start, fast middle, slow end | State changes occurring fully on screen |
| `cubic-bezier(x1, y1, x2, y2)` | Custom mathematical Bezier curve | Springy bounces, tailored brand physics |
| `steps(n, jump-term)` | Discrete stepped jumps | Sprite-sheet animations, typewriter typing effects |

```css
/* Spring bounce effect */
.bounce-button:hover {
  transform: scale(1.08);
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## Animating Discrete Properties (`display: none` to `block`)

Historically, you could not transition elements to or from `display: none`. Modern CSS introduces `@starting-style` and `transition-behavior: allow-discrete` to natively animate popups and dialogs appearing and disappearing from `display: none`:

```css
/* Modern smooth dialog entry animation from display: none */
.toast-notification {
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    display 0.3s allow-discrete;
}

/* 1. Define initial enter state before render */
@starting-style {
  .toast-notification {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* 2. Closed state */
.toast-notification.hidden {
  display: none;
  opacity: 0;
  transform: translateY(-20px);
}
```

## Transition Performance Golden Rules

1. **Only Animate Cheap Properties**: Prioritize `transform` and `opacity` (handled on GPU composite layer).
2. **Declare Transitions on the Base Class**: Place `transition` on `.button`, not `.button:hover`. Declaring it on the base class ensures the animation plays smoothly both on hover **and** when the mouse leaves.
3. **Respect Reduced Motion**: Always respect user accessibility preferences:
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { transition-duration: 0.01ms !important; }
   }
   ```
