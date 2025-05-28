import axios from 'axios';
import api from './api';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const BASE_URL = 'http://localhost:8081/api/events';

export const getAllEvents = () => {
  const token = localStorage.getItem('token');
  // if (!token) {
  //   console.error("No token found. User might not be logged in.");
  //   return Promise.reject("No token");
  // }
  return axios.get(`${BASE_URL}/getAllEvents`);
};


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

  const formData = new FormData();
  formData.append('title', eventData.title);
  formData.append('description', eventData.description);
  formData.append('location', eventData.location);
  formData.append('happening_date', eventData.happening_date);
  formData.append('category', eventData.category);
  formData.append('price', eventData.price);
  formData.append('available_tickets', eventData.available_tickets);
  formData.append('total_tickets', eventData.total_tickets);
  formData.append('image', eventData.image); // Must be a File object

  return axios.post(`${BASE_URL}/create/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}


export const updateEvent = (id, eventData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("No token found. User might not be logged in.");
    return Promise.reject("No token");
  }
  return axios.put(`${BASE_URL}/update/${id}`, eventData, getAuthHeader());
}




export const filterEvents = (filters) => api.get('/events/search', { params: filters });



export const getEventsByUserId = () => api.get('/events/my-events');

export const getEventsByCategory = (category) => api.get(`/events/getEventsByCategory/${category}`);

export const getEventsByLocation = (location) => api.get(`/events/getEventsByLocation/${location}`);

export const getEventsByDate = (date) => api.get(`/events/getEventsByDate/${date}`);

export const deleteEvent = (id) => api.delete(`/events/delete/${id}`);

