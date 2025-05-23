import api from './api';


export const createBooking = (data, token,userId) => {
  
  return api.post(`/booking/eventBooking/${userId}`, data,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export const getMyBookings = (id) => api.get(`/booking/getMyBooking/${id}`);

export const getAllBookings = () => api.get('/booking/getAllBooking');

// export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);

// export const searchBookings = (query) => api.get('/bookings/search', { params: { query } });

// export const filterBookings = (filter) => api.get('/bookings/filter', { params: { filter } });
