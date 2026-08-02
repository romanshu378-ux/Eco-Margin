# EcoMargin — Production Deployment Guide

This guide details the complete process for deploying the EcoMargin Enterprise EV Charging Management System to production.

---

## Architecture Overview

```
Frontend SPA (Vite/React)    ──> Vercel  (https://ecomargin.vercel.app)
Admin Panel (Vite/React)     ──> Vercel  (https://ecomargin-admin.vercel.app)
Backend REST API (Express)   ──> Render  (https://ecomargin-api.onrender.com)
Database (MySQL 8.0)         ──> PlanetScale / Railway / Render Managed MySQL
```

---

## 1. Database Deployment (MySQL)

### Option A: PlanetScale (Recommended)
1. Log in to [PlanetScale](https://planetscale.com).
2. Click **Create Database** → Name: `ecomargin_db` → Region: AWS Singapore (or closest).
3. Under **Connect**, generate a new connection string.
4. Execute schema & seed scripts:
   ```bash
   mysql -h <host> -u <username> -p < database/schema.sql
   mysql -h <host> -u <username> -p < database/seed.sql
   ```

### Option B: Railway / Managed MySQL
1. Create a MySQL service at [Railway](https://railway.app).
2. Copy `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, `MYSQLPORT`.
3. Connect and run `database/schema.sql` and `database/seed.sql`.

---

## 2. Backend Deployment → Render

1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** → **Blueprint** → Connect your `EcoMargin` GitHub repository.
3. Select `backend/render.yaml`. Render will automatically create the `ecomargin-api` web service.
4. Alternatively, create a **New Web Service**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```env
     NODE_ENV=production
     PORT=10000
     DB_HOST=<your-mysql-host>
     DB_USER=<your-mysql-user>
     DB_PASS=<your-mysql-password>
     DB_NAME=ecomargin_db
     JWT_SECRET=<strong-random-32-char-secret>
     JWT_EXPIRATION=24h
     ALLOWED_ORIGINS=https://ecomargin.vercel.app,https://ecomargin-admin.vercel.app
     ```

---

## 3. Frontend Deployment → Vercel

1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** → Import `EcoMargin` repository.
3. Select Framework Preset: **Vite**.
4. Set **Root Directory**: `frontend`.
5. Configure Environment Variables:
   ```env
   VITE_API_BASE_URL=https://ecomargin-api.onrender.com/api/v1
   VITE_API_TIMEOUT=30000
   VITE_APP_NAME=EcoMargin
   VITE_APP_ENV=production
   ```
6. Click **Deploy**. Vercel will process `vercel.json` and generate the production URL.

---

## 4. Admin Panel Deployment → Vercel

1. Click **Add New Project** in Vercel again → Import `EcoMargin` repository.
2. Select Framework Preset: **Vite**.
3. Set **Root Directory**: `admin-panel`.
4. Configure Environment Variables:
   ```env
   VITE_API_BASE_URL=https://ecomargin-api.onrender.com/api/v1
   VITE_APP_NAME="EcoMargin Admin Panel"
   VITE_APP_ENV=production
   ```
5. Click **Deploy**.

---

## 5. Custom Domain & DNS Setup

If using custom domains (e.g. `ecomargin.com`):

| Subdomain | Target Platform | DNS Record Type | Target Value |
| :--- | :--- | :--- | :--- |
| `ecomargin.com` | Vercel (Frontend) | `A` | `76.76.21.21` |
| `admin.ecomargin.com` | Vercel (Admin) | `CNAME` | `cname.vercel-dns.com` |
| `api.ecomargin.com` | Render (Backend) | `CNAME` | `ecomargin-api.onrender.com` |

---

## 6. SEO & Performance Verification

- **Robots.txt**: Accessible at `https://ecomargin.vercel.app/robots.txt`
- **Sitemap**: Accessible at `https://ecomargin.vercel.app/sitemap.xml`
- **OpenGraph & Favicon**: Configured in `frontend/index.html`
- **Caching Headers**: Managed automatically via `vercel.json` asset rules
