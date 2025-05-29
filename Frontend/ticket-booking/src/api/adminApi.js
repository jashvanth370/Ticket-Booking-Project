import { create } from 'zustand';
import api from './api';


// 🔐 Utility: Get Auth Header
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// 👤 API: Admin Login
export const adminLogin = async (credentials, set) => {
  try {
    const response = await api.post('/login/admin', credentials);
    const { userId, token, role } = response.data;

    // Update global state
    set({ userId, token, role });

    // Save to localStorage
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    return response;
  } catch (error) {
    console.error('Admin login failed:', error);
    throw error;
  }
};


// 🧾 API: Register User
export const register = (userData) => {
  return api.post('/users/register', userData);
};


// 🏪 Zustand Store: Auth
export const useAuthStore = create((set) => ({
  userId: null,
  token: null,
  role: null,

  login: async (credentials) => {
    const response = await adminLogin(credentials, set);
    return response;
  },
}));
