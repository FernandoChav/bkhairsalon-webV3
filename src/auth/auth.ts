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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        // Decode JWT to get expiration time
        if (user.accessToken) {
          try {
            const payload = JSON.parse(atob(user.accessToken.split('.')[1]));
            token.exp = payload.exp;
          } catch (error) {
            console.error('Error decoding JWT:', error);
          }
        }
      }

      // Check if token is expired
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
