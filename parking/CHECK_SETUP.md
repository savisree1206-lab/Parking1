# 🔍 Troubleshooting "Server Error" During Account Creation

## Most Common Cause: MongoDB Not Running

The "Server error" message typically means **MongoDB is not running** or the backend cannot connect to it.

## Quick Fix Steps:

### Step 1: Start MongoDB
Open a **NEW terminal/command prompt** and run:
```bash
mongod
```

**Keep this terminal open!** MongoDB needs to stay running.

You should see output ending with:
```
[initandlisten] waiting for connections on port 27017
```

### Step 2: Verify Backend .env File
Make sure `c:\Users\savitha sree\parking\backend\.env` exists and contains:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking_db
JWT_SECRET=mySecretKey123!@#
NODE_ENV=development
```

If `.env` doesn't exist, copy from `.env.example`:
```bash
cd c:\Users\savitha sree\parking\backend
copy .env.example .env
```

### Step 3: Restart Backend Server
In the backend terminal:
1. Stop the server (Ctrl+C)
2. Start it again:
```bash
cd c:\Users\savitha sree\parking\backend
npm run dev
```

You should see:
```
Server is running on port 5000
Socket.io is ready for real-time updates
MongoDB connected successfully  ← This is important!
```

### Step 4: Try Creating Account Again
Now go back to http://localhost:3000/register and try creating an account.

---

## Other Possible Issues:

### Issue: "Email already exists"
**Solution:** The email is already registered. Try a different email or login with existing credentials.

### Issue: Backend shows detailed error in console
**Solution:** Check the backend terminal for specific error messages. The improved error handling will now show:
- MongoDB connection errors
- Validation errors
- Duplicate email errors

### Issue: Cannot connect to server
**Solution:** 
1. Make sure backend is running on port 5000
2. Check if another process is using port 5000
3. Verify frontend is calling `http://localhost:5000`

---

## Verification Checklist:

- [ ] MongoDB is running (separate terminal with `mongod`)
- [ ] Backend `.env` file exists with correct settings
- [ ] Backend server is running and shows "MongoDB connected successfully"
- [ ] Frontend is running on http://localhost:3000
- [ ] Browser console shows no CORS errors

---

## Still Having Issues?

Check the backend terminal for detailed error messages. The error handling has been improved to show:
- Specific MongoDB errors
- Validation failures
- Connection issues
