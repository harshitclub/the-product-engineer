# Async/Await & The Fetch API (Connecting to Real Backends)

> Writing clean asynchronous code with `async`/`await`, fetching data with `fetch()`, handling status codes, POST/PUT requests, and error boundaries with try/catch.

---

## 1. What is `async` / `await`?

Introduced in ES2017, **`async` / `await`** makes asynchronous code look and read like clean, sequential synchronous code:

* **`async`**: Declares that a function returns a Promise.
* **`await`**: Pauses execution inside the `async` function until the Promise resolves.

```javascript
// 1. Classic Promise .then() syntax:
function getQuoteOld() {
  fetch("https://api.example.com/quote")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}

// 2. Modern async / await syntax (Much cleaner!):
async function getQuoteModern() {
  try {
    const response = await fetch("https://api.example.com/quote");
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Error loading quote:", err);
  }
}
```

---

## 2. Fetching Data with `fetch()` (GET Request)

```javascript
async function loadGitHubUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    // ⚠️ IMPORTANT GOTCHA: fetch() does NOT reject on 404 or 500 HTTP errors!
    // You MUST check response.ok manually:
    if (!response.ok) {
      throw new Error(`User not found! Status: ${response.status}`);
    }

    const userData = await response.json();
    console.log(`User: ${userData.name} (@${userData.login})`);
    console.log(`Public Repos: ${userData.public_repos}`);
    return userData;
  } catch (error) {
    console.error("Network / API Error:", error.message);
  }
}

loadGitHubUser("harshitclub");
```

---

## 3. Sending Data: POST, PUT, and DELETE Requests

```javascript
// POST: Creating a new resource on the server
async function createNewPost(postData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer my_secret_token"
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) throw new Error("Failed to create post");

    const newPost = await response.json();
    console.log("Post created successfully with ID:", newPost.id);
    return newPost;
  } catch (error) {
    console.error("Submission error:", error);
  }
}

createNewPost({ title: "Mastering JavaScript", body: "Complete Guide", userId: 1 });
```

---

## 4. Parallel Async Execution with `Promise.all()`

Do not await multiple independent requests one after another (sequential bottleneck):

```javascript
// ❌ Sequential (Slow! 1s + 1s = 2s total):
// const user = await fetchUser();
// const posts = await fetchPosts();

// ✅ Parallel (Fast! Total time = 1s):
async function loadFullDashboard() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json())
  ]);

  return { user, posts };
}
```
