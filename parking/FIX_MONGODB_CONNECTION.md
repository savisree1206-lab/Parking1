# 🔧 Fix MongoDB Connection Error

## ❌ Current Issue
Your login is failing because the backend can't connect to MongoDB Atlas due to a TLS/SSL error.

## 🎯 Solution

### Option 1: Fix Password Encoding (Most Common)

Your MongoDB password likely contains special characters that need to be URL-encoded.

**Special characters that need encoding:**
```
! → %21
@ → %40
# → %23
$ → %24
% → %25
^ → %5E
& → %26
* → %2A
( → %28
) → %29
```

**Example:**
If your password is: `MyPass@123!`  
It should be: `MyPass%40123%21`

### Steps to Fix:

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com/

2. **Reset Your Database Password (Easiest)**
   - Click "Database Access" (left sidebar)
   - Find your user (`parklink_user`)
   - Click "Edit"
   - Click "Edit Password"
   - Create a **simple password** (only letters and numbers, no special characters)
   - Example: `parklink2025`
   - Click "Update User"

3. **Get New Connection String**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your new simple password

4. **Update backend/.env file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://parklink_user:parklink2025@cluster0.qmaqiw5.mongodb.net/parking_db?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=parkease_jwt_secret_key_2025
   ```

### Option 2: Check IP Whitelist

1. **Go to MongoDB Atlas Dashboard**
2. Click "Network Access" (left sidebar)
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"
6. Wait 2-3 minutes for it to apply

### Option 3: Verify Database User Permissions

1. **Go to MongoDB Atlas Dashboard**
2. Click "Database Access"
3. Make sure your user has:
   - ✅ "Atlas admin" role OR
   - ✅ "Read and write to any database"

## 🧪 Test the Fix

After updating your `.env` file, run this test:

```bash
cd backend
node test-connection.js
```

You should see:
```
✅ MongoDB connected successfully!
```

## 🚀 Restart Your Backend

Once the test passes:

```bash
cd backend
npm run dev
```

## 📝 Quick Fix Template

Replace these values in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_SIMPLE_PASSWORD@cluster0.qmaqiw5.mongodb.net/parking_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=parkease_jwt_secret_key_2025
```

## ✅ After Fixing

1. ✅ Backend connects to MongoDB
2. ✅ Your existing account will work
3. ✅ Login will succeed
4. ✅ No more "Server error"

## 🆘 Still Having Issues?

**Check these:**
1. Password is simple (no special characters)
2. IP address 0.0.0.0/0 is whitelisted
3. Database user exists and has permissions
4. Connection string ends with `/parking_db?...`
5. No spaces in the connection string

---

**Most Common Solution:** 
Reset your MongoDB Atlas password to something simple like `parklink2025` (no special characters), update your `.env` file, and restart the backend.

This will fix your login error! 🎉
