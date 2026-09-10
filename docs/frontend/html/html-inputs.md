# HTML Inputs & Form Controls

The `<input>` void element is the most versatile form control in HTML. Its behavior, appearance, and mobile keyboard layout change dynamically based on its `type` attribute.

## Comprehensive `<input>` Types Reference

| Input `type` | Primary Use Case | Mobile Keyboard / UI Feature |
| :--- | :--- | :--- |
| `text` | Generic single-line text | Standard text keyboard |
| `email` | Email addresses | Keyboard with `@` and `.com` shortcuts; validates email format |
| `password` | Secret credentials | Masks entered characters; integrates with password managers |
| `number` | Numeric quantities / age | Numeric keypad; provides increment/decrement step arrows |
| `tel` | Telephone numbers | Dialpad keypad with numbers only |
| `url` | Web URLs | Keyboard with `/` and `.com` shortcuts; validates URL scheme |
| `date` | Calendar dates (YYYY-MM-DD) | Native date picker popup |
| `time` | Time values (HH:MM) | Native time picker wheel |
| `checkbox` | Boolean toggle (multi-select) | Square checkbox control |
| `radio` | Exclusive single selection | Circular radio button (grouped by shared `name` attribute) |
| `file` | File uploads (images, PDFs) | Native operating system file picker dialog |
| `color` | Color picker | Native color palette picker popup |
| `range` | Slider range | Horizontal slider control |
| `hidden` | Secret IDs / CSRF tokens | Invisible in viewport; submitted with payload |

## Code Examples

```html
<!-- Radio Group: Only ONE option can be selected -->
<fieldset>
  <legend>Select Ticket Tier</legend>

  <input type="radio" id="tier-standard" name="ticket_tier" value="standard" checked>
  <label for="tier-standard">Standard ($49)</label>

  <input type="radio" id="tier-vip" name="ticket_tier" value="vip">
  <label for="tier-vip">VIP ($149)</label>
</fieldset>

<!-- File Upload with Constraints -->
<label for="resume-upload">Upload Resume (PDF only, max 5MB):</label>
<input type="file" id="resume-upload" name="resume" accept="application/pdf">

<!-- Numeric Slider -->
<label for="team-size">Expected Team Size:</label>
<input type="range" id="team-size" name="team_size" min="1" max="50" step="1" value="5">
```

## Native Client-Side Validation Attributes

HTML5 includes built-in constraint validation attributes evaluated by browsers prior to form submission:

* **`required`**: Prevents submission if the field is empty.
* **`minlength` / `maxlength`**: Enforces character count constraints on text inputs.
* **`min` / `max` / `step`**: Enforces boundaries and increments on numbers and dates.
* **`pattern`**: Enforces a regular expression constraint (e.g. `pattern="[A-Z]{3}-[0-9]{4}"`).
* **`autocomplete`**: Instructs browsers how to autofill fields (`autocomplete="current-password"`, `autocomplete="shipping postal-code"`).

## Non-Input Form Controls

### 1. Multi-Line Text: `<textarea>`
Used for long-form comments, bios, and feedback:

```html
<label for="event-desc">Event Description:</label>
<textarea id="event-desc" name="description" rows="5" cols="40" placeholder="Enter details..."></textarea>
```

### 2. Dropdown Menus: `<select>` and `<option>`
Used for selecting one or more options from a fixed list:

```html
<label for="category-select">Select Category:</label>
<select id="category-select" name="category">
  <option value="" disabled selected>Choose a category</option>
  <option value="frontend">Frontend Architecture</option>
  <option value="backend">Backend & Database</option>
  <option value="devops">DevOps & Cloud</option>
</select>
```

### 3. Autocomplete Recommendations: `<datalist>`
Provides suggested options for a standard `<input>` while still allowing arbitrary user text:

```html
<label for="city-input">Conference City:</label>
<input list="city-suggestions" id="city-input" name="city">

<datalist id="city-suggestions">
  <option value="San Francisco">
  <option value="Bengaluru">
  <option value="Berlin">
  <option value="Tokyo">
</datalist>
```
