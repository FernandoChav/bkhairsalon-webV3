'use client';

import { HiCalendar, HiPhone, HiUser } from 'react-icons/hi';

import { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@/components/shadcn';

export const EditUserFormSkeleton: FC = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
        <CardDescription>
          Actualiza tus datos personales en BK Hair Salon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" autoComplete="on">
          {/* Primera fila: Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Nombre</div>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Apellido</div>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
          {/* Segunda fila: Fecha de Nacimiento y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Fecha de Nacimiento</div>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Teléfono</div>
              <div className="relative">
                <HiPhone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
          {/* Botón */}
          <div className="pt-4">
            <Skeleton className="h-11 w-full" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
