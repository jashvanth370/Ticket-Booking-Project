import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { createBooking } from '../../api/bookingApi';
import { createStripeSession } from '../../api/bookingApi';
import '../../styles/BookingPage.css';
import { triggerNotification } from '../../components/triggerNotification';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_YourStripePublicKey"); // Replace with your real key

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  const handleCreateBooking = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      alert("Please log in first.");
      triggerNotification("Booking successfully!", "success");
      navigate('/login');
      return;
    }

    const bookingData = { quantity: parseInt(quantity) };

    try {
      setLoading(true);

      // Step 1: Create booking
      const bookingRes = await createBooking(bookingData, token, userId, event.id);
      const booking = bookingRes.data;

      // Step 2: Create Stripe session
      const stripe = await stripePromise;

      const sessionRes = await createStripeSession({
        bookingId: booking.bookingId,
        amount: booking.totalAmount,
        eventName: booking.eventTitle,
      }, token);

      const sessionId = sessionRes.data.sessionId;

      // Step 3: Redirect to Stripe
      await stripe.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error(error);
      setMessage("Error processing your booking or payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form">
        <h2>🎟 Book: {event?.title}</h2>
        <p><strong>Price:</strong> ${event?.price || 0}</p>
        <p><strong>Available Tickets:</strong> {event?.available_tickets || 'N/A'}</p>

        <form onSubmit={handleCreateBooking}>
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
            {loading ? 'Booking...' : 'Book Now & Pay'}
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;
