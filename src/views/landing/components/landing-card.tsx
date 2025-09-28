import { FC, ReactNode } from 'react';

interface LandingCardProps {
  children: ReactNode;
  variant: 'primary' | 'accent';
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LandingCard: FC<LandingCardProps> = ({
  children,
  variant,
  size,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-primary',
    accent: 'bg-accent',
  };

  const sizeStyles = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10',
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
        relative overflow-hidden group
      `}
    >
      {children}

      {variant === 'primary' && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary-foreground/5 rounded-full" />
      )}

      {variant === 'accent' && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-foreground/5 rounded-full" />
      )}
    </div>
  );
};
