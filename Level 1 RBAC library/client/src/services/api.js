import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this URL according to your backend URL
});

// Add a request interceptor to add the JWT token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
