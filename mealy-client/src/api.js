// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mealy-back-end.onrender.com', // or localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom function to attach token
export const attachToken = (token) => {
  API.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};

export default API;
