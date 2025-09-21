import axios, { type AxiosInstance } from 'axios';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const baseClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { baseClient };
