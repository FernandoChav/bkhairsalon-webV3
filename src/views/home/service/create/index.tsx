'use client';

import {
  HiClock,
  HiCurrencyDollar,
  HiDocumentText,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/shadcn';
import { FileUpload, TimeInput } from '@/components/ui';

import { useCreateServiceForm } from './hooks';

export const CreateServiceView: FC = () => {
  const {
    form,
    onSubmit,
    isLoading,
    fileUpload,
    isValid,
    durationOptions,
    categories,
    categoriesLoading,
    categoriesError,
  } = useCreateServiceForm();

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
                            placeholder="Nombre del servicio"
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
                            placeholder="Descripción del servicio"
                            className="pl-10 min-h-[40px]"
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
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isLoading || categoriesLoading}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                categoriesLoading
                                  ? 'Cargando categorías...'
                                  : categoriesError
                                    ? 'Error al cargar categorías'
                                    : 'Selecciona una categoría'
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                <span className="text-sm">
                                  {category.fullPath}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                            <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                            <Select
                              value={field.value ? field.value.toString() : ''}
                              onValueChange={value => {
                                const duration = parseInt(value, 10);
                                field.onChange(duration);
                              }}
                              onOpenChange={open => {
                                if (!open && !field.value) {
                                  field.onBlur();
                                }
                              }}
                            >
                              <SelectTrigger className="pl-10 !h-10 w-full">
                                <SelectValue placeholder="Selecciona duración" />
                              </SelectTrigger>
                              <SelectContent>
                                {durationOptions.map(minutes => (
                                  <SelectItem
                                    key={minutes}
                                    value={minutes.toString()}
                                  >
                                    {minutes === 0
                                      ? '0 minutos'
                                      : minutes < 60
                                        ? `${minutes} minutos`
                                        : minutes === 60
                                          ? '1 hora'
                                          : `${Math.floor(minutes / 60)}h ${minutes % 60}m`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                              placeholder="Precio del servicio"
                              className="pl-10 h-10"
                              {...field}
                              onChange={e => {
                                const value = e.target.value;
                                field.onChange(
                                  value === '' ? undefined : parseFloat(value)
                                );
                              }}
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
                          Horario de Inicio
                        </FormLabel>
                        <FormControl>
                          <TimeInput
                            value={
                              field.value
                                ? parseInt(field.value.split(':')[0]) * 60 +
                                  parseInt(field.value.split(':')[1])
                                : undefined
                            }
                            onChange={minutes => {
                              const hours = Math.floor(minutes / 60);
                              const mins = minutes % 60;
                              const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                              field.onChange(timeString);
                            }}
                            minHour={8}
                            maxHour={22}
                          />
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
                          Horario de Término
                        </FormLabel>
                        <FormControl>
                          <TimeInput
                            value={
                              field.value
                                ? parseInt(field.value.split(':')[0]) * 60 +
                                  parseInt(field.value.split(':')[1])
                                : undefined
                            }
                            onChange={minutes => {
                              const hours = Math.floor(minutes / 60);
                              const mins = minutes % 60;
                              const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
                              field.onChange(timeString);
                            }}
                            minHour={8}
                            maxHour={22}
                          />
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
                            placeholder="Porcentaje de comisión"
                            className="pl-10 h-10"
                            {...field}
                            onChange={e => {
                              const value = e.target.value;
                              field.onChange(
                                value === '' ? undefined : parseFloat(value)
                              );
                            }}
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
                            placeholder="ID de descuento (opcional)"
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
              <FileUpload
                files={fileUpload.files}
                onFileAdd={fileUpload.addFiles}
                onFileRemove={fileUpload.removeFile}
                maxFiles={10}
                accept="image/*"
                multiple={true}
                title={
                  fileUpload.files.length >= 10
                    ? 'Límite máximo alcanzado (10 fotos)'
                    : 'Sube fotos de tu servicio'
                }
                description="Arrastra las imágenes aquí o haz clic para seleccionar"
                placeholder={`${fileUpload.files.length}/10 fotos subidas`}
                showPreview={true}
                previewGridCols="4"
              />
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
