// src/store/AuthStore.js
import { create } from 'zustand'


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
              console.log("Logging out...");
      
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      set({ userId: null, token: null, role: null });
      console.log("User logged out successfully.");
      
    },
  }),
);

export default useAuthStore;
