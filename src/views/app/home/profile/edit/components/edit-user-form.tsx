'use client';

import { UseFormReturn } from 'react-hook-form';
import { HiPhone, HiUser } from 'react-icons/hi';

import { FC } from 'react';

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
import { EditUserForm as EditUserFormType } from '@/models/schemas';

interface EditUserFormProps {
  form: UseFormReturn<EditUserFormType>;
  canSubmit: boolean;
  isSubmitting: boolean;
  handleFormSubmit: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({
  form,
  canSubmit,
  isSubmitting,
  handleFormSubmit,
}) => {
  // Computed values
  const buttonText = isSubmitting
    ? 'Actualizando...'
    : canSubmit
      ? 'Actualizar Perfil'
      : 'Sin cambios para guardar';
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 h-11',
    canSubmit && !isSubmitting
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );
  const isButtonDisabled = !canSubmit || isSubmitting;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
        <CardDescription>
          Actualiza tus datos personales en BK Hair Salon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
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
      </CardContent>
    </Card>
  );
};
