import { HiDocumentText, HiTag } from 'react-icons/hi';

import { FC, useEffect } from 'react';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@/components/shadcn';
import { cn } from '@/libs';
import { CategoryResponse } from '@/models/responses';

import { useUpdateCategory } from '../hooks/use-update-category';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoryResponse | null;
}

export const EditCategoryModal: FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const { form, submission, handleSubmit, handleResetForm } = useUpdateCategory(
    {
      category,
      onSuccess: onClose,
    }
  );

  // Resetear el formulario cuando se cierre el modal
  useEffect(() => {
    if (!isOpen) {
      handleResetForm();
    }
  }, [isOpen, handleResetForm]);

  // Computed values for form actions
  const isButtonDisabled = submission.isLoading || !submission.isValid;
  const buttonText = submission.isLoading
    ? 'Actualizando categoría...'
    : !submission.isValid
      ? 'Completa todos los campos'
      : 'Actualizar categoría';
  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 text-sm sm:text-base',
    submission.isValid && !submission.isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-border">
        <DialogTitle className="sr-only">Editar Categoría</DialogTitle>
        <DialogDescription className="sr-only">
          Modifica la información de la categoría
        </DialogDescription>
        <Card className="w-full border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              Editar Categoría
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Modifica la información de{' '}
              <span className="font-semibold text-foreground">
                {category?.name}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
                autoComplete="on"
              >
                {/* Sección: Información Básica */}
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
                    {/* Nombre */}
                    <div>
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

                {/* Botón de acción */}
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
