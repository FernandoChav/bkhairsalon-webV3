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
import { useCreateServiceForm } from './hooks';

export const CreateServiceView: FC = () => {
  const { form, categories, fileUpload, validation, submission } =
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
            onSubmit={form.handleSubmit(submission.onSubmit)}
            className="space-y-6"
            autoComplete="on"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda - Información básica */}
              <ServiceBasicInfo form={form} categories={categories} />

              {/* Columna derecha - Detalles del servicio */}
              <ServiceDetails form={form} validation={validation} />
            </div>

            {/* Sección de archivos - Abarca ambas columnas */}
            <ServiceFileUpload {...fileUpload} />

            {/* Botones de acción */}
            <ServiceFormActions {...submission} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
