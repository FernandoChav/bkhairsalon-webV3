'use client';

import { Phone } from 'lucide-react';

import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';

import { Input } from '@/components/shadcn';
import { cn } from '@/libs';

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
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

      // Handle the three Chilean phone number formats:
      // 1. "+569XXXXXXXX" (11 digits with +569)
      // 2. "569XXXXXXXX" (10 digits with 569)
      // 3. "9XXXXXXXX" (9 digits without country code)

      // If user includes full country code (569) - formats 1 and 2
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

      // If user starts typing without country code - format 3
      if (cleaned.length <= 9 && cleaned.startsWith('9')) {
        // Chilean mobile number: 9XXXXXXXX
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

      // If user types 8 digits without the leading 9, add it
      if (cleaned.length === 8 && !cleaned.startsWith('9')) {
        const withLeading9 = '9' + cleaned;
        return `+56 9 ${withLeading9.slice(1, 2)} ${withLeading9.slice(2, 6)} ${withLeading9.slice(6)}`;
      }

      // For any other case, return the cleaned input
      return cleaned;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
