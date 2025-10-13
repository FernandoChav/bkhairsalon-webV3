import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { HiFolder } from 'react-icons/hi';

import { FC } from 'react';

import {
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto p-6 border-l border-border [&>button]:cursor-pointer">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <HiFolder className="h-6 w-6 text-orange-500" />
            <div>
              <SheetTitle>{category.name}</SheetTitle>
              <SheetDescription>
                Categoría de nivel {category.level}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Descripción</h3>
            <p className="text-sm text-muted-foreground">
              {category.description || 'Sin descripción'}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Nivel</span>
              <span className="text-sm font-medium">{category.level}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Ruta completa
              </span>
              <span className="text-sm font-medium">{category.fullPath}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estado</span>
              <span className="text-sm font-medium">
                {category.isFinal ? 'Final' : 'Con subcategorías'}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Creado</span>
              <span className="text-sm font-medium">
                {formatDate(category.createdAt)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Última actualización
              </span>
              <span className="text-sm font-medium">
                {formatDate(category.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
