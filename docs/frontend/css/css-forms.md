# CSS Form Controls & UI Inputs

Form controls (`<input>`, `<textarea>`, `<select>`, `<button>`) historically resisted consistent CSS styling across operating systems. Modern CSS enables fully customized, accessible, and theme-consistent form controls.

## 1. Universal Form Reset Best Practices

By default, form elements do not inherit parent `font-family` or `font-size`. Normalize them first:

```css
/* Inherit typography across all input controls */
input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
}

/* Remove OS default native styling */
select,
input[type="search"] {
  appearance: none;
  -webkit-appearance: none;
}
```

## 2. Text Input & Textarea Styling

```css
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.625rem 0.875rem;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

/* Accessible interactive focus ring */
.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

/* Textarea resizing control */
.form-textarea {
  min-height: 100px;
  resize: vertical; /* Prevents users from breaking horizontal layouts */
}
```

## 3. Quick Checkbox & Radio Theming: `accent-color`

The `accent-color` property themes native browser checkboxes, radio buttons, range sliders, and progress bars with a single line of CSS:

```css
:root {
  accent-color: #4f46e5; /* Primary brand color for all native checks & radios */
}
```

## 4. Modern Interactive Validation States

Modern CSS provides `:user-valid` and `:user-invalid` pseudo-classes. Unlike `:invalid` (which fires immediately upon page load before the user touches the field), `:user-valid` and `:user-invalid` trigger **only after the user interacts with and blurs the field**.

```css
/* Clean user-friendly error feedback */
.form-input:user-invalid {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.form-input:user-valid {
  border-color: #10b981;
}

/* Display error helper text only when input is invalid */
.form-group:has(.form-input:user-invalid) .error-message {
  display: block;
  color: #ef4444;
  font-size: 0.8125rem;
  margin-top: 0.25rem;
}
```

## 5. Pure CSS Floating Label Pattern

```html
<div class="floating-group">
  <input type="text" id="username" class="floating-input" placeholder=" " required />
  <label for="username" class="floating-label">Email address</label>
</div>
```

```css
.floating-group {
  position: relative;
  margin-block: 1rem;
}

.floating-input {
  width: 100%;
  padding: 1.25rem 0.75rem 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
}

.floating-label {
  position: absolute;
  left: 0.75rem;
  top: 0.875rem;
  color: #64748b;
  pointer-events: none;
  transition: transform 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  transform-origin: left top;
}

/* When input is focused OR has text entered (placeholder is NOT shown) */
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  transform: translateY(-0.5rem) scale(0.75);
  color: #4f46e5;
}
```
