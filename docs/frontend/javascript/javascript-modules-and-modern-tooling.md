# JavaScript Modules (ESM), NPM & Modern Tooling

> Organizing scalable codebases with ES Modules (`import`/`export`), package management with NPM, `package.json`, and modern Vite toolchains.

---

## 1. ES Modules (ESM): `export` and `import`

Modern JavaScript projects structure code into separate, maintainable files using official ES Modules:

```javascript
// 1. mathUtilities.js (Exports)
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

// Default export (Only one per file)
export default function multiply(a, b) {
  return a * b;
}
```

```javascript
// 2. main.js (Imports)
import multiply, { PI, add } from "./mathUtilities.js";

console.log("PI constant:", PI);
console.log("Sum:", add(10, 20));
console.log("Product:", multiply(5, 6));
```

---

## 2. NPM and `package.json`

```json
{
  "name": "product-engineer-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

### Essential Terminal Commands:
* `npm init -y` : Initializes a new project with a default `package.json`.
* `npm install <pkg>` : Installs a package (e.g. `npm install react`).
* `npm run dev` : Starts the development server.

---

## 3. Ready to Build React & Node.js Applications!

With these 13 chapters completed, you possess the exact real-world foundations required for modern React components, Hook state mechanics, DOM interactivity, and Node.js backend systems!
