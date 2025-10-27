export { useRegisterMutation } from './use-auth-client';
export {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoryQuery,
  useReorderElementsMutation,
} from './use-category-client';
export {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useGetAllServiceQuery,
  // --- INICIO CÓDIGO RESUELTO ---
  useGetServiceByIdQuery,
  useGetAllServicePublicQuery,
  // --- FIN CÓDIGO RESUELTO ---
  useDeleteServiceMutation,
} from './use-service-client';
export {
  useEditUserMutation,
  useUserProfileQuery,
  useDeleteAccountMutation,
  useDeletionInfoQuery,
} from './use-user-client';
export { useCheckAvailabilityMutation } from './use-availability-client';
