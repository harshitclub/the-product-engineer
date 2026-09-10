# CSS Specificity & The Cascade

The Cascade and Specificity are the core algorithms that determine which CSS declaration wins when multiple competing rules target the same DOM element.

Understanding the math of specificity prevents stylesheet chaos and eliminates reliance on quick fixes like `!important`.

## The Cascade Algorithm

When an element has multiple conflicting property definitions, CSS resolves them through a four-stage hierarchy:

```
1. Importance & Origin (User Agent < User < Author < !important)
   ↓
2. Cascade Layers (@layer order)
   ↓
3. Specificity Weight (ID > Class/Attr/Pseudo-class > Element)
   ↓
4. Source Order (Last declared wins)
```

## The Specificity Scoring Formula

Specificity is calculated as a 3-part tuple: `(A, B, C)`.

```
( A , B , C )
  │   │   └── Elements (h1, div) & Pseudo-elements (::before, ::after)
  │   └────── Classes (.card), Attributes ([type]), Pseudo-classes (:hover)
  └────────── IDs (#header, #app)
```

| Column | Category | Weight Value | Examples |
| :--- | :--- | :--- | :--- |
| **A** | **IDs** | `(1, 0, 0)` | `#header`, `#nav-bar`, `#main-content` |
| **B** | **Classes, Attributes, Pseudo-classes** | `(0, 1, 0)` | `.btn`, `[type="text"]`, `:hover`, `:focus` |
| **C** | **Elements & Pseudo-elements** | `(0, 0, 1)` | `div`, `p`, `span`, `::before`, `::after` |

> [!NOTE]
> Specificity is evaluated column by column from left to right. `1-0-0` (an ID) will **always** defeat `0-100-0` (a hundred classes combined). Specificity values never "carry over" to the next column.

### Specificity Calculation Matrix

| Selector | Calculation breakdown | Score `(A, B, C)` |
| :--- | :--- | :--- |
| `*` | Universal selector has zero weight | `(0, 0, 0)` |
| `h1` | 1 Element | `(0, 0, 1)` |
| `nav ul li a` | 4 Elements | `(0, 0, 4)` |
| `.btn` | 1 Class | `(0, 1, 0)` |
| `.btn.btn-primary` | 2 Classes | `(0, 2, 0)` |
| `nav .menu-item:hover` | 1 Element + 1 Class + 1 Pseudo-class | `(0, 2, 1)` |
| `input[type="text"]:focus` | 1 Element + 1 Attribute + 1 Pseudo-class | `(0, 2, 1)` |
| `#sidebar` | 1 ID | `(1, 0, 0)` |
| `#sidebar .widget h3` | 1 ID + 1 Class + 1 Element | `(1, 1, 1)` |
| `style="..."` (Inline) | Preempts standard selectors | Preempts `(1, x, x)` |

## Special Specificity Rules

### 1. `:is()` and `:not()`
The specificity of `:is()` and `:not()` is determined by the **most specific selector** in their argument list.

```css
/* Specificity is (1, 0, 0) because of #special */
:is(section, main, #special) p {
  color: #0f172a;
}
```

### 2. `:where()` (Zero Specificity)
`:where()` always has a specificity score of `(0, 0, 0)`.

```css
/* Specificity is (0, 0, 0) */
:where(header, nav, footer) a {
  /* Only 'a' counts: (0, 0, 1) */
  color: #4f46e5;
}

/* Overriding it is simple: */
a {
  color: #ef4444; /* Specificity (0, 0, 1) declared later wins */
}
```

### 3. Inline Styles
Styles applied directly via the HTML `style` attribute (e.g. `<div style="color: red;">`) override any regular selector in an external stylesheet regardless of its specificity score.

## The `!important` Flag

Adding `!important` moves a declaration out of the standard specificity ranking into an elevated importance tier.

```css
p {
  color: red !important;
}

#header .nav p.intro {
  color: blue; /* Lost against red !important */
}
```

### When is `!important` Acceptable?
- Single-purpose utility helper classes (e.g., `.hidden { display: none !important; }`).
- Overriding stubborn 3rd-party embedded widget inline styles when JavaScript or CSS hooks are unavailable.

> [!CAUTION]
> Never use `!important` as a habit to solve specificity bugs in your own codebase. It triggers an "arms race" where future overrides require chained `!important` declarations.

## Modern Cascade Management: `@layer`

CSS Cascade Layers (`@layer`) provide native architectural control over the cascade, letting you define explicit layer precedence independent of selector specificity.

Declarations in later layers **always win** over declarations in earlier layers, regardless of internal selector specificity.

```css
/* Define layer execution order */
@layer reset, base, components, utilities;

@layer base {
  /* High specificity inside base */
  #main-content h1.title {
    color: #1e293b;
    font-size: 2.5rem;
  }
}

@layer utilities {
  /* Low specificity inside utilities, but utilities layer wins! */
  .text-indigo {
    color: #4f46e5;
  }
}
```

Even though `#main-content h1.title` has a specificity of `(1, 1, 1)`, the `.text-indigo` rule in the `utilities` layer wins because the `utilities` layer comes after the `base` layer in the declaration hierarchy.

## Strategies to Maintain Clean Specificity

1. **Adopt Flat Specificity**: Target elements with single class names (`.card-header` instead of `div.content section.card > div.header`).
2. **Use BEM (Block Element Modifier)**: `.block__element--modifier` keeps specificity flat at `(0, 1, 0)`.
3. **Use `:where()` for Resets**: Wrap resets and base library defaults in `:where()` to make them zero-effort to override.
4. **Organize via `@layer`**: Group your codebase into `reset`, `framework`, `components`, and `overrides`.
