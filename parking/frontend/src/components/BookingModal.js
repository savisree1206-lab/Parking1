import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { bookingAPI } from '../utils/api';
import { X, Calendar, Clock, Car, CreditCard, AlertCircle } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ slot, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: 'car',
    startTime: '',
    endTime: '',
  });
  const [pricing, setPricing] = useState({
    duration: 0,
    basePrice: 0,
    totalPrice: 0,
    dynamicMultiplier: 1.0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set default start time to now
    const now = new Date();
    const startTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60000); // 2 hours later

    setFormData({
      ...formData,
      startTime: formatDateTime(startTime),
      endTime: formatDateTime(endTime),
    });
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [formData.startTime, formData.endTime]);

  const formatDateTime = (date) => {
    return date.toISOString().slice(0, 16);
  };

  const calculatePrice = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60));

      if (duration > 0) {
        // Simple dynamic pricing calculation (frontend estimate)
        const hour = start.getHours();
        let multiplier = 1.0;

        // Peak hours (8-10 AM, 5-8 PM)
        if ((hour >= 8 && hour < 10) || (hour >= 17 && hour < 20)) {
          multiplier = 1.5;
        }
        // Off-peak (10 PM - 6 AM)
        else if (hour >= 22 || hour < 6) {
          multiplier = 0.8;
        }

        const basePrice = slot.pricePerHour * duration;
        const totalPrice = basePrice * multiplier;

        setPricing({
          duration,
          basePrice,
          totalPrice,
          dynamicMultiplier: multiplier,
        });
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (bookingId, amount) => {
    const isScriptLoaded = await loadRazorpayScript();
    
    if (!isScriptLoaded) {
      setError('Failed to load payment gateway');
      return;
    }

    try {
      // Create Razorpay order
      const token = localStorage.getItem('token');
      const orderResponse = await axios.post(
        'http://localhost:5000/api/payments/create-order',
        {
          bookingId,
          amount: Math.round(amount * 100), // Convert to paise
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { order } = orderResponse.data;

      // Razorpay payment options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_dummy', // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'ParkLink',
        description: `Parking Booking at ${slot.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              'http://localhost:5000/api/payments/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            if (verifyResponse.data.success) {
              alert('Payment successful! Booking confirmed.');
              onSuccess();
            }
          } catch (error) {
            setError('Payment verification failed');
          }
        },
        prefill: {
          name: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
        },
        theme: {
          color: '#14B8A6',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setError('Payment initiation failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create booking
      const response = await bookingAPI.create({
        parkingSlotId: slot._id,
        ...formData,
      });

      const booking = response.data.booking || response.data;
      
      // Initiate payment
      await handlePayment(booking._id || booking.id, pricing.totalPrice);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const getPricingCategory = () => {
    if (pricing.dynamicMultiplier > 1.0) return 'Peak Hours (+50%)';
    if (pricing.dynamicMultiplier < 1.0) return 'Off-Peak (-20%)';
    return 'Normal Rate';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book Parking Slot</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          {/* Slot Info */}
          <div className="slot-info">
            <h3>{slot.name}</h3>
            <p>{slot.address}</p>
            <div className="slot-details">
              <span className="price-badge">₹{slot.pricePerHour}/hr</span>
              <span className="availability-badge">
                {slot.availableSlots} slots available
              </span>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="vehicleNumber">
                  <Car size={18} />
                  Vehicle Number
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g., DL01AB1234"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="suv">SUV</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="startTime">
                  <Calendar size={18} />
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  min={formatDateTime(new Date())}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="endTime">
                  <Clock size={18} />
                  End Time
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  min={formData.startTime}
                  required
                />
              </div>
            </div>

            {/* Pricing Summary */}
            {pricing.duration > 0 && (
              <div className="pricing-summary">
                <h4>Pricing Summary</h4>
                <div className="pricing-row">
                  <span>Duration:</span>
                  <span>{pricing.duration} hour{pricing.duration > 1 ? 's' : ''}</span>
                </div>
                <div className="pricing-row">
                  <span>Base Rate:</span>
                  <span>₹{slot.pricePerHour}/hr</span>
                </div>
                <div className="pricing-row">
                  <span>Pricing:</span>
                  <span className="pricing-category">{getPricingCategory()}</span>
                </div>
                <div className="pricing-row total">
                  <span>Total Amount:</span>
                  <span>₹{pricing.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading || pricing.duration <= 0}>
                {loading ? 'Processing...' : (
                  <>
                    <CreditCard size={20} />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
