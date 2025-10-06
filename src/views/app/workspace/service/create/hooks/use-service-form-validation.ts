import { UseFormReturn } from 'react-hook-form';

import { useEffect } from 'react';

import { CreateServiceForm } from '@/models/schemas';

interface UseServiceFormValidationParams {
  form: UseFormReturn<CreateServiceForm>;
}

interface UseServiceFormValidationReturn {
  // Values
  durationOptions: number[];
  errors: UseFormReturn<CreateServiceForm>['formState']['errors'];
}

export const useServiceFormValidation = ({
  form,
}: UseServiceFormValidationParams): UseServiceFormValidationReturn => {
  const durationOptions = Array.from({ length: 61 }, (_, i) => i * 5);

  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        if (startTime && endTime) {
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);
          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

          if (endMinutes <= startMinutes) {
            form.setError('endTime', {
              type: 'manual',
              message:
                'El horario de término debe ser posterior al horario de inicio',
            });
            return;
          }

          if (duration) {
            const intervalMinutes = endMinutes - startMinutes;
            if (intervalMinutes < duration) {
              form.setError('endTime', {
                type: 'manual',
                message:
                  'El horario de disponibilidad debe ser suficiente para realizar el servicio',
              });
              return;
            }
          }

          form.clearErrors('endTime');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return {
    // Values
    durationOptions,
    errors: form.formState.errors,
  };
};
