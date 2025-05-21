import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../api/bookingApi';
import '../styles/BookingPage.css';

const BookingForm = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const userId = JSON.parse(localStorage.getItem('userId'));
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert("You must be logged in to book an event.");
      setLoading(false);
      navigate('/login');
      return;
    }


    console.log(userId, token)
    const bookingData = {
      eventId: parseInt(eventId),
      quantity: parseInt(quantity),
    };

    try {
      const response = await createBooking(bookingData, token, userId);
      const successStatus = [200, 201];

      console.log(token)
      if (successStatus.includes(response.status)) {
        setMessage("Booking successful!");
        alert("Booking Successfully ")
        navigate('/events');
      } else {
        setMessage("Booking failed. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Something went wrong. Please try again later.";
      setMessage(errorMsg);
      console.error("Booking Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="booking-form-container">
      <div className="booking-form">
        <h2>🎟 Book an Event</h2>
        <form onSubmit={handleCreateBooking}>
          <div>
            <label>Event Name:</label>
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              required
            >
              <option value="">Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>

          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;