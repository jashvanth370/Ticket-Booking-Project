import axios from "axios";

const BASE_URL="http://localhost:8081/api/users";

export const getUserById = (userId) =>{
    const token = localStorage.getItem('token');
    
    return axios.get(`${BASE_URL}/${userId}`,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
}

export const userEditById = (userId,userData) =>{
    const token = localStorage.getItem('token');
    
    return axios.put(`${BASE_URL}/update/${userId}`,userData,{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
}