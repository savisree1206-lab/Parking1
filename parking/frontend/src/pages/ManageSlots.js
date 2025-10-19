import React, { useState, useEffect } from 'react';
import { parkingAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import AddSlotModal from '../components/AddSlotModal';
import { MapPin, Edit, Trash2, PlusCircle, AlertCircle } from 'lucide-react';
import './ManageSlots.css';

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await parkingAPI.getMySlots();
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm('Are you sure you want to delete this parking slot?')) {
      try {
        await parkingAPI.delete(slotId);
        alert('Parking slot deleted successfully');
        fetchSlots();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete parking slot');
      }
    }
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingSlot(null);
  };

  const handleSlotSaved = () => {
    fetchSlots();
    handleModalClose();
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
    <div className="manage-slots">
      <Navbar />

      <div className="manage-container">
        <div className="manage-header">
          <div>
            <h1>Manage Parking Slots</h1>
            <p>Add, edit, or remove your parking areas</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <PlusCircle size={20} />
            Add New Slot
          </button>
        </div>

        {slots.length === 0 ? (
          <div className="empty-state">
            <MapPin size={64} color="#d1d5db" />
            <h3>No parking slots yet</h3>
            <p>Create your first parking slot to start managing bookings</p>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <PlusCircle size={20} />
              Add Your First Slot
            </button>
          </div>
        ) : (
          <div className="slots-table">
            <table>
              <thead>
                <tr>
                  <th>Name & Location</th>
                  <th>Total Slots</th>
                  <th>Available</th>
                  <th>Price/Hour</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot._id}>
                    <td>
                      <div className="slot-info">
                        <h4>{slot.name}</h4>
                        <p>
                          <MapPin size={14} />
                          {slot.address}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{slot.totalSlots}</span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor:
                            slot.availableSlots > slot.totalSlots / 2
                              ? '#10b981'
                              : slot.availableSlots > 0
                              ? '#f59e0b'
                              : '#ef4444',
                        }}
                      >
                        {slot.availableSlots}
                      </span>
                    </td>
                    <td>
                      <span className="price-tag">₹{slot.pricePerHour}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          slot.isActive ? 'status-active' : 'status-inactive'
                        }`}
                      >
                        {slot.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon btn-edit"
                          onClick={() => handleEditSlot(slot)}
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => handleDeleteSlot(slot._id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Slot Modal */}
      {showAddModal && (
        <AddSlotModal
          slot={editingSlot}
          onClose={handleModalClose}
          onSuccess={handleSlotSaved}
        />
      )}
    </div>
  );
};

export default ManageSlots;
