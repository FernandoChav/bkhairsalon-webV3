'use client';

import { HiDocumentText, HiFolder, HiTag } from 'react-icons/hi';

import { FC, useCallback, useMemo } from 'react';

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
import { cn } from '@/libs';
import { CategoryResponse } from '@/models/responses';

import { useCreateCategory } from '../hooks';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentCategory?: CategoryResponse | null;
  categories?: CategoryResponse[];
}

export const CreateCategoryModal: FC<CreateCategoryModalProps> = ({
  isOpen,
  onClose,
  parentCategory,
  categories = [],
}) => {
  const {
    form,
    categories: parentCategories,
    submission,
  } = useCreateCategory({
    parentCategory,
    onSuccess: onClose,
    categories,
  });

  // Category Field Logic
  const isCategoriesLoading = parentCategories.isLoading;
  const hasCategoriesError = !!parentCategories.error;
  const hasCategories = parentCategories.data.length > 0;
  const isCategoriesDisabled = isCategoriesLoading;

  const selectPlaceholder = useMemo(() => {
    if (isCategoriesLoading) return 'Cargando categorías...';
    if (hasCategoriesError) return 'Error al cargar categorías';
    if (!hasCategories) return 'Sin categoría padre (categoría raíz)';
    return 'Selecciona una categoría padre (opcional)';
  }, [isCategoriesLoading, hasCategoriesError, hasCategories]);

  const handleCategoryOpenChange = useCallback(
    (
      open: boolean,
      currentValue: string | undefined,
      onBlur: () => void
    ): void => {
      if (!open && !currentValue) {
        onBlur();
      }
    },
    []
  );

  const handleCategoryValueChange = useCallback(
    (value: string) => (value === 'none' ? undefined : value),
    []
  );

  // Computed values for form actions
  const isButtonDisabled = submission.isLoading || !submission.isValid;
  const buttonText = submission.isLoading
    ? 'Creando Categoría...'
    : !submission.isValid
      ? 'Completa todos los campos'
      : 'Crear Categoría';
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 text-sm sm:text-base',
    submission.isValid && !submission.isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-border">
        <DialogTitle className="sr-only">Crear Nueva Categoría</DialogTitle>
        <DialogDescription className="sr-only">
          Completa la información para agregar una nueva categoría
        </DialogDescription>
        <Card className="w-full border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              Crear Nueva Categoría
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Completa la información para agregar una nueva categoría a tu
              catálogo
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submission.handleSubmit)}
                className="space-y-8"
                autoComplete="on"
              >
                {/* Sección 1: Información Básica */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Información de la Categoría
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Define la identidad y descripción de tu categoría
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Primera fila: Nombre */}
                    <div>
                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Nombre de la Categoría
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HiTag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Ej: Cortes de Cabello"
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

                    {/* Segunda fila: Descripción (ancho completo) */}
                    <div>
                      {/* Description Field */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Descripción (Opcional)
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <HiDocumentText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Textarea
                                  placeholder="Describe los servicios que incluye esta categoría..."
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

                {/* Sección 2: Configuración de Jerarquía */}
                <div className="space-y-6">
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      Configuración de Jerarquía
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Establece la estructura y organización de la categoría
                    </p>
                  </div>

                  <div>
                    {/* Parent Category Field */}
                    <FormField
                      control={form.control}
                      name="parentCategoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Categoría Padre (Opcional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <HiFolder className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                              <Select
                                value={field.value || 'none'}
                                onValueChange={value =>
                                  field.onChange(
                                    handleCategoryValueChange(value)
                                  )
                                }
                                onOpenChange={open =>
                                  handleCategoryOpenChange(
                                    open,
                                    field.value,
                                    field.onBlur
                                  )
                                }
                                disabled={isCategoriesDisabled}
                              >
                                <SelectTrigger
                                  className="w-full pl-10"
                                  onBlur={field.onBlur}
                                >
                                  <SelectValue
                                    placeholder={selectPlaceholder}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">
                                    <span className="text-sm text-muted-foreground">
                                      Sin categoría padre (categoría raíz)
                                    </span>
                                  </SelectItem>
                                  {hasCategories ? (
                                    parentCategories.data.map(category => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.id}
                                      >
                                        <span className="text-sm">
                                          {category.fullPath}
                                        </span>
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                      No hay categorías padre disponibles
                                    </div>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs sm:text-sm">
                            Selecciona una categoría padre para crear una
                            subcategoría
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="pt-6">
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
