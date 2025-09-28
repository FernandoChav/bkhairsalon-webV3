import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoginRequest } from '@/models/requests';
import { loginSchema } from '@/models/schemas';

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = useCallback(
    async (data: LoginRequest) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult?.ok) {
          toast.success('Bienvenido a BK Hair Salon');
          router.push('/home');
        } else {
          if (signInResult?.error) {
            toast.error(signInResult.error);
          }

          form.setValue('password', '');
          form.setFocus('password');
        }
      } catch {
        toast.error('Error de conexión.');
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, form, router]
  );

  return {
    form,
    onSubmit,
    isLoading,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
  };
};
