import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { parkingAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';
import { MapPin, Navigation, DollarSign, Clock, Star, Filter } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './FindParking.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13);
  }, [center, map]);
  return null;
};

const FindParking = () => {
  const navigate = useNavigate();
  const [parkingSlots, setParkingSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]); // Default: Delhi
  const [searchRadius, setSearchRadius] = useState(5);
  const [filters, setFilters] = useState({
    maxPrice: 100,
    sortBy: 'distance',
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchParkingSlots();
    }
  }, [userLocation, searchRadius]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use default location if user denies
        }
      );
    }
  };

  const fetchParkingSlots = async () => {
    try {
      setLoading(true);
      const response = await parkingAPI.getAll({
        lat: userLocation[0],
        lng: userLocation[1],
        radius: searchRadius,
      });
      setParkingSlots(response.data);
    } catch (error) {
      console.error('Error fetching parking slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookNow = (slot) => {
    setSelectedSlot(slot);
    setShowBookingModal(true);
  };

  const navigateToSlot = (slot) => {
    const [lng, lat] = slot.location.coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const getAvailabilityColor = (availableSlots, totalSlots) => {
    const percentage = (availableSlots / totalSlots) * 100;
    if (percentage > 50) return '#10b981';
    if (percentage > 20) return '#f59e0b';
    return '#ef4444';
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="find-parking">
      <Navbar />

      <div className="find-parking-container">
        {/* Sidebar */}
        <div className="parking-sidebar">
          <div className="search-header">
            <h2>
              <MapPin size={24} />
              Find Parking Near You
            </h2>
            <p>{parkingSlots.length} spots available</p>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <h3>
              <Filter size={20} />
              Filters
            </h3>
            
            <div className="filter-group">
              <label>Search Radius: {searchRadius} km</label>
              <input
                type="range"
                min="1"
                max="20"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="filter-group">
              <label>Max Price: ₹{filters.maxPrice}/hr</label>
              <input
                type="range"
                min="10"
                max="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                className="slider"
              />
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="distance">Distance</option>
                <option value="price">Price</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>

          {/* Parking List */}
          <div className="parking-list">
            {parkingSlots.length === 0 ? (
              <div className="no-results">
                <MapPin size={48} color="#d1d5db" />
                <p>No parking slots found in this area</p>
              </div>
            ) : (
              parkingSlots.map((slot) => (
                <div
                  key={slot._id}
                  className={`parking-card ${selectedSlot?._id === slot._id ? 'selected' : ''}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  <div className="parking-card-header">
                    <h3>{slot.name}</h3>
                    <div
                      className="availability-badge"
                      style={{
                        backgroundColor: getAvailabilityColor(slot.availableSlots, slot.totalSlots),
                      }}
                    >
                      {slot.availableSlots}/{slot.totalSlots}
                    </div>
                  </div>

                  <p className="parking-address">
                    <MapPin size={14} />
                    {slot.address}
                  </p>

                  <div className="parking-info">
                    <span className="price">
                      <DollarSign size={16} />
                      ₹{slot.pricePerHour}/hr
                    </span>
                    <span>
                      <Clock size={16} />
                      {slot.operatingHours?.open} - {slot.operatingHours?.close}
                    </span>
                  </div>

                  {slot.amenities && slot.amenities.length > 0 && (
                    <div className="amenities">
                      {slot.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="card-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToSlot(slot);
                      }}
                    >
                      <Navigation size={16} />
                      Navigate
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(slot);
                      }}
                      disabled={slot.availableSlots === 0}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map */}
        <div className="parking-map">
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={userLocation} />

            {/* User Location Marker */}
            <Marker position={userLocation}>
              <Popup>Your Location</Popup>
            </Marker>

            {/* Parking Slot Markers */}
            {parkingSlots.map((slot) => {
              const [lng, lat] = slot.location.coordinates;
              return (
                <Marker
                  key={slot._id}
                  position={[lat, lng]}
                  eventHandlers={{
                    click: () => handleSlotClick(slot),
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <h3 style={{ marginBottom: '8px' }}>{slot.name}</h3>
                      <p style={{ fontSize: '12px', marginBottom: '8px' }}>{slot.address}</p>
                      <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        ₹{slot.pricePerHour}/hr
                      </p>
                      <p style={{ marginBottom: '12px' }}>
                        Available: {slot.availableSlots}/{slot.totalSlots}
                      </p>
                      <button
                        onClick={() => handleBookNow(slot)}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                        disabled={slot.availableSlots === 0}
                      >
                        Book Now
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSlot && (
        <BookingModal
          slot={selectedSlot}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false);
            navigate('/my-bookings');
          }}
        />
      )}
    </div>
  );
};

export default FindParking;
