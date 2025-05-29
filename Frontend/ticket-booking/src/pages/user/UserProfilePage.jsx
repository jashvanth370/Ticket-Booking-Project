import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🧭 Import useNavigate
import { userEditById } from '../../api/userApi'; 
import { jwtDecode } from 'jwt-decode';
import '../../styles/UserProfile.css';

const UserProfilePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // initialize navigation

  if (!token) return <p>Please log in to see your profile.</p>;

  let decoded = {};
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token", err);
    return <p>Invalid token</p>;
  }

  const { name, email, role, created_at, id } = decoded;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name, email });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userEditById(id, formData);
      alert('Profile updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Update failed');
    }
  };

  const handleBookingClick = () => {
    navigate('/admin-dashboard'); // 🔁 change to your booking route
  };

  const handleEventsClick = () => {
    navigate('/my-events'); // 🔁 change to your my-events route
  };

  return (
    <div className="user-profile">
      <h2>👤 My Profile</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Created At:</strong> {new Date(created_at).toLocaleString()}</p>
      <p><strong>User ID:</strong> {id}</p>

      <button onClick={openModal}>Edit</button>
      <button onClick={handleBookingClick}>Booking Details</button>
      <button onClick={handleEventsClick}>My Events</button>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <br />
              <label>
                Email:
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <br />
              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
