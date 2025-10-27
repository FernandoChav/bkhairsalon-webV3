import { describe, expect, it } from 'vitest';

import { registerSchema } from '@/models/schemas';

describe('registerSchema', () => {
  const validData = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    phoneNumber: '958157708', // Formato chileno válido
    dateOfBirth: '1990-01-01',
    password: 'password123',
    confirmPassword: 'password123',
  };

  describe('Validación exitosa', () => {
    it('debe validar datos correctos', () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('debe validar con nombres con acentos', () => {
      const dataWithAccents = {
        ...validData,
        firstName: 'José',
        lastName: 'González',
      };
      const result = registerSchema.safeParse(dataWithAccents);
      expect(result.success).toBe(true);
    });

    it('debe validar con email con subdominio', () => {
      const dataWithSubdomain = {
        ...validData,
        email: 'user@subdomain.example.com',
      };
      const result = registerSchema.safeParse(dataWithSubdomain);
      expect(result.success).toBe(true);
    });

    it('debe validar con los tres formatos de teléfono chilenos', () => {
      const chileanPhoneFormats = [
        '+56958157708', // Formato 1: con + y código de país
        '56958157708', // Formato 2: con código de país
        '958157708', // Formato 3: sin código de país
      ];

      chileanPhoneFormats.forEach(phone => {
        const dataWithPhone = {
          ...validData,
          phoneNumber: phone,
        };
        const result = registerSchema.safeParse(dataWithPhone);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Validación de campos requeridos', () => {
    it('debe fallar si faltan campos requeridos', () => {
      const requiredFields = [
        { field: 'firstName', message: 'El nombre es requerido' },
        { field: 'lastName', message: 'El apellido es requerido' },
        { field: 'email', message: 'El correo electrónico es requerido' },
        { field: 'phoneNumber', message: 'El número de teléfono es requerido' },
        {
          field: 'dateOfBirth',
          message: 'La fecha de nacimiento es requerida',
        },
        { field: 'password', message: 'La contraseña es requerida' },
        { field: 'confirmPassword', message: 'Debes confirmar tu contraseña' },
      ];

      requiredFields.forEach(({ field, message }) => {
        const dataWithoutField = { ...validData, [field]: '' };
        const result = registerSchema.safeParse(dataWithoutField);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual([field]);
          expect(result.error.issues[0].message).toBe(message);
        }
      });
    });
  });

  describe('Validación de formato de email', () => {
    it('debe fallar con emails inválidos', () => {
      const invalidEmails = [
        'email-invalido',
        'usuarioexample.com',
        'usuario@',
      ];

      invalidEmails.forEach(email => {
        const dataWithInvalidEmail = { ...validData, email };
        const result = registerSchema.safeParse(dataWithInvalidEmail);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(['email']);
          expect(result.error.issues[0].message).toBe(
            'Por favor ingresa un correo electrónico válido'
          );
        }
      });
    });
  });

  describe('Validación de teléfono', () => {
    it('debe validar formatos de teléfono chilenos válidos', () => {
      const validChileanPhones = [
        '+56958157708', // Formato 1: con + y código de país
        '56958157708', // Formato 2: con código de país
        '958157708', // Formato 3: sin código de país
        '+56912345678', // Otro ejemplo formato 1
        '56987654321', // Otro ejemplo formato 2
        '987654321', // Otro ejemplo formato 3
      ];

      validChileanPhones.forEach(phone => {
        const dataWithValidPhone = { ...validData, phoneNumber: phone };
        const result = registerSchema.safeParse(dataWithValidPhone);
        expect(result.success).toBe(true);
      });
    });

    it('debe rechazar formatos de teléfono inválidos', () => {
      const invalidPhones = [
        '123', // Muy corto
        '123456789', // 9 dígitos pero no empieza con 9
        '1234567890', // 10 dígitos pero no es formato chileno
        '12345678901', // 11 dígitos pero no empieza con 569
        '5691234567', // Empieza con 569 pero solo 10 dígitos (debería ser 11)
        '569123456789', // Empieza con 569 pero 12 dígitos
        '812345678', // 9 dígitos pero no empieza con 9
        '901234567', // 9 dígitos empieza con 9 pero segundo dígito es 0
        'abc123456789', // Contiene letras
      ];

      invalidPhones.forEach(phone => {
        const dataWithInvalidPhone = { ...validData, phoneNumber: phone };
        const result = registerSchema.safeParse(dataWithInvalidPhone);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(['phoneNumber']);
          expect(result.error.issues[0].message).toBe(
            'El número de teléfono debe ser un formato chileno válido (+569XXXXXXXX, 569XXXXXXXX o 9XXXXXXXX)'
          );
        }
      });
    });
  });

  describe('Validación de contraseña', () => {
    it('debe validar longitud mínima de contraseña', () => {
      const shortPasswords = ['123', '1234567'];
      const validPassword = '12345678';

      shortPasswords.forEach(password => {
        const dataWithShortPassword = {
          ...validData,
          password,
          confirmPassword: password,
        };
        const result = registerSchema.safeParse(dataWithShortPassword);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].path).toEqual(['password']);
          expect(result.error.issues[0].message).toBe(
            'La contraseña debe tener al menos 8 caracteres'
          );
        }
      });

      // Test válido
      const dataWithValidPassword = {
        ...validData,
        password: validPassword,
        confirmPassword: validPassword,
      };
      const result = registerSchema.safeParse(dataWithValidPassword);
      expect(result.success).toBe(true);
    });
  });

  describe('Validación de confirmación de contraseña', () => {
    it('debe fallar si las contraseñas no coinciden', () => {
      const dataWithMismatchedPasswords = {
        ...validData,
        password: 'password123',
        confirmPassword: 'different123',
      };
      const result = registerSchema.safeParse(dataWithMismatchedPasswords);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toEqual(['confirmPassword']);
        expect(result.error.issues[0].message).toBe(
          'Las contraseñas no coinciden, por favor verifica que sean iguales'
        );
      }
    });
  });

  describe('Validación de fecha de nacimiento', () => {
    it('debe validar fechas válidas', () => {
      const validDates = ['1995-12-25', '2000-02-29']; // Incluye año bisiesto

      validDates.forEach(date => {
        const dataWithValidDate = { ...validData, dateOfBirth: date };
        const result = registerSchema.safeParse(dataWithValidDate);
        expect(result.success).toBe(true);
      });
    });
  });
});
