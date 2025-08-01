
import axios from 'axios';


const API = axios.create({
  baseURL: 'https://mealy-back-end.onrender.com', 
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
