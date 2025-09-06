import { apiUrl } from '@/services/env';
import { authStorage } from '@/services/storage';
import axios from 'axios';

export const radioApiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
radioApiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
radioApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      authStorage.clearToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
