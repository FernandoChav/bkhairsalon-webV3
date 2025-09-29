/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      /** The user's unique identifier */
      id?: string;
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    exp?: number;
    refreshAttempted?: boolean;
  }
}

declare module 'next-auth/core/types' {
  interface CallbacksOptions {
    signIn?: (params: {
      user: any;
      account: any;
      profile?: any;
      email?: any;
      credentials?: any;
    }) => Promise<boolean | string>;
  }
}

export interface AuthError {
  message: string;
  type:
    | 'CredentialsSignin'
    | 'ValidationError'
    | 'NetworkError'
    | 'UnknownError';
  details?: {
    validationErrors?: Record<string, string[]>;
    statusCode?: number;
  };
}
