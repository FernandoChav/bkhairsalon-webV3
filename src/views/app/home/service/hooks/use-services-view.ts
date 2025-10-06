import { useServicesQuery } from '@/hooks/api';

export const useServicesView = () => {
  const { data, isLoading, error } = useServicesQuery();

  return {
    data,
    isLoading,
    error,
  };
};
