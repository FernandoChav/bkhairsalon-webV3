'use client';

import {
  CollapsibleContent as CollapsibleContentPrimitive,
  CollapsibleTrigger as CollapsibleTriggerPrimitive,
  Root,
} from '@radix-ui/react-collapsible';

import type { ComponentProps } from 'react';

export const Collapsible = ({ ...props }: ComponentProps<typeof Root>) => {
  return <Root data-slot="collapsible" {...props} />;
};

export const CollapsibleTrigger = ({
  ...props
}: ComponentProps<typeof CollapsibleTriggerPrimitive>) => {
  return (
    <CollapsibleTriggerPrimitive data-slot="collapsible-trigger" {...props} />
  );
};

export const CollapsibleContent = ({
  ...props
}: ComponentProps<typeof CollapsibleContentPrimitive>) => {
  return (
    <CollapsibleContentPrimitive data-slot="collapsible-content" {...props} />
  );
};
