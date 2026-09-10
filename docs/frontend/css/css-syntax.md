# CSS Syntax and Anatomy

Understanding the syntax of CSS is the foundation of writing predictable, maintainable styles. CSS is a declarative language: you do not instruct the browser on procedural algorithmic steps; instead, you declare target patterns (selectors) and target visual states (declarations).

## The CSS Rule Set Structure

A complete block of CSS is called a **Rule Set** (often simply called a **Rule**).

```css
/* Selector */
.card-title {
  /* Declaration */
  font-size: 1.25rem; /* Property: Value */
  color: #0f172a;
  line-height: 1.5;
}
```

### Anatomical Breakdown

1. **Selector**: Points to the HTML element(s) you want to style (`.card-title`).
2. **Declaration Block**: Enclosed within curly braces `{ ... }`, containing one or more declarations separated by semicolons.
3. **Declaration**: A single styling rule made of a **Property** and a **Value**, separated by a colon (`:`).
4. **Property**: The visual feature or characteristic you want to modify (e.g., `font-size`, `margin`, `background-color`).
5. **Value**: The specific setting assigned to the property (e.g., `1.25rem`, `20px`, `auto`).

```
 .button-primary  {  background-color : #4f46e5 ;  }
 |____ Selector __|  |__ Property ___|  |_ Value _|
                     |_______ Declaration _______|
 |____________________ Complete Rule ____________________|
```

## CSS Statements: Rulesets vs At-Rules

CSS files contain two primary types of statements:

### 1. Rule Sets
Standard style declarations attached to selectors that match DOM nodes.

```css
header.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 2. At-Rules (`@` rules)
Directives that instruct CSS on how to behave, load external resources, define variables, handle media queries, or structure layers.

```css
/* Importing font files or stylesheets */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

/* Conditional logic for viewport width */
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
}

/* Defining animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Defining custom cascade layers */
@layer reset, base, components, utilities;
```

## CSS Case Sensitivity Rules

CSS identifiers have specific case sensitivity rules depending on the context:

| Context | Case Sensitivity | Example |
| :--- | :--- | :--- |
| **Properties** | Case-insensitive (standard is lowercase) | `color`, `FONT-SIZE` (use lowercase) |
| **Keyword Values** | Case-insensitive (standard is lowercase) | `block`, `FLEX`, `Absolute` |
| **HTML Tag Selectors** | Case-insensitive | `div`, `DIV`, `p` |
| **Class Names & IDs** | **Case-sensitive** in standard HTML | `.btn-primary` is NOT the same as `.Btn-Primary` |
| **Attribute Values** | Case-sensitive depending on attribute | `[type="text"]` |
| **CSS Variables** | **Case-sensitive** | `--main-color` is NOT `--Main-Color` |

> [!IMPORTANT]
> Always stick to lowercase kebab-case (e.g., `.site-header`, `--primary-color`, `font-weight`) across all CSS for predictability and maintainability.

## Whitespace and Formatting Conventions

Browsers ignore extra whitespace, tabs, and newlines inside declaration blocks. The following three formats parse identically:

```css
/* Expanded Format (Standard readable syntax) */
.card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: #ffffff;
}

/* Single-line Format (Often used in utility-first minified outputs) */
.card { padding: 1.5rem; border-radius: 8px; background-color: #ffffff; }

/* Inconsistent spacing (Works, but messy) */
.card{padding:1.5rem;border-radius:8px;background-color:#ffffff;}
```

### Standard Formatting Best Practices
- Place the opening brace on the same line as the selector with one preceding space.
- Indent declarations by 2 spaces.
- Put a space after the colon `:` in every declaration.
- Always include the trailing semicolon `;` on every declaration to prevent syntax errors when adding new properties.
- Place the closing brace on a new line aligned with the selector.

## Semicolons and Parsing Errors

The semicolon `;` is mandatory between declarations. While omitting the semicolon on the final declaration before `}` is technically valid in the CSS spec, it introduces subtle bugs when someone appends a new property later.

```css
/* Dangerous: Missing trailing semicolon on color */
.banner {
  background-color: #1e293b;
  color: #ffffff
  padding: 1rem; /* Parsing Error: Browser ignores both color and padding */
}

/* Correct and safe */
.banner {
  background-color: #1e293b;
  color: #ffffff;
  padding: 1rem;
}
```

> [!NOTE]
> CSS has robust error tolerance. If the browser encounters an invalid declaration or an unknown property, it discards only that single declaration and continues parsing the rest of the stylesheet.

## CSS Comments

CSS supports block comments wrapped between `/*` and `*/`.

```css
/* Single-line comment */

/*
 * Multi-line structured comment
 * Section: Layout Grid Configuration
 */

.container {
  max-width: 1200px; /* Inline comment explaining property choice */
  margin-inline: auto;
}
```

> [!WARNING]
> CSS does **not** support single-line `//` comments (unlike JavaScript, SCSS, or C++). Using `//` in native CSS will cause subsequent declarations or rules to fail parsing.

## Modern CSS Nesting Syntax

Modern CSS (supported in all evergreen browsers) natively supports CSS nesting without requiring preprocessors like Sass or Less.

```css
/* Native CSS Nesting */
.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;

  /* Direct child nesting */
  & .title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  /* Pseudo-class nesting with ampersand & */
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  /* Responsive nested media query */
  @media (min-width: 768px) {
    padding: 2.5rem;
  }
}
```

## Summary Checklist

- A CSS rule is composed of a selector and a declaration block enclosed in `{}`.
- Declarations consist of `property: value;`.
- Class names, ID names, and CSS custom properties (`--var`) are case-sensitive.
- Always write lowercase kebab-case for properties and classes.
- Semicolons separate declarations; never omit them.
- Comments must use `/* ... */` syntax.
- Modern CSS supports native nesting using the `&` parent selector.
