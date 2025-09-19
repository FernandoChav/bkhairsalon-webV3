import { AxiosError } from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';

import { authClient } from '@/clients/auth-client';
import { ApiResponse, LoginResponse } from '@/models/generics/api';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const data: ApiResponse<LoginResponse> = await authClient.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (data.data) {
            const payload = JSON.parse(atob(data.data.token.split('.')[1]));
            return {
              id: payload.Id,
              email: payload.Email,
              name: `${payload.FirstName}`,
              accessToken: data.data.token,
            };
          }

          return null;
        } catch (error) {
          // si la respuesta no es 20X
          const axiosError = error as AxiosError<ApiResponse>;
          const message =
            axiosError.response?.data?.message ||
            'Error en el inicio de sesión.';
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
