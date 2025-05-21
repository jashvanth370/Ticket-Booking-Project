import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/wishlist';


const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserWishlist = (userId) => {
  return axios.get(`${BASE_URL}/getWishlist/user/${userId}`, getAuthHeader());
};

export const removeWishlistItem = (wishlistId) => {
  return axios.delete(`${BASE_URL}/removeWishlist/${wishlistId}`, getAuthHeader());
};

export const createWishlistItem = (data) => {
  return axios.post(`${BASE_URL}/createWishlist`, data, getAuthHeader());
};

