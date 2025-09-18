'use client';

import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

import { useState } from 'react';

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

import { useEditUserForm } from './use-edit-user-form';

export const EditUserForm = () => {
  const { form, onSubmit, isLoading } = useEditUserForm();
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid =
    form.formState.isValid &&
    form.getValues('firstName') &&
    form.getValues('lastName') &&
    form.getValues('email') &&
    form.getValues('phoneNumber') &&
    form.getValues('dateOfBirth');

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-gray-900 font-serif">
          Editar Perfil
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Actualiza tus datos personales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            {/* Nombre */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Tu nombre"
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
            {/* Apellido */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Tu apellido"
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
            {/* Correo Electrónico */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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

            {/* Teléfono */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="+56 9 1234 5678"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de Nacimiento */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <FormControl>
                    <DatePicker placeholder="Seleccionar fecha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Botón de Continuar */}
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
              {isLoading ? 'Cargando...' : 'Continuar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
