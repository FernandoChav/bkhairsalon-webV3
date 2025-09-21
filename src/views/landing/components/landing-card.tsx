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
  // Variant styles usando colores de ShadCN
  const variantStyles = {
    primary: 'bg-primary', // Fondo principal (oscuro)
    accent: 'bg-accent', // Fondo accent (claro/gris)
  };

  // Size styles
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
      {/* Children content */}
      {children}

      {/* Decorative element for primary variant */}
      {variant === 'primary' && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary-foreground/5 rounded-full" />
      )}

      {/* Decorative element for accent variant */}
      {variant === 'accent' && (
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent-foreground/5 rounded-full" />
      )}
    </div>
  );
};
