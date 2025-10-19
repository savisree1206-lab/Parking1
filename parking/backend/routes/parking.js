const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const ParkingSlot = require('../models/ParkingSlot');

// @route   GET /api/parking
// @desc    Get all parking slots
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    let query = { isActive: true };

    // If location is provided, find nearby parking slots
    if (lat && lng) {
      const radiusInMeters = radius ? parseFloat(radius) * 1000 : 5000; // default 5km
      
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radiusInMeters
        }
      };
    }

    const parkingSlots = await ParkingSlot.find(query)
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(parkingSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/parking/:id
// @desc    Get single parking slot
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findById(req.params.id)
      .populate('owner', 'name email phone');

    if (!parkingSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }

    res.json(parkingSlot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/parking
// @desc    Create a new parking slot
// @access  Private (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      name,
      address,
      latitude,
      longitude,
      totalSlots,
      pricePerHour,
      amenities,
      operatingHours
    } = req.body;

    const parkingSlot = new ParkingSlot({
      name,
      address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      totalSlots,
      availableSlots: totalSlots,
      pricePerHour,
      amenities: amenities || [],
      owner: req.user.userId,
      operatingHours: operatingHours || { open: '00:00', close: '23:59' }
    });

    await parkingSlot.save();

    res.status(201).json({
      message: 'Parking slot created successfully',
      parkingSlot
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/parking/:id
// @desc    Update parking slot
// @access  Private (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findById(req.params.id);

    if (!parkingSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }

    // Check if the admin is the owner
    if (parkingSlot.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this parking slot' });
    }

    const {
      name,
      address,
      latitude,
      longitude,
      totalSlots,
      pricePerHour,
      amenities,
      operatingHours,
      isActive
    } = req.body;

    if (name) parkingSlot.name = name;
    if (address) parkingSlot.address = address;
    if (latitude && longitude) {
      parkingSlot.location.coordinates = [parseFloat(longitude), parseFloat(latitude)];
    }
    if (totalSlots) {
      const difference = totalSlots - parkingSlot.totalSlots;
      parkingSlot.totalSlots = totalSlots;
      parkingSlot.availableSlots += difference;
    }
    if (pricePerHour) parkingSlot.pricePerHour = pricePerHour;
    if (amenities) parkingSlot.amenities = amenities;
    if (operatingHours) parkingSlot.operatingHours = operatingHours;
    if (typeof isActive !== 'undefined') parkingSlot.isActive = isActive;

    await parkingSlot.save();

    res.json({
      message: 'Parking slot updated successfully',
      parkingSlot
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/parking/:id
// @desc    Delete parking slot
// @access  Private (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const parkingSlot = await ParkingSlot.findById(req.params.id);

    if (!parkingSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }

    // Check if the admin is the owner
    if (parkingSlot.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this parking slot' });
    }

    await parkingSlot.deleteOne();

    res.json({ message: 'Parking slot deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/parking/my/slots
// @desc    Get parking slots owned by the admin
// @access  Private (Admin only)
router.get('/my/slots', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const parkingSlots = await ParkingSlot.find({ owner: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(parkingSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
