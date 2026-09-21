# 1. Node.js Basics & Web Server

> A friendly, step-by-step beginner guide to understanding Node.js, reading and writing files (both synchronous and asynchronous), parsing URLs, and building your first working web server from scratch.

---

## 1. What is Node.js? (In Simple Words)

Normally, JavaScript runs only inside a web browser (like Google Chrome, Safari, or Edge) to make websites interactive when you click buttons.

**Node.js is a runtime that lets you run JavaScript directly on your computer or server**, without opening any browser at all!

```text
┌─────────────────────────────────────────────────────────────┐
│                 BROWSER vs. NODE.JS                         │
├──────────────────────────────┬──────────────────────────────┤
│ JavaScript in Browser        │ JavaScript in Node.js        │
├──────────────────────────────┼──────────────────────────────┤
│ 🌐 Runs on the user's laptop │ 💻 Runs on your backend server│
│ 🎨 Changes colors and HTML   │ 📁 Reads and creates files   │
│ ❌ Cannot touch your hard drive│ 💾 Connects to databases    │
│ ❌ Has `window` and `document` │ 🌐 Listens for web requests │
└──────────────────────────────┴──────────────────────────────┘
```

### Running Your Very First Node.js Code

1. Make sure Node.js is installed by opening your terminal or Command Prompt and typing:
   ```bash
   node -v
   ```
2. Create a folder named `my-node-app` and create a file named `app.js`.
3. Open `app.js` and write:
   ```javascript
   // app.js
   const greeting = "Hello, Welcome to Node.js!";
   console.log(greeting);
   ```
4. In your terminal, run the file:
   ```bash
   node app.js
   ```
   You will see:
   ```text
   Hello, Welcome to Node.js!
   ```

---

## 2. Using Built-in Modules in Node.js

Node.js comes packed with powerful built-in tools called **core modules**. You don't need to install anything with `npm` to use them.

To use a built-in module, you bring it into your file using `require` (in CommonJS) or `import` (in ES Modules):

```javascript
// CommonJS syntax (default in Node.js)
const fs = require('fs');     // For handling files
const http = require('http'); // For creating web servers
const url = require('url');   // For reading web links and queries
```

Let's learn these three essential modules step by step!

---

## 3. File Handling Made Super Easy (`fs` Module)

The **`fs`** (File System) module lets your program create, read, update, and delete files on your computer.

There are two main ways to handle files in Node.js:
1. **Synchronous (Sync)**: Code runs line-by-line and **waits** until the file is completely processed before moving to the next line.
2. **Asynchronous (Async)**: Node starts the file task in the background and immediately moves to the next line without making your program freeze.

---

### Part A: The Synchronous Way (Simple & Direct)

Use synchronous methods when you have a small script or setup file where waiting is totally fine.

#### 1. Writing a File (`writeFileSync`)
Creates a new file. If the file already exists, it replaces its content.

```javascript
const fs = require('fs');

// Creates "message.txt" with text inside it
fs.writeFileSync('message.txt', 'Hello! This file was created by Node.js.');

console.log('File has been created successfully!');
```

#### 2. Reading a File (`readFileSync`)
Reads text from a file. Always pass `'utf8'` as the second argument so you get readable text instead of raw computer numbers.

```javascript
const fs = require('fs');

// Read the text file
const fileData = fs.readFileSync('message.txt', 'utf8');

console.log('File Content:');
console.log(fileData);
```

#### 3. Appending to a File (`appendFileSync`)
Adds new text to the end of an existing file without deleting what is already there:

```javascript
const fs = require('fs');

// Adds a new line to message.txt
fs.appendFileSync('message.txt', '\nHere is an extra line added later!');

console.log('New line added!');
```

---

### Part B: The Asynchronous Way with Callbacks (Non-Blocking)

Why do we need the async way? 

> **Real-World Analogy:**  
> Imagine waiting in line at a coffee shop.  
> * **Sync:** The cashier takes your order, makes your coffee for 5 minutes while 50 people wait in line, and only then talks to the next person. (Everyone gets angry!)  
> * **Async:** The cashier takes your order, gives you a receipt, and immediately takes the next person's order while the barista prepares your drink in the background.

In servers serving multiple people, **always prefer asynchronous methods** so your server stays fast!

#### 1. Writing a File Asynchronously (`fs.writeFile`)

```javascript
const fs = require('fs');

console.log('1. Starting to write file...');

fs.writeFile('user.txt', 'Name: John Doe, Role: Developer', (err) => {
  if (err) {
    console.log('Something went wrong:', err);
    return;
  }
  console.log('3. File written successfully!');
});

console.log('2. I run immediately without waiting!');
```

**Output in Terminal:**
```text
1. Starting to write file...
2. I run immediately without waiting!
3. File written successfully!
```
Notice how step 2 finished **before** step 3! Node didn't freeze while the file was being saved.

#### 2. Reading a File Asynchronously (`fs.readFile`)

```javascript
const fs = require('fs');

fs.readFile('user.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Could not read file:', err.message);
    return;
  }
  console.log('File content is:\n', data);
});
```

#### 3. Appending to a File (`fs.appendFile`)

```javascript
const fs = require('fs');

fs.appendFile('user.txt', '\nStatus: Active', (err) => {
  if (err) throw err;
  console.log('Appended status successfully!');
});
```

#### 4. Deleting a File (`fs.unlink`)

```javascript
const fs = require('fs');

// Deletes the file named "temp.txt"
fs.unlink('temp.txt', (err) => {
  if (err) {
    console.log('File does not exist or could not be deleted');
    return;
  }
  console.log('File deleted!');
});
```

---

### Part C: Modern Asynchronous with `async / await` (`fs/promises`)

In modern Node.js, you can write async code that looks clean and simple using `fs/promises`:

```javascript
const fs = require('fs/promises');

async function manageNotes() {
  try {
    // 1. Write file
    await fs.writeFile('notes.txt', 'Buy groceries for the week');
    console.log('Note saved!');

    // 2. Read file
    const content = await fs.readFile('notes.txt', 'utf8');
    console.log('Note content:', content);
  } catch (error) {
    console.error('Error occurred:', error.message);
  }
}

manageNotes();
```

---

## 4. The `http` Module: Building Your First Web Server

An **HTTP server** is a program that listens for web requests from a browser or app and sends back an answer (HTML, text, or data).

### Creating a Server in 10 Lines of Code

Create a file named `server.js`:

```javascript
// server.js
const http = require('http');

// 1. Create the server
const server = http.createServer((req, res) => {
  // req = Request (information about the visitor)
  // res = Response (what we send back to the visitor)

  // Send back a plain text message
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World! My first Node.js server is running! 🎉');
});

// 2. Listen on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

### Running Your Server

1. In your terminal run:
   ```bash
   node server.js
   ```
2. Open your web browser (Chrome, Edge, Firefox) and visit:  
   👉 `http://localhost:3000`
3. You will see your message displayed right on the screen!
4. To stop the server in your terminal, press `Ctrl + C`.

---

## 5. Handling Different Pages (Basic Routing)

When someone visits your website, they might ask for `/`, `/about`, or `/contact`. 

You can check `req.url` to see what page the visitor is asking for and respond accordingly:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Check the URL path
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to our Home Page!</h1>');
  } 
  else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Us</h1><p>We build web applications using Node.js.</p>');
  } 
  else if (req.url === '/api/user') {
    // Sending JSON data (used in mobile apps & React frontends)
    const user = { name: 'Harshit', age: 24, role: 'Software Engineer' };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } 
  else {
    // If the visitor enters any other URL
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server active on http://localhost:3000');
});
```

Test these links in your browser:
* `http://localhost:3000/` -> Shows Home
* `http://localhost:3000/about` -> Shows About
* `http://localhost:3000/api/user` -> Shows JSON data
* `http://localhost:3000/random` -> Shows 404

---

## 6. The `url` Module: Reading Query Strings & Parameters

When users submit a search bar or filter products, the browser attaches data to the URL:

```text
http://localhost:3000/search?term=javascript&page=2
                             └─────────────────────┘
                                  Query String
```

Why do we need the **`url`** module? Because without it, you would have to manually split text with commas and question marks! The built-in URL parser turns this into an easy-to-use object.

### How to Parse URLs in Node.js

Node.js provides the standard **`URL`** class:

```javascript
const myUrl = new URL('http://localhost:3000/search?term=javascript&page=2');

console.log('Path:', myUrl.pathname);                    // '/search'
console.log('Search Term:', myUrl.searchParams.get('term')); // 'javascript'
console.log('Page Number:', myUrl.searchParams.get('page')); // '2'
```

### Using the URL Module Inside an HTTP Server

Let's build a server that greets visitors by name if they provide `?name=Alex` in the link:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Parse the incoming request URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (pathname === '/greet') {
    // Get the name parameter from ?name=SomeName
    const userName = parsedUrl.searchParams.get('name') || 'Guest';

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>Hello, ${userName}! 👋</h1><p>Welcome to our site.</p>`);
  } 
  else {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<p>Try visiting <a href="/greet?name=Rahul">/greet?name=Rahul</a></p>');
  }
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
```

Now try opening:
* `http://localhost:3000/greet` ➔ says "Hello, Guest!"
* `http://localhost:3000/greet?name=Harshit` ➔ says "Hello, Harshit!"

---

## 7. Putting It Together: A Real Mini-Project (Notes App)

Let's combine **`http`**, **`url`**, and **`fs`** into a mini web application where you can save and view notes from your browser!

Create a file named `notes-server.js`:

```javascript
// notes-server.js
const http = require('http');
const fs = require('fs');

const FILE_NAME = 'user-notes.txt';

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Home Route: Simple instructions
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <h2>📝 Simple Node.js Notes Server</h2>
      <ul>
        <li><a href="/save?note=Learn-NodeJS">Save note: /save?note=Learn-NodeJS</a></li>
        <li><a href="/view">View all notes: /view</a></li>
      </ul>
    `);
  }
  // 2. Save Note Route: Appends note to file
  else if (pathname === '/save') {
    const noteText = parsedUrl.searchParams.get('note');

    if (!noteText) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Error: Please provide a note, e.g. /save?note=MyNote');
    }

    // Append the note to file asynchronously
    fs.appendFile(FILE_NAME, noteText + '\n', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Could not save note');
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <p>✅ Note saved: <strong>${noteText}</strong></p>
        <a href="/view">View all notes</a> | <a href="/">Go back</a>
      `);
    });
  }
  // 3. View Notes Route: Reads file and displays notes
  else if (pathname === '/view') {
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end('<p>No notes saved yet! <a href="/">Add one</a></p>');
      }

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <h2>Your Saved Notes:</h2>
        <pre>${data}</pre>
        <a href="/">Go Home</a>
      `);
    });
  }
  // 4. Any other page: 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Notes app running at http://localhost:3000');
});
```

Try it out!
1. Run `node notes-server.js`
2. Open `http://localhost:3000`
3. Click the save links or enter `http://localhost:3000/save?note=Buy-Coffee`
4. Click `/view` to see your notes persisted on your hard drive!

---

## 8. Summary Checklist

Here is what you learned in this beginner guide:

* [x] **What Node.js is**: JavaScript running on your machine, outside of any web browser.
* [x] **File System (`fs`)**:
  * **Sync**: `writeFileSync`, `readFileSync` (blocks code until complete).
  * **Async**: `writeFile`, `readFile`, `appendFile`, `unlink` (non-blocking, fast for servers).
* [x] **Web Server (`http`)**:
  * Created a server with `http.createServer((req, res) => { ... })`.
  * Sent text, HTML, and JSON responses.
  * Handled simple routes (`/`, `/about`, `/api`).
* [x] **URL Module (`url`)**:
  * Extracted pathnames and query parameters like `?name=John` using `new URL()`.
* [x] **Combined Project**: Built a mini web app that reads and writes notes from the browser directly to the hard drive!

In the next guide (**Intermediate Node.js & Core Modules**), we will explore how to safely handle file paths across Windows/Mac, inspect system resources with `os`, look up internet domains with `dns`, and handle incoming JSON data in POST requests!
