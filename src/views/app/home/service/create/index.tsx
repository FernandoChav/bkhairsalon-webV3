'use client';

import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
} from '@/components/shadcn';

import {
  ServiceCategory,
  ServiceCommission,
  ServiceDescription,
  ServiceDiscount,
  ServiceDuration,
  ServiceEndTime,
  ServiceFileUpload,
  ServiceFormActions,
  ServiceName,
  ServicePrice,
  ServiceStartTime,
} from './components';
import { useCreateServiceView } from './hooks';

export const CreateServiceView: FC = () => {
  const { form, categories, fileUpload, validation, submission } =
    useCreateServiceView();

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
            onSubmit={form.handleSubmit(submission.onSubmit)}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ServiceCategory form={form} categories={categories} />
                  <ServiceName form={form} />
                </div>

                {/* Segunda fila: Descripción (ancho completo) */}
                <div>
                  <ServiceDescription form={form} />
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
                <ServiceDuration
                  form={form}
                  durationOptions={validation.durationOptions}
                />
                <ServiceStartTime form={form} />
                <ServiceEndTime form={form} />
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
                <ServicePrice form={form} />
                <ServiceCommission form={form} />
                <ServiceDiscount form={form} />
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

              <ServiceFileUpload {...fileUpload} />
            </div>

            {/* Botones de acción */}
            <div className="pt-6 border-t border-border">
              <ServiceFormActions {...submission} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
