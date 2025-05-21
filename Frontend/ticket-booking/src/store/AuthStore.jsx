// src/store/AuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  (set) => ({
    userId: null,
    token: null,
    role: null,

    login: ({ userId, token, role }) => {
      set({ userId, token, role });
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    },

    logout: () => {
      set({ userId: null, token: null, role: null });
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  }),
);

export default useAuthStore;
