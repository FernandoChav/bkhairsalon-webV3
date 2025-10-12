import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCategoriesQuery } from '@/hooks/api';
import { useFileUpload } from '@/hooks/common';
import { CreateServiceForm, createServiceSchema } from '@/models/schemas';

interface UseServiceFormDataReturn {
  // Values
  form: ReturnType<typeof useForm<CreateServiceForm>>;
  fileUpload: ReturnType<typeof useFileUpload>;
  categories: {
    data: ReturnType<typeof useCategoriesQuery>['data'];
    isLoading: boolean;
    error: ReturnType<typeof useCategoriesQuery>['error'];
  };
}

export const useServiceFormData = (): UseServiceFormDataReturn => {
  const { data: categories, isLoading, error } = useCategoriesQuery();

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

  const fileUpload = useFileUpload({ maxFiles: 10 });

  return {
    // Values
    form,
    fileUpload,
    categories: {
      data: categories,
      isLoading,
      error,
    },
  };
};
