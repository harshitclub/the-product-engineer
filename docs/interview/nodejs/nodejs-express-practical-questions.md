# 100 Node.js & Express Practical & Coding Interview Questions

> A comprehensive, hands-on coding handbook containing 100 code-driven challenges, real-world bug fixes, middleware implementations, stream pipelines, and REST API patterns for Node.js and Express.

---

## 📑 Index & Practice Distribution

| Section | Range | Topics Covered |
| :--- | :--- | :--- |
| **[Part 1: Node.js Core Practical Challenges](#part-1-nodejs-core-practical-challenges-q1--q50)** | Q1 – Q50 | HTTP server, File System promises, Streams, EventEmitters, Child Processes, Buffers, Worker Threads, Compression, Timers, Error handling |
| **[Part 2: Express.js API & Middleware Challenges](#part-2-expressjs-api--middleware-challenges-q51--q100)** | Q51 – Q100 | Express routing, Middlewares, In-memory CRUD, JWT Auth, Zod validation, Rate Limiting, File Uploads, Cookies, Error Handlers, CORS |

---

# Part 1: Node.js Core Practical Challenges (Q1 – Q50)

### Q1: Create a basic HTTP server without third-party packages that returns a JSON response.
```javascript
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

### Q2: Read a text file asynchronously using `fs.promises`.
```javascript
import fs from 'fs/promises';

async function readFileContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log('File Content:\n', content);
    return content;
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}
```

---

### Q3: Write data to a file safely using `fs.promises.writeFile`.
```javascript
import fs from 'fs/promises';

async function writeToFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data, 'utf-8');
    console.log('File successfully written!');
  } catch (err) {
    console.error('Write failed:', err.message);
  }
}
```

---

### Q4: Append content to an existing log file.
```javascript
import fs from 'fs/promises';

async function logMessage(logFile, message) {
  const logEntry = `[${new Date().toISOString()}] ${message}\n`;
  await fs.appendFile(logFile, logEntry, 'utf-8');
}
```

---

### Q5: Copy a large file efficiently using Streams and `.pipe()`.
```javascript
import fs from 'fs';

function copyFileStream(source, destination) {
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream.pipe(writeStream);

  writeStream.on('finish', () => console.log('Copy completed via stream'));
  readStream.on('error', (err) => console.error('Read error:', err.message));
  writeStream.on('error', (err) => console.error('Write error:', err.message));
}
```

---

### Q6: Build a custom EventEmitter and trigger an event with payload data.
```javascript
import { EventEmitter } from 'events';

class OrderService extends EventEmitter {
  placeOrder(orderId, amount) {
    console.log(`Order ${orderId} placed for $${amount}`);
    this.emit('orderPlaced', { orderId, amount, date: new Date() });
  }
}

const orders = new OrderService();
orders.on('orderPlaced', (data) => {
  console.log('Send confirmation email to customer:', data);
});

orders.placeOrder('ORD-101', 79.99);
```

---

### Q7: Safely join path segments cross-platform using the `path` module.
```javascript
import path from 'path';

function getFilePath(directory, filename) {
  // Works identically on Windows (\) and Linux/macOS (/)
  return path.join(process.cwd(), directory, filename);
}
```

---

### Q8: Build a Transform Stream that converts input text chunks to UPPERCASE.
```javascript
import { Transform } from 'stream';

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);
```

---

### Q9: Convert a legacy callback function into a Promise with `util.promisify`.
```javascript
import fs from 'fs';
import util from 'util';

const statPromise = util.promisify(fs.stat);

async function checkFileSize(filePath) {
  const stats = await statPromise(filePath);
  console.log(`File size: ${stats.size} bytes`);
}
```

---

### Q10: Execute a shell command using `child_process.exec`.
```javascript
import { exec } from 'child_process';

exec('node -v', (err, stdout, stderr) => {
  if (err) return console.error('Execution error:', err);
  console.log('Installed Node Version:', stdout.trim());
});
```

---

### Q11: Spawn a child process with streaming output using `child_process.spawn`.
```javascript
import { spawn } from 'child_process';

const child = spawn('npm', ['--version'], { shell: true });

child.stdout.on('data', (data) => {
  console.log(`Output: ${data}`);
});

child.stderr.on('data', (err) => {
  console.error(`Error: ${err}`);
});
```

---

### Q12: Read and parse a JSON file with safe error handling.
```javascript
import fs from 'fs/promises';

async function loadJSON(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse JSON file:', err.message);
    return null;
  }
}
```

---

### Q13: Watch a file for changes using `fs.watch`.
```javascript
import fs from 'fs';

function watchConfig(file) {
  fs.watch(file, (eventType, filename) => {
    console.log(`File ${filename} triggered ${eventType} event at ${new Date().toLocaleTimeString()}`);
  });
}
```

---

### Q14: Generate a cryptographic random UUID and token.
```javascript
import crypto from 'crypto';

const uuid = crypto.randomUUID();
console.log('UUID:', uuid);

const randomToken = crypto.randomBytes(32).toString('hex');
console.log('Auth Token:', randomToken);
```

---

### Q15: Hash a password with salt using `crypto.pbkdf2`.
```javascript
import crypto from 'crypto';

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}
```

---

### Q16: Inspect current process memory usage.
```javascript
function printMemoryUsage() {
  const mem = process.memoryUsage();
  console.log({
    rss: `${(mem.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`
  });
}
```

---

### Q17: Parse command-line flags from `process.argv`.
```javascript
function getCliFlag(flagName) {
  const args = process.argv.slice(2);
  const index = args.indexOf(flagName);
  return index !== -1 ? args[index + 1] : null;
}

// Run: node script.js --port 8080
const port = getCliFlag('--port') || 3000;
console.log('Active Port:', port);
```

---

### Q18: Compress a file using Gzip with the `zlib` module.
```javascript
import fs from 'fs';
import zlib from 'zlib';

function compressFile(inputPath, outputPath) {
  const gzip = zlib.createGzip();
  const source = fs.createReadStream(inputPath);
  const destination = fs.createWriteStream(outputPath);

  source.pipe(gzip).pipe(destination);
}
```

---

### Q19: Decompress a `.gz` file using `zlib.createGunzip`.
```javascript
import fs from 'fs';
import zlib from 'zlib';

function decompressFile(inputPath, outputPath) {
  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(inputPath);
  const destination = fs.createWriteStream(outputPath);

  source.pipe(gunzip).pipe(destination);
}
```

---

### Q20: Measure exact asynchronous execution time using `performance.now()`.
```javascript
async function measureExecution(fn) {
  const start = performance.now();
  await fn();
  const duration = performance.now() - start;
  console.log(`Execution took ${duration.toFixed(2)} ms`);
}
```

---

### Q21: Read directory contents recursively to find all files.
```javascript
import fs from 'fs/promises';
import path from 'path';

async function getFilesRecursively(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getFilesRecursively(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}
```

---

### Q22: Handle errors gracefully on an EventEmitter to prevent crashes.
```javascript
import { EventEmitter } from 'events';

const emitter = new EventEmitter();

// Mandatory error listener to prevent process termination
emitter.on('error', (err) => {
  console.error('Caught EventEmitter error gracefully:', err.message);
});

emitter.emit('error', new Error('Something went wrong'));
```

---

### Q23: Run CPU-intensive calculations on a Worker Thread.
```javascript
// main.js
import { Worker } from 'worker_threads';

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

---

### Q24: Scale an HTTP server across multiple CPU cores with `cluster`.
```javascript
import cluster from 'cluster';
import http from 'http';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} running. Spawning ${numCPUs} workers...`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking replacement...`);
    cluster.fork();
  });
} else {
  http.createServer((req, res) => res.end('Handled by worker ' + process.pid)).listen(3000);
}
```

---

### Q25: Write a sleep / delay utility function.
```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function demo() {
  console.log('Start');
  await sleep(1000);
  console.log('1 second later');
}
```

---

### Q26: Wrap a Promise with a timeout limit.
```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}
```

---

### Q27: Run asynchronous tasks with concurrency limiting.
```javascript
async function mapConcurrent(items, limit, asyncFn) {
  const results = [];
  const executing = [];

  for (const item of items) {
    const p = Promise.resolve().then(() => asyncFn(item));
    results.push(p);

    if (limit <= items.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(results);
}
```

---

### Q28: Implement retry logic with exponential backoff.
```javascript
async function retryWithBackoff(fn, retries = 3, delay = 500) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    console.log(`Retrying in ${delay}ms... (${retries} attempts left)`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}
```

---

### Q29: Check if a file or directory exists using `fs.promises.access`.
```javascript
import fs from 'fs/promises';

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
```

---

### Q30: Delete a file safely.
```javascript
import fs from 'fs/promises';

async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('Failed to delete file:', err.message);
  }
}
```

---

### Q31: Create nested directories recursively.
```javascript
import fs from 'fs/promises';

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}
```

---

### Q32: Read a file line-by-line using the `readline` module.
```javascript
import fs from 'fs';
import readline from 'readline';

async function processLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
  }
}
```

---

### Q33: Download an external file using Node.js native `https`.
```javascript
import https from 'https';
import fs from 'fs';

function downloadFile(url, destPath) {
  const file = fs.createWriteStream(destPath);
  https.get(url, (res) => {
    res.pipe(file);
    file.on('finish', () => file.close());
  });
}
```

---

### Q34: Create a TCP Echo Server using the `net` module.
```javascript
import net from 'net';

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.on('data', (data) => socket.write(data)); // Echo back
});

server.listen(4000, () => console.log('TCP server listening on port 4000'));
```

---

### Q35: Convert a string to Hex, Base64, and back using `Buffer`.
```javascript
const str = "Hello Node.js";
const buf = Buffer.from(str, 'utf-8');

const base64 = buf.toString('base64');
console.log('Base64:', base64);

const original = Buffer.from(base64, 'base64').toString('utf-8');
console.log('Restored:', original);
```

---

### Q36: Concatenate multiple Buffers into one.
```javascript
const buf1 = Buffer.from('Full ');
const buf2 = Buffer.from('Stack');
const combined = Buffer.concat([buf1, buf2]);
console.log(combined.toString()); // "Full Stack"
```

---

### Q37: Catch unhandled Promise rejections and uncaught exceptions globally.
```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
});
```

---

### Q38: Pass multiple arguments through an EventEmitter.
```javascript
import { EventEmitter } from 'events';
const emitter = new EventEmitter();

emitter.on('login', (username, ip, timestamp) => {
  console.log(`User ${username} logged in from ${ip} at ${timestamp}`);
});

emitter.emit('login', 'Alex', '192.168.1.1', new Date());
```

---

### Q39: Remove an active listener from an EventEmitter.
```javascript
import { EventEmitter } from 'events';
const emitter = new EventEmitter();

function logClick() { console.log('Clicked'); }

emitter.on('click', logClick);
emitter.removeListener('click', logClick);
emitter.emit('click'); // Does nothing
```

---

### Q40: Perform a DNS lookup using `dns.promises.lookup`.
```javascript
import dns from 'dns/promises';

async function resolveDomain(domain) {
  const result = await dns.lookup(domain);
  console.log(`IP Address for ${domain}: ${result.address}`);
}
resolveDomain('google.com');
```

---

### Q41: Inspect system CPU cores and architecture.
```javascript
import os from 'os';

console.log({
  platform: os.platform(),
  arch: os.arch(),
  cores: os.cpus().length,
  freeRAM: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`
});
```

---

### Q42: Read environment variables with fallback defaults.
```javascript
function getEnv(key, defaultValue) {
  return process.env[key] !== undefined ? process.env[key] : defaultValue;
}

const PORT = Number(getEnv('PORT', 5000));
```

---

### Q43: Build a simple in-memory Pub-Sub class.
```javascript
class PubSub {
  constructor() { this.topics = {}; }

  subscribe(topic, listener) {
    if (!this.topics[topic]) this.topics[topic] = [];
    this.topics[topic].push(listener);
  }

  publish(topic, data) {
    if (this.topics[topic]) {
      this.topics[topic].forEach((fn) => fn(data));
    }
  }
}
```

---

### Q44: Send an HTTP POST request using native `https.request`.
```javascript
import https from 'https';

function postData(urlStr, data) {
  const url = new URL(urlStr);
  const payload = JSON.stringify(data);

  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => console.log('Response:', body));
  });

  req.write(payload);
  req.end();
}
```

---

### Q45: Implement a basic Throttle function.
```javascript
function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

### Q46: Implement a basic Debounce function.
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

---

### Q47: Check if a network port is available.
```javascript
import net from 'net';

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port);
  });
}
```

---

### Q48: Format bytes into a human-readable string.
```javascript
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
```

---

### Q49: Implement a Graceful Shutdown handler.
```javascript
function setupGracefulShutdown(server) {
  const shutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
      console.log('Closed all active connections. Process exiting.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
```

---

### Q50: Convert a Readable Stream to a single Buffer in memory.
```javascript
async function streamToBuffer(readableStream) {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
```

---

# Part 2: Express.js API & Middleware Challenges (Q51 – Q100)

### Q51: Minimal Express server listening on an environment-defined port.
```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API running!'));
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
```

---

### Q52: Custom request logger middleware printing method, URL, and execution time.
```javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});
```

---

### Q53: Extract and validate a numerical route parameter (`/users/:id`).
```javascript
app.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'User ID must be a positive integer' });
  }
  res.json({ userId: id });
});
```

---

### Q54: Extract and handle query parameters with default fallbacks.
```javascript
app.get('/products', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  res.json({ page, limit, search });
});
```

---

### Q55: Parse incoming JSON and return a 201 Created response.
```javascript
app.use(express.json());

app.post('/items', (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  res.status(201).json({ id: Date.now(), name, price });
});
```

---

### Q56: Global 404 handler middleware.
```javascript
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});
```

---

### Q57: Centralized global error handling middleware.
```javascript
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

---

### Q58: Complete in-memory CRUD for a "todos" resource.
```javascript
let todos = [];

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const todo = { id: Date.now(), title: req.body.title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.status(204).end();
});
```

---

### Q59: Modular Express Router (`routes/users.js`).
```javascript
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json([{ id: 1, name: 'Alex' }]));
router.get('/:id', (req, res) => res.json({ id: req.params.id }));

export default router;

// In app.js: app.use('/api/users', userRouter);
```

---

### Q60: Bearer Token Authentication Middleware.
```javascript
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

---

### Q61: Validate request body using Zod inside an Express route.
```javascript
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().email()
});

app.post('/register', (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors[0].message });
  }
  res.status(201).json({ user: result.data });
});
```

---

### Q62: Handle file uploads with Multer.
```javascript
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename, size: req.file.size });
});
```

---

### Q63: Set custom response headers.
```javascript
app.get('/custom-header', (req, res) => {
  res.set('X-Powered-By', 'ProductEngineerApp');
  res.set('Cache-Control', 'no-store');
  res.json({ message: 'Headers attached' });
});
```

---

### Q64: Send a downloadable file to the client with `res.download()`.
```javascript
import path from 'path';

app.get('/download/report', (req, res) => {
  const filePath = path.join(process.cwd(), 'reports', 'annual.pdf');
  res.download(filePath, 'Report-2026.pdf');
});
```

---

### Q65: Redirect requests with status code.
```javascript
app.get('/old-route', (req, res) => {
  res.redirect(301, '/new-route');
});
```

---

### Q66: Serve static files securely.
```javascript
import express from 'express';
import path from 'path';

app.use('/static', express.static(path.join(process.cwd(), 'public'), {
  maxAge: '1d', // Cache for 1 day
  index: false  // Disable directory indexing
}));
```

---

### Q67: Simple in-memory rate limiter middleware.
```javascript
const requestCounts = new Map();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const count = requestCounts.get(ip) || 0;

  if (count >= 100) {
    return res.status(429).json({ error: 'Too many requests. Please try later.' });
  }

  requestCounts.set(ip, count + 1);
  setTimeout(() => requestCounts.delete(ip), 60000); // 1 minute window
  next();
}
```

---

### Q68: Configure CORS with an allowed origins whitelist.
```javascript
import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  }
}));
```

---

### Q69: Hash password with bcrypt before creating user.
```javascript
import bcrypt from 'bcryptjs';

app.post('/users', async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // Store { email, password: hashedPassword } in database
  res.status(201).json({ message: 'User created securely' });
});
```

---

### Q70: Generate and verify JWT tokens.
```javascript
import jwt from 'jsonwebtoken';

const SECRET = 'my_jwt_secret';

// Sign
const token = jwt.sign({ userId: 123 }, SECRET, { expiresIn: '1h' });

// Verify
try {
  const decoded = jwt.verify(token, SECRET);
  console.log('Decoded payload:', decoded);
} catch (err) {
  console.error('Invalid token:', err.message);
}
```

---

### Q71: Pagination middleware calculating SQL offset and limit.
```javascript
function pagination(req, res, next) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
  req.pagination = { limit, offset: (page - 1) * limit, page };
  next();
}

app.get('/items', pagination, (req, res) => {
  const { limit, offset, page } = req.pagination;
  res.json({ page, limit, offset });
});
```

---

### Q72: Request timeout middleware.
```javascript
function requestTimeout(ms) {
  return (req, res, next) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({ error: 'Request timed out' });
      }
    }, ms);
    res.on('finish', () => clearTimeout(timer));
    next();
  };
}
app.use(requestTimeout(5000));
```

---

### Q73: Async error handler wrapper (`asyncHandler`).
```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage without writing try-catch in every route
app.get('/data', asyncHandler(async (req, res) => {
  const data = await Promise.reject(new Error('Database exploded'));
  res.json(data);
}));
```

---

### Q74: Health check endpoint with uptime.
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});
```

---

### Q75: Attach unique Request ID to headers.
```javascript
import crypto from 'crypto';

app.use((req, res, next) => {
  const reqId = req.headers['x-request-id'] || crypto.randomUUID();
  req.id = reqId;
  res.set('X-Request-Id', reqId);
  next();
});
```

---

### Q76: Sanitize string inputs to prevent XSS.
```javascript
function sanitize(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

---

### Q77: Read incoming cookies with `cookie-parser`.
```javascript
import cookieParser from 'cookie-parser';
app.use(cookieParser());

app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId;
  res.json({ sessionId });
});
```

---

### Q78: Set an `HttpOnly`, `Secure` cookie.
```javascript
app.post('/login', (req, res) => {
  res.cookie('token', 'jwt_val_here', {
    httpOnly: true, // Inaccessible to client JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  res.json({ message: 'Logged in' });
});
```

---

### Q79: Clear cookies upon logout.
```javascript
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});
```

---

### Q80: Nest sub-routers.
```javascript
const apiRouter = express.Router();
const v1Router = express.Router();

v1Router.get('/users', (req, res) => res.json([]));
apiRouter.use('/v1', v1Router);
app.use('/api', apiRouter); // Routes to /api/v1/users
```

---

### Q81: Role-based authorization middleware.
```javascript
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: Insufficient permissions' });
    }
    next();
  };
}

// Usage: app.delete('/admin/users', verifyToken, requireRole('admin'), deleteHandler);
```

---

### Q82: Enforce `Content-Type: application/json` on POST/PUT requests.
```javascript
function requireJson(req, res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.is('application/json')) {
      return res.status(415).json({ error: 'Content-Type must be application/json' });
    }
  }
  next();
}
```

---

### Q83: Compress HTTP responses with Gzip.
```javascript
import compression from 'compression';
app.use(compression());
```

---

### Q84: Set HTTP Cache-Control headers.
```javascript
app.get('/assets/logo.png', (req, res) => {
  res.set('Cache-Control', 'public, max-age=86400'); // 1 day
  res.sendFile(path.join(process.cwd(), 'logo.png'));
});
```

---

### Q85: Conditional middleware execution.
```javascript
const conditionally = (middleware, condition) => (req, res, next) => {
  if (condition(req)) return middleware(req, res, next);
  next();
};

// Only log requests that are NOT healthchecks
app.use(conditionally(morgan('dev'), (req) => req.url !== '/health'));
```

---

### Q86: Custom HTTP Error Class extending `Error`.
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Usage: throw new AppError('User not found', 404);
```

---

### Q87: Generate and download a dynamic CSV file.
```javascript
app.get('/export/csv', (req, res) => {
  const data = [
    ['Name', 'Score'],
    ['Alex', 95],
    ['Jordan', 88]
  ];
  const csv = data.map((row) => row.join(',')).join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="scores.csv"');
  res.send(csv);
});
```

---

### Q88: Single Page Application (SPA) fallback route.
```javascript
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'dist', 'index.html'));
});
```

---

### Q89: Call external API from Express route using `axios`.
```javascript
import axios from 'axios';

app.get('/weather', async (req, res, next) => {
  try {
    const { data } = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: { q: 'London' },
      timeout: 3000
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

---

### Q90: Measure response time with `response-time`.
```javascript
import responseTime from 'response-time';
app.use(responseTime()); // Sets X-Response-Time header
```

---

### Q91: Restrict allowed HTTP methods on an endpoint.
```javascript
app.all('/read-only', (req, res, next) => {
  if (req.method !== 'GET') {
    res.set('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  next();
});
```

---

### Q92: Dynamic image preview route.
```javascript
app.get('/images/:name', (req, res) => {
  const imagePath = path.join(process.cwd(), 'images', req.params.name);
  res.sendFile(imagePath, (err) => {
    if (err) res.status(404).json({ error: 'Image not found' });
  });
});
```

---

### Q93: Real-Time Server-Sent Events (SSE) route.
```javascript
app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date().toLocaleTimeString() })}\n\n`);
  }, 1000);

  req.on('close', () => clearInterval(interval));
});
```

---

### Q94: Webhook receiver verifying HMAC SHA-256 signature.
```javascript
import crypto from 'crypto';

function verifyWebhook(req, res, next) {
  const signature = req.headers['x-hub-signature-256'];
  const expected = 'sha256=' + crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }
  next();
}
```

---

### Q95: IP address blacklisting middleware.
```javascript
const blacklist = new Set(['192.168.1.100', '10.0.0.99']);

function blockBannedIPs(req, res, next) {
  if (blacklist.has(req.ip)) {
    return res.status(403).json({ error: 'Your IP is blacklisted.' });
  }
  next();
}
app.use(blockBannedIPs);
```

---

### Q96: Maintenance Mode middleware.
```javascript
let isUnderMaintenance = false;

function maintenanceCheck(req, res, next) {
  if (isUnderMaintenance && req.path !== '/admin/toggle-maintenance') {
    return res.status(503).json({ error: 'Site under maintenance. Back soon!' });
  }
  next();
}
app.use(maintenanceCheck);
```

---

### Q97: Validating 24-character hex ID (e.g. MongoDB ObjectId) in route params.
```javascript
const hex24Regex = /^[0-9a-fA-F]{24}$/;

app.get('/items/:id', (req, res, next) => {
  if (!hex24Regex.test(req.params.id)) {
    return res.status(400).json({ error: 'Invalid 24-character hexadecimal ID' });
  }
  next();
});
```

---

### Q98: Bulk data insertion route with transaction simulation.
```javascript
app.post('/items/bulk', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Must provide an array of items' });
  }

  // Simulate atomic transaction
  const created = items.map((item, idx) => ({ id: Date.now() + idx, ...item }));
  res.status(201).json({ count: created.length, items: created });
});
```

---

### Q99: Stream large file instead of loading into RAM.
```javascript
import fs from 'fs';

app.get('/stream-video', (req, res) => {
  const videoPath = './videos/tutorial.mp4';
  const stream = fs.createReadStream(videoPath);
  res.set('Content-Type', 'video/mp4');
  stream.pipe(res);
});
```

---

### Q100: Complete graceful shutdown for Express HTTP server.
```javascript
import express from 'express';

const app = express();
const server = app.listen(5000);

function gracefulShutdown() {
  console.log('Received kill signal, shutting down gracefully...');
  server.close(() => {
    console.log('Closed active HTTP connections');
    // Close DB / Redis pools here
    process.exit(0);
  });

  // Force shutdown if connections do not close in 10s
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
```
