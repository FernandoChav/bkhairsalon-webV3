import { FC, ReactNode } from 'react';

interface LandingSectionProps {
  children: ReactNode;
  background: 'default' | 'muted' | 'primary';
  padding: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth:
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | 'full';
  className?: string;
}

export const LandingSection: FC<LandingSectionProps> = ({
  children,
  background = 'default',
  padding = 'lg',
  maxWidth = '7xl',
  className = '',
}) => {
  const backgroundStyles = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
  };

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-32',
  };

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section
      className={`
        ${backgroundStyles[background]}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {maxWidth === 'full' ? (
        children
      ) : (
        <div className={`container mx-auto px-6 ${maxWidthStyles[maxWidth]}`}>
          {children}
        </div>
      )}
    </section>
  );
};
