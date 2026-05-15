# 🚀 Quick Start Guide - MongoDB Integration

## ⚡ Fast Setup (5 Minutes)

### 1️⃣ MongoDB Atlas Setup

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (free M0 tier)
4. Create user: Database Access → Add User
5. Whitelist IP: Network Access → Add IP → `0.0.0.0/0`
6. Get connection string: Database → Connect → Connect your application

### 2️⃣ Configure Backend

Open `backend/.env` and update:

```env
MONGO_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
COLLECTION_NAME=your_name_collection
```

### 3️⃣ Install & Run

```bash
cd mental-wellness-app/backend
npm install
npm start
```

### 4️⃣ Test in Postman

**Import Collection**: 
- Open Postman
- Import → Upload Files
- Select `Mental-Wellness-API.postman_collection.json`

**Test POST /api/add**:
```json
{
  "title": "Test Document",
  "description": "My first MongoDB document"
}
```

**Test GET /api/all**:
- Just click Send!

---

## 📸 What to Record

1. **MongoDB Atlas**: Show your cluster and collection
2. **Terminal**: Show server running
3. **Postman**: 
   - POST request adding documents
   - GET request showing all documents
4. **MongoDB Atlas**: Browse collections to show saved data

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/add` | Add new document |
| GET | `/api/all` | Get all documents |
| GET | `/api/:id` | Get single document |
| DELETE | `/api/:id` | Delete document |

---

## ✅ Success Checklist

- [ ] Server running on http://localhost:5000
- [ ] POST /api/add works (201 response)
- [ ] GET /api/all shows documents
- [ ] Documents visible in MongoDB Atlas
- [ ] Screen recorded

---

## 🆘 Need Help?

**Common Issues**:

1. **"bad auth"** → Check username/password in `.env`
2. **"ETIMEDOUT"** → Whitelist 0.0.0.0/0 in Network Access
3. **"Port in use"** → Change PORT in `.env` to 5001

**Still stuck?** Check the full README.md for detailed troubleshooting.
