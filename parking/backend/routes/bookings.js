const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');
const { calculateDynamicPrice, getPricingInfo } = require('../utils/dynamicPricing');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      parkingSlotId,
      vehicleNumber,
      vehicleType,
      startTime,
      endTime
    } = req.body;

    // Get parking slot
    const parkingSlot = await ParkingSlot.findById(parkingSlotId);
    if (!parkingSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }

    // Check availability
    if (parkingSlot.availableSlots <= 0) {
      return res.status(400).json({ message: 'No available slots' });
    }

    // Calculate duration and price with dynamic pricing
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60)); // in hours
    const totalPrice = calculateDynamicPrice(parkingSlot.pricePerHour, start, end);

    // Create booking
    const booking = new Booking({
      user: req.user.userId,
      parkingSlot: parkingSlotId,
      vehicleNumber,
      vehicleType,
      startTime: start,
      endTime: end,
      duration,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();

    // Update available slots
    parkingSlot.availableSlots -= 1;
    await parkingSlot.save();

    // Emit real-time update via Socket.io
    const io = req.app.get('io');
    io.emit('slot-update', {
      slotId: parkingSlot._id,
      availableSlots: parkingSlot.availableSlots,
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/my
// @desc    Get user's bookings
// @access  Private
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId })
      .populate('parkingSlot', 'name address location pricePerHour')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('parkingSlot', 'name address location pricePerHour')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the owner of the booking
    if (booking.user._id.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the owner of the booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Can only cancel confirmed or active bookings
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update available slots
    const parkingSlot = await ParkingSlot.findById(booking.parkingSlot);
    if (parkingSlot) {
      parkingSlot.availableSlots += 1;
      await parkingSlot.save();
    }

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/complete
// @desc    Complete a booking
// @access  Private
router.put('/:id/complete', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the owner of the booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'completed';
    await booking.save();

    res.json({
      message: 'Booking completed successfully',
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
