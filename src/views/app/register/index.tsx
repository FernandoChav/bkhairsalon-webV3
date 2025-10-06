'use client';

import {
  HiEye,
  HiEyeOff,
  HiLockClosed,
  HiMail,
  HiPhone,
  HiUser,
} from 'react-icons/hi';

import { FC } from 'react';

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
import { DatePicker, PhoneInput } from '@/components/ui';
import { cn } from '@/libs';

import { useRegisterView } from './hooks';

export const RegisterView: FC = () => {
  const {
    form,
    handleSubmit,
    handlePasswordToggle,
    handleConfirmPasswordToggle,
    isLoading,
    isValid,
    showPassword,
    showConfirmPassword,
  } = useRegisterView();

  // Computed values
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 h-11',
    isValid && !isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );
  const buttonText = isLoading ? 'Creando cuenta...' : 'Crear cuenta';
  const isButtonDisabled = !isValid || isLoading;
  const passwordInputType = showPassword ? 'text' : 'password';
  const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';
  const passwordToggleIcon = showPassword ? (
    <HiEyeOff className="h-4 w-4 text-muted-foreground" />
  ) : (
    <HiEye className="h-4 w-4 text-muted-foreground" />
  );
  const confirmPasswordToggleIcon = showConfirmPassword ? (
    <HiEyeOff className="h-4 w-4 text-muted-foreground" />
  ) : (
    <HiEye className="h-4 w-4 text-muted-foreground" />
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
        <CardDescription>
          Completa los datos para registrarte en BK Hair Salon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
            autoComplete="on"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Nombre
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Tu nombre"
                          className="pl-10 h-10"
                          autoComplete="given-name"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Apellido
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Tu apellido"
                          className="pl-10 h-10"
                          autoComplete="family-name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Fecha de Nacimiento
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        placeholder="Tu fecha de nacimiento"
                        className="h-10"
                        allowFutureDates={false}
                        allowPastDates={true}
                        required={true}
                        maxAge={120}
                        minAge={0}
                        captionLayout="dropdown"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Teléfono
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiPhone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <PhoneInput
                          placeholder="+56 9 1234 5678"
                          autoComplete="tel"
                          className="h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 items-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="tu@correo.com"
                          className="pl-10 h-10"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={passwordInputType}
                          placeholder="Mínimo 8 caracteres"
                          className="pl-10 pr-10 h-10"
                          autoComplete="new-password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                          onClick={handlePasswordToggle}
                        >
                          {passwordToggleIcon}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Confirmar Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiLockClosed className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type={confirmPasswordInputType}
                          placeholder="Repite tu contraseña"
                          className="pl-10 pr-10 h-10"
                          autoComplete="new-password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                          onClick={handleConfirmPasswordToggle}
                        >
                          {confirmPasswordToggleIcon}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className={buttonClassName}
                disabled={isButtonDisabled}
              >
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Inicia sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
