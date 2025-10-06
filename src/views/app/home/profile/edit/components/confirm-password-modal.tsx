import { UseFormReturn } from 'react-hook-form';
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi';

import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/shadcn';
import { type PasswordForm } from '@/models/schemas';

interface ConfirmPasswordModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: (password: string) => void;
  isShowPassword: boolean;
  handlePasswordToggle: () => void;
  form: UseFormReturn<PasswordForm>;
}

export const ConfirmPasswordModal: FC<ConfirmPasswordModalProps> = ({
  isOpen,
  handleClose,
  handleConfirm,
  isShowPassword,
  handlePasswordToggle,
  form,
}) => {
  // Computed values
  const passwordInputType = isShowPassword ? 'text' : 'password';
  const passwordToggleIcon = isShowPassword ? (
    <HiEyeOff className="h-4 w-4" />
  ) : (
    <HiEye className="h-4 w-4" />
  );

  const handleFormSubmit = (data: PasswordForm) => {
    handleConfirm(data.password);
    form.reset();
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Validar cambio</DialogTitle>
          <p className="text-sm text-gray-500">
            Ingresa tu contraseña para confirmar
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HiLockClosed className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type={passwordInputType}
                        placeholder="Mínimo 8 caracteres"
                        className="pl-10 pr-10"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={handlePasswordToggle}
                      >
                        {passwordToggleIcon}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
