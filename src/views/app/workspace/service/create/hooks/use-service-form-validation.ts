import { UseFormReturn } from 'react-hook-form';

import { useEffect, useRef } from 'react';

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
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        // Evitar re-renderizado infinito
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        // Limpiar errores previos
        form.clearErrors('startTime');
        form.clearErrors('endTime');
        form.clearErrors('duration');

        // Validar que ambos horarios estén presentes
        if (startTime && endTime) {
          const startTimeParts = startTime.split(':').map(Number);
          const endTimeParts = endTime.split(':').map(Number);
          const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
          const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];

          // Validar que el horario de término sea posterior al de inicio
          if (endMinutes <= startMinutes) {
            form.setError('endTime', {
              type: 'manual',
              message:
                'El horario de término debe ser posterior al horario de inicio',
            });
            isProcessingRef.current = false;
            return;
          }

          // Validar duración si está presente
          if (duration) {
            const intervalMinutes = endMinutes - startMinutes;

            if (intervalMinutes < duration) {
              // Siempre mostrar error en duration cuando la duración excede el tiempo disponible
              form.setError('duration', {
                type: 'manual',
                message:
                  'La duración excede el tiempo disponible entre los horarios',
              });
              isProcessingRef.current = false;
              return;
            }
          }
        }

        // Resetear el flag de procesamiento
        isProcessingRef.current = false;
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
