import axios, { type AxiosInstance } from 'axios';

const createHttpClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    },
  );

  return client;
};

export const waveApiClient = createHttpClient(
  import.meta.env.VITE_WAVE_API_URL || 'http://localhost:3000',
);
