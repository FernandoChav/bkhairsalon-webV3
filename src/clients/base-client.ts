import axios, { type AxiosInstance, AxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

import type { CustomAxiosRequestConfig } from '@/types/custom-axios';

// Base URL - ajustar según el entorno
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Crear instancia base de axios
export const baseClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar la autenticación
baseClient.interceptors.request.use(async config => {
  const customConfig = config as CustomAxiosRequestConfig;

  if (customConfig.requiresAuth) {
    const session = await getSession();
    const token = session?.accessToken;

    if (!token) {
      const error = new Error('Usuario no autenticado: token no disponible');
      (error as any).code = 'NO_TOKEN';
      throw error;
    }

    config.headers = config.headers ?? {};
    (config.headers as any)['Authorization'] = `Bearer ${token}`;
  }

  return config;
});
