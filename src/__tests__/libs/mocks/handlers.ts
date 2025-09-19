import { HttpResponse, http } from 'msw';

export const handlers = [
  // Mock para registro exitoso
  http.post('/api/auth/register', () => {
    return HttpResponse.json(
      {
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          id: '123',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
        },
      },
      { status: 201 }
    );
  }),

  // Mock para error de email duplicado
  http.post('/api/auth/register', () => {
    return HttpResponse.json(
      {
        success: false,
        message: 'El correo electrónico ya está registrado',
        errorData: {
          errors: {
            email: ['El correo electrónico ya está registrado'],
          },
        },
      },
      { status: 400 }
    );
  }),

  // Mock para error de validación
  http.post('/api/auth/register', () => {
    return HttpResponse.json(
      {
        success: false,
        message: 'Error de validación',
        errorData: {
          errors: {
            password: ['La contraseña debe tener al menos 8 caracteres'],
            phoneNumber: [
              'El número de teléfono debe tener al menos 10 dígitos',
            ],
          },
        },
      },
      { status: 422 }
    );
  }),

  // Mock para error de servidor
  http.post('/api/auth/register', () => {
    return HttpResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }),
];
