# CSS Pseudo-Classes

A **Pseudo-Class** is a keyword preceded by a single colon (`:`) added to a selector that targets elements based on their dynamic state, user interaction, DOM tree position, or form validity.

```css
/* selector:pseudo-class */
button:hover {
  background-color: #4338ca;
}
```

## 1. User Interaction & Focus Pseudo-Classes

```css
/* Link state lifecycle: LVHA order (Link, Visited, Hover, Active) */
a:link    { color: #4f46e5; }
a:visited { color: #7c3aed; }
a:hover   { color: #4338ca; }
a:active  { color: #312e81; } /* While clicked down */
```

### Modern Keyboard Focus: `:focus-visible` vs `:focus`

- `:focus`: Triggers on **both mouse clicks and keyboard navigation** (often causes an unwanted outline ring on mouse clicks).
- `:focus-visible`: Triggers **only when the user navigates via keyboard (Tab key) or assistive devices**.

```css
/* Remove default outline on click, but preserve clear ring for keyboard users */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
```

### `:focus-within`
Triggers on a parent container if **any child element inside it** currently has focus.

```css
/* Highlights search form container when input inside is focused */
.search-form-container:focus-within {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}
```

## 2. Structural & Tree-Structural Pseudo-Classes

```
Parent List
├── 1. Item (first-child, nth-child(1), odd)
├── 2. Item (nth-child(2), even)
├── 3. Item (nth-child(3), odd)
└── 4. Item (last-child, nth-child(4), even)
```

| Pseudo-Class | Matches |
| :--- | :--- |
| `:first-child` | First child element inside parent |
| `:last-child` | Last child element inside parent |
| `:only-child` | Element that has no sibling elements |
| `:first-of-type` | First element of that specific HTML tag type |
| `:last-of-type` | Last element of that specific HTML tag type |
| `:empty` | Element that has no children and no text whitespace |

### Advanced `:nth-child(an + b)` Formulas

- `:nth-child(odd)` or `2n + 1`: Alternating odd rows (1, 3, 5...).
- `:nth-child(even)` or `2n`: Alternating even rows (2, 4, 6...).
- `:nth-child(3n)`: Every 3rd item (3, 6, 9...).
- `:nth-child(n + 6)`: All items from 6th onward (6, 7, 8...).
- `:nth-child(-n + 3)`: The first 3 items only (1, 2, 3).

```css
/* Zebra striping table rows */
tbody tr:nth-child(even) {
  background-color: #f8fafc;
}
```

### Modern `nth-child(An+B of S)` (Filtered nth-child)
Matches the nth element **among siblings that match a specific class selector**:

```css
/* Target every 2nd card that has class .featured */
.card:nth-child(2n of .featured) {
  background-color: #eef2ff;
}
```

## 3. Form & Input State Pseudo-Classes

```css
/* Checked state for checkboxes and radio buttons */
input[type="checkbox"]:checked + label {
  font-weight: 600;
  color: #4f46e5;
}

/* Disabled button state */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Form validation states */
input:required {
  border-left: 3px solid #f59e0b;
}

input:invalid {
  border-color: #ef4444;
}

input:valid {
  border-color: #10b981;
}

/* Floating label pattern using :placeholder-shown */
input:placeholder-shown + label {
  transform: translateY(0);
}
```

## 4. The `:target` Pseudo-Class

Matches an element whose `id` matches the current URL hash fragment (e.g. `https://example.com/#section-2`).

```css
/* Highlight heading when navigated to via bookmark link */
h2:target {
  background-color: #fef08a;
  padding-left: 0.5rem;
  border-left: 4px solid #eab308;
}
```
