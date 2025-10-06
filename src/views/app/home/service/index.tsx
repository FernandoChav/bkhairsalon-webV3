'use client';

import type { FC } from 'react';

import Image from 'next/image';

import { useServicesView } from './hooks';

export const ServicesView: FC = () => {
  const { data, isLoading, error } = useServicesView();

  // Computed values
  const services = data?.data || [];
  const hasServices = services.length > 0;
  const servicesCount = services.length;
  const hasError = !!error;
  const errorMessage = error ? 'Error al cargar los servicios' : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando servicios...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-destructive text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground">{errorMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!hasServices) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-muted-foreground text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-semibold mb-2">No hay servicios</h2>
            <p className="text-muted-foreground">
              Aún no se han creado servicios. ¡Crea el primero!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Servicios</h1>
        <p className="text-muted-foreground">
          Lista de todos los servicios disponibles ({servicesCount} servicios)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Imagen del servicio */}
            {service.images.length > 0 && (
              <div className="relative h-48 w-full">
                <Image
                  src={service.images[0]}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                {service.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {service.description}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Precio:</span>
                  <span className="font-semibold text-primary">
                    ${service.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Duración:
                  </span>
                  <span className="font-medium">
                    {service.durationInMinutes < 60
                      ? `${service.durationInMinutes} min`
                      : `${Math.floor(service.durationInMinutes / 60)}h ${service.durationInMinutes % 60}m`}
                  </span>
                </div>

                {service.images.length > 1 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Fotos:
                    </span>
                    <span className="font-medium text-primary">
                      +{service.images.length - 1} más
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
