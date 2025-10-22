import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';

import { userClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import { DeleteUserRequest, EditUserRequest } from '@/models/requests';
import { DeletionInfoDto } from '@/models/responses';

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

          router.push('/account');
        }
      } catch {
        queryClient.invalidateQueries({
          queryKey: ['user', 'profile'],
        });

        router.push('/account');
      }
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ApiResponse, AxiosError<ApiResponse>, DeleteUserRequest>({
    mutationFn: userClient.deleteUser,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['user', 'profile'] });
      queryClient.removeQueries({ queryKey: ['user', 'deletion-info'] });

      await signOut({ redirect: false });

      router.push('/');
    },
  });
};

export const useDeletionInfoQuery = () => {
  return useQuery<DeletionInfoDto | null, Error>({
    queryKey: ['user', 'deletion-info'], // clave única para cache
    queryFn: async () => {
      const response = await userClient.getDeletionInfo();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
