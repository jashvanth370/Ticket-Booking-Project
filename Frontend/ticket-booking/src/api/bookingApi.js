import api from './api';
import axios from 'axios';


export const createBooking = (data, token, userId, eventId) => {

  return api.post(`/booking/eventBooking/${userId}/${eventId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export const createStripeSession = async (bookingData, token) => {
  
  if (!token) {
    throw new Error('User is not authenticated');
  }
  return axios.post(
    'http://localhost:8081/api/payments/create-checkout-session',
    bookingData,
    {
      
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMyBookings = (id) => api.get(`/booking/getMyBooking/${id}`);

export const getAllBookings = () => api.get('/booking/getAllBooking');

// export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);

// export const searchBookings = (query) => api.get('/bookings/search', { params: { query } });

// export const filterBookings = (filter) => api.get('/bookings/filter', { params: { filter } });
