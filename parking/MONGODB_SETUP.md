# 🗄️ MongoDB Setup Guide - Fix "Server Error"

## ⚠️ Issue Detected: MongoDB Not Installed

Your system doesn't have MongoDB installed, which is why you're getting "Server error" when creating an account.

## 🚀 Quick Solution: Use MongoDB Atlas (Free Cloud Database)

This is the **EASIEST** option - no local installation needed!

### Step 1: Create Free MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email (it's FREE)
3. Create a free M0 cluster (takes 3-5 minutes)

### Step 2: Get Connection String

1. In Atlas dashboard, click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/parking_db
   ```
4. Replace `<password>` with your actual password

### Step 3: Update Backend .env File

Edit `c:\Users\savitha sree\parking\backend\.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:yourpassword@cluster0.xxxxx.mongodb.net/parking_db
JWT_SECRET=mySecretKey123!@#
NODE_ENV=development
```

### Step 4: Whitelist Your IP Address

In MongoDB Atlas:
1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### Step 5: Restart Backend Server

```bash
cd c:\Users\savitha sree\parking\backend
npm run dev
```

You should now see:
```
MongoDB connected successfully ✓
```

### Step 6: Try Creating Account Again

Go to http://localhost:3000/register and create your account!

---

## 💻 Alternative: Install MongoDB Locally

If you prefer local installation:

### For Windows:

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server (Windows x64)
   - Run the installer

2. **During Installation:**
   - Choose "Complete" installation
   - Install MongoDB as a Service (check the box)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

4. **Start MongoDB Service:**
   - Open Services (Win + R, type `services.msc`)
   - Find "MongoDB Server"
   - Right-click → Start

5. **Update .env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/parking_db
   ```

6. **Restart backend server**

---

## ✅ How to Verify Everything is Working

After setup, check these:

1. **Backend Terminal Shows:**
   ```
   Server is running on port 5000
   MongoDB connected successfully  ← Must see this!
   ```

2. **Try Creating Account:**
   - Go to http://localhost:3000/register
   - Fill in the form
   - If successful: redirects to dashboard
   - If error: backend terminal will show detailed error message

3. **Check Backend Console:**
   - Any errors will now show detailed messages
   - MongoDB connection errors will be clear
   - Validation errors will be specific

---

## 🐛 Common Issues After Setup

### "MongoServerError: bad auth"
**Solution:** Check username/password in connection string

### "MongooseServerSelectionError"
**Solution:** 
- Check IP whitelist in Atlas
- Verify internet connection
- Check connection string format

### "User already exists"
**Solution:** Email is already registered, try different email

---

## 📊 Recommended: MongoDB Compass (GUI Tool)

Install MongoDB Compass to view your database visually:
- Download: https://www.mongodb.com/try/download/compass
- Connect using your MongoDB URI
- View collections: users, parkingslots, bookings

---

## 🎯 Next Steps After MongoDB Setup

1. ✅ MongoDB running (Atlas or Local)
2. ✅ Backend connected to MongoDB
3. ✅ Create admin account
4. ✅ Create user account
5. ✅ Test booking flow

**Your parking app will now work perfectly!** 🚀
