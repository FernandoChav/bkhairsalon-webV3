import { ApiResponse } from '@/models/generics';
import type { EditUserRequest } from '@/models/requests';
import { baseClient } from './base-client';

class UserClient {
    /**
     * Editar la información del usuario
     */
    async editUser(data: EditUserRequest): Promise<ApiResponse> {
        const response = await baseClient.put<ApiResponse>('/User/edit', data);
        return response.data;
    }
}

// Exportar instancia singleton
export const userClient = new UserClient();
