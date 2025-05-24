import axios from 'axios';
import api from './api';

const BASE_URL = 'http://localhost:8081/api/events';

export const getAllEvents = () => {
    return axios.get(`${BASE_URL}/getAllEvents`,getAuthHeader());
}

export const getEventById = (id) => api.get(`/events/getEventById/${id}`);

// export const createEvent = (eventData,userId) => {
//     return axios.post(`${BASE_URL}/create/${userId}`,eventData,getAuthHeader());
// }

// export const createEvent = (eventData) => api.post(`/events/create/${userId}`, eventData);

export const createEvent = (eventData) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!token || !userId) {
    throw new Error('User is not authenticated');
  }
  return axios.post(`${BASE_URL}/create/${userId}`, eventData, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};


const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    };  
};

export const filterEvents = (filters) => api.get('/events/search', { params: filters });

export const updateEvent = (id, eventData) => api.put(`/events/update/${id}`, eventData);

export const getEventsByUserId = () => api.get('/events/my-events');

export const getEventsByCategory = (category) => api.get(`/events/getEventsByCategory/${category}`);

export const getEventsByLocation = (location) => api.get(`/events/getEventsByLocation/${location}`);

export const getEventsByDate = (date) => api.get(`/events/getEventsByDate/${date}`);

export const deleteEvent = (id) => api.delete(`/events/delete/${id}`);

