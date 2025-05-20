import api from './api';

export const createBooking = (data) => api.post('/booking', data);

export const getMyBookings = () => api.get('/bookings/me');
