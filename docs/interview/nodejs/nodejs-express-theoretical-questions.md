# 100 Node.js & Express Theoretical Interview Questions

> A comprehensive, beginner-to-intermediate question bank covering Node.js architecture, the Event Loop, asynchronous non-blocking I/O, core modules, Express.js middleware pipelines, RESTful routing, authentication, and security.

---

## 📑 Index & Topic Breakdown

| Section | Range | Topics Covered |
| :--- | :--- | :--- |
| **[Part 1: Node.js Core Architecture & Fundamentals](#part-1-nodejs-core-architecture--fundamentals-q1--q50)** | Q1 – Q50 | V8 engine, single thread, libuv, Event Loop phases, non-blocking I/O, Streams, Buffers, EventEmitter, process, CommonJS vs ESM, worker threads, clustering |
| **[Part 2: Express.js & Web API Architecture](#part-2-expressjs--web-api-architecture-q51--q100)** | Q51 – Q100 | Express routing, middleware lifecycle, `req`/`res`, error handling, CORS, body parsing, REST conventions, JWT, cookies/sessions, validation, security best practices |

---

# Part 1: Node.js Core Architecture & Fundamentals (Q1 – Q50)

### Q1: What is Node.js and how does it differ from browser JavaScript?
**Answer:** Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 engine. While browser JavaScript is designed to manipulate the DOM and interact with user interface events in a sandboxed client environment, Node.js runs on the server and provides APIs for file system access (`fs`), network sockets (`net`/`http`), binary buffers (`Buffer`), and operating system interactions (`os`).

---

### Q2: What does it mean that Node.js is "single-threaded"?
**Answer:** Node.js executes user JavaScript code on a single main thread (the Call Stack). This means only one JavaScript instruction runs at a time. However, Node.js offloads slow, blocking operations (such as file I/O, cryptographic hashing, and DNS lookups) to the background operating system kernel or to a background thread pool managed by **libuv**.

---

### Q3: What is the V8 Engine?
**Answer:** V8 is Google's open-source, high-performance JavaScript and WebAssembly engine written in C++. It parses JavaScript source code, compiles it into native machine code using Just-In-Time (JIT) compilation (via ignition interpreter and TurboFan compiler), and manages memory allocation and garbage collection.

---

### Q4: What is `libuv` and what is its role in Node.js?
**Answer:** `libuv` is a multi-platform C library that provides Node.js with its asynchronous, event-driven I/O engine. It manages the **Event Loop**, asynchronous file operations, network sockets, timers, child processes, and maintains a background **Thread Pool** (default 4 threads) for operations that cannot be handled non-blockingly by the OS kernel.

---

### Q5: How does the libuv Thread Pool work, and which operations use it?
**Answer:** While network I/O is handled directly by non-blocking OS kernel mechanisms (like epoll on Linux, kqueue on macOS, IOCP on Windows), certain operations cannot be done asynchronously by OS APIs. Libuv delegates these to a worker thread pool:
1. File system tasks (`fs` sync and async calls).
2. Cryptographic functions (`crypto.pbkdf2`, `crypto.randomBytes`).
3. Compression algorithms (`zlib`).
4. DNS lookups (`dns.lookup`).

---

### Q6: How can you increase the libuv Thread Pool size?
**Answer:** By setting the environment variable `UV_THREADPOOL_SIZE` before the Node.js process initializes:
```bash
UV_THREADPOOL_SIZE=8 node server.js
```
The default size is 4, and the maximum supported size is 128.

---

### Q7: What is Non-Blocking I/O?
**Answer:** In blocking I/O, a program waits idly until an I/O operation (like reading a 500MB file or querying a database) completes before running the next line of code. In non-blocking I/O, Node.js initiates the I/O request, immediately registers a callback or Promise, and continues executing subsequent JavaScript code. When the data is ready, the callback is pushed to the event queue to be executed.

---

### Q8: Explain the Node.js Event Loop and its main phases.
**Answer:** The Event Loop is an infinite loop orchestrated by libuv that continuously monitors the Call Stack and task queues. Each iteration of the loop is called a **tick**. The phases execute in this order:
1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2. **Pending Callbacks**: Executes I/O callbacks deferred from the previous tick (e.g., certain OS-level errors).
3. **Idle, Prepare**: Used internally by libuv.
4. **Poll**: Retrieves new I/O events; executes I/O-related callbacks (almost all user code, except timers, close, and `setImmediate`).
5. **Check**: Executes callbacks registered with `setImmediate()`.
6. **Close Callbacks**: Executes socket or handle close events (e.g., `socket.on('close')`).

---

### Q9: What is the difference between `process.nextTick()` and `setImmediate()`?
**Answer:**
* **`process.nextTick()`**: Does NOT belong to the libuv Event Loop phases. It executes immediately after the current operation finishes, before the Event Loop transitions to the next phase. Starving the event loop is possible if called recursively.
* **`setImmediate()`**: Executes during the **Check phase** of the Event Loop, after the Poll phase.

---

### Q10: What are Microtasks and Macrotasks in Node.js?
**Answer:**
* **Microtasks**: High-priority tasks executed immediately after the currently running script and between event loop phases. In Node.js, `process.nextTick()` queue has the highest priority, followed by the Promise reaction queue (`Promise.then()`, `async/await`, `queueMicrotask`).
* **Macrotasks**: Standard tasks managed by the Event Loop phases (`setTimeout`, `setInterval`, `setImmediate`, I/O callbacks).

---

### Q11: What is Callback Hell and how do we resolve it?
**Answer:** Callback Hell (also known as the "Pyramid of Doom") happens when multiple asynchronous operations are nested inside callbacks, making code unreadable, fragile, and hard to debug:
```javascript
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) { ... });
  });
});
```
**Solutions:**
1. Using native JavaScript **Promises** (`.then().catch()`).
2. Using **`async/await`** syntax with `try/catch`.
3. Modularizing functions into named functions instead of inline anonymous callbacks.

---

### Q12: What is the difference between CommonJS (CJS) and ES Modules (ESM)?
**Answer:**
* **CommonJS**: The original Node.js module system. Uses `require()` to load modules synchronously and `module.exports` or `exports` to share values. Loaded at runtime.
* **ES Modules**: The standardized ECMAScript module system. Uses `import` and `export`. Modules are static and parsed before execution, enabling tree-shaking. Enabled in Node.js by setting `"type": "module"` in `package.json` or using `.mjs` extensions.

---

### Q13: What is a `Buffer` in Node.js?
**Answer:** A `Buffer` is a global class that handles raw binary data directly in memory outside the V8 heap. Since JavaScript originally had no mechanism for reading or manipulating streams of binary octets (like images, network packets, or zip files), Node.js introduced `Buffer` to allocate fixed-size chunks of raw memory.

---

### Q14: What are Streams in Node.js?
**Answer:** Streams are collections of data that might not be available all at once and don't have to fit in memory. Instead of loading an entire 2GB video into RAM before sending it, streams process data chunk by chunk. Streams inherit from `EventEmitter`.

---

### Q15: What are the 4 fundamental types of Streams?
**Answer:**
1. **Readable**: A stream from which data can be read (e.g., `fs.createReadStream`, HTTP request `req`).
2. **Writable**: A stream to which data can be written (e.g., `fs.createWriteStream`, HTTP response `res`).
3. **Duplex**: A stream that is both Readable and Writable (e.g., a TCP network socket `net.Socket`).
4. **Transform**: A duplex stream that modifies or transforms data as it is read and written (e.g., `zlib.createGzip`).

---

### Q16: What is the purpose of `stream.pipe()`?
**Answer:** `pipe()` connects the output of a Readable stream to the input of a Writable stream:
```javascript
readableStream.pipe(writableStream);
```
It automatically manages **Backpressure**—meaning if the writable destination is slower than the readable source, `pipe()` pauses the readable stream until the writable buffer drains, preventing memory overflow.

---

### Q17: What is Backpressure in Streams?
**Answer:** Backpressure occurs when data is read faster than the receiving destination can write or consume it. Without backpressure handling, incoming chunks accumulate in RAM, leading to memory bloat and process termination (OOM).

---

### Q18: What is the `EventEmitter` class?
**Answer:** The `EventEmitter` is a core module (`events`) that facilitates event-driven communication in Node.js. Objects can emit named events (`emitter.emit('event')`) that cause registered listener functions (`emitter.on('event', callback)`) to be called synchronously.

---

### Q19: What is the difference between `emitter.on()` and `emitter.once()`?
**Answer:**
* **`emitter.on(event, listener)`**: Registers a persistent listener that triggers every time the event is fired.
* **`emitter.once(event, listener)`**: Registers a one-time listener that automatically unregisters itself immediately after being triggered for the first time.

---

### Q20: What happens if an `error` event is emitted without an active listener on an `EventEmitter`?
**Answer:** If an `EventEmitter` emits an `'error'` event and has zero registered listeners for `'error'`, Node.js treats it as an uncaught exception, prints the stack trace, and crashes the entire Node process.

---

### Q21: What is the `process` object in Node.js?
**Answer:** `process` is a global object that provides control and state inspection for the current Node.js runtime process. Examples include `process.env` (environment variables), `process.argv` (CLI arguments), `process.exit()` (terminate process), `process.cwd()` (current working directory), and `process.memoryUsage()`.

---

### Q22: What is the difference between `process.cwd()` and `__dirname`?
**Answer:**
* **`process.cwd()`**: Returns the current working directory from where the Node.js command was invoked in the terminal.
* **`__dirname`**: Returns the absolute directory path of the source code file where the script actually resides.

---

### Q23: What is the difference between synchronous (`fs.readFileSync`) and asynchronous (`fs.readFile`) methods?
**Answer:**
* `fs.readFileSync`: Blocks the single JavaScript Call Stack completely until the entire file is read from disk. No other network requests or timers can run during this time.
* `fs.readFile`: Offloads file reading to the libuv thread pool and invokes the callback/Promise upon completion, keeping the server responsive to incoming requests.

---

### Q24: What is `util.promisify()`?
**Answer:** A built-in utility function in the `util` module that converts traditional Node.js error-first callback functions `(err, value) => {}` into modern Promise-returning functions:
```javascript
import fs from 'fs';
import util from 'util';
const readFilePromise = util.promisify(fs.readFile);
```

---

### Q25: What is an Error-First Callback?
**Answer:** A standard convention in Node.js where the first parameter of a callback is reserved for an error object (if any occurred), and subsequent parameters contain the successful return data:
```javascript
fs.readFile('data.txt', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

---

### Q26: What is the difference between `dependencies` and `devDependencies` in `package.json`?
**Answer:**
* **`dependencies`**: Packages essential for running the application in production (e.g., `express`, `pg`, `bcryptjs`, `dotenv`).
* **`devDependencies`**: Packages only needed during local development, testing, or building (e.g., `nodemon`, `jest`, `eslint`).

---

### Q27: What is the purpose of `package-lock.json`?
**Answer:** `package-lock.json` records the exact, deterministic version of every installed package and its sub-dependencies, along with cryptographic integrity hashes (`integrity`). It guarantees that running `npm install` across different machines or CI/CD pipelines installs the identical dependency tree.

---

### Q28: What is Semantic Versioning (SemVer) in npm?
**Answer:** SemVer follows the format `MAJOR.MINOR.PATCH` (e.g., `2.4.1`):
* **MAJOR**: Breaking API changes.
* **MINOR**: New backward-compatible features.
* **PATCH**: Backward-compatible bug fixes.
Prefixes:
* `^2.4.1` (Caret): Allows updates to minor and patch releases (`< 3.0.0`).
* `~2.4.1` (Tilde): Allows updates only to patch releases (`< 2.5.0`).
* `2.4.1`: Exact version only.

---

### Q29: What is `npx` and how does it differ from `npm`?
**Answer:**
* **`npm`**: The package manager used to install, update, and manage dependencies.
* **`npx`**: An npm package runner that executes CLI binaries without having to install them globally (e.g., `npx create-next-app`).

---

### Q30: What is the difference between `uncaughtException` and `unhandledRejection`?
**Answer:**
* **`uncaughtException`**: Triggered when a synchronous JavaScript exception is thrown and not caught by any `try...catch` block.
* **`unhandledRejection`**: Triggered when a Promise is rejected and has no attached `.catch()` handler or `try...catch` in an `await` statement.

---

### Q31: What are Worker Threads in Node.js?
**Answer:** Introduced via the `worker_threads` module, worker threads enable Node.js to run CPU-intensive operations (such as video rendering, image processing, or machine learning calculations) in separate OS threads with shared memory (`SharedArrayBuffer`), preventing the main Event Loop thread from freezing.

---

### Q32: What is the `cluster` module in Node.js?
**Answer:** The `cluster` module enables a single Node.js process to spawn multiple worker processes (one per CPU core) that share the same server port. This allows Node.js applications to utilize multi-core processors and scale horizontally on a single machine.

---

### Q33: What is the difference between Worker Threads and Cluster processes?
**Answer:**
* **Cluster**: Spawns separate OS processes with independent memory spaces and independent V8 instances. Best for scaling web servers to handle higher request concurrency across CPU cores.
* **Worker Threads**: Runs multiple threads inside a single OS process sharing memory. Best for offloading heavy CPU computation without duplicating process memory.

---

### Q34: What causes memory leaks in Node.js?
**Answer:**
1. Global variables that retain large datasets and are never reassigned.
2. Uncleaned Event Listeners (`emitter.on`) that accumulate indefinitely.
3. Unclosed timers (`setInterval`) capturing variables in closures.
4. Caching objects in memory without an eviction policy (e.g., storing all user sessions in a plain JavaScript object).

---

### Q35: How does Garbage Collection work in V8?
**Answer:** V8 uses a generational garbage collection strategy:
* **Scavenge (Young Generation)**: For short-lived objects. Fast and runs frequently.
* **Mark-Sweep & Mark-Compact (Old Generation)**: For objects that survived multiple scavenger cycles. Periodically scans object references, marks reachable objects, sweeps dead memory, and compacts fragmented blocks.

---

### Q36: What is the purpose of `process.exit()`?
**Answer:** Instructs Node.js to terminate the process synchronously with an exit code:
* `process.exit(0)`: Clean, successful exit.
* `process.exit(1)`: Failure or unhandled error exit.

---

### Q37: What is REPL in Node.js?
**Answer:** REPL stands for **Read-Eval-Print Loop**. It is the interactive programming shell launched by typing `node` in your terminal, allowing developers to execute JavaScript statements, inspect variables, and test code snippets in real time.

---

### Q38: What is the `path` module and why should we use it instead of string concatenation?
**Answer:** The `path` module provides cross-platform file path resolution. Windows uses backslashes (`\`) while POSIX systems (Linux, macOS) use forward slashes (`/`). Methods like `path.join('dir', 'file.txt')` handle path separators, normalize redundant slashes, and resolve relative `..` segments automatically.

---

### Q39: What is the difference between `path.join()` and `path.resolve()`?
**Answer:**
* **`path.join()`**: Joins all given path segments together using the platform-specific delimiter and normalizes the resulting path.
* **`path.resolve()`**: Resolves a sequence of paths into an absolute path, treating segments from right to left until an absolute path is formed, using the current working directory as the base.

---

### Q40: What is the purpose of the `crypto` module?
**Answer:** Provides cryptographic functionality including message authentication (HMAC), secure hashing (SHA-256), symmetrical encryption/decryption (AES), digital signatures, and cryptographically strong pseudo-random data generation (`crypto.randomBytes`).

---

### Q41: What is the difference between `setImmediate()` and `setTimeout(fn, 0)`?
**Answer:**
* `setTimeout(fn, 0)`: Has a minimum delay enforced by libuv (usually 1ms). Its callback runs in the **Timers phase**.
* `setImmediate(fn)`: Always runs in the **Check phase** immediately following the Poll phase.
When run within an I/O cycle, `setImmediate` is guaranteed to execute before any timer callback.

---

### Q42: What is the purpose of the `os` module?
**Answer:** Exposes operating-system-level utility methods and properties, such as total system memory (`os.totalmem()`), free memory (`os.freemem()`), CPU architecture (`os.arch()`), CPU cores info (`os.cpus()`), and uptime (`os.uptime()`).

---

### Q43: How does Node.js handle concurrency despite being single-threaded?
**Answer:** Node.js achieves high concurrency through its asynchronous, event-driven architecture. Network sockets and file requests are initiated and delegated to the OS kernel or libuv thread pool. The single thread is immediately freed to handle other incoming requests instead of waiting for I/O completion.

---

### Q44: What is the difference between `fs.promises` and standard `fs` callback methods?
**Answer:** `fs.promises` exposes the exact same file system operations but returns native JavaScript Promises instead of accepting error-first callbacks, enabling clean integration with `async/await`.

---

### Q45: What is the purpose of `process.env`?
**Answer:** An object containing the user environment variables defined when the process was started. Commonly used to retrieve database URLs, ports, API secrets, and runtime environment indicators (like `NODE_ENV=production`).

---

### Q46: What is a child process in Node.js?
**Answer:** A separate operating system process spawned by Node.js using the `child_process` module (`spawn`, `exec`, `execFile`, `fork`). It allows Node.js to execute shell commands, run external binaries (e.g., Python scripts or git commands), and communicate via inter-process communication (IPC).

---

### Q47: What is the difference between `child_process.exec()` and `child_process.spawn()`?
**Answer:**
* **`exec()`**: Spawns a shell and buffers the command's entire output into a memory buffer before returning it in a callback. Not suitable for large outputs.
* **`spawn()`**: Streams command output chunk-by-chunk using standard input/output streams (`stdout`, `stderr`). Ideal for long-running processes or high-volume data.

---

### Q48: What is `child_process.fork()`?
**Answer:** A specialized version of `spawn()` designed specifically to execute Node.js modules as separate processes with a built-in IPC communication channel (`process.send()` and `process.on('message')`).

---

### Q49: What is the difference between `npm install` and `npm ci`?
**Answer:**
* **`npm install`**: Reads `package.json`, resolves dependency ranges, and may update `package-lock.json`.
* **`npm ci` (Clean Install)**: Installs directly from `package-lock.json`. It deletes `node_modules` first, throws an error if lockfile is out of sync, and runs significantly faster in automated CI/CD environments.

---

### Q50: What is Graceful Shutdown in Node.js?
**Answer:** The process of intercepting termination signals (`SIGTERM`, `SIGINT`) to clean up resources before exiting: stopping the HTTP server from accepting new connections, finishing active in-flight requests, closing database connection pools, and disconnecting from Redis.

---

# Part 2: Express.js & Web API Architecture (Q51 – Q100)

### Q51: What is Express.js?
**Answer:** Express.js is a minimal, unopinionated, flexible web framework for Node.js. It simplifies HTTP server development by providing intuitive routing, middleware pipelines, template engine integration, and request/response abstraction over the native Node.js `http` module.

---

### Q52: What is Middleware in Express?
**Answer:** Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` function in the application’s request-response cycle. They can execute code, modify `req` and `res`, end the request, or invoke the next middleware using `next()`.

---

### Q53: What are the 5 types of middleware in Express?
**Answer:**
1. **Application-level middleware**: Bound to an instance of `app` using `app.use()` or `app.METHOD()`.
2. **Router-level middleware**: Bound to an instance of `express.Router()`.
3. **Error-handling middleware**: Takes four arguments `(err, req, res, next)`.
4. **Built-in middleware**: Included in Express (`express.json()`, `express.urlencoded()`, `express.static()`).
5. **Third-party middleware**: Installed via npm (`cors`, `morgan`, `helmet`).

---

### Q54: What happens if a middleware does not call `next()` and does not send a response?
**Answer:** The client request will hang indefinitely until the browser or client times out, because Express never terminates the request or passes execution to subsequent handlers.

---

### Q55: What is the role of `express.json()` middleware?
**Answer:** A built-in body-parser middleware that inspects incoming requests with a `Content-Type: application/json` header, parses the raw JSON byte stream, and populates `req.body` with the resulting JavaScript object.

---

### Q56: What is the difference between `req.params`, `req.query`, and `req.body`?
**Answer:**
* **`req.params`**: Contains route path variables captured from the URL pattern (e.g., `/users/:id` -> `{ id: '42' }`).
* **`req.query`**: Contains key-value pairs parsed from the URL query string (e.g., `/search?q=nodejs&page=2` -> `{ q: 'nodejs', page: '2' }`).
* **`req.body`**: Contains payload data submitted in the HTTP request body (e.g., in a `POST` or `PUT` request).

---

### Q57: What is an Error-Handling Middleware in Express?
**Answer:** A middleware defined with exactly 4 parameters: `(err, req, res, next)`. Express recognizes this specific parameter arity and skips all regular route handlers to invoke this middleware whenever `next(err)` is called or an unhandled synchronous error is thrown.

---

### Q58: What is CORS and why is the `cors` middleware necessary?
**Answer:** **Cross-Origin Resource Sharing (CORS)** is a browser security mechanism that blocks web pages from making AJAX requests to a different domain, port, or protocol than the one serving the frontend. The `cors` package sets response headers (like `Access-Control-Allow-Origin: *`) instructing browsers to permit cross-origin requests.

---

### Q59: What is `express.Router()`?
**Answer:** A mini Express application that can only perform middleware and routing functions. It allows developers to modularize routes into separate files (e.g., `routes/auth.js`, `routes/monitors.js`) and mount them on a parent path using `app.use('/api/auth', authRouter)`.

---

### Q60: What is the difference between `app.use()` and `app.get()`?
**Answer:**
* **`app.use()`**: Matches any HTTP method (GET, POST, PUT, DELETE) and matches any route starting with the specified prefix (e.g., `app.use('/api')` matches `/api/users`, `/api/orders`).
* **`app.get()`**: Matches only HTTP `GET` requests and performs exact path matching (unless wildcards or regex are used).

---

### Q61: What is the difference between `res.send()`, `res.json()`, and `res.end()`?
**Answer:**
* **`res.send()`**: Sends various types of HTTP responses (strings, buffers, HTML, objects), automatically setting the `Content-Type` header based on the input.
* **`res.json()`**: Explicitly formats the payload as JSON, sets `Content-Type: application/json`, and converts non-objects (null, booleans) into valid JSON.
* **`res.end()`**: Terminates the response process quickly without sending any response body data.

---

### Q62: What is the difference between `PUT` and `PATCH` in REST APIs?
**Answer:**
* **`PUT`**: Complete replacement of the resource. The client sends the entire updated object; missing fields are typically set to null or default.
* **`PATCH`**: Partial update. The client sends only the fields that need modification.

---

### Q63: What are Idempotent HTTP Methods?
**Answer:** An HTTP method is idempotent if executing the identical request multiple times produces the exact same server resource state as executing it once.
* **Idempotent**: `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`.
* **Non-Idempotent**: `POST` (submitting 5 POST requests creates 5 new records).

---

### Q64: What is the difference between 401 Unauthorized and 403 Forbidden?
**Answer:**
* **401 Unauthorized**: The user lacks valid authentication credentials (they are not logged in or their token is invalid).
* **403 Forbidden**: The user is authenticated, but their account permissions do not grant access to the requested resource (e.g., a standard user attempting to access `/admin`).

---

### Q65: What are the main HTTP Status Code categories?
**Answer:**
* **1xx (Informational)**: Request received, continuing process (e.g., 101 Switching Protocols).
* **2xx (Success)**: Successfully received, understood, and accepted (200 OK, 201 Created, 204 No Content).
* **3xx (Redirection)**: Further action needed (301 Moved Permanently, 302 Found, 304 Not Modified).
* **4xx (Client Errors)**: Bad syntax or unauthorized (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found).
* **5xx (Server Errors)**: Server failed to fulfill valid request (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable).

---

### Q66: What is JSON Web Token (JWT) and what are its 3 parts?
**Answer:** A compact, URL-safe token format used for stateless authentication. It consists of three parts separated by dots (`.`):
1. **Header**: Algorithm and token type (`{ "alg": "HS256", "typ": "JWT" }`).
2. **Payload**: User claims/data (`{ "id": 1, "email": "alex@example.com", "exp": 1718000000 }`).
3. **Signature**: Cryptographic hash created by signing `Base64Url(Header) + "." + Base64Url(Payload)` using a secret key.

---

### Q67: Where should JWT tokens be stored on the client side?
**Answer:**
* **`HttpOnly` Cookie (Recommended)**: Cannot be accessed via JavaScript (`document.cookie`), protecting against Cross-Site Scripting (XSS) attacks.
* **`localStorage`**: Vulnerable to XSS theft if malicious third-party scripts run on the client.

---

### Q68: What is the difference between Session-based and Token-based authentication?
**Answer:**
* **Session-Based**: Stateful. The server creates a session record stored in memory or a database/Redis and returns a session ID in a cookie. Every request requires looking up the session in storage.
* **Token-Based (JWT)**: Stateless. The server verifies the token signature mathematically without querying a database or session store.

---

### Q69: How do you handle file uploads in Express?
**Answer:** Express cannot parse `multipart/form-data` natively. Third-party middlewares such as **Multer** process incoming binary form streams and save files to disk storage or buffer memory for cloud uploads (e.g., AWS S3).

---

### Q70: What is Rate Limiting and why is it important?
**Answer:** Rate limiting restricts the number of requests a single IP address or user can make to an API within a specific timeframe (e.g., max 100 requests per 15 minutes). It protects endpoints against Denial of Service (DoS) attacks, brute-force password cracking, and web scraping.

---

### Q71: What is Helmet in Express?
**Answer:** `helmet` is a security middleware that sets various HTTP security response headers (such as `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, and `X-Frame-Options: DENY`) to guard against XSS, clickjacking, and MIME-sniffing.

---

### Q72: What is Morgan in Express?
**Answer:** Morgan is an HTTP request logging middleware for Node.js. It logs incoming request method, status code, URL path, response time, and user-agent to the console or write streams during development and debugging.

---

### Q73: What is the purpose of `res.redirect()`?
**Answer:** Sends an HTTP redirect response to the browser (default `302 Found` or permanent `301 Moved Permanently`), pointing the client to a new URL path or external web address.

---

### Q74: What is the purpose of `express.static()`?
**Answer:** A built-in middleware that serves static assets (HTML files, CSS stylesheets, images, client JavaScript) from a specified root directory directly to the browser:
```javascript
app.use(express.static('public'));
```

---

### Q75: What is the difference between `app.all()` and `app.use()`?
**Answer:**
* **`app.all(path, handler)`**: Matches all HTTP methods (GET, POST, etc.) for an **exact** route path.
* **`app.use(path, handler)`**: Matches all HTTP methods for any route that **starts with** the given path prefix.

---

### Q76: What is Input Validation and why is it essential on the backend?
**Answer:** Checking that incoming request data matches expected types, lengths, and formats (e.g., using libraries like **Zod** or **Joi**). Frontend validation can be easily bypassed using cURL or Postman; server-side validation guarantees database integrity and blocks malicious SQL or script injections.

---

### Q77: What is SQL Injection and how do we prevent it in Express?
**Answer:** SQL Injection occurs when untrusted user input is directly concatenated into a raw SQL query string. It is prevented by:
1. Using Object-Relational Mappers (Sequelize, Prisma).
2. Using parameterized / prepared queries (`db.query('SELECT * FROM users WHERE id = $1', [userId])`).

---

### Q78: What is Cross-Site Scripting (XSS) and how do we mitigate it?
**Answer:** XSS occurs when an application stores unescaped user input that is later rendered as raw HTML or JavaScript in other users' browsers. Mitigations:
1. Sanitizing user input before storage.
2. Escaping output strings.
3. Storing authentication tokens in `HttpOnly` cookies.
4. Setting a strict `Content-Security-Policy` (CSP) header.

---

### Q79: What is Cross-Site Request Forgery (CSRF)?
**Answer:** An attack where a malicious site tricks a user's browser into executing unwanted actions on a trusted site where the user is currently authenticated (via automatic cookie transmission). Prevented using CSRF tokens or `SameSite: Strict/Lax` cookie attributes.

---

### Q80: What is the purpose of `dotenv`?
**Answer:** `dotenv` loads environment variables from a `.env` file into Node.js's `process.env` during application startup, keeping credentials (DB passwords, API keys) out of source control.

---

### Q81: What is the difference between `res.locals` and `app.locals`?
**Answer:**
* **`res.locals`**: Scoped to the current request-response cycle. Accessible by any middleware and view templates rendered during that specific request.
* **`app.locals`**: Scoped to the entire lifetime of the Express application. Persists across all requests.

---

### Q82: How does Express handle asynchronous errors in route handlers?
**Answer:** In Express 4, errors thrown inside async functions must be caught in a `try...catch` and passed to `next(err)`. In Express 5, unhandled rejected promises inside route handlers are automatically forwarded to the error-handling middleware.

---

### Q83: What is the MVC pattern in Express applications?
**Answer:**
* **Model**: Represents database schema, data validation, and business data logic (e.g., Sequelize/Mongoose models).
* **View**: The client interface (e.g., Next.js frontend or EJS/Pug templates).
* **Controller**: Receives requests from routes, coordinates with models to fetch/mutate data, and returns the response.

---

### Q84: How do you implement a 404 Not Found handler in Express?
**Answer:** By placing a catch-all middleware function at the very bottom of the middleware chain, after all valid routes have been declared:
```javascript
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
```

---

### Q85: What is the purpose of the `next('router')` call?
**Answer:** Calling `next('router')` skips the remaining middleware callbacks inside the current router instance and passes control back out to the parent router stack.

---

### Q86: What is a Reverse Proxy (like Nginx) and why use it with Express?
**Answer:** A reverse proxy sits in front of the Node.js application to handle SSL/TLS termination, static file caching, gzip compression, load balancing across cluster instances, and rate limiting, allowing Node.js to focus on application business logic.

---

### Q87: What is the purpose of `app.set('trust proxy', 1)`?
**Answer:** Informs Express that it is running behind a reverse proxy (like Nginx, Cloudflare, or AWS ALB) so that `req.ip` and `req.protocol` reflect the client's actual IP address and protocol rather than the internal proxy's IP.

---

### Q88: What is the difference between `res.status(400)` and `res.sendStatus(400)`?
**Answer:**
* **`res.status(400)`**: Sets the HTTP response status code to 400, but does not send the response yet (chains with `.json()` or `.send()`).
* **`res.sendStatus(400)`**: Sets the status code and immediately terminates the response, sending the status message (`"Bad Request"`) as the response body.

---

### Q89: How can you protect against ReDoS (Regular Expression Denial of Service)?
**Answer:** Avoid using catastrophic backtracking regular expressions (nested quantifiers like `(a+)+`). Validate inputs using safe length limits or use safe regex testing libraries before running regex evaluations.

---

### Q90: What is the purpose of Content-Type header in HTTP?
**Answer:** Tells the receiving server or client what media type (MIME type) the body of the message contains (e.g., `application/json`, `text/html`, `multipart/form-data`), ensuring the parser interprets the payload bytes correctly.

---

### Q91: What is the difference between `res.render()` and `res.sendFile()`?
**Answer:**
* **`res.render()`**: Compiles a view template file (like EJS, Pug) with dynamic data variables and sends the resulting HTML.
* **`res.sendFile()`**: Transfers an existing, static file directly from the file system to the client.

---

### Q92: What is the purpose of `express.urlencoded()`?
**Answer:** Parses incoming requests with URL-encoded payloads (typically generated by traditional HTML `<form method="POST">` submissions) and populates `req.body`.

---

### Q93: What is Cookie Parsing in Express?
**Answer:** The process of reading the incoming `Cookie` request header and parsing raw cookie strings into a convenient JavaScript object (`req.cookies`), usually handled by the `cookie-parser` middleware.

---

### Q94: What is a Signed Cookie?
**Answer:** A cookie containing an HMAC signature generated using a secret key. If a client tampers with the cookie value in their browser, the signature verification fails, and Express rejects the modified value.

---

### Q95: What is the difference between `res.attachment()` and `res.download()`?
**Answer:**
* **`res.attachment('file.pdf')`**: Sets the `Content-Disposition` header to `'attachment'`, prompting the browser to download rather than display the file.
* **`res.download('path/to/file.pdf')`**: Sets the attachment header AND transfers the file to the client in a single call.

---

### Q96: Why should you avoid using `console.log()` in production Express apps?
**Answer:** `console.log()` is synchronous and writes to standard output, which can block the event loop under extremely high throughput. Production applications should use asynchronous, structured logging libraries like **Winston** or **Pino**.

---

### Q97: What is the purpose of the `NODE_ENV` environment variable?
**Answer:** A standard convention to signify the application runtime environment:
* `development`: Verbose logging, source maps, detailed error stack traces.
* `production`: Disables error stack dumps to clients, caches view templates, optimizes Express performance.

---

### Q98: How do you achieve horizontal scaling in Node.js?
**Answer:**
1. Running multiple instances of the application across multiple server cores using the Node.js `cluster` module or process managers like **PM2**.
2. Deploying containerized instances across multiple machines behind a load balancer (e.g., Nginx, Kubernetes, AWS ECS).
3. Storing session state and caches in an external in-memory store like **Redis**.

---

### Q99: What is PM2?
**Answer:** PM2 is a production process manager for Node.js applications. It keeps applications alive indefinitely, provides zero-downtime reloads, manages automatic clustering across all CPU cores, and collects CPU/memory performance metrics.

---

### Q100: What is the Twelve-Factor App methodology in the context of Node.js and Express?
**Answer:** A set of best practices for building scalable cloud-native web services:
1. One codebase tracked in version control.
2. Explicitly declared dependencies (`package.json`).
3. Configuration stored in environment variables (`process.env`).
4. Treating backing services (DB, Redis) as attached resources.
5. Stateless, shared-nothing processes.
6. Fast startup and graceful shutdown (`SIGTERM`).
