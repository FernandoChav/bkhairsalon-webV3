import { useCallback } from 'react';

import { CategoryResponse } from '@/models/responses';
import { CreateServiceForm } from '@/models/schemas';

import { useServiceFormData } from './use-service-form-data';
import { useServiceFormValidation } from './use-service-form-validation';
import { useServiceSubmission } from './use-service-submission';

interface UseCreateServiceViewReturn {
  // Values
  form: ReturnType<typeof useServiceFormData>['form'];
  categories: {
    data: CategoryResponse[];
    isLoading: boolean;
    error: ReturnType<typeof useServiceFormData>['categories']['error'];
  };
  fileUpload: {
    files: File[];
    handleAddFiles: (files: FileList | File[]) => void;
    handleRemoveFile: (index: number) => void;
    handleClearFiles: () => void;
  };
  validation: {
    durationOptions: number[];
    errors: ReturnType<typeof useServiceFormValidation>['errors'];
  };
  submission: {
    isLoading: boolean;
    isValid: boolean;
    handleSubmit: (data: CreateServiceForm) => void;
  };
  // Handlers
  handleResetForm: () => void;
}

export const useCreateServiceView = (): UseCreateServiceViewReturn => {
  const formData = useServiceFormData();
  const validation = useServiceFormValidation({ form: formData.form });
  const submission = useServiceSubmission({
    form: formData.form,
    fileUpload: formData.fileUpload,
  });

  const getFinalCategories = useCallback(
    (cats: CategoryResponse[]): CategoryResponse[] => {
      const finalCats: CategoryResponse[] = [];

      const traverse = (categories: CategoryResponse[]) => {
        categories.forEach(category => {
          if (category.isFinal) {
            finalCats.push(category);
          }
          if (category.subCategories && category.subCategories.length > 0) {
            traverse(category.subCategories);
          }
        });
      };

      traverse(cats);
      return finalCats;
    },
    []
  );

  const finalCategories = formData.categories.data
    ? getFinalCategories(formData.categories.data)
    : [];

  const handleResetForm = useCallback(() => {
    formData.form.reset();
    formData.fileUpload.handleClearFiles();
  }, [formData.form, formData.fileUpload]);

  return {
    // Values
    form: formData.form,
    categories: {
      data: finalCategories,
      isLoading: formData.categories.isLoading,
      error: formData.categories.error,
    },
    fileUpload: {
      files: formData.fileUpload.files,
      handleAddFiles: formData.fileUpload.handleAddFiles,
      handleRemoveFile: formData.fileUpload.handleRemoveFile,
      handleClearFiles: formData.fileUpload.handleClearFiles,
    },
    validation: {
      durationOptions: validation.durationOptions,
      errors: validation.errors,
    },
    submission: {
      isLoading: submission.isLoading,
      isValid: submission.isValid,
      handleSubmit: submission.handleSubmit,
    },
    // Handlers
    handleResetForm,
  };
};
