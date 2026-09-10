# HTML Iframes

The `<iframe>` (**Inline Frame**) element embeds an independent external HTML document or third-party web application directly inside the current webpage.

Common production applications include embedding YouTube video players, Google Maps locations, payment gateway checkout modals (Stripe Elements), and live interactive code editors (CodePen/StackBlitz).

## Basic Syntax

```html
<iframe 
  src="https://www.google.com/maps/embed?pb=..." 
  title="Conference Center Location Map" 
  width="600" 
  height="450" 
  loading="lazy"
></iframe>
```

## Security Architecture: The `sandbox` Attribute

Embedding third-party content carries inherent security risks (Cross-Site Scripting, clickjacking, automated redirect spam, malicious popups). The `sandbox` attribute restricts the embedded iframe into a secure, isolated context.

When `sandbox` is written with an empty value (`sandbox=""`), all capabilities are locked down by default:
* JavaScript execution is blocked.
* Form submissions are blocked.
* Cookies and storage access are blocked.
* Top-level window navigation is blocked.

### Granular Sandboxing Permissions
You selectively restore specific capabilities by listing permissions:

```html
<iframe 
  src="https://partner-portal.com/widget"
  title="Interactive Pricing Calculator"
  width="100%"
  height="500"
  sandbox="allow-scripts allow-same-origin allow-forms"
></iframe>
```

| Permission Flag | What it Enables |
| :--- | :--- |
| `allow-scripts` | Allows the iframe to execute JavaScript. |
| `allow-same-origin` | Allows the iframe to access its own cookies and localStorage. |
| `allow-forms` | Allows the iframe to submit forms. |
| `allow-popups` | Allows the iframe to open new browser windows/tabs (`window.open`). |
| `allow-top-navigation` | Allows the iframe to redirect the top-level parent window URL. |

> **Security Caution**: Never combine `allow-scripts` and `allow-same-origin` if the embedded content is from an untrusted source, as this allows the iframe to remove its own sandboxing restrictions.

## Performance: Native Lazy Loading

Iframes incur significant network overhead because they initialize a separate browser rendering context. Always configure `loading="lazy"` on iframes situated below the initial viewport:

```html
<iframe src="https://widget.example.com" title="User Reviews" loading="lazy"></iframe>
```

## Accessibility Requirement: The `title` Attribute

Every `<iframe>` **must have a descriptive `title` attribute**. Screen readers announce the `title` attribute to inform visually impaired users what external application is embedded before they navigate into it.

* ❌ Bad: `<iframe src="..."></iframe>`
* ✅ Good: `<iframe src="..." title="Stripe Secure Credit Card Checkout Form"></iframe>`
