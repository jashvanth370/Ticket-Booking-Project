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
  console.log("gfjhghkjhjk")

  if (!token || !userId) {
    throw new Error('User is not authenticated');
  }

  const formData = new FormData();

  // Wrap your eventData JSON inside a Blob with type application/json and append as 'eventRequest'
  formData.append('eventRequest', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));

  // Append image file separately (make sure eventData.imageData is a File object)
  if (eventData.image) {
    formData.append('image', eventData.image);
    console.log("image appened")
  }

  return axios.post(`${BASE_URL}/create/${userId}`, formData, {
    headers: {
      //  Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // let axios set boundary automatically
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

