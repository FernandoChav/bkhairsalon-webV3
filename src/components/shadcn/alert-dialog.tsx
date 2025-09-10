'use client';

import {
  Action,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-alert-dialog';

import type { ComponentProps } from 'react';

import { buttonVariants } from '@/components';
import { cn } from '@/libs';

export const AlertDialog = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="alert-dialog" {...props} />;
};

export const AlertDialogTrigger = ({
  ...props
}: ComponentProps<typeof Trigger>) => {
  return <Trigger data-slot="alert-dialog-trigger" {...props} />;
};

export const AlertDialogPortal = ({
  ...props
}: ComponentProps<typeof Portal>) => {
  return <Portal data-slot="alert-dialog-portal" {...props} />;
};

export const AlertDialogOverlay = ({
  className,
  ...props
}: ComponentProps<typeof Overlay>) => {
  return (
    <Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
};

export const AlertDialogContent = ({
  className,
  ...props
}: ComponentProps<typeof Content>) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
};

export const AlertDialogHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
};

export const AlertDialogFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
};

export const AlertDialogTitle = ({
  className,
  ...props
}: ComponentProps<typeof Title>) => {
  return (
    <Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
};

export const AlertDialogDescription = ({
  className,
  ...props
}: ComponentProps<typeof Description>) => {
  return (
    <Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
};

export const AlertDialogAction = ({
  className,
  ...props
}: ComponentProps<typeof Action>) => {
  return <Action className={cn(buttonVariants(), className)} {...props} />;
};

export const AlertDialogCancel = ({
  className,
  ...props
}: ComponentProps<typeof Cancel>) => {
  return (
    <Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  );
};
