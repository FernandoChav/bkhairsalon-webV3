import { useCallback } from 'react';

interface UseNumberFieldReturn {
  // Values
  displayValue: (value: number | undefined) => string;
  // Handlers
  handleNumberChange: (value: string) => number | undefined;
}

export const useNumberField = (): UseNumberFieldReturn => {
  const displayValue = useCallback((value: number | undefined): string => {
    return value?.toString() ?? '';
  }, []);

  const handleNumberChange = useCallback(
    (value: string): number | undefined => {
      return value === '' ? undefined : parseFloat(value);
    },
    []
  );

  return {
    // Values
    displayValue,
    // Handlers
    handleNumberChange,
  };
};
