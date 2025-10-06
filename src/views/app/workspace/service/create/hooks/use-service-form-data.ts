import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useGetCategoriesQuery } from '@/hooks/api';
import { useFileUpload } from '@/hooks/common';
import { CreateServiceForm, createServiceSchema } from '@/models/schemas';

export const useServiceFormData = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  // Formulario principal
  const form = useForm<CreateServiceForm>({
    resolver: zodResolver(createServiceSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      description: '',
      duration: undefined,
      price: undefined,
      startTime: '',
      endTime: '',
      commissionPercentage: undefined,
      categoryId: '',
      discountId: '',
    },
  });

  // Hook para manejo de archivos
  const fileUpload = useFileUpload(10);

  return {
    form,
    fileUpload,
    categories: {
      data: categories,
      isLoading,
      error,
    },
  };
};
