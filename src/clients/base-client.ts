import axios, { type AxiosInstance } from 'axios';

// Base URL - ajustar según el entorno
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Crear instancia base de axios
const baseClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { baseClient };
