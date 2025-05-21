import api from './api';
import { useNavigate } from 'react-router-dom';


export const login = (credentials) => api.post('/auth/login', credentials);

export const register = (userData) => api.post('/auth/register', userData);

