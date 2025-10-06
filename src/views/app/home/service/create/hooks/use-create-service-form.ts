import { useCallback } from 'react';

import { CategoryResponse } from '@/models/responses';

import { useServiceFormData } from './use-service-form-data';
import { useServiceFormValidation } from './use-service-form-validation';
import { useServiceSubmission } from './use-service-submission';

export const useCreateServiceView = () => {
  const formData = useServiceFormData();
  const validation = useServiceFormValidation(formData.form);
  const submission = useServiceSubmission(formData.form, formData.fileUpload);

  // Flatten categories and filter only final categories
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

  const resetForm = useCallback(() => {
    formData.form.reset();
    formData.fileUpload.clearFiles();
  }, [formData.form, formData.fileUpload]);

  // Objetos organizados por responsabilidad
  return {
    form: formData.form,

    categories: {
      data: finalCategories,
      isLoading: formData.categories.isLoading,
      error: formData.categories.error,
    },

    fileUpload: {
      files: formData.fileUpload.files,
      addFiles: formData.fileUpload.addFiles,
      removeFile: formData.fileUpload.removeFile,
      clearFiles: formData.fileUpload.clearFiles,
    },

    validation: {
      durationOptions: validation.durationOptions,
      errors: validation.errors,
    },

    submission: {
      onSubmit: submission.onSubmit,
      isLoading: submission.isLoading,
      isValid: submission.isValid,
    },

    resetForm,
  };
};
