# 💳 Razorpay Integration Setup for ParkLink

## Overview
ParkLink now has complete Razorpay payment integration for secure online payments via UPI, Cards, Netbanking, and Wallets.

## 🚀 Setup Instructions

### 1. Create Razorpay Account
1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Click "Sign Up" and create a FREE account
3. Complete KYC verification (required for live mode)
4. For testing, you can use TEST mode without KYC

### 2. Get API Keys
1. Log in to Razorpay Dashboard
2. Go to **Settings** → **API Keys**
3. Click "Generate Test Key" or "Generate Live Key"
4. Copy both:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret**

### 3. Configure Backend (.env)
Open `backend/.env` and add your Razorpay keys:

```env
PORT=5000
MONGODB_URI=mongodb+srv://parklink_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/parking_db?retryWrites=true&w=majority
JWT_SECRET=parkease_jwt_secret_key_2025

# Razorpay Keys
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_SECRET_KEY_HERE
```

### 4. Configure Frontend
Create a `.env` file in the `frontend` folder:

```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
```

**Important:** Only add the Key ID to frontend, NEVER the Key Secret!

### 5. Test Payment Flow

#### Test Card Details (Razorpay Test Mode):
- **Card Number:** 4111 1111 1111 1111
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Name:** Any name

#### Test UPI:
- **UPI ID:** success@razorpay
- **PIN:** Any 4-6 digits

### 6. How It Works

```
User Books Parking
      ↓
BookingModal creates booking
      ↓
Backend creates Razorpay Order
      ↓
Razorpay Checkout opens
      ↓
User completes payment
      ↓
Backend verifies payment signature
      ↓
Booking status updated to "paid"
      ↓
User gets confirmation
```

## 📱 Payment Features

✅ **Multiple Payment Methods:**
- Credit/Debit Cards (Visa, Mastercard, RuPay, Amex)
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking (All major banks)
- Wallets (Paytm, Mobikwik, etc.)

✅ **Security:**
- PCI DSS compliant
- Payment signature verification
- Secure HTTPS connections

✅ **User Experience:**
- Mobile-responsive checkout
- Auto-fill customer details
- Instant payment confirmation

## 🎨 Customization

The Razorpay checkout is already customized with:
- **Brand Name:** ParkLink
- **Brand Color:** #FF6B35 (Orange - Parking theme)
- **Logo:** Car icon
- **Description:** Shows parking location

## 💰 Pricing

Razorpay charges:
- **2% + ₹0** per transaction (for Indian cards)
- **3% + ₹0** per transaction (for international cards)
- **FREE** for first ₹50,000 in transactions (for new accounts)

## 🔧 Troubleshooting

### Payment Gateway Not Loading?
- Check if Razorpay script is loading: Open browser console
- Verify Key ID is correct in frontend .env
- Check internet connection

### Payment Verification Failed?
- Verify Key Secret is correct in backend .env
- Check backend logs for errors
- Ensure booking ID is valid

### Test Payments Not Working?
- Make sure you're using TEST keys (starting with `rzp_test_`)
- Use the test card details provided above
- Check Razorpay Dashboard for transaction logs

## 📊 Monitoring Payments

1. Go to Razorpay Dashboard
2. Click **Transactions** → **Payments**
3. View all successful/failed payments
4. Download reports and invoices

## 🚀 Going Live

When ready for production:

1. Complete KYC verification on Razorpay
2. Get LIVE API keys
3. Replace TEST keys with LIVE keys in .env files
4. Test thoroughly with real small amounts
5. Enable webhooks for instant payment notifications

## 🔒 Security Best Practices

✅ **DO:**
- Store Key Secret in backend .env only
- Use HTTPS in production
- Verify payment signatures
- Log all transactions

❌ **DON'T:**
- Never commit .env files to Git
- Never expose Key Secret in frontend
- Never skip payment verification
- Never store card details

## 📞 Support

- **Razorpay Docs:** https://razorpay.com/docs/
- **Support:** support@razorpay.com
- **Integration Docs:** https://razorpay.com/docs/payments/

---

**Your ParkLink app is now ready for secure online payments! 🎉**
