import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoginRequest } from '@/models/requests';
import { loginSchema } from '@/models/schemas';

interface UseLoginViewReturn {
  // Values
  form: ReturnType<typeof useForm<LoginRequest>>;
  isLoading: boolean;
  isValid: boolean;
  isPasswordVisible: boolean;
  // Handlers
  handleSubmit: (data: LoginRequest) => void;
  handlePasswordToggle: () => void;
}

export const useLoginView = (): UseLoginViewReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const watchedValues = useWatch({ control: form.control });

  const handleSubmit = useCallback(
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
          router.push('/workspace');
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

  const handlePasswordToggle = useCallback(() => {
    setIsPasswordVisible(prev => !prev);
  }, []);

  const isValid =
    form.formState.isValid &&
    Boolean(watchedValues?.email && watchedValues?.password);

  return {
    // Values
    form,
    isLoading,
    isValid,
    isPasswordVisible,
    // Handlers
    handleSubmit,
    handlePasswordToggle,
  };
};
