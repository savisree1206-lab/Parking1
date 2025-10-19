const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { createOrder, verifyPayment } = require('../utils/razorpay');
const Booking = require('../models/Booking');

// @route   POST /api/payments/create-order
// @desc    Create Razorpay order for booking
// @access  Private
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Create Razorpay order
    const result = await createOrder(
      booking.totalPrice,
      'INR',
      `booking_${bookingId}`
    );

    if (result.success) {
      res.json({
        orderId: result.order.id,
        amount: result.order.amount,
        currency: result.order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } else {
      res.status(500).json({ message: 'Failed to create order', error: result.error });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/payments/verify
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId, signature, bookingId } = req.body;

    // Verify payment signature
    const isValid = verifyPayment(orderId, paymentId, signature);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Update booking payment status
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = 'paid';
    booking.status = 'active';
    await booking.save();

    // Emit real-time update via Socket.io
    const io = req.app.get('io');
    io.emit('booking-update', {
      bookingId: booking._id,
      status: 'active',
      paymentStatus: 'paid',
    });

    res.json({
      message: 'Payment verified successfully',
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/payments/key
// @desc    Get Razorpay key
// @access  Public
router.get('/key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID || 'your_key_id' });
});

module.exports = router;
