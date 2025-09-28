'use client';

import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';

import { Input } from '@/components/shadcn';
import { cn } from '@/libs';

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const [value, setValue] = useState((props.value as string) || '');

    const { 'aria-invalid': ariaInvalid, ...restProps } = props;

    const formatChileanPhoneNumber = (input: string): string => {
      const cleaned = input.replace(/\D/g, '');

      if (cleaned.length === 0) {
        return '';
      }

      // Handle Chilean phone number formats

      if (cleaned.startsWith('569') && cleaned.length >= 4) {
        const withoutCountryCode = cleaned.slice(3);
        if (withoutCountryCode.length >= 1) {
          const formatted = `+56 9 ${withoutCountryCode.slice(0, 1)}`;
          if (withoutCountryCode.length >= 5) {
            return `${formatted} ${withoutCountryCode.slice(1, 5)} ${withoutCountryCode.slice(5)}`;
          } else if (withoutCountryCode.length > 1) {
            return `${formatted} ${withoutCountryCode.slice(1)}`;
          }
          return formatted;
        }
      }

      if (cleaned.length <= 9 && cleaned.startsWith('9')) {
        if (cleaned.length >= 1) {
          const formatted = `+56 9 ${cleaned.slice(1, 2)}`;
          if (cleaned.length >= 5) {
            return `${formatted} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
          } else if (cleaned.length > 2) {
            return `${formatted} ${cleaned.slice(2)}`;
          }
          return formatted;
        }
      }

      if (cleaned.length === 8 && !cleaned.startsWith('9')) {
        const withLeading9 = '9' + cleaned;
        return `+56 9 ${withLeading9.slice(1, 2)} ${withLeading9.slice(2, 6)} ${withLeading9.slice(6)}`;
      }

      return cleaned;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const formatted = formatChileanPhoneNumber(e.target.value);
      setValue(formatted);

      if (onChange) {
        onChange(e);
      }

      if (onValueChange) {
        const rawNumber = formatted.replace(/\D/g, '');
        onValueChange(rawNumber);
      }
    };

    return (
      <Input
        type="tel"
        className={cn('pl-10', className)}
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder="+56 9 1234 5678"
        maxLength={16}
        aria-invalid={ariaInvalid}
        {...restProps}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
