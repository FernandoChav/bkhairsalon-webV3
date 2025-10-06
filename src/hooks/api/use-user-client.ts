import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { userClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { EditUserRequest } from '@/models/requests';

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const response = await userClient.getProfile();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { update } = useSession();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, EditUserRequest>({
    mutationFn: userClient.editUser,
    onSuccess: async () => {
      try {
        const updatedProfile = await userClient.getProfile();

        if (updatedProfile.data) {
          queryClient.setQueryData(['user', 'profile'], updatedProfile.data);

          await update({
            user: {
              name: `${updatedProfile.data.firstName}`,
              email: updatedProfile.data.email,
            },
          });

          router.push('/home');
        }
      } catch {
        queryClient.invalidateQueries({
          queryKey: ['user', 'profile'],
        });

        router.push('/home');
      }
    },
  });
};
