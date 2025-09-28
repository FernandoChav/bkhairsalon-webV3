'use client';

import {
  HiClock,
  HiCurrencyDollar,
  HiDocumentText,
  HiPhotograph,
  HiTag,
} from 'react-icons/hi';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/shadcn';

import { CategorySelector, ImageUpload } from './components';
import { useCreateServiceForm } from './hooks';

export const CreateServiceView: FC = () => {
  const { form, onSubmit, isLoading, fileUpload, isValid } =
    useCreateServiceForm();

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Crear Nuevo Servicio</CardTitle>
        <CardDescription>
          Completa la información para agregar un nuevo servicio a tu catálogo
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="on"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda - Información básica */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nombre del Servicio
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="ej. Corte y Peinado Premium"
                            className="pl-10 h-10"
                            autoComplete="off"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Descripción
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HiDocumentText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            placeholder="Describe detalladamente qué incluye este servicio..."
                            className="pl-10 min-h-[100px]"
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Categoría
                      </FormLabel>
                      <FormControl>
                        <CategorySelector
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Columna derecha - Detalles del servicio */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Duración (minutos)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="number"
                              min="1"
                              placeholder="60"
                              className="pl-10 h-10"
                              {...field}
                              onChange={e =>
                                field.onChange(parseInt(e.target.value, 10))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Precio ($)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              placeholder="25.00"
                              className="pl-10 h-10"
                              {...field}
                              onChange={e =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Hora de Inicio
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="time"
                              className="pl-10 h-10"
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
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Hora de Fin
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="time"
                              className="pl-10 h-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="commissionPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Porcentaje de Comisión
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            placeholder="15.00"
                            className="pl-10 h-10"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Porcentaje de comisión que se aplicará a este servicio
                        (0-100%)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        ID de Descuento (Opcional)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="Dejar vacío si no aplica descuento"
                            className="pl-10 h-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        ID del descuento asociado a este servicio (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sección de fotos - abarca las dos columnas */}
            <div className="space-y-2">
              <FormLabel className="text-sm font-medium">
                Fotos del Servicio
              </FormLabel>
              <div className="relative">
                <HiPhotograph className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <div className="pl-10">
                  <ImageUpload
                    files={fileUpload.files}
                    onFileAdd={fileUpload.addFiles}
                    onFileRemove={fileUpload.removeFile}
                    maxFiles={10}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-primary-foreground shadow-lg transition-all duration-300 h-11"
              disabled={isLoading || !isValid}
            >
              {isLoading ? 'Creando Servicio...' : 'Crear Servicio'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
