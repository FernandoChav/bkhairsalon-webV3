'use client';

import { FC } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
} from '@/components/shadcn';
import { cn } from '@/libs';

import {
  CategoryField,
  CommissionField,
  DescriptionField,
  DiscountField,
  DurationField,
  EndTimeField,
  FileUploadField,
  NameField,
  PriceField,
  StartTimeField,
} from './components';
import { useCreateServiceView } from './hooks';

export const CreateServiceView: FC = () => {
  const { form, categories, fileUpload, validation, submission } =
    useCreateServiceView();

  // Computed values for form actions
  const isButtonDisabled = submission.isLoading || !submission.isValid;
  const buttonText = submission.isLoading
    ? 'Creando Servicio...'
    : !submission.isValid
      ? 'Completa todos los campos'
      : 'Crear Servicio';
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 text-sm sm:text-base',
    submission.isValid && !submission.isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">
          Crear Nuevo Servicio
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Completa la información para agregar un nuevo servicio a tu catálogo
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
                {/* Primera fila: Categoría y Nombre */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <CategoryField form={form} categories={categories} />
                  <NameField form={form} />
                </div>

                {/* Segunda fila: Descripción (ancho completo) */}
                <div>
                  <DescriptionField form={form} />
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
                <DurationField
                  form={form}
                  durationOptions={validation.durationOptions}
                />
                <StartTimeField form={form} />
                <EndTimeField form={form} />
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
                <PriceField form={form} />
                <CommissionField form={form} />
                <DiscountField form={form} />
              </div>
            </div>

            {/* Sección 4: Recursos Visuales */}
            <div className="space-y-6">
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Fotos del Servicio
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Agrega imágenes que muestren tu trabajo
                </p>
              </div>

              <FileUploadField
                files={fileUpload.files}
                handleAddFiles={fileUpload.handleAddFiles}
                handleRemoveFile={fileUpload.handleRemoveFile}
                handleClearFiles={fileUpload.handleClearFiles}
              />
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
  );
};
