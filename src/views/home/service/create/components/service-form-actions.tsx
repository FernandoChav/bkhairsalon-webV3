import { FC } from 'react';

import { Button } from '@/components/shadcn';

interface ServiceFormActionsProps {
  isLoading: boolean;
  isValid: boolean;
}

export const ServiceFormActions: FC<ServiceFormActionsProps> = ({
  isLoading,
  isValid,
}) => {
  return (
    <Button
      type="submit"
      className="w-full text-primary-foreground shadow-lg transition-all duration-300 h-11"
      disabled={isLoading || !isValid}
    >
      {isLoading ? 'Creando Servicio...' : 'Crear Servicio'}
    </Button>
  );
};
