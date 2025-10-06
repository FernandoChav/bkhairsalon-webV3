import { baseClient } from '@/clients';
import { ApiResponse } from '@/models/generics';
import type { LoginRequest, RegisterRequest } from '@/models/requests';
import { LoginResponse } from '@/models/responses';

/**
 * Cliente para operaciones de autenticación
 * Maneja registro, login y refresh de tokens
 */
class AuthClient {
  /**
   * Registra un nuevo usuario en el sistema
   * @param data - Datos de registro del usuario
   * @returns Respuesta de la API con resultado del registro
   */
  async register(data: RegisterRequest): Promise<ApiResponse> {
    const response = await baseClient.post<ApiResponse>('/auth/register', data);
    return response.data;
  }

  /**
   * Autentica un usuario con email y contraseña
   * @param data - Credenciales de login
   * @returns Respuesta de la API con token de acceso
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await baseClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      data
    );
    return response.data;
  }

  /**
   * Renueva el token de acceso usando el refresh token
   * @returns Respuesta de la API con nuevo token de acceso
   */
  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const response =
      await baseClient.post<ApiResponse<LoginResponse>>('/auth/refresh');
    return response.data;
  }
}

export const authClient = new AuthClient();
