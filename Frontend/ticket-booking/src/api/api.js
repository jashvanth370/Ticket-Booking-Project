import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;