import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI, parkingAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import { Users, MapPin, Calendar, DollarSign, TrendingUp, PlusCircle } from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalParkingSlots: 0,
    totalBookings: 0,
    activeBookings: 0,
  });
  const [mySlots, setMySlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, slotsResponse] = await Promise.all([
        adminAPI.getDashboard(),
        parkingAPI.getMySlots(),
      ]);

      setStats(statsResponse.data);
      setMySlots(slotsResponse.data.slice(0, 5)); // Show first 5 slots
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRevenue = () => {
    // This is a simplified calculation. In production, fetch from backend
    return mySlots.reduce((sum, slot) => {
      return sum + (slot.totalSlots - slot.availableSlots) * slot.pricePerHour * 24; // Daily estimate
    }, 0);
  };

  const calculateOccupancy = () => {
    if (mySlots.length === 0) return 0;
    const totalSlots = mySlots.reduce((sum, slot) => sum + slot.totalSlots, 0);
    const occupiedSlots = mySlots.reduce((sum, slot) => sum + (slot.totalSlots - slot.availableSlots), 0);
    return ((occupiedSlots / totalSlots) * 100).toFixed(1);
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
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard 🎯</h1>
            <p>Manage your parking business in one place</p>
          </div>
          <Link to="/admin/manage-slots" className="btn btn-primary">
            <PlusCircle size={20} />
            Add New Slot
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#dbeafe' }}>
              <Users size={32} color="#3b82f6" />
            </div>
            <div className="stat-content">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#d1fae5' }}>
              <MapPin size={32} color="#10b981" />
            </div>
            <div className="stat-content">
              <h3>{mySlots.length}</h3>
              <p>My Parking Slots</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f3e8ff' }}>
              <Calendar size={32} color="#8b5cf6" />
            </div>
            <div className="stat-content">
              <h3>{stats.activeBookings}</h3>
              <p>Active Bookings</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fef3c7' }}>
              <DollarSign size={32} color="#f59e0b" />
            </div>
            <div className="stat-content">
              <h3>₹{calculateRevenue().toFixed(0)}</h3>
              <p>Est. Daily Revenue</p>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="dashboard-section">
          <h2>Business Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-header">
                <TrendingUp size={24} color="#10b981" />
                <h3>Occupancy Rate</h3>
              </div>
              <div className="analytics-value">{calculateOccupancy()}%</div>
              <p className="analytics-subtitle">Current occupancy across all slots</p>
            </div>

            <div className="analytics-card">
              <div className="analytics-header">
                <Calendar size={24} color="#3b82f6" />
                <h3>Total Bookings</h3>
              </div>
              <div className="analytics-value">{stats.totalBookings}</div>
              <p className="analytics-subtitle">All-time bookings</p>
            </div>

            <div className="analytics-card">
              <div className="analytics-header">
                <MapPin size={24} color="#8b5cf6" />
                <h3>Average Price</h3>
              </div>
              <div className="analytics-value">
                ₹{mySlots.length > 0 ? (mySlots.reduce((sum, slot) => sum + slot.pricePerHour, 0) / mySlots.length).toFixed(0) : 0}
              </div>
              <p className="analytics-subtitle">Per hour across all slots</p>
            </div>
          </div>
        </div>

        {/* My Parking Slots */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>My Parking Slots</h2>
            <Link to="/admin/manage-slots" className="view-all-link">
              Manage All →
            </Link>
          </div>

          {mySlots.length === 0 ? (
            <div className="empty-state">
              <MapPin size={64} color="#d1d5db" />
              <h3>No parking slots yet</h3>
              <p>Start by adding your first parking area</p>
              <Link to="/admin/manage-slots" className="btn btn-primary">
                Add Parking Slot
              </Link>
            </div>
          ) : (
            <div className="slots-grid">
              {mySlots.map((slot) => (
                <div key={slot._id} className="slot-card">
                  <div className="slot-header">
                    <h3>{slot.name}</h3>
                    <span
                      className="slot-status"
                      style={{
                        backgroundColor: slot.isActive ? '#10b981' : '#6b7280',
                      }}
                    >
                      {slot.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="slot-address">
                    <MapPin size={16} />
                    {slot.address}
                  </p>
                  <div className="slot-stats">
                    <div className="slot-stat">
                      <span className="stat-label">Available</span>
                      <span className="stat-value">
                        {slot.availableSlots}/{slot.totalSlots}
                      </span>
                    </div>
                    <div className="slot-stat">
                      <span className="stat-label">Price</span>
                      <span className="stat-value">₹{slot.pricePerHour}/hr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <Link to="/admin/manage-slots" className="action-card">
              <MapPin size={32} />
              <h3>Manage Slots</h3>
              <p>Add, edit, or remove parking slots</p>
            </Link>
            <Link to="/admin/dashboard" className="action-card">
              <TrendingUp size={32} />
              <h3>View Analytics</h3>
              <p>Check revenue and occupancy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
