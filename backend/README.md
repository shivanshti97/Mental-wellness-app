# Mental Wellness App - MongoDB Backend API

## 🎯 Task Overview
Create a Node.js + Express + MongoDB backend with your personal collection.

---

## 📋 Step-by-Step Setup Guide

### Step 1: MongoDB Atlas Setup (Do First!)

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Sign up** for the free tier
3. **Create a cluster**:
   - Choose AWS or Google Cloud
   - Select the free M0 tier
   - Choose a region close to you
   - Click "Create Cluster"

4. **Create Database User**:
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `your_username`
   - Password: `your_password` (save this!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist IP Address**:
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"

6. **Get Connection String**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

---

### Step 2: Configure Your Backend

1. **Open the `.env` file** in the `backend` folder

2. **Replace the connection string**:
   ```env
   MONGO_URL=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   
   Replace:
   - `your_username` with your MongoDB username
   - `your_password` with your MongoDB password
   - `cluster0.xxxxx` with your actual cluster URL

3. **Change the collection name** to your name:
   ```env
   COLLECTION_NAME=khushi_collection
   ```
   Replace `khushi_collection` with your name (e.g., `john_collection`, `sarah_collection`)

---

### Step 3: Install Dependencies

Open terminal in the `backend` folder and run:

```bash
cd mental-wellness-app/backend
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Enable CORS for frontend

---

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📦 Database: test
🚀 Server is running on http://localhost:5000
📦 Collection name: khushi_collection
```

---

## 🧪 Testing with Postman

### 1. POST /api/add - Add a New Document

**URL**: `http://localhost:5000/api/add`  
**Method**: `POST`  
**Headers**: 
- `Content-Type: application/json`

**Body** (raw JSON):
```json
{
  "title": "My First Document",
  "description": "This is a test document for my MongoDB collection"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Document added successfully",
  "data": {
    "title": "My First Document",
    "description": "This is a test document for my MongoDB collection",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "_id": "65a5b1c2d3e4f5g6h7i8j9k0"
  }
}
```

---

### 2. GET /api/all - Fetch All Documents

**URL**: `http://localhost:5000/api/all`  
**Method**: `GET`

**Expected Response**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a5b1c2d3e4f5g6h7i8j9k0",
      "title": "My First Document",
      "description": "This is a test document",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a5b1c2d3e4f5g6h7i8j9k1",
      "title": "Second Document",
      "description": "Another test document",
      "createdAt": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

---

### 3. GET /api/:id - Get Single Document (Bonus)

**URL**: `http://localhost:5000/api/65a5b1c2d3e4f5g6h7i8j9k0`  
**Method**: `GET`

Replace the ID with an actual document ID from your database.

---

### 4. DELETE /api/:id - Delete Document (Bonus)

**URL**: `http://localhost:5000/api/65a5b1c2d3e4f5g6h7i8j9k0`  
**Method**: `DELETE`

---

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   └── PersonalModel.js     # Mongoose schema
├── routes/
│   └── personalRoutes.js    # API routes
├── .env                     # Environment variables (YOUR CREDENTIALS)
├── .env.example             # Example environment file
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

---

## 🎥 Recording Your Screen

### What to Show:

1. **MongoDB Atlas Dashboard**:
   - Show your cluster
   - Show your database and collection

2. **VS Code**:
   - Show your `.env` file (blur password!)
   - Show your `server.js` running in terminal

3. **Postman**:
   - Test POST /api/add (add 2-3 documents)
   - Test GET /api/all (show all documents)
   - Show the response JSON

4. **MongoDB Atlas**:
   - Go back to Atlas
   - Browse Collections
   - Show your collection with the documents you added

### Recording Tools:
- **Windows**: Xbox Game Bar (Win + G) or OBS Studio
- **Mac**: QuickTime or Screen Recording (Cmd + Shift + 5)
- **Chrome Extension**: Loom

---

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
- Check your username and password in `.env`
- Make sure you replaced `<username>` and `<password>` in the connection string

### Error: "connect ETIMEDOUT"
- Check if you whitelisted `0.0.0.0/0` in Network Access
- Check your internet connection

### Error: "Cannot find module"
- Run `npm install` in the backend folder

### Port 5000 already in use
- Change PORT in `.env` to 5001 or another port
- Or stop the process using port 5000

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (free tier)
- [ ] Database user created
- [ ] IP whitelisted (0.0.0.0/0)
- [ ] Connection string copied
- [ ] `.env` file configured with your credentials
- [ ] Collection name changed to your name
- [ ] Dependencies installed (`npm install`)
- [ ] Server started successfully
- [ ] POST /api/add tested in Postman
- [ ] GET /api/all tested in Postman
- [ ] Documents visible in MongoDB Atlas
- [ ] Screen recorded and shared

---

## 🎉 Success!

If you can see your documents in both Postman and MongoDB Atlas, you're done! 🚀

**Next Steps**:
- Connect this backend to your React frontend
- Add authentication
- Add more collections for mood logs, counselor data, etc.
