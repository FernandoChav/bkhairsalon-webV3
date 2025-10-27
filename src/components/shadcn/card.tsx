import type { ComponentProps } from 'react';

import { cn } from '@/libs';

export const Card = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-lg',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 space-y-2 pb-6',
        className
      )}
      {...props}
    />
  );
};

export const CardTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'leading-none text-2xl font-light text-center text-card-foreground font-serif',
        className
      )}
      {...props}
    />
  );
};

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm text-center', className)}
      {...props}
    />
  );
};

export const CardAction = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
};

export const CardContent = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
};

export const CardFooter = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
};
