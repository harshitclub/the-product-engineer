# HTML Accessibility (a11y)

**Web Accessibility (a11y)** is the engineering practice of designing and coding web applications so that people with visual, motor, auditory, speech, or cognitive disabilities can access, navigate, and interact with them equally.

Accessibility is not a cosmetic add-on; it is an essential architectural requirement. It is legally mandated worldwide (under WCAG 2.1/2.2 AA standards, the US ADA Title III, and the European Accessibility Act).

## The Four Core Principles of WCAG (POUR)

The Web Content Accessibility Guidelines (WCAG) are organized around four foundational principles:

1. **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive (e.g. text alternatives for non-text content).
2. **Operable**: User interface components and navigation must be operable via keyboard alone without requiring a mouse.
3. **Understandable**: Information and the operation of the user interface must be clear, predictable, and forgiving of errors.
4. **Robust**: Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive screen readers.

## Core Accessibility Standards in HTML

### 1. Native Semantic Elements Over Custom `<div>` Buttons
Native HTML elements have keyboard focusability and ARIA accessibility roles built in by default:

```html
<!-- ❌ INACCESSIBLE: Unfocusable by keyboard, invisible to screen readers -->
<div class="custom-button" onclick="checkout()">
  Proceed to Checkout
</div>

<!-- ✅ FULLY ACCESSIBLE: Keyboard focusable via Tab, triggerable with Enter and Space -->
<button type="button" onclick="checkout()">
  Proceed to Checkout
</button>
```

### 2. Form Input Labels
Every form input must have a `<label>` explicitly bound to it via `for` (in HTML) or `htmlFor` (in React):

```html
<label for="user-email">Account Email Address:</label>
<input type="email" id="user-email" name="email" required>
```

When a screen reader user focuses on this input field, the software announces: *"Account Email Address, edit text, required"*.

### 3. Alternative Text for Visual Media
Every `<img>` element must have an `alt` attribute describing its content and functional purpose:

```html
<!-- Informational Image -->
<img src="/chart.png" alt="Bar chart showing a 40% reduction in database latency after Redis caching.">

<!-- Decorative Image (Bypassed cleanly by screen readers) -->
<img src="/decorative-accent.svg" alt="" aria-hidden="true">
```

### 4. Color Contrast and Visual Focus Rings
Never remove the default keyboard focus outline without providing an accessible alternative:

```css
/* ❌ DANGEROUS: Destroys accessibility for keyboard-only users */
*:focus {
  outline: none;
}

/* ✅ ACCESSIBLE: High-contrast custom focus ring */
*:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
```

## ARIA (Accessible Rich Internet Applications)

ARIA attributes bridge the gap when native HTML semantics are insufficient to describe dynamic JavaScript state:

```html
<!-- Announce dynamic asynchronous live updates (e.g. notifications/cart updates) -->
<div aria-live="polite" id="cart-status">
  3 Tickets added to cart.
</div>

<!-- Expandable Accordion Menu -->
<button 
  aria-expanded="false" 
  aria-controls="faq-answer-1" 
  onclick="toggleFaq(1)"
>
  What is the refund policy?
</button>
<div id="faq-answer-1" hidden>
  Full refunds are available up to 48 hours before the event.
</div>
```

> **First Rule of ARIA**: *"Do not use ARIA if a native HTML5 element already exists."* Native HTML5 tags (`<button>`, `<dialog>`, `<details>`, `<select>`) provide superior accessibility across all screen readers with zero JavaScript maintenance overhead.
