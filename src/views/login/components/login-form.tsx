import { HiEye, HiEyeOff, HiLockClosed, HiMail } from 'react-icons/hi';

import { FC, useState } from 'react';

import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/shadcn';
import { cn } from '@/libs';
import { useLoginForm } from '@/views/login/hooks';

export const LoginForm: FC = () => {
  const { form, onSubmit, isLoading } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  // Validate form completion
  const isFormValid =
    form.formState.isValid &&
    form.getValues('email') &&
    form.getValues('password');

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-border bg-card">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-light text-center text-card-foreground font-serif">
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Inicia en tu cuenta para agendar tu cita en BK Hair Salon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="on"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="tu@correo.com"
                        className="pl-10"
                        autoComplete="email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Tu contraseña"
                        className="pl-10 pr-10"
                        autoComplete="current-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <HiEyeOff className="h-4 w-4" />
                        ) : (
                          <HiEye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={cn(
                'w-full text-primary-foreground shadow-lg transition-all duration-300 h-11',
                isFormValid && !isLoading
                  ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
                  : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
              )}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">¿No tienes cuenta? </span>
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Crear una cuenta
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
