# CSS Transforms (2D & 3D)

The CSS `transform` property allows you to visually translate (move), rotate, scale, and skew elements in 2D or 3D space without affecting the normal document flow or triggering expensive layout reflows.

## 1. 2D Transform Functions

```css
.box {
  /* Translate: Moves element on X and Y axes */
  transform: translate(20px, -10px);

  /* Scale: Multiplies element dimensions (1 = 100%, 1.2 = 120%) */
  transform: scale(1.1);

  /* Rotate: Rotates element clockwise in degrees or turns */
  transform: rotate(45deg); /* or rotate(0.125turn) */

  /* Skew: Distorts element along X and Y angles */
  transform: skew(-10deg, 5deg);

  /* Chaining multiple transform functions (evaluated right-to-left) */
  transform: translate(50px, 0) rotate(15deg) scale(1.05);
}
```

## 2. Modern Independent Transform Properties

In modern CSS, `translate`, `rotate`, and `scale` can be written as **independent CSS properties**. This eliminates the problem where modifying a hover scale wiped out an existing translate offset.

```css
/* Legacy: modifying scale in hover required repeating translate! */
.card-legacy {
  transform: translate(-50%, -50%) scale(1);
}
.card-legacy:hover {
  transform: translate(-50%, -50%) scale(1.05); /* Tedious repetition */
}

/* Modern Independent Properties (Supported in all modern browsers) */
.card-modern {
  translate: -50% -50%;
  scale: 1;
}
.card-modern:hover {
  scale: 1.05; /* Clean & independent! translate is preserved automatically */
}
```

## 3. `transform-origin`

Defines the anchor point around which rotations and scale transforms occur (default is `center center` or `50% 50%`).

```css
/* Swings like a hanging door hinge from the top-left corner */
.door-panel {
  transform-origin: top left;
  transform: rotate(30deg);
}

/* Expands outward from bottom edge */
.growing-bar {
  transform-origin: bottom center;
  transform: scaleY(1.5);
}
```

## 4. 3D Transforms & Perspective

3D transforms manipulate elements along the Z-axis (depth toward or away from the user).

```
          Y (Vertical)
          |
          |
          +------ X (Horizontal)
         /
        /
       Z (Depth toward screen)
```

```css
/* 1. Parent container establishes 3D depth perspective */
.card-3d-scene {
  perspective: 1000px; /* Distance between viewer eye and z=0 plane */
}

/* 2. Child container preserves 3D child hierarchy */
.card-3d-flipper {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  position: relative;
}

.card-3d-scene:hover .card-3d-flipper {
  transform: rotateY(180deg); /* Flip 180 degrees horizontally */
}

/* 3. Front and Back faces */
.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden; /* Hides reverse side when flipped */
}

.card-back {
  transform: rotateY(180deg);
}
```

## 5. Rendering Performance & Hardware Acceleration

Transforms are the most performant way to animate elements on the web:

| Property Modified | Pipeline Triggered | Performance Cost |
| :--- | :--- | :--- |
| `top` / `left` / `margin` / `width` | **Layout $\rightarrow$ Paint $\rightarrow$ Composite** | High (Causes CPU reflow across entire page) |
| `transform` (`translate`, `scale`, `rotate`) | **Composite Only** | **Ultra-fast 60/120 FPS** (Handled directly on GPU) |

> [!TIP]
> Always animate `transform` and `opacity` for smooth 60fps animations. Never animate `top`, `left`, `margin`, `width`, or `height`.
