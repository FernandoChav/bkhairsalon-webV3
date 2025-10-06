import { UseFormReturn } from 'react-hook-form';

import { useEffect } from 'react';

import { CreateServiceForm } from '@/models/schemas';

export const useServiceFormValidation = (
  form: UseFormReturn<CreateServiceForm>
) => {
  // Generar opciones de duración de 5 en 5 minutos desde 0 hasta 300 minutos
  const durationOptions = Array.from({ length: 61 }, (_, i) => i * 5);

  // Validación personalizada en tiempo real
  useEffect(() => {
    const subscription = form.watch((_value, { name }) => {
      // Solo validar endTime cuando cambien los campos relacionados
      if (name === 'endTime' || name === 'startTime' || name === 'duration') {
        const startTime = form.getValues('startTime');
        const endTime = form.getValues('endTime');
        const duration = form.getValues('duration');

        if (startTime && endTime) {
          // Validar que hora fin > hora inicio
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

          // Validar que el intervalo sea suficiente para la duración
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

          // Limpiar errores si todo está bien
          form.clearErrors('endTime');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return {
    durationOptions,
    errors: form.formState.errors,
  };
};
