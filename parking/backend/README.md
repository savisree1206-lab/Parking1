# Parking Management System - Backend

## Features
- User and Admin authentication (JWT)
- User registration and login
- Parking slot management (CRUD operations)
- Booking system
- Location-based search for parking slots
- Admin dashboard

## Tech Stack
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file and configure:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking_db
JWT_SECRET=your_jwt_secret_key_here
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user/admin
- POST `/api/auth/login` - Login user/admin

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

### Parking Slots
- GET `/api/parking` - Get all parking slots (with location filtering)
- GET `/api/parking/:id` - Get single parking slot
- POST `/api/parking` - Create parking slot (Admin)
- PUT `/api/parking/:id` - Update parking slot (Admin)
- DELETE `/api/parking/:id` - Delete parking slot (Admin)
- GET `/api/parking/my/slots` - Get admin's parking slots

### Bookings
- POST `/api/bookings` - Create booking
- GET `/api/bookings/my` - Get user's bookings
- GET `/api/bookings/:id` - Get single booking
- PUT `/api/bookings/:id/cancel` - Cancel booking
- PUT `/api/bookings/:id/complete` - Complete booking

### Admin
- GET `/api/admin/dashboard` - Get dashboard statistics
- GET `/api/admin/users` - Get all users
- GET `/api/admin/bookings` - Get all bookings
