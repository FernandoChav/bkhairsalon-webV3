import { HiFolder, HiPlus, HiSearch } from 'react-icons/hi';

import { FC } from 'react';

import { Card, CardContent, Skeleton } from '@/components/shadcn';

export const ServiceViewSkeleton: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Gestionar Servicios
            </h1>
            <p className="text-muted-foreground">
              Organiza tus servicios por categorías para una mejor gestión
            </p>
          </div>
          <div className="relative">
            <HiPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-9 w-[157.51px] pl-10" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Skeleton className="h-9 w-full pl-10" />
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {/* Category Card 1 */}
        {Array.from({ length: 2 }).map((_, index) => (
          <Card
            key={index}
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-10 px-4 group shadow-none hover:shadow-lg hover:border-border/80 transition-all h-[134px]"
          >
            <CardContent className="flex items-center justify-between h-full p-0">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8" />

                {/* Icon */}
                <div className="text-2xl">
                  <HiFolder className="h-6 w-6 text-orange-500 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <Skeleton className="h-7 w-20" />

                  <Skeleton className="h-5 w-16" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Skeleton className="h-9 w-[103.84px]" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
