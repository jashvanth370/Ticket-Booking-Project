import React, { useEffect, useState } from 'react';
import { getAllBookings, getMyBookings } from '../api/bookingApi';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId')
        const response = await getMyBookings(userId);
        console.log(response.data)
        setBookings(response.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* {bookings.map((booking,index)=>(
           <th>Hi {booking.user.role} , {booking.user.name}</th>
          //  <th>ID number is : {bookings.user.id}</th>
      ))}
       */}
      <h2>📋 My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event ID</th>
              <th>Quantity</th>
              <th>Booking Status</th>
              <th>Booked At</th>
              <th>Total amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
                <tr key={booking.id}>
                
                <td>{booking.id}</td>
                <td>{booking.event.id}</td>
                <td>{booking.quantity}</td>
                <td>{booking.bookingStatus || 'Pending'}</td>
                <td>{new Date(booking.bookingTime).toLocaleString()}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
