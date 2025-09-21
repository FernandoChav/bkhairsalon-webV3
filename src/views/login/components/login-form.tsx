'use client';

import { HiEye, HiEyeOff, HiLockClosed, HiMail } from 'react-icons/hi';

import { FC, useState } from 'react';

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

  // Check if form is valid and all required fields are filled
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
            autoComplete="off"
          >
            {/* Correo Electrónico */}
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
                        autoComplete="off"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contraseña */}
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
                        placeholder="Mínimo 8 caracteres"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

            {/* Botón de Inicio */}
            <Button
              type="submit"
              className={cn(
                'w-full text-white shadow-lg transition-all duration-300 transform',
                isFormValid && !isLoading
                  ? 'bg-pink-500 hover:bg-pink-600 hover:scale-[1.02] hover:shadow-xl'
                  : 'bg-gray-400 cursor-not-allowed'
              )}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Form>

        {/* Enlace a Registro */}
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">¿No tienes cuenta? </span>
          <a
            href="/Register"
            className="font-medium text-pink-500 hover:text-pink-600 hover:underline transition-colors duration-200"
          >
            Crear una cuenta
          </a>
        </div>

        {/* Enlace al Olvidé Contraseña //TODO: validar requerimiento funcional
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-500">¿Olvidaste tu contraseña? </span>
          <a
            href="/Forgot-Password"
            className="font-medium text-pink-500 hover:text-pink-600 hover:underline transition-colors duration-200"
          >
            Recuperar mi contraseña
          </a>
        </div>*/}
      </CardContent>
    </Card>
  );
};
