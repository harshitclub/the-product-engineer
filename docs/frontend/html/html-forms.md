# HTML Forms

The `<form>` element defines an interactive document section designed to collect user input and submit structured payloads to a server-side backend API (such as an Express.js or Next.js API route).

## Standard Production Form Architecture

```html
<form action="/api/v1/auth/register" method="POST" autocomplete="on">
  <fieldset>
    <legend>Create Engineer Account</legend>

    <div class="form-group">
      <label for="reg-name">Full Name</label>
      <input type="text" id="reg-name" name="name" required minlength="2" autocomplete="name">
    </div>

    <div class="form-group">
      <label for="reg-email">Work Email</label>
      <input type="email" id="reg-email" name="email" required autocomplete="email">
    </div>

    <div class="form-group">
      <label for="reg-password">Password</label>
      <input type="password" id="reg-password" name="password" minlength="8" required>
      <small>Must be at least 8 characters.</small>
    </div>

    <div class="form-actions">
      <button type="submit">Sign Up</button>
      <button type="reset">Clear Form</button>
    </div>
  </fieldset>
</form>
```

## Essential `<form>` Attributes

### 1. `action`
The endpoint URL where the browser sends the collected form data upon submission.
* In traditional multi-page apps: `action="/submit-form"`
* In modern SPA/React apps: Handled via JavaScript `onSubmit` handlers or Next.js Server Actions.

### 2. `method`
Specifies the HTTP request method used to transmit the payload:

* **`POST`**: Encapsulates the form data within the HTTP request body.
  * Used for data mutations (creating accounts, purchasing tickets, updating records).
  * Data is not exposed in the browser address bar URL.
* **`GET`**: Appends the form data directly to the URL as query string parameters (e.g. `/search?q=postgres&category=tech`).
  * Used strictly for idempotent search and filtering queries.
  * Never use `GET` for sensitive data (passwords, credit cards, authentication tokens).

### 3. `enctype` (Encoding Type)
Specifies how the browser serializes the form data before sending:

| `enctype` Value | When to Use | Data Format |
| :--- | :--- | :--- |
| `application/x-www-form-urlencoded` | Default for standard forms | Key-value pairs URL-encoded (`name=Alex&email=alex%40test.com`) |
| `multipart/form-data` | **Required for file uploads** | Binary stream divided into boundaries (`<input type="file">`) |
| `text/plain` | Debugging only | Plain unencoded text |

### 4. `novalidate`
A boolean attribute disabling native browser client-side HTML5 validation popups, allowing custom JavaScript validation libraries (like Zod / React Hook Form) to handle all error states.

## Structural Form Elements

* **`<fieldset>`**: Groups related input controls logically (e.g. Billing Address vs. Shipping Address).
* **`<legend>`**: Provides a caption/title for the `<fieldset>` (read aloud by screen readers upon entering the field group).
* **`<label>`**: Explicitly attaches text labels to inputs. Clicking a `<label>` automatically shifts focus to its associated `<input>`.

```html
<!-- Explicit label pairing via 'for' and 'id' -->
<label for="newsletter-optin">Subscribe to weekly engineering newsletter</label>
<input type="checkbox" id="newsletter-optin" name="newsletter">
```
