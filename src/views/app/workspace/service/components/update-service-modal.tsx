import {
  HiClock,
  HiCurrencyDollar,
  HiDocumentText,
  HiTag,
} from 'react-icons/hi';

import { FC, useCallback, useMemo, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
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
import { cn } from '@/libs';
import { ServiceResponse } from '@/models/responses';

import { useUpdateService } from '../hooks';

interface UpdateServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceResponse;
}

export const UpdateServiceModal: FC<UpdateServiceModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const { form, fileUpload, imageManager, validation, submission } =
    useUpdateService({
      onSuccess: onClose,
      service,
    });

  // Duration Field Logic
  const formatDuration = useCallback((minutes: number): string => {
    if (minutes === 0) return '0 minutos';
    if (minutes < 60) return `${minutes} minutos`;
    if (minutes === 60) return '1 hora';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  }, []);

  const getDurationSelectValue = useCallback(
    (value: number | undefined): string => {
      return value ? value.toString() : '';
    },
    []
  );

  const handleDurationValueChange = useCallback((value: string): number => {
    return parseInt(value, 10);
  }, []);

  const handleDurationOpenChange = useCallback(
    (
      open: boolean,
      currentValue: number | undefined,
      onBlur: () => void
    ): void => {
      if (!open && !currentValue) {
        onBlur();
      }
    },
    []
  );

  // Time Field Logic
  const timeToMinutes = useCallback(
    (timeString: string): number | undefined => {
      if (!timeString || timeString === '') {
        return undefined;
      }

      const [hours, minutes] = timeString.split(':').map(Number);

      // Validate that both parts are valid numbers
      if (isNaN(hours) || isNaN(minutes)) {
        return undefined;
      }

      const result = hours * 60 + minutes;
      return result;
    },
    []
  );

  const handleTimeChange = useCallback((minutes: number): string => {
    if (isNaN(minutes)) {
      return '';
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const result = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    return result;
  }, []);

  const handleTimeBlur = useCallback((onBlur: () => void) => {
    return () => {
      onBlur();
    };
  }, []);

  // Number Field Logic
  const displayValue = useCallback(
    (value: number | string | undefined): string => {
      if (value === undefined || value === '') return '';
      return value.toString();
    },
    []
  );

  const handleNumberChange = useCallback((value: string): number | string => {
    return value === '' ? '' : parseFloat(value);
  }, []);

  // Image Management Logic
  const [imageCounts, setImageCounts] = useState({
    total: 0,
    existing: 0,
    new: 0,
  });

  const maxFiles = 10;
  const totalImages = imageCounts.total;
  const isAtMaxFiles = totalImages >= maxFiles;

  const uploadTitle = useMemo(() => {
    return isAtMaxFiles
      ? `Límite máximo alcanzado (${maxFiles} fotos)`
      : 'Gestionar fotos del servicio';
  }, [isAtMaxFiles, maxFiles]);

  const uploadPlaceholder = useMemo(() => {
    return `${totalImages}/${maxFiles} fotos (${imageCounts.existing} existentes, ${imageCounts.new} nuevas)`;
  }, [totalImages, maxFiles, imageCounts.existing, imageCounts.new]);

  const previewGridCols = useMemo((): '2' | '3' | '4' | '5' => {
    return totalImages === 1 ? '2' : '4';
  }, [totalImages]);

  // Computed values for form actions
  const isButtonDisabled = submission.isLoading || !submission.isValid;
  const buttonText = submission.isLoading
    ? 'Actualizando Servicio...'
    : !submission.isValid
      ? 'Completa todos los campos'
      : 'Actualizar Servicio';
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 text-sm sm:text-base',
    submission.isValid && !submission.isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-border">
        <DialogTitle className="sr-only">Actualizar Servicio</DialogTitle>
        <DialogDescription className="sr-only">
          Modifica la información del servicio seleccionado
        </DialogDescription>
        <Card className="w-full border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              Actualizar Servicio
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Modifica la información de{' '}
              <span className="font-semibold text-foreground">
                {service.name}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submission.handleSubmit)}
                className="space-y-8"
                autoComplete="on"
              >
                {/* Sección 1: Identidad del Servicio */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Información del Servicio
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Define la identidad y descripción de tu servicio
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Nombre del Servicio */}
                    <div className="grid grid-cols-1 gap-6 items-start">
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
                                  placeholder="Ej: Corte y peinado"
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
                    </div>

                    {/* Descripción */}
                    <div>
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
                                  placeholder="Describe los detalles del servicio..."
                                  className="pl-10 resize-none"
                                  rows={3}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Sección 2: Tiempo y Disponibilidad */}
                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Tiempo y Disponibilidad
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configura la duración y horarios de atención
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Duration Field */}
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Duración
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiClock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                              <Select
                                value={getDurationSelectValue(field.value)}
                                onValueChange={value =>
                                  field.onChange(
                                    handleDurationValueChange(value)
                                  )
                                }
                                onOpenChange={open =>
                                  handleDurationOpenChange(
                                    open,
                                    field.value,
                                    field.onBlur
                                  )
                                }
                              >
                                <SelectTrigger
                                  className="w-full pl-10"
                                  onBlur={field.onBlur}
                                >
                                  <SelectValue placeholder="Selecciona duración" />
                                </SelectTrigger>
                                <SelectContent>
                                  {validation.durationOptions.map(minutes => (
                                    <SelectItem
                                      key={minutes}
                                      value={minutes.toString()}
                                    >
                                      {formatDuration(minutes)}
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

                    {/* Start Time Field */}
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => {
                        const startTimeValue = timeToMinutes(field.value);

                        const handleTimeChangeWrapper = (minutes: number) => {
                          if (isNaN(minutes)) return;
                          field.onChange(handleTimeChange(minutes));
                        };

                        const handleTimeBlurWrapper = handleTimeBlur(
                          field.onBlur
                        );

                        return (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Horario de Inicio
                            </FormLabel>
                            <FormControl>
                              <TimeInput
                                value={startTimeValue}
                                handleChange={handleTimeChangeWrapper}
                                handleBlur={handleTimeBlurWrapper}
                                minHour={8}
                                maxHour={22}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    {/* End Time Field */}
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => {
                        const endTimeValue = timeToMinutes(field.value);

                        const handleTimeChangeWrapper = (minutes: number) => {
                          if (isNaN(minutes)) return;
                          field.onChange(handleTimeChange(minutes));
                        };

                        const handleTimeBlurWrapper = handleTimeBlur(
                          field.onBlur
                        );

                        return (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Horario de Término
                            </FormLabel>
                            <FormControl>
                              <TimeInput
                                value={endTimeValue}
                                handleChange={handleTimeChangeWrapper}
                                handleBlur={handleTimeBlurWrapper}
                                minHour={8}
                                maxHour={22}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>

                {/* Sección 3: Aspectos Financieros */}
                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Configuración Financiera
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Establece precios y comisiones del servicio
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Price Field */}
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
                                placeholder="0.00"
                                className="pl-10"
                                value={displayValue(field.value)}
                                onChange={e =>
                                  field.onChange(
                                    handleNumberChange(e.target.value)
                                  )
                                }
                                onBlur={field.onBlur}
                                name={field.name}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Commission Field */}
                    <FormField
                      control={form.control}
                      name="commissionPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Comisión (%)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiCurrencyDollar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-10"
                                value={displayValue(field.value)}
                                onChange={e =>
                                  field.onChange(
                                    handleNumberChange(e.target.value)
                                  )
                                }
                                onBlur={field.onBlur}
                                name={field.name}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm">
                            Porcentaje de comisión (0-100%)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Discount Field */}
                    <FormField
                      control={form.control}
                      name="discountId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-muted-foreground">
                            Descuento (Opcional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                placeholder="ID de descuento"
                                className="pl-10 border-dashed"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm text-muted-foreground">
                            ID del descuento asociado (opcional)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Sección 4: Recursos Visuales */}
                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Gestión de Fotos del Servicio
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Gestiona las imágenes existentes y agrega nuevas fotos
                      (opcional)
                    </p>
                  </div>

                  <div className="space-y-3">
                    <FileUpload
                      files={fileUpload.files}
                      existingPhotos={service.photos || []}
                      markedForDeletion={imageManager.existingImagesToDelete}
                      maxFiles={maxFiles}
                      accept="image/*"
                      multiple={true}
                      title={uploadTitle}
                      description="Arrastra las imágenes aquí o haz clic para seleccionar"
                      placeholder={uploadPlaceholder}
                      showPreview={true}
                      previewGridCols={previewGridCols}
                      handleAddFiles={fileUpload.handleAddFiles}
                      handleRemoveFile={fileUpload.handleRemoveFile}
                      handleMarkExistingForDeletion={
                        imageManager.handleMarkExistingForDeletion
                      }
                      handleUnmarkExistingForDeletion={
                        imageManager.handleUnmarkExistingForDeletion
                      }
                      onCountChange={setImageCounts}
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-6 border-t border-border">
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
      </DialogContent>
    </Dialog>
  );
};
