import axios from "axios"

const BASE_URL = 'http://localhost:8081/api/review';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    };  
};

export const createReview = (data) =>{
    return axios.post(`${BASE_URL}/createReview`,data , getAuthHeader());
}

export const getAllReview = () =>{
    return axios.get(`${BASE_URL}/getAllReview`,getAuthHeader());
}