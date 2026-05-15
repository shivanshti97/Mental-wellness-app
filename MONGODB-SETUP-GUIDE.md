# 🎯 Complete MongoDB Atlas Setup Guide

## ✅ What I've Created For You

I've set up a complete Node.js + Express + MongoDB backend in the `backend/` folder with:

- ✅ Express server with CORS enabled
- ✅ Mongoose models and schemas
- ✅ API routes for POST /api/add and GET /api/all
- ✅ Environment configuration
- ✅ Postman collection for testing
- ✅ Complete documentation

---

## 📋 Step-by-Step Instructions

### STEP 1: Create MongoDB Atlas Account (5 minutes)

1. **Go to MongoDB Atlas**:
   - Open: https://www.mongodb.com/cloud/atlas
   - Click "Try Free" or "Sign Up"

2. **Sign Up**:
   - Use your email or Google account
   - Complete the registration

3. **Create a Cluster**:
   - Choose "Build a Database"
   - Select **FREE** M0 tier (Shared)
   - Choose AWS or Google Cloud
   - Select a region close to you (e.g., Mumbai for India)
   - Cluster Name: Keep default or name it "Cluster0"
   - Click "Create Cluster" (takes 3-5 minutes)

---

### STEP 2: Configure Database Access

1. **Create Database User**:
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Authentication Method: **Password**
   - Username: `your_username` (e.g., `khushi`, `admin`)
   - Password: Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT**: Copy and save this password!
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

---

### STEP 3: Configure Network Access

1. **Whitelist IP Address**:
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - IP Address will be: `0.0.0.0/0`
   - Description: "Allow all IPs"
   - Click "Confirm"
   - Wait for status to become "Active" (green)

---

### STEP 4: Get Connection String

1. **Get Your Connection String**:
   - Click "Database" in left sidebar
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Version: 5.5 or later
   - Copy the connection string

   It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

2. **Modify the Connection String**:
   - Replace `<username>` with your actual username
   - Replace `<password>` with your actual password
   - Keep everything else the same

   Example:
   ```
   mongodb+srv://khushi:MyPassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

---

### STEP 5: Configure Your Backend

1. **Open the `.env` file**:
   - Location: `mental-wellness-app/backend/.env`

2. **Update the file**:
   ```env
   # Replace this with your actual connection string
   MONGO_URL=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

   # Server port
   PORT=5000

   # Change this to your name (e.g., khushi_collection, john_collection)
   COLLECTION_NAME=khushi_collection
   ```

3. **Save the file**

---

### STEP 6: Install Dependencies

1. **Open Terminal/Command Prompt**

2. **Navigate to backend folder**:
   ```bash
   cd mental-wellness-app/backend
   ```

3. **Install packages**:
   ```bash
   npm install
   ```

   This installs:
   - express (web framework)
   - mongoose (MongoDB driver)
   - dotenv (environment variables)
   - cors (enable CORS)

---

### STEP 7: Start the Server

1. **Run the server**:
   ```bash
   npm start
   ```

2. **You should see**:
   ```
   ✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
   📦 Database: test
   🚀 Server is running on http://localhost:5000
   📦 Collection name: khushi_collection

   📝 API Endpoints:
      POST   http://localhost:5000/api/add
      GET    http://localhost:5000/api/all
      GET    http://localhost:5000/api/:id
      DELETE http://localhost:5000/api/:id

   ✨ Ready to test in Postman!
   ```

3. **If you see errors**:
   - Check your connection string in `.env`
   - Make sure username and password are correct
   - Make sure you whitelisted 0.0.0.0/0

---

### STEP 8: Test with Postman

#### Option A: Import Postman Collection (Recommended)

1. **Open Postman**
2. **Import Collection**:
   - Click "Import" button
   - Click "Upload Files"
   - Select: `mental-wellness-app/backend/Mental-Wellness-API.postman_collection.json`
   - Click "Import"

3. **You'll see 5 requests**:
   - Add Document
   - Get All Documents
   - Get Document by ID
   - Delete Document
   - Server Info

#### Option B: Manual Testing

**Test 1: POST /api/add**

1. Create new request in Postman
2. Method: **POST**
3. URL: `http://localhost:5000/api/add`
4. Headers:
   - Key: `Content-Type`
   - Value: `application/json`
5. Body → raw → JSON:
   ```json
   {
     "title": "My First Document",
     "description": "This is a test document for my MongoDB collection"
   }
   ```
6. Click **Send**

**Expected Response** (Status 201):
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

**Test 2: GET /api/all**

1. Create new request
2. Method: **GET**
3. URL: `http://localhost:5000/api/all`
4. Click **Send**

**Expected Response** (Status 200):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a5b1c2d3e4f5g6h7i8j9k0",
      "title": "My First Document",
      "description": "This is a test document for my MongoDB collection",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### STEP 9: Verify in MongoDB Atlas

1. **Go back to MongoDB Atlas**
2. **Click "Database" in sidebar**
3. **Click "Browse Collections"**
4. **You should see**:
   - Database: `test`
   - Collection: `khushi_collection` (or your name)
   - Documents: The documents you added via Postman

---

### STEP 10: Record Your Screen

**What to show in your recording**:

1. **MongoDB Atlas Dashboard** (30 seconds):
   - Show your cluster is running
   - Show Database Access (your user)
   - Show Network Access (0.0.0.0/0)

2. **VS Code** (30 seconds):
   - Show backend folder structure
   - Show `.env` file (blur the password!)
   - Show terminal with server running

3. **Postman Testing** (2 minutes):
   - Test POST /api/add
   - Add 2-3 different documents
   - Show successful responses
   - Test GET /api/all
   - Show all documents returned

4. **MongoDB Atlas Collections** (30 seconds):
   - Browse Collections
   - Show your collection name
   - Show the documents you added
   - Click on a document to show details

**Recording Tools**:
- Windows: Xbox Game Bar (Win + G) or OBS Studio
- Mac: QuickTime or Screen Recording (Cmd + Shift + 5)
- Online: Loom (https://www.loom.com)

---

## 🎯 API Endpoints Summary

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/add` | Add new document | `{ "title": "...", "description": "..." }` |
| GET | `/api/all` | Get all documents | None |
| GET | `/api/:id` | Get single document | None |
| DELETE | `/api/:id` | Delete document | None |

---

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
**Problem**: Wrong username or password  
**Solution**: 
- Check your `.env` file
- Make sure you replaced `<username>` and `<password>`
- Password should NOT have `<` or `>` symbols

### Error: "connect ETIMEDOUT"
**Problem**: IP not whitelisted  
**Solution**:
- Go to Network Access in MongoDB Atlas
- Make sure 0.0.0.0/0 is added
- Status should be "Active" (green)

### Error: "Cannot find module 'express'"
**Problem**: Dependencies not installed  
**Solution**:
```bash
cd mental-wellness-app/backend
npm install
```

### Error: "Port 5000 is already in use"
**Problem**: Another app is using port 5000  
**Solution**:
- Change PORT in `.env` to 5001
- Or stop the other app

### Server starts but can't connect to MongoDB
**Problem**: Wrong connection string  
**Solution**:
- Go to MongoDB Atlas → Database → Connect
- Get a fresh connection string
- Make sure to replace username and password
- No spaces in the connection string

---

## ✅ Success Checklist

Before recording, make sure:

- [ ] MongoDB Atlas cluster is running
- [ ] Database user created
- [ ] IP 0.0.0.0/0 whitelisted
- [ ] Connection string copied and updated in `.env`
- [ ] Collection name changed to your name
- [ ] `npm install` completed successfully
- [ ] Server starts without errors
- [ ] POST /api/add works (201 response)
- [ ] GET /api/all returns documents
- [ ] Documents visible in MongoDB Atlas
- [ ] Postman collection imported (optional)

---

## 📁 Project Structure

```
mental-wellness-app/
├── backend/
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── models/
│   │   └── PersonalModel.js         # Mongoose schema
│   ├── routes/
│   │   └── personalRoutes.js        # API routes
│   ├── .env                         # YOUR CREDENTIALS (don't share!)
│   ├── .env.example                 # Example file
│   ├── package.json                 # Dependencies
│   ├── server.js                    # Main server
│   ├── README.md                    # Detailed docs
│   ├── QUICK-START.md               # Quick reference
│   └── Mental-Wellness-API.postman_collection.json  # Postman tests
└── MONGODB-SETUP-GUIDE.md           # This file
```

---

## 🎉 You're Done!

If you can:
1. ✅ Start the server without errors
2. ✅ Add documents via Postman
3. ✅ See documents in MongoDB Atlas

**Congratulations! You've successfully integrated MongoDB with your app!** 🚀

---

## 📚 Next Steps

After completing this task, you can:

1. **Connect to Frontend**: Use fetch/axios to call these APIs from React
2. **Add Authentication**: Implement JWT tokens
3. **Add More Collections**: 
   - Mood logs
   - Counselor data
   - User profiles
4. **Deploy**: Deploy to Heroku, Render, or Railway

---

## 🆘 Need Help?

If you're stuck:
1. Check the troubleshooting section above
2. Read the detailed README.md in backend folder
3. Check MongoDB Atlas documentation
4. Ask your instructor or classmates

**Good luck! 🍀**
