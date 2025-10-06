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
  ServiceBasicInfo,
  ServiceDetails,
  ServiceFileUpload,
  ServiceFormActions,
} from './components';
import { useCreateServiceView } from './hooks';

export const CreateServiceView: FC = () => {
  const { form, categories, fileUpload, validation, submission } =
    useCreateServiceView();

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
      <Card className="w-full">
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
              className="space-y-6 sm:space-y-8"
              autoComplete="on"
            >
              {/* Layout responsive mejorado */}
              <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {/* Columna izquierda - Información básica */}
                <div className="space-y-6">
                  <ServiceBasicInfo form={form} categories={categories} />
                </div>

                {/* Columna derecha - Detalles del servicio */}
                <div className="space-y-6">
                  <ServiceDetails form={form} validation={validation} />
                </div>
              </div>

              {/* Sección de archivos - Abarca todo el ancho */}
              <div className="pt-2">
                <ServiceFileUpload {...fileUpload} />
              </div>

              {/* Botones de acción */}
              <div className="pt-4">
                <ServiceFormActions {...submission} />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
