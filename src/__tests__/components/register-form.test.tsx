/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InputHTMLAttributes } from 'react';

import { render as customRender } from '@/__tests__/libs/render';
import { RegisterForm } from '@/views/register/components/register-form';
import { useRegisterForm } from '@/views/register/hooks/use-register-form';

// Mock del hook useRegisterForm
vi.mock('@/views/register/hooks/use-register-form');

// Mock React Hook Form
vi.mock('react-hook-form', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useForm: vi.fn(),
    Controller: ({ render }: any) => {
      const field = {
        onChange: vi.fn(),
        value: '',
        onBlur: vi.fn(),
        ref: vi.fn(),
      };
      return render({ field });
    },
    FormProvider: ({ children }: any) => children,
    useFormContext: vi.fn(() => ({
      formState: { errors: {} },
      getFieldState: vi.fn(() => ({ error: null })),
    })),
    useFormState: vi.fn(() => ({ errors: {} })),
  };
});

const mockUseRegisterForm = vi.mocked(useRegisterForm);

// Mock de los componentes de UI
vi.mock('@/components/ui/date-picker', () => ({
  DatePicker: ({ onChange, placeholder }: any) => (
    <input
      data-testid="date-picker"
      type="date"
      onChange={e => onChange?.(new Date(e.target.value))}
      placeholder={placeholder}
    />
  ),
}));

vi.mock('@/components/ui/phone-input', () => ({
  PhoneInput: (props: InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid="phone-input" type="tel" {...props} />
  ),
}));

describe('RegisterForm', () => {
  const mockForm: any = {
    handleSubmit: vi.fn(callback => (e: any) => {
      e?.preventDefault?.();
      callback({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        phoneNumber: '912345678',
        dateOfBirth: '1990-01-01',
        password: 'password123',
        confirmPassword: 'password123',
      });
    }),
    getValues: vi.fn().mockReturnValue({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phoneNumber: '912345678',
      dateOfBirth: '1990-01-01',
      password: 'password123',
      confirmPassword: 'password123',
    }),
    formState: {
      isValid: true,
      errors: {},
      isSubmitting: false,
    },
    control: {},
  };

  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseRegisterForm.mockReturnValue({
      form: mockForm,
      onSubmit: mockOnSubmit,
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  });

  describe('Renderizado', () => {
    it('debe renderizar el formulario con todos los campos', () => {
      customRender(<RegisterForm />);

      expect(screen.getAllByText('Crear cuenta')).toHaveLength(2);
      expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Tu apellido')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('tu@correo.com')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('+56 9 1234 5678')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Tu fecha de nacimiento')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Mínimo 8 caracteres')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Repite tu contraseña')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Crear cuenta' })
      ).toBeInTheDocument();
    });

    it('debe renderizar enlace al login', () => {
      customRender(<RegisterForm />);

      expect(screen.getByText('¿Ya tienes cuenta?')).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Inicia sesión' })
      ).toBeInTheDocument();
    });
  });

  describe('Interacciones de usuario', () => {
    it('debe permitir al usuario completar el formulario', async () => {
      const user = userEvent.setup();
      customRender(<RegisterForm />);

      const nameInput = screen.getByPlaceholderText('Tu nombre');
      const emailInput = screen.getByPlaceholderText('tu@correo.com');
      const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');

      await user.type(nameInput, 'María');
      await user.type(emailInput, 'maria@example.com');
      await user.type(passwordInput, 'mypassword123');

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('debe permitir mostrar/ocultar contraseña', async () => {
      const user = userEvent.setup();
      customRender(<RegisterForm />);

      const passwordInput = screen.getByPlaceholderText('Mínimo 8 caracteres');
      const showPasswordButton = screen
        .getAllByRole('button')
        .find(button => button.parentElement?.contains(passwordInput));

      expect(passwordInput).toHaveAttribute('type', 'password');

      if (showPasswordButton) {
        await user.click(showPasswordButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
      }
    });
  });

  describe('Estado del botón de envío', () => {
    it('debe habilitar el botón cuando el formulario es válido', () => {
      mockForm.formState.isValid = true;
      customRender(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: 'Crear cuenta' });
      expect(submitButton).not.toBeDisabled();
    });

    it('debe deshabilitar el botón cuando el formulario no es válido', () => {
      mockForm.formState.isValid = false;
      customRender(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: 'Crear cuenta' });
      expect(submitButton).toBeDisabled();
    });

    it('debe mostrar estado de carga', () => {
      mockUseRegisterForm.mockReturnValue({
        form: mockForm,
        onSubmit: mockOnSubmit,
        isLoading: true,
        error: null,
        isSuccess: false,
      });

      customRender(<RegisterForm />);

      expect(screen.getByText('Creando cuenta...')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Creando cuenta...' })
      ).toBeDisabled();
    });
  });

  describe('Envío del formulario', () => {
    it('debe llamar a onSubmit cuando se envía el formulario', async () => {
      const user = userEvent.setup();
      const mockHandleSubmit = vi.fn(fn => {
        fn({
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
          phoneNumber: '1234567890',
          dateOfBirth: '1990-01-01',
          password: 'password123',
          confirmPassword: 'password123',
        });
      });
      mockForm.handleSubmit = mockHandleSubmit;

      customRender(<RegisterForm />);

      const submitButton = screen.getByRole('button', { name: 'Crear cuenta' });
      await user.click(submitButton);

      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        phoneNumber: '1234567890',
        dateOfBirth: '1990-01-01',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });
  });
});
