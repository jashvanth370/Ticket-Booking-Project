import api from './api';

export const getAllEvents = () => api.get('/events/getAllEvents');

export const getEventById = (id) => api.get(`/events/getEventById/${id}`);

export const createEvent = (eventData) => api.post('/events/create', eventData);

export const filterEvents = (filters) => api.get('/events/search', { params: filters });

export const updateEvent = (id, eventData) => api.put(`/events/update/${id}`, eventData);

export const getEventsByUserId = () => api.get('/events/my-events');

export const getEventsByCategory = (category) => api.get(`/events/getEventsByCategory/${category}`);

export const getEventsByLocation = (location) => api.get(`/events/getEventsByLocation/${location}`);

export const getEventsByDate = (date) => api.get(`/events/getEventsByDate/${date}`);

export const deleteEvent = (id) => api.delete(`/events/delete/${id}`);