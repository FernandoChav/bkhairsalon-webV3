import type { AxiosError } from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { LoginResponse } from '@/models/responses';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            'El correo electrónico y la contraseña son requeridos'
          );
        }

        try {
          const data: ApiResponse<LoginResponse> = await authClient.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (data.data?.token) {
            const payload = JSON.parse(atob(data.data.token.split('.')[1]));
            return {
              id: payload.Id,
              email: payload.Email,
              name: `${payload.FirstName}`,
              accessToken: data.data.token,
            };
          }

          throw new Error('Error en la respuesta del servidor');
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          const message = axiosError.response?.data.message;

          throw message
            ? new Error(message)
            : new Error('No hay conexión con el servidor');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        // Decode JWT to get expiration time
        if (user.accessToken) {
          try {
            const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
            token.exp = payload.exp;
            token.refreshAttempted = false;
          } catch {
            // Token inválido, se manejará en la validación de expiración
          }
        }
      }

      // ✅ Manejar actualizaciones de sesión
      if (trigger === 'update' && session) {
        // Actualizar los datos del usuario en el token
        if (session.user?.name) {
          token.name = session.user.name;
        }
        if (session.user?.email) {
          token.email = session.user.email;
        }

        return token;
      }

      // Check if token is expired or about to expire (5 minutes before)
      const now = Date.now() / 1000;
      const fiveMinutesFromNow = now + 5 * 60;

      if (
        token.exp &&
        typeof token.exp === 'number' &&
        token.exp <= fiveMinutesFromNow &&
        !token.refreshAttempted
      ) {
        try {
          // Marcar que ya intentamos refresh para evitar loops
          token.refreshAttempted = true;

          const refreshResponse = await authClient.refreshToken();

          if (refreshResponse.data?.token) {
            // Actualizar token con el nuevo
            token.accessToken = refreshResponse.data.token;

            // Decodificar el nuevo token para obtener nueva expiración
            try {
              const payload = JSON.parse(
                atob(refreshResponse.data.token.split('.')[1])
              );
              token.exp = payload.exp;
              token.refreshAttempted = false; // Reset para futuros refresh
            } catch {
              // Token inválido, se manejará en la validación de expiración
            }
          } else {
            // Si el refresh falla, limpiar token
            return {};
          }
        } catch {
          // Si hay error en refresh, limpiar token para forzar re-autenticación
          return {};
        }
      }

      // Si el token ya expiró completamente, limpiar
      if (
        token.exp &&
        typeof token.exp === 'number' &&
        Date.now() >= token.exp * 1000
      ) {
        return {}; // Return empty token to force re-authentication
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;

        if (token.name) {
          session.user.name = token.name as string;
        }
        if (token.email) {
          session.user.email = token.email as string;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
