'use client';

import { Phone } from 'lucide-react';

import { forwardRef, useState } from 'react';

import { Input } from '@/components/shadcn/input';
import { cn } from '@/libs';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const [value, setValue] = useState((props.value as string) || '');

    const formatChileanPhoneNumber = (input: string): string => {
      // Remove all non-digit characters
      const cleaned = input.replace(/\D/g, '');

      // Handle empty input
      if (cleaned.length === 0) {
        return '';
      }

      // If user starts typing without country code, assume Chilean mobile number
      if (cleaned.length <= 9) {
        // Chilean mobile number: 9XXXXXXXX
        if (cleaned.length >= 1) {
          const formatted = `+56 ${cleaned.slice(0, 1)}`;
          if (cleaned.length >= 5) {
            return `${formatted} ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
          } else if (cleaned.length > 1) {
            return `${formatted} ${cleaned.slice(1)}`;
          }
          return formatted;
        }
      }

      // If user includes country code (56)
      if (cleaned.startsWith('56') && cleaned.length >= 3) {
        const withoutCountryCode = cleaned.slice(2);
        if (withoutCountryCode.length >= 1) {
          const formatted = `+56 ${withoutCountryCode.slice(0, 1)}`;
          if (withoutCountryCode.length >= 5) {
            return `${formatted} ${withoutCountryCode.slice(1, 5)} ${withoutCountryCode.slice(5)}`;
          } else if (withoutCountryCode.length > 1) {
            return `${formatted} ${withoutCountryCode.slice(1)}`;
          }
          return formatted;
        }
      }

      // If user includes full international format
      if (cleaned.startsWith('56') && cleaned.length >= 11) {
        const withoutCountryCode = cleaned.slice(2);
        if (withoutCountryCode.length >= 9) {
          return `+56 ${withoutCountryCode.slice(0, 1)} ${withoutCountryCode.slice(1, 5)} ${withoutCountryCode.slice(5, 9)}`;
        }
      }

      return cleaned;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatChileanPhoneNumber(e.target.value);
      setValue(formatted);

      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }

      // Call onValueChange with the raw number
      if (onValueChange) {
        const rawNumber = formatted.replace(/\D/g, '');
        onValueChange(rawNumber);
      }
    };

    return (
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="tel"
          className={cn('pl-10', className)}
          ref={ref}
          value={value}
          onChange={handleChange}
          placeholder="+56 9 1234 5678"
          maxLength={16} // +56 9 1234 5678
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
