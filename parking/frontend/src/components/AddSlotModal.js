import React, { useState, useEffect } from 'react';
import { parkingAPI } from '../utils/api';
import { X, MapPin, DollarSign, Clock, AlertCircle } from 'lucide-react';
import './BookingModal.css';

const AddSlotModal = ({ slot, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    totalSlots: '',
    pricePerHour: '',
    amenities: '',
    operatingHours: {
      open: '00:00',
      close: '23:59',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slot) {
      // Edit mode - populate form with existing data
      setFormData({
        name: slot.name,
        address: slot.address,
        latitude: slot.location.coordinates[1],
        longitude: slot.location.coordinates[0],
        totalSlots: slot.totalSlots,
        pricePerHour: slot.pricePerHour,
        amenities: slot.amenities.join(', '),
        operatingHours: slot.operatingHours,
      });
    }
  }, [slot]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'open' || name === 'close') {
      setFormData({
        ...formData,
        operatingHours: {
          ...formData.operatingHours,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          alert('Unable to get location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        name: formData.name,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        totalSlots: parseInt(formData.totalSlots),
        pricePerHour: parseFloat(formData.pricePerHour),
        amenities: formData.amenities.split(',').map((a) => a.trim()).filter((a) => a),
        operatingHours: formData.operatingHours,
      };

      if (slot) {
        // Update existing slot
        await parkingAPI.update(slot._id, data);
        alert('Parking slot updated successfully');
      } else {
        // Create new slot
        await parkingAPI.create(data);
        alert('Parking slot created successfully');
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save parking slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{slot ? 'Edit Parking Slot' : 'Add New Parking Slot'}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">
                <MapPin size={18} />
                Parking Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Central Plaza Parking"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address of parking location"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="28.6139"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="77.2090"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={getCurrentLocation}
              style={{ marginBottom: '20px' }}
            >
              Use My Current Location
            </button>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="totalSlots">Total Slots</label>
                <input
                  type="number"
                  id="totalSlots"
                  name="totalSlots"
                  value={formData.totalSlots}
                  onChange={handleChange}
                  placeholder="50"
                  min="1"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="pricePerHour">
                  <DollarSign size={18} />
                  Price Per Hour (₹)
                </label>
                <input
                  type="number"
                  step="any"
                  id="pricePerHour"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="open">
                  <Clock size={18} />
                  Opening Time
                </label>
                <input
                  type="time"
                  id="open"
                  name="open"
                  value={formData.operatingHours.open}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="close">Closing Time</label>
                <input
                  type="time"
                  id="close"
                  name="close"
                  value={formData.operatingHours.close}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="amenities">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="CCTV, Security, Covered, EV Charging"
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : slot ? 'Update Slot' : 'Create Slot'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSlotModal;
