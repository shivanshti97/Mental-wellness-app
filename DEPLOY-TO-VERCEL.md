# 🚀 Deploy to Vercel — Step by Step

## Overview
We deploy TWO separate projects to Vercel:
1. **Frontend** (React app) → `mental-wellness-app/`
2. **Backend** (Express API) → `mental-wellness-app/backend/`

---

## PART 1: Push Code to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click **"New repository"** (green button, top right)
3. Repository name: `mental-wellness-app`
4. Set to **Public** or **Private**
5. Click **"Create repository"**

### Step 2: Push Frontend to GitHub

Open terminal in `mental-wellness-app/` folder:

```bash
git init
git add .
git commit -m "Initial commit - Mental Wellness App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mental-wellness-app.git
git push -u origin main
```

### Step 3: Push Backend to GitHub

Create a **separate** GitHub repo for backend:

1. Go to https://github.com → New repository
2. Name: `mental-wellness-backend`
3. Click **"Create repository"**

Open terminal in `mental-wellness-app/backend/` folder:

```bash
git init
git add .
git commit -m "Initial commit - Backend API"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mental-wellness-backend.git
git push -u origin main
```

---

## PART 2: Deploy Backend to Vercel

### Step 1: Go to Vercel

1. Go to https://vercel.com
2. Sign up / Log in with GitHub

### Step 2: Import Backend Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your `mental-wellness-backend` repo
4. Click **"Import"**

### Step 3: Configure Backend Settings

In the configuration screen:

- **Framework Preset**: Other
- **Root Directory**: `./` (leave as is)
- **Build Command**: leave empty
- **Output Directory**: leave empty
- **Install Command**: `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `MONGO_URL` | `mongodb+srv://shivanshti97_db_user:9lCx3jJMlzvEw0ch@cluster-shiv.gi33ucr.mongodb.net/?appName=Cluster-Shiv` |
| `COLLECTION_NAME` | `shivansh_collection` |
| `PORT` | `5000` |

### Step 5: Deploy Backend

Click **"Deploy"** and wait ~1 minute.

You'll get a URL like: `https://mental-wellness-backend.vercel.app`

**Test it**: Open `https://mental-wellness-backend.vercel.app/api/all` in browser — you should see JSON!

---

## PART 3: Deploy Frontend to Vercel

### Step 1: Update API URL in Frontend

Before deploying frontend, update the API base URL.

Create file `mental-wellness-app/.env.production`:
```env
VITE_API_URL=https://mental-wellness-backend.vercel.app
```

### Step 2: Import Frontend Project

1. Go to https://vercel.com → **"Add New..."** → **"Project"**
2. Import your `mental-wellness-app` repo
3. Click **"Import"**

### Step 3: Configure Frontend Settings

- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables (Frontend)

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://mental-wellness-backend.vercel.app` |

### Step 5: Deploy Frontend

Click **"Deploy"** and wait ~2 minutes.

You'll get a URL like: `https://mental-wellness-app.vercel.app`

---

## PART 4: Test Your Live App

1. Open your frontend URL: `https://mental-wellness-app.vercel.app`
2. Test all pages work
3. Test API: `https://mental-wellness-backend.vercel.app/api/all`

---

## 🔄 Redeploy After Changes

Whenever you push to GitHub, Vercel auto-deploys!

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel will automatically rebuild and redeploy.

---

## 🐛 Common Issues

### "Page not found" on refresh
- Already fixed! `vercel.json` has the rewrite rule for React Router.

### API not connecting
- Check `VITE_API_URL` env variable in Vercel frontend settings
- Make sure backend is deployed and working

### Build fails
- Check the build logs in Vercel dashboard
- Make sure `npm run build` works locally first

### MongoDB connection fails
- Check `MONGO_URL` in Vercel backend environment variables
- Make sure MongoDB Atlas has `0.0.0.0/0` in Network Access

---

## ✅ Deployment Checklist

### Backend:
- [ ] GitHub repo created for backend
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `MONGO_URL` env variable added
- [ ] `COLLECTION_NAME` env variable added
- [ ] Backend deployed successfully
- [ ] Test: `https://your-backend.vercel.app/api/all` returns JSON

### Frontend:
- [ ] GitHub repo created for frontend
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `VITE_API_URL` env variable added
- [ ] Frontend deployed successfully
- [ ] Test: App loads at `https://your-app.vercel.app`

---

## 🎉 Done!

Your app is now live on the internet! Share the URL with anyone.

**Frontend**: `https://mental-wellness-app.vercel.app`
**Backend API**: `https://mental-wellness-backend.vercel.app`
