import { useCallback } from 'react';

interface UseDurationFieldReturn {
  // Values
  formatDuration: (minutes: number) => string;
  getSelectValue: (value: number | undefined) => string;
  // Handlers
  handleValueChange: (value: string) => number;
  handleOpenChange: (
    open: boolean,
    currentValue: number | undefined,
    onBlur: () => void
  ) => void;
}

export const useDurationField = (): UseDurationFieldReturn => {
  const formatDuration = useCallback((minutes: number): string => {
    if (minutes === 0) return '0 minutos';
    if (minutes < 60) return `${minutes} minutos`;
    if (minutes === 60) return '1 hora';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
  }, []);

  const getSelectValue = useCallback((value: number | undefined): string => {
    return value ? value.toString() : '';
  }, []);

  const handleValueChange = useCallback((value: string): number => {
    return parseInt(value, 10);
  }, []);

  const handleOpenChange = useCallback(
    (
      open: boolean,
      currentValue: number | undefined,
      onBlur: () => void
    ): void => {
      if (!open && !currentValue) {
        onBlur();
      }
    },
    []
  );

  return {
    // Values
    formatDuration,
    getSelectValue,
    // Handlers
    handleValueChange,
    handleOpenChange,
  };
};
