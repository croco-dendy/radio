import { apiUrl } from '@/services/env';
import axios from 'axios';

export const radioApiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
