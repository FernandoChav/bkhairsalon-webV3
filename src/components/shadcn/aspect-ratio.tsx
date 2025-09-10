'use client';

import { Root } from '@radix-ui/react-aspect-ratio';

import type { ComponentProps } from 'react';

export const AspectRatio = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="aspect-ratio" {...props} />;
}

