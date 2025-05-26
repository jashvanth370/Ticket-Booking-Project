import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("bookingId");

  useEffect(() => {
    const confirmPayment = async () => {
      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `http://localhost:8080/api/bookings/${bookingId}/confirm-payment`,
          { paymentMethod: "stripe" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Payment successful! Your booking is confirmed.");
        navigate("/my-bookings");

      } catch (err) {
        console.error(err);
        alert("Failed to confirm payment.");
      }
    };

    if (bookingId) {
      confirmPayment();
    }
  }, [bookingId, navigate]);

  return <h2>Processing Payment Confirmation...</h2>;
};

export default PaymentSuccess;
