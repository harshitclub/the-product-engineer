---
title: "05. Full-Stack Run & Verification"
description: "Start backend and frontend servers concurrently, test the end-to-end user experience, and troubleshoot common full-stack development issues."
---

# 05. Full-Stack Run & Verification 🚀

Congratulations! You have written all the frontend code. In this final chapter, we will run both the **Express Backend** and the **Next.js Frontend** together and test the full user journey from end to end.

---

## 1. Starting the Entire Stack (Step-by-Step)

You will need **two terminal windows**:

### Terminal 1: Start Database & Backend API
```bash
# 1. Navigate to backend directory
cd backend

# 2. Start PostgreSQL & Redis in Docker
docker compose up -d

# 3. Start Express server (runs on port 5000)
npm run dev
```

You should see:
```text
✅ Redis connected!
✅ PostgreSQL connected successfully!
✅ Database tables synchronized!
🚀 Server running on http://localhost:5000
```

---

### Terminal 2: Start Next.js Frontend
```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install frontend dependencies (if not done yet)
npm install

# 3. Start Next.js development server (runs on port 3000)
npm run dev
```

You should see:
```text
  ▲ Next.js 16.3.6
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 1200ms
```

---

## 2. Interactive Testing Checklist

Open your browser and navigate to:
```text
http://localhost:3000
```

### 1. Verify Backend Connection
Look at the top right of the navbar. You should see a green dot with the text:  
**`🟢 API Connected`**

---

### 2. Create a Shortened Link
In the **Create Short Link** form:
- **Destination URL**: `https://github.com/harshitclub/the-product-engineer`
- **Title**: `Product Engineer Handbook`
- **Custom Alias**: `handbook`
- Click **Shorten URL**.

**Result:**
- A floating toast notification appears: `"Short link created successfully!"`
- The total links count increments from `0` to `1`.
- The new link card appears at the top of the list showing `localhost:5000/handbook`.

---

### 3. Test One-Click Copy
Click the **Copy** button on the link card.
- Button changes to `✓ Copied`.
- Toast confirms `"Copied to clipboard!"`.

---

### 4. Test Redirection & Background Tracking
Open a new browser tab and visit:
```text
http://localhost:5000/handbook
```

**Result:**
- You are instantly redirected to `https://github.com/harshitclub/the-product-engineer`.
- In Terminal 1 (Backend), BullMQ logs:
```text
📊 Click saved in database for Link ID: 1
```

---

### 5. Inspect Real-Time Analytics Modal
Switch back to the dashboard tab at `http://localhost:3000` and click the **Analytics** button on the link card.

**Result:**
- The modal opens displaying:
  - **Total Clicks**: `1`
  - **Top Browser**: `Chrome` (or your active browser)
  - **Top OS**: `Windows` (or macOS / Linux)
  - **Referrer Sources**: `Direct`
  - **Recent Clicks Table** showing the exact timestamp.

---

### 6. Test Light & Dark Theme Toggle
Click the **🌙 / ☀️** button in the top navbar.
- The entire dashboard smoothly toggles between minimalist dark mode and crisp light mode.

---

### 7. Test Instant Search Filtering
Type `handbook` into the **Search links...** input box. The list dynamically filters matching items in real time.

---

### 8. Test Link Deletion
Click the **Delete** button. A browser confirmation popup appears:
- Click **OK**.
- The link is removed from PostgreSQL and invalidated in Redis cache.
- The link card disappears from the UI immediately.

---

## 3. Common Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **`🔴 API Offline` in Navbar** | Express backend server is not running | Make sure Terminal 1 is running `npm run dev` in `backend/` on port 5000. |
| **CORS Error in Browser Console** | Backend is blocking requests from port 3000 | Verify that `backend/src/server.js` includes `import cors from 'cors';` and `app.use(cors());`. |
| **Port 3000 in use** | Another Next.js app is open | Next.js will ask to run on `3001` or you can terminate the other process. |
| **Styling looks unstyled** | CSS file not imported | Ensure `app/layout.js` contains `import "./globals.css";`. |

---

## 🎓 Master Full-Stack Architecture Achieved!

You have created a complete, modern, production-grade web platform:
- **Next.js 16 & React 19 Frontend**: Component architecture, custom CSS design system, clipboard integration, real-time analytics aggregation, and theme switching.
- **Node.js & Express Backend**: In-memory Redis Cache-Aside, BullMQ background queues, PostgreSQL database with Sequelize, Zod schema validation, and rate limiting.

✨ *You are now ready to showcase LinkPulse in your portfolio and engineering interviews!*
