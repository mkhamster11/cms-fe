
// src/api/axios.ts
import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8000/api/v1/',
  baseURL:'https://localhost.manikanta.uk/api/v1/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
