import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4001/api',
  withCredentials: true, // Envio de cookies: ON
});

export default api;
