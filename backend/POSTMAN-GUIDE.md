# 🧪 Postman Testing Guide - Step by Step

## ⚠️ IMPORTANT: You're Getting an Error Because...

You're using **GET** method on `/api/add` but it should be **POST** method!

The error `"Cast to ObjectId failed for value \"add\""` means the server is treating "add" as an ID because you used GET instead of POST.

---

## ✅ CORRECT WAY - Test 1: Add Document (POST)

### Step-by-Step in Postman:

1. **Click "New" → "HTTP Request"**

2. **Set the METHOD to POST**
   ```
   [POST ▼]  http://localhost:5000/api/add
   ```
   ⚠️ Make sure it says **POST** not GET!

3. **Add Headers**:
   - Click the "Headers" tab
   - Add:
     - Key: `Content-Type`
     - Value: `application/json`

4. **Add Body**:
   - Click the "Body" tab
   - Select **"raw"**
   - Select **"JSON"** from the dropdown (right side)
   - Paste this:
   ```json
   {
     "title": "My First Document",
     "description": "Testing MongoDB integration"
   }
   ```

5. **Click "Send"**

### ✅ Expected Response (Status: 201 Created):
```json
{
  "success": true,
  "message": "Document added successfully",
  "data": {
    "_id": "65a5b1c2d3e4f5g6h7i8j9k0",
    "title": "My First Document",
    "description": "Testing MongoDB integration",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## ✅ CORRECT WAY - Test 2: Get All Documents (GET)

### Step-by-Step in Postman:

1. **Click "New" → "HTTP Request"**

2. **Set the METHOD to GET**
   ```
   [GET ▼]  http://localhost:5000/api/all
   ```
   ⚠️ URL is `/api/all` NOT `/api/add`!

3. **No Headers or Body needed**

4. **Click "Send"**

### ✅ Expected Response (Status: 200 OK):
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a5b1c2d3e4f5g6h7i8j9k0",
      "title": "My First Document",
      "description": "Testing MongoDB integration",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## 🎯 Quick Reference Table

| Action | Method | URL | Body Required? |
|--------|--------|-----|----------------|
| **Add document** | **POST** | `/api/add` | ✅ Yes (JSON) |
| **Get all documents** | **GET** | `/api/all` | ❌ No |
| Get one document | GET | `/api/:id` | ❌ No |
| Delete document | DELETE | `/api/:id` | ❌ No |

---

## 🔴 Common Mistakes:

### ❌ WRONG:
```
GET http://localhost:5000/api/add
```
**Error**: "Cast to ObjectId failed for value \"add\""

### ✅ CORRECT:
```
POST http://localhost:5000/api/add
Body: { "title": "...", "description": "..." }
```

---

### ❌ WRONG:
```
GET http://localhost:5000/api/add
```
**Why it fails**: The server thinks "add" is an ID for the GET /:id route

### ✅ CORRECT:
```
GET http://localhost:5000/api/all
```

---

## 📦 Import Postman Collection (Easiest Way!)

Instead of creating requests manually:

1. Open Postman
2. Click **"Import"** (top left)
3. Click **"Upload Files"**
4. Select: `Mental-Wellness-API.postman_collection.json`
5. Click **"Import"**

You'll get all requests pre-configured with:
- ✅ Correct methods (POST, GET, DELETE)
- ✅ Correct URLs
- ✅ Correct headers
- ✅ Sample body data

---

## 🎥 For Your Screen Recording:

### Show These 4 Things:

1. **Postman - POST /api/add**
   - Show method is **POST**
   - Show URL: `http://localhost:5000/api/add`
   - Show Body tab with JSON
   - Click Send
   - Show successful response (201)
   - **Add 2-3 different documents**

2. **Postman - GET /api/all**
   - Show method is **GET**
   - Show URL: `http://localhost:5000/api/all`
   - Click Send
   - Show all documents returned (200)

3. **MongoDB Atlas**
   - Go to Database → Browse Collections
   - Show `shivansh_collection`
   - Show the documents you added

4. **Terminal**
   - Show server running
   - Show console logs

---

## 🆘 Still Getting Errors?

### Error: "Title and description are required"
**Solution**: Make sure you added the JSON body in the Body tab

### Error: "Cast to ObjectId failed"
**Solution**: You're using GET instead of POST on `/api/add`

### Error: "Cannot POST /api/add"
**Solution**: Server might not be running. Check terminal.

### Error: "Network Error"
**Solution**: 
- Check if server is running on port 5000
- Check URL is `http://localhost:5000` (not https)

---

## ✅ Success Checklist:

- [ ] Server running (check terminal)
- [ ] Postman open
- [ ] POST request to `/api/add` with JSON body
- [ ] Response shows "success": true
- [ ] GET request to `/api/all` shows documents
- [ ] Documents visible in MongoDB Atlas

---

## 🎉 You Got This!

Just remember:
- **POST** for `/api/add` (with body)
- **GET** for `/api/all` (no body)

Good luck with your recording! 🚀
