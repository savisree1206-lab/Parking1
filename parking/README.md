# 🚗 ParkEase - Smart Parking Management System

A full-stack web application for smart parking management with real-time availability, dynamic pricing, and seamless booking experience.

## ✨ Features

### For Users (Drivers)
- 🔴🟢 **Live Availability** - Real-time slot status via IoT sensors (Socket.io ready)
- 📅 **Slot Reservation** - Book parking spaces in advance
- 💰 **Dynamic Pricing** - Time-based pricing with peak hour rates
- 🗺️ **Navigation** - Google Maps integration for slot navigation
- 💳 **Payments** - Razorpay integration (UPI, Cards, Wallets)
- 👤 **User Profile** - Booking history and invoices
- 🎯 **Interactive UI** - Modern, responsive design

### For Admin (Parking Lot Owner)
- 🎛️ **Slot Management** - Add, update, remove parking slots
- 📊 **Live Dashboard** - Real-time occupancy monitoring
- 💵 **Dynamic Pricing Control** - Adjust rates and multipliers
- 📈 **Revenue Analytics** - Comprehensive earnings reports
- 👥 **User Management** - View users, bookings, and cancellations

## 🛠️ Technology Stack

**Frontend:** React.js, CSS3, Leaflet, Lucide Icons, Axios  
**Backend:** Node.js, Express.js, MongoDB, Socket.io  
**Authentication:** JWT  
**Payment:** Razorpay (Ready)  
**Maps:** Leaflet with OpenStreetMap

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn

### Installation

**1. Backend Setup**
```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking_db
JWT_SECRET=your_secret_key_here
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

**2. Frontend Setup**
```bash
cd frontend
npm install
```

**3. Start MongoDB**
```bash
mongod
```

**4. Run Application**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

**5. Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage Guide

### User Flow
1. Register/Login as User
2. Find parking near your location
3. Select slot and book with dynamic pricing
4. Navigate using maps
5. Complete parking and checkout

### Admin Flow
1. Register/Login as Admin
2. Add parking slots with location
3. Set pricing and availability
4. Monitor bookings and revenue
5. Manage slots in real-time

## 🔑 Default Test Credentials

After starting the app, register new accounts or create test data in MongoDB.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user/admin
- `POST /api/auth/login` - Login

### Parking
- `GET /api/parking` - Get all slots
- `POST /api/parking` - Create slot (Admin)
- `PUT /api/parking/:id` - Update slot (Admin)
- `DELETE /api/parking/:id` - Delete slot (Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment

## 🎨 Features Implemented

✅ User Authentication (JWT)  
✅ Admin Authentication  
✅ Real-time Updates (Socket.io)  
✅ Dynamic Pricing  
✅ Interactive Maps  
✅ Booking System  
✅ Payment Integration (Razorpay ready)  
✅ Responsive Design  
✅ Modern UI/UX  

## 🔮 Future Enhancements

- [ ] Mobile App (React Native)
- [ ] Firebase Authentication
- [ ] Multi-language Support
- [ ] IoT Sensor Integration
- [ ] Advanced Analytics
- [ ] Notification System
- [ ] QR Code Entry/Exit

## 🤝 Contributing

This is a project for learning and development purposes.

## 📝 License

MIT License - Feel free to use for learning!

## 👨‍💻 Author

Built with ❤️ for smart parking solutions
