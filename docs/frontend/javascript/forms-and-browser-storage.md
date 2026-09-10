# Forms, Input Validation & Client-Side Storage

> Handling form submissions with FormData, real-time input validation, and persisting state across page reloads with LocalStorage, SessionStorage, and Cookies.

---

## 1. Handling Form Submissions & `FormData`

Never extract 15 form inputs manually one by one. Use the **`FormData`** API:

```html
<form id="profile-form">
  <input type="text" name="username" placeholder="Username" required />
  <input type="email" name="email" placeholder="Email" required />
  <select name="role">
    <option value="developer">Developer</option>
    <option value="designer">Designer</option>
  </select>
  <button type="submit">Save Profile</button>
</form>
```

```javascript
const form = document.querySelector("#profile-form");

form.addEventListener("submit", (event) => {
  // 1. Prevent default browser page reload
  event.preventDefault();

  // 2. Extract all values in one step using FormData
  const formData = new FormData(form);

  // 3. Convert into a clean JavaScript Object
  const userPayload = Object.fromEntries(formData.entries());
  console.log("Form Data Object:", userPayload);
  // Example output: { username: "harshit", email: "h@domain.com", role: "developer" }

  // 4. Reset form fields
  form.reset();
});
```

---

## 2. Browser Storage Mechanisms Compared

| Feature | `localStorage` | `sessionStorage` | Cookies |
| :--- | :--- | :--- | :--- |
| **Capacity** | ~5MB - 10MB | ~5MB | ~4KB |
| **Lifetime** | Permanent (until manually cleared) | Tab Lifetime (cleared on tab close) | Expiration configured by server |
| **Sent to Server?** | ❌ No | ❌ No | ✅ **Yes** (sent on every HTTP request) |
| **Best Used For** | Dark/Light theme, user UI prefs | Multi-step form drafts | Auth tokens (`HttpOnly`), session IDs |

---

## 3. Working with `localStorage` and `sessionStorage`

Both storage interfaces share the exact same key-value API (**strings only**):

```javascript
// 1. Storing an Object (Must use JSON.stringify!)
const appTheme = { mode: "dark", primaryColor: "#4f46e5", fontSize: 16 };
localStorage.setItem("user_theme", JSON.stringify(appTheme));

// 2. Reading and Parsing
const savedRaw = localStorage.getItem("user_theme");
if (savedRaw) {
  const parsedTheme = JSON.parse(savedRaw);
  console.log("Active theme mode:", parsedTheme.mode); // "dark"
}

// 3. Removing a specific key
localStorage.removeItem("user_theme");

// 4. Wiping all keys for this website
localStorage.clear();
```

---

## 4. Real-World Dark/Light Mode Switcher with Persistent Storage

```javascript
const themeToggleBtn = document.querySelector("#theme-toggle");

// 1. Check if user has a previously saved theme preference:
const currentTheme = localStorage.getItem("site_theme") || "light";
document.body.className = currentTheme;

// 2. Toggle and persist to localStorage:
themeToggleBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  document.body.className = newTheme;
  localStorage.setItem("site_theme", newTheme); // Saved permanently!
});
```
