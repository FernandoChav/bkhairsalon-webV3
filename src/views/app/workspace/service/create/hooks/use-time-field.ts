import { useCallback } from 'react';

interface UseTimeFieldReturn {
  // Values
  timeToMinutes: (timeString: string) => number | undefined;
  // Handlers
  handleTimeChange: (minutes: number) => string;
  handleTimeBlur: (onBlur: () => void) => () => void;
}

export const useTimeField = (): UseTimeFieldReturn => {
  const timeToMinutes = useCallback(
    (timeString: string): number | undefined => {
      if (!timeString) return undefined;
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes;
    },
    []
  );

  const handleTimeChange = useCallback((minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }, []);

  const handleTimeBlur = useCallback((onBlur: () => void) => {
    return () => {
      onBlur();
    };
  }, []);

  return {
    // Values
    timeToMinutes,
    // Handlers
    handleTimeChange,
    handleTimeBlur,
  };
};
