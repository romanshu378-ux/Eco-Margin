# EcoMargin — Installation Guide

## Prerequisites

Ensure the following are installed on your machine:

| Tool        | Minimum Version | Download                              |
|-------------|-----------------|---------------------------------------|
| Node.js     | 18.0.0          | https://nodejs.org                    |
| npm         | 9.0.0           | Bundled with Node.js                  |
| MySQL       | 8.0             | https://dev.mysql.com/downloads/      |
| Git         | 2.40+           | https://git-scm.com                   |

Verify installations:
```bash
node --version    # v18.x.x or higher
npm --version     # 9.x.x or higher
mysql --version   # 8.x.x
git --version
```

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/your-org/ecomargin.git
cd ecomargin/EcoMargin
```

---

## Step 2 — Install All Dependencies

```bash
# Install root + all workspace dependencies
npm run install:all

# Or install each manually:
cd frontend     && npm install && cd ..
cd backend      && npm install && cd ..
cd admin-panel  && npm install && cd ..
```

---

## Step 3 — Configure Environment Variables

### Frontend
```bash
cp frontend/.env.example frontend/.env
```
Edit `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=EcoMargin
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### Backend
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecomargin_db
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_32char_minimum_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
RAZORPAY_KEY_ID=rzp_test_your_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Admin Panel
```bash
cp admin-panel/.env.example admin-panel/.env
```
Edit `admin-panel/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=EcoMargin Admin
```

---

## Step 4 — Setup MySQL Database

### 4.1 Start MySQL Service
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### 4.2 Create Database & Tables
```bash
# Connect to MySQL
mysql -u root -p

# Run schema
mysql -u root -p < database/schema.sql

# Verify tables
mysql -u root -p -e "USE ecomargin_db; SHOW TABLES;"
```

### 4.3 Seed Sample Data (Development Only)
```bash
mysql -u root -p ecomargin_db < database/seed.sql
```

> ⚠️ **Important:** The seed file contains placeholder bcrypt hashes. Generate real hashes before use:
> ```javascript
> const bcrypt = require('bcryptjs')
> console.log(await bcrypt.hash('Admin@123', 12))
> ```

---

## Step 5 — Start Development Servers

### Option A: Start All Services (Recommended)
```bash
# From the EcoMargin root
npm run dev
```

This starts:
- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:5000
- **Admin Panel** → http://localhost:3001

### Option B: Start Individually
```bash
# Terminal 1 — Backend
npm run dev:backend

# Terminal 2 — Frontend
npm run dev:frontend

# Terminal 3 — Admin Panel
npm run dev:admin
```

---

## Step 6 — Verify Installation

### Backend Health Check
```bash
curl http://localhost:5000/api/v1/health
```
Expected response:
```json
{
  "success": true,
  "message": "EcoMargin API is healthy ⚡",
  "uptime": 12.345
}
```

### Frontend
Open http://localhost:3000 in your browser.

### Admin Panel
Open http://localhost:3001 in your browser.

---

## Step 7 — Run Tests

```bash
# Backend unit tests
npm run test

# Watch mode
cd backend && npm run test:watch
```

---

## Common Issues & Fixes

### ❌ MySQL Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Fix:** Ensure MySQL is running. Check credentials in `backend/.env`.

### ❌ CORS Error in Browser
**Fix:** Ensure `ALLOWED_ORIGINS` in `backend/.env` includes your frontend URL.

### ❌ JWT Secret Too Short
**Fix:** `JWT_SECRET` must be at least 32 characters.

### ❌ Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill
```

---

## Production Build

```bash
# Build frontend and admin
npm run build

# Frontend dist at: frontend/dist/
# Admin dist at:    admin-panel/dist/
```

---

## Useful Commands

```bash
# Lint frontend code
npm run lint

# Format with Prettier
cd frontend && npm run format

# Clean all node_modules and dist
npm run clean
```

---

## Default Credentials (Seed Data)

> ⚠️ Change these immediately in any non-development environment!

| Role     | Email                    | Password    |
|----------|--------------------------|-------------|
| Admin    | admin2026@ecomargin.in   | Ecomargin@2024 |
| Operator | operator@ecomargin.com   | Admin@123   |
| User     | user@ecomargin.com       | Admin@123   |

---

## Next Steps

Once installation is complete:

1. ✅ All services running
2. ✅ Database connected and seeded
3. ✅ Environment variables configured
4. 🔜 Phase 2: Implement all page components
5. 🔜 Phase 3: Connect frontend to backend APIs
6. 🔜 Phase 4: Payment gateway integration
7. 🔜 Phase 5: Production deployment

---

*EcoMargin Installation Guide v1.0.0*
