import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import { getSession } from 'next-auth/react';

import { authClient } from './auth-client';

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

// Interceptor para manejar errores de autenticación y refresh automático
baseClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await getSession();
        if (!session?.accessToken) {
          throw error;
        }

        const refreshResponse = await authClient.refreshToken();

        if (refreshResponse.data?.token) {
          // Reintentar la petición original con el nuevo token
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers['Authorization'] =
            `Bearer ${refreshResponse.data.token}`;
          return baseClient(originalRequest);
        } else {
          throw new Error('Invalid refresh response');
        }
      } catch (refreshError) {
        // Si el refresh falla, emitir evento para que AuthWrapper maneje el toast y logout
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-error'));
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { baseClient };
