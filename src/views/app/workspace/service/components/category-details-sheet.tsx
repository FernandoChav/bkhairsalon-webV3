import { HiCog, HiFolder, HiInformationCircle } from 'react-icons/hi';

import { FC } from 'react';

import {
  Badge,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn';
import { CategoryResponse } from '@/models/responses';

interface CategoryDetailsSheetProps {
  category: CategoryResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDetailsSheet: FC<CategoryDetailsSheetProps> = ({
  category,
  isOpen,
  onClose,
}) => {
  if (!category) return null;

  const hasSubcategories = (category.subCategories?.length ?? 0) > 0;
  // TODO: Implementar cuando se agreguen servicios a CategoryResponse
  // const hasServices = (category.services?.length ?? 0) > 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6 border-l border-border [&>button]:cursor-pointer">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <HiFolder className="h-6 w-6 text-orange-500" />
            <div>
              <SheetTitle>{category.name}</SheetTitle>
              <SheetDescription>{category.fullPath}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-lg">
              <TabsTrigger
                value="general"
                className="cursor-pointer rounded-lg"
              >
                <HiInformationCircle className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="config" className="cursor-pointer rounded-lg">
                <HiCog className="h-4 w-4 mr-2" />
                Configuración
              </TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-4 mt-4">
              {/* Description */}
              <div>
                <h3 className="text-sm font-medium mb-2">Descripción</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description || 'Sin descripción'}
                </p>
              </div>

              <Separator />

              {/* Status */}
              <div>
                <h3 className="text-sm font-medium mb-2">Estado</h3>
                <Badge variant={category.isActive ? 'default' : 'destructive'}>
                  {category.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>

              <Separator />

              {/* Type */}
              <div>
                <h3 className="text-sm font-medium mb-2">Tipo</h3>
                <Badge variant="outline">
                  {category.isFinal ? 'Categoría Final' : 'Categoría Padre'}
                </Badge>
              </div>

              <Separator />

              {/* Statistics */}
              <div>
                <h3 className="text-sm font-medium mb-2">Estadísticas</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Nivel jerárquico:
                    </span>
                    <span className="text-sm font-medium">
                      {category.level}
                    </span>
                  </div>
                  {/* TODO: Implementar cuando se agregue sortOrder a CategoryResponse */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Orden:
                    </span>
                    <span className="text-sm font-medium">
                      {category.sortOrder}
                    </span>
                  </div> */}
                  {hasSubcategories && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Subcategorías:
                      </span>
                      <span className="text-sm font-medium">
                        {category.subCategories?.length}
                      </span>
                    </div>
                  )}
                  {/* TODO: Implementar cuando se agreguen servicios a CategoryResponse */}
                  {/* {hasServices && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Servicios:
                      </span>
                      <span className="text-sm font-medium">
                        {category.services?.length}
                      </span>
                    </div>
                  )} */}
                </div>
              </div>

              <Separator />

              {/* TODO: Implementar cuando se agreguen servicios a CategoryResponse */}
              {/* Services List */}
              {/* {hasServices && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Servicios</h3>
                  <div className="space-y-2">
                    {category.services?.map(service => (
                      <div
                        key={service.id}
                        className="p-3 rounded-lg border border-border bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HiScissors className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">
                              {service.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              ${(service.price / 1000).toFixed(0)}k
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {service.duration}min
                            </span>
                          </div>
                        </div>
                        {service.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Subcategories List */}
              {hasSubcategories && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Subcategorías</h3>
                  <div className="space-y-2">
                    {category.subCategories?.map(subCategory => (
                      <div
                        key={subCategory.id}
                        className="p-3 rounded-lg border border-border bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <HiFolder className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-medium">
                            {subCategory.name}
                          </span>
                        </div>
                        {/* TODO: Implementar cuando se agregue description a CategoryResponse */}
                        {/* {subCategory.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {subCategory.description}
                          </p>
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Configuration Tab */}
            <TabsContent value="config" className="space-y-4 mt-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Identificadores</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <code className="text-xs bg-muted px-2 py-1 rounded-lg border border-border">
                      {category.id}
                    </code>
                  </div>
                  {category.parentCategoryId && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        ID Padre:
                      </span>
                      <code className="text-xs bg-muted px-2 py-1 rounded-lg border border-border">
                        {category.parentCategoryId}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Fechas</h3>
                <div className="space-y-2">
                  {/* TODO: Implementar cuando se agreguen createdAt y updatedAt a CategoryResponse */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Creado:
                    </span>
                    <span className="text-xs">
                      {new Date(category.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Actualizado:
                    </span>
                    <span className="text-xs">
                      {new Date(category.updatedAt).toLocaleString()}
                    </span>
                  </div> */}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Ruta completa</h3>
                <code className="text-xs bg-muted p-2 rounded-lg border border-border block">
                  {category.fullPath}
                </code>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
