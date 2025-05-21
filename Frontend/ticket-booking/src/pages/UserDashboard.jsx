import React, { useEffect, useState } from 'react';
import { getMyBookings } from '../api/bookingApi';
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = JSON.parse(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        console.log(userId)
        const response = await getMyBookings(userId, token);
        setBookings(response.data || []);
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching user bookings:", err);
        setError("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [userId, token]);

  return (
    <div className="user-dashboard">
      <h2>🎫 My Bookings</h2>

      {loading ? (
        <p>Loading your bookings...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="user-bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event Title</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Status</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.event.title || 'N/A'}</td>
                <td>{booking.quantity}</td>
                <td>{booking.event.location}</td>
                <td>{booking.bookingStatus || 'Pending'}</td>
                <td>{new Date(booking.bookingTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;
