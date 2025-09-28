import axios, { type AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const baseClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar la autenticación automáticamente
baseClient.interceptors.request.use(async config => {
  const session = await getSession();
  const token = session?.accessToken;

  // Si hay una sesión activa, siempre agregar el token de autorización
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)['Authorization'] =
      `Bearer ${token}`;
  }

  return config;
});

export { baseClient };
