import { FC } from 'react';

import { Button } from '@/components/shadcn';
import { cn } from '@/libs';

interface ServiceFormActionsProps {
  isLoading: boolean;
  isValid: boolean;
}

export const ServiceFormActions: FC<ServiceFormActionsProps> = ({
  isLoading,
  isValid,
}) => {
  // Computed values
  const isButtonDisabled = isLoading || !isValid;

  const buttonText = isLoading
    ? 'Creando Servicio...'
    : !isValid
      ? 'Completa todos los campos'
      : 'Crear Servicio';

  const buttonClassName = cn(
    'w-full text-primary-foreground shadow-lg transition-all duration-300 text-sm sm:text-base',
    isValid && !isLoading
      ? 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl cursor-pointer'
      : 'bg-muted-foreground/20 cursor-not-allowed text-muted-foreground'
  );

  return (
    <Button
      type="submit"
      className={buttonClassName}
      disabled={isButtonDisabled}
    >
      {buttonText}
    </Button>
  );
};
