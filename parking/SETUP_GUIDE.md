# 📋 Complete Setup Guide - ParkEase

## Step-by-Step Installation Guide

### 1️⃣ Install Prerequisites

#### Install Node.js
1. Download from https://nodejs.org/
2. Install LTS version (v14 or higher)
3. Verify installation:
```bash
node --version
npm --version
```

#### Install MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Start MongoDB service:

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

4. Verify MongoDB is running:
```bash
mongo --version
```

### 2️⃣ Backend Setup

#### Navigate to backend folder
```bash
cd c:\Users\savitha sree\parking\backend
```

#### Install dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator
- socket.io
- razorpay
- node-cron

#### Configure Environment Variables

Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking_db
JWT_SECRET=mySecretKey123!@#
NODE_ENV=development

# Optional: Add Razorpay credentials later
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

#### Start Backend Server
```bash
npm run dev
```

You should see:
```
Server is running on port 5000
Socket.io is ready for real-time updates
MongoDB connected successfully
```

### 3️⃣ Frontend Setup

#### Open new terminal and navigate to frontend
```bash
cd c:\Users\savitha sree\parking\frontend
```

#### Install dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- leaflet
- react-leaflet
- lucide-react

#### Start Frontend Development Server
```bash
npm start
```

Browser will automatically open at http://localhost:3000

### 4️⃣ Test the Application

#### Create Admin Account
1. Go to http://localhost:3000/register
2. Fill in the form:
   - Name: Admin User
   - Email: admin@test.com
   - Phone: 1234567890
   - Account Type: **Admin (Manage Parking Slots)**
   - Password: admin123
3. Click "Create Account"

#### Add Parking Slots (Admin)
1. You'll be redirected to Admin Dashboard
2. Click "Add New Slot"
3. Fill in parking details:
   - Name: Central Plaza Parking
   - Address: 123 Main Street, City
   - Click "Use My Current Location" OR enter coordinates
   - Total Slots: 50
   - Price Per Hour: 50
   - Operating Hours: 00:00 to 23:59
   - Amenities: CCTV, Security, Covered
4. Click "Create Slot"

#### Create User Account
1. Logout from admin account
2. Go to Register page
3. Create a new account as **User**
4. Login with user credentials

#### Book a Parking Slot (User)
1. Click "Find Parking" from dashboard
2. View available parking slots on map
3. Click on a slot marker or card
4. Click "Book Now"
5. Fill booking details:
   - Vehicle Number: DL01AB1234
   - Vehicle Type: Car
   - Start/End Time
6. See dynamic pricing calculation
7. Click "Proceed to Payment"

### 5️⃣ Testing Different Features

#### Dynamic Pricing
Try booking at different times to see price changes:
- **Peak Hours (8-10 AM, 5-8 PM):** +50% price
- **Normal Hours:** Standard price
- **Off-Peak (10 PM - 6 AM):** -20% price

#### Real-time Updates
1. Open two browser windows
2. Login as admin in one, user in another
3. Create booking as user
4. See instant updates in admin dashboard (via Socket.io)

#### Navigation
1. Click "Navigate" button on any parking slot
2. Opens Google Maps with directions

### 6️⃣ Common Issues & Solutions

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service:
```bash
mongod
```

#### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:** Change PORT in `.env` or kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill
```

#### CORS Error
**Solution:** Ensure backend CORS is configured for http://localhost:3000

#### Leaflet Map Not Loading
**Solution:** Check internet connection (needs to load tiles from OpenStreetMap)

### 7️⃣ Optional: Razorpay Integration

#### Get Razorpay Credentials
1. Sign up at https://razorpay.com/
2. Get Test API Keys from Dashboard
3. Add to `.env`:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

4. Restart backend server

### 8️⃣ Production Deployment (Future)

#### Backend (Node.js)
- Deploy to: Heroku, Railway, Render, or AWS
- Use MongoDB Atlas for database
- Set environment variables in hosting platform

#### Frontend (React)
- Build: `npm run build`
- Deploy to: Vercel, Netlify, or GitHub Pages
- Update API URL in frontend code

### 9️⃣ Database Structure

The app creates these collections in MongoDB:
- `users` - User and admin accounts
- `parkingslots` - Parking location data
- `bookings` - Booking records

### 🔟 Development Tips

#### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Save files and see instant changes
- Backend: Uses nodemon for auto-restart

#### Debugging
- Backend: Add `console.log()` in route handlers
- Frontend: Use React DevTools browser extension
- Database: Use MongoDB Compass to view data

#### API Testing
Use tools like Postman or Thunder Client to test API endpoints:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "admin123"
}
```

## 🎉 You're All Set!

Your parking management system is now running. Explore all features:
- User booking flow
- Admin slot management
- Real-time updates
- Dynamic pricing
- Map navigation

Happy Coding! 🚀
