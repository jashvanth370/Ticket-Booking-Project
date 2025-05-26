import api from './api';
import { useNavigate } from 'react-router-dom';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};


export const login = (credentials) => api.post('/auth/login', credentials);

export const register = (userData) => {
  return api.post('/users/register', userData); 
};


