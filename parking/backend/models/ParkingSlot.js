const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  totalSlots: {
    type: Number,
    required: true,
    min: 1
  },
  availableSlots: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  operatingHours: {
    open: {
      type: String,
      default: '00:00'
    },
    close: {
      type: String,
      default: '23:59'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for location-based queries
parkingSlotSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);
