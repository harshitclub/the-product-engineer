# 2. Intermediate Node.js & Core Modules

> Take your Node.js skills to the next level: learn why and how to use essential built-in modules (`path`, `os`, `dns`), handle environment variables safely, read incoming POST data chunks, and build a clean JSON REST API with clear explanations.

---

## 1. Why Do We Need the `path` Module?

When building apps, you often need to point to files, images, or configuration folders. A common beginner mistake is joining paths with plain strings:

```javascript
// ❌ WRONG: This will break across different operating systems!
const badPath = "uploads" + "/" + "avatar.png";
```

### The Problem
* **Windows** uses backslashes: `uploads\avatar.png`
* **macOS & Linux** use forward slashes: `uploads/avatar.png`

If your code runs on Windows during development but deploys to a Linux server in the cloud, string concatenation will crash your app!

### The Solution: `path.join()` & `path.resolve()`
The built-in **`path`** module automatically chooses the correct slash for the operating system your code is running on.

```javascript
const path = require('path');

// 1. path.join: Safely combines folder and file names
const safePath = path.join('storage', 'user-data', 'profile.json');
console.log('Safe Path:', safePath);
// On Windows: storage\user-data\profile.json
// On Linux/Mac: storage/user-data/profile.json

// 2. path.resolve: Generates an absolute path from the computer root
const absolutePath = path.resolve('config.json');
console.log('Absolute Path:', absolutePath);
// e.g., C:\projects\my-app\config.json

// 3. Extracting parts of a path
const sampleFile = '/projects/website/logo.png';

console.log('File Name:', path.basename(sampleFile));       // 'logo.png'
console.log('Name only:', path.basename(sampleFile, '.png')); // 'logo'
console.log('Extension:', path.extname(sampleFile));        // '.png'
console.log('Folder:', path.dirname(sampleFile));           // '/projects/website'
```

::: tip Rule of Thumb
Whenever you pass a file path to `fs.readFile()` or `fs.writeFile()`, **always wrap it in `path.join()`**!
:::

---

## 2. Why Do We Need Environment Variables? (`process.env`)

Imagine you are connecting your server to a database or using a third-party payment gateway. 

```javascript
// ❌ DANGEROUS: Never hardcode sensitive credentials in your code!
const dbPassword = "super_secret_password_123";
const serverPort = 3000;
```

If you upload this code to GitHub, anyone can see your passwords. Furthermore, your local computer might use port `3000`, but your cloud server requires port `8080`.

### The Solution: `process.env`
**Environment variables** are values stored outside your source code in the operating system environment. Node.js gives you access to them through `process.env`.

```javascript
// Read the PORT variable, or fallback to 3000 if not set
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Server starting in ${NODE_ENV} mode on port ${PORT}`);
```

### Loading `.env` Files
You can keep your secrets in a file named `.env` in the root of your project:

```text
# .env file
PORT=5000
DATABASE_USER=admin
API_KEY=xyz987secret
```

In modern Node.js (version 20.6 and newer), you can load this file natively without installing any external packages:

```bash
node --env-file=.env server.js
```

---

## 3. Why Do We Need the `os` Module?

The **`os`** (Operating System) module lets your Node.js code inspect the hardware it is running on.

### Real-World Use Cases
1. **Server Health Monitoring**: Checking how much RAM is remaining before memory runs out.
2. **Cluster Scaling**: Finding how many CPU cores exist so you know how many server instances to run.
3. **Debugging**: Verifying whether the code is running on Windows, macOS, or Linux.

### Practical Hardware Inspection Example

```javascript
const os = require('os');

// 1. Operating System Details
console.log('Platform:', os.platform()); // 'win32', 'darwin', 'linux'
console.log('Architecture:', os.arch()); // 'x64' or 'arm64'
console.log('System Uptime:', Math.floor(os.uptime() / 60), 'minutes');

// 2. Memory Details (Convert raw bytes to Gigabytes)
const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);

console.log(`Total RAM: ${totalMemGB} GB`);
console.log(`Free RAM: ${freeMemGB} GB`);

// 3. CPU Core Count
const totalCores = os.cpus().length;
console.log(`CPU Cores Available: ${totalCores}`);
```

### Practical Server Health Endpoint
You can use this to create a live health status route in your HTTP server:

```javascript
const http = require('http');
const os = require('os');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    const healthData = {
      status: 'OK',
      uptimeMinutes: Math.floor(os.uptime() / 60),
      freeMemoryMB: Math.floor(os.freemem() / (1024 * 1024)),
      cpuCount: os.cpus().length
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(healthData));
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Visit /health to see system diagnostics');
});

server.listen(3000, () => {
  console.log('Health check server running on http://localhost:3000/health');
});
```

---

## 4. Why Do We Need the `dns` Module?

**DNS (Domain Name System)** translates human-readable web addresses (like `github.com`) into computer IP addresses (like `140.82.121.4`).

### Real-World Use Cases
1. **Email Domain Verification**: Before letting a user register, check if their email domain (e.g. `@company.com`) actually has active mail servers.
2. **Network Diagnostics**: Check whether a remote server is reachable by looking up its IP address.

```javascript
const dns = require('dns');

// 1. dns.lookup: Finds the IP address of any domain
dns.lookup('google.com', (err, address, family) => {
  if (err) {
    console.log('Could not resolve domain:', err.message);
    return;
  }
  console.log(`Google IP Address: ${address} (IPv${family})`);
});

// 2. dns.resolveMx: Looks up Mail Exchange (MX) servers for emails
dns.resolveMx('gmail.com', (err, addresses) => {
  if (err) {
    console.log('No mail servers found');
    return;
  }
  console.log('Gmail Mail Servers:');
  addresses.forEach((mailServer) => {
    console.log(` • Priority ${mailServer.priority}: ${mailServer.exchange}`);
  });
});
```

---

## 5. Handling POST Requests & Receiving Incoming Data

In `GET` requests, data is sent in the URL (e.g. `/search?name=John`).  
In `POST` requests, users submit larger payloads (like login forms or JSON data) in the **Request Body**.

### Why Does Data Arrive in Chunks?

> **The Parcel Delivery Analogy:**  
> If someone sends you a heavy 50-piece furniture set, the delivery truck doesn't throw all 50 pieces through your window in one second. It unloads them box by box (**chunks**) until the truck is empty (**end**).

Node.js reads incoming data in small streams of chunks so it never runs out of memory, even if multiple users upload data at the exact same time.

```text
Incoming Data: [Chunk 1] ──► [Chunk 2] ──► [Chunk 3] ──► (End Event)
               req.on('data')               req.on('end')
```

### Collecting and Parsing the Body

Here is the clean, standard way to receive POST data in pure Node.js:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/submit') {
    let rawBody = '';

    // 1. Listen for data chunks as they arrive
    req.on('data', (chunk) => {
      rawBody += chunk.toString();
    });

    // 2. The 'end' event fires when all chunks have arrived
    req.on('end', () => {
      try {
        // Parse the raw text as JSON
        const parsedData = JSON.parse(rawBody);

        console.log('Received data from client:', parsedData);

        // Send a successful response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data received successfully!', data: parsedData }));
      } catch (error) {
        // Handle invalid JSON gracefully
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON sent' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Send a POST request to /api/submit');
  }
});

server.listen(3000, () => {
  console.log('POST server listening on port 3000');
});
```

---

## 6. HTTP Status Codes & Headers Explained Simply

Whenever your server answers a request, it sends two things before the content:
1. **HTTP Status Code**: A 3-digit number telling the client what happened.
2. **HTTP Headers**: Metadata about the response (e.g. content format, security rules).

```text
┌─────────────────────────────────────────────────────────────┐
│                 COMMON HTTP STATUS CODES                    │
├───────────────┬─────────────────────────────────────────────┤
│ 200 OK        │ Request succeeded (standard for GET)        │
│ 201 Created   │ New item was successfully created (POST)    │
│ 400 Bad Req   │ Client forgot a required field or sent bad data│
│ 404 Not Found │ The requested page or item does not exist   │
│ 500 Server Err│ Your server had an unexpected code crash    │
└───────────────┴─────────────────────────────────────────────┘
```

### What is CORS and Why Do We Need CORS Headers?

If your React frontend runs on `http://localhost:5173` and your Node.js backend runs on `http://localhost:3000`, the browser will block the frontend from talking to the backend for security reasons (Same-Origin Policy).

To allow your frontend to connect, your backend must include the **CORS header**:

```javascript
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Allows any frontend to request data!
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS'
};

res.writeHead(200, headers);
```

---

## 7. Practical Capstone Project: Complete Task Manager API

Let's build a complete, working REST API for managing tasks using **pure Node.js** (no external libraries required!).

It supports:
* `GET /tasks` -> Returns all tasks.
* `POST /tasks` -> Adds a new task with validation.
* `OPTIONS` -> Handles browser CORS preflight checks.

Create `api-server.js`:

```javascript
// api-server.js
const http = require('http');

const PORT = 3000;

// Our temporary in-memory list of tasks
let taskList = [
  { id: 1, title: 'Install Node.js', done: true },
  { id: 2, title: 'Learn File System module', done: true },
  { id: 3, title: 'Build first HTTP REST API', done: false }
];

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Standard CORS and JSON response headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Helper function to send JSON easily
  const sendJSON = (statusCode, payload) => {
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(payload, null, 2));
  };

  // Handle browser CORS pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, headers);
    return res.end();
  }

  // 1. GET /tasks - Return all tasks
  if (pathname === '/tasks' && method === 'GET') {
    return sendJSON(200, {
      success: true,
      total: taskList.length,
      tasks: taskList
    });
  }

  // 2. POST /tasks - Create a new task
  if (pathname === '/tasks' && method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        // Validation: Ensure title exists
        if (!data.title || data.title.trim() === '') {
          return sendJSON(400, {
            success: false,
            error: 'Task "title" is required and cannot be empty'
          });
        }

        // Create new task item
        const newTask = {
          id: Date.now(), // Unique ID using timestamp
          title: data.title.trim(),
          done: false
        };

        taskList.push(newTask);

        return sendJSON(201, {
          success: true,
          message: 'Task created successfully!',
          task: newTask
        });
      } catch (err) {
        return sendJSON(400, {
          success: false,
          error: 'Invalid JSON payload received'
        });
      }
    });
    return;
  }

  // 3. Fallback Route: 404 Not Found
  sendJSON(404, {
    success: false,
    error: `Route ${method} ${pathname} not found`
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(` • GET  /tasks`);
  console.log(` • POST /tasks`);
});
```

### Testing the API

Run the server:
```bash
node api-server.js
```

1. **Test GET in browser:** Open `http://localhost:3000/tasks` in Chrome or Edge.
2. **Test POST from your browser console:** Open Developer Tools (`F12`), go to the **Console** tab, and run:
   ```javascript
   fetch('http://localhost:3000/tasks', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ title: 'Deploy app to cloud' })
   })
   .then(res => res.json())
   .then(data => console.log('Response:', data));
   ```
3. Refresh `http://localhost:3000/tasks` — your new task is now listed!

---

## 8. Modern Workflow: Node.js Native Watch Mode

Whenever you edit your server code, you normally have to stop the server (`Ctrl + C`) and run `node server.js` again.

In modern Node.js (version 18.11+), you can use the **`--watch`** flag:

```bash
# Automatically restarts your server whenever you save any file!
node --watch api-server.js
```

You can also add this to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "node --watch api-server.js"
  }
}
```

Now, simply running `npm run dev` will keep your server live and reloading automatically.

---

## 9. Summary & Next Steps

You have now mastered intermediate Node.js skills:
* [x] **`path`**: Used `path.join()` to safely navigate directories on Windows and Linux alike.
* [x] **`process.env`**: Kept sensitive keys and dynamic ports out of source code.
* [x] **`os`**: Inspected RAM, CPU cores, and system health status.
* [x] **`dns`**: Resolved domain names and queried mail servers.
* [x] **POST Streaming**: Collected data chunks and parsed JSON payloads safely.
* [x] **REST API**: Built a full JSON Task Manager API with CORS headers and proper HTTP status codes.
* [x] **Watch Mode**: Streamlined local development with `node --watch`.

With these practical fundamentals solid, you are ready to explore backend frameworks like **Express.js** to build even larger web applications!
