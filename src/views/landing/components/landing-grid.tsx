import { FC, ReactNode } from 'react';

interface LandingGridProps {
  children: ReactNode;
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?:
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

export const LandingGrid: FC<LandingGridProps> = ({
  children,
  columns = { default: 1, md: 3 },
  gap = 'md',
  maxWidth,
  className = '',
}) => {
  const getGridColumns = () => {
    const { default: defaultCols, sm, md, lg, xl } = columns;

    let gridClasses = `grid-cols-${defaultCols}`;

    if (sm) gridClasses += ` sm:grid-cols-${sm}`;
    if (md) gridClasses += ` md:grid-cols-${md}`;
    if (lg) gridClasses += ` lg:grid-cols-${lg}`;
    if (xl) gridClasses += ` xl:grid-cols-${xl}`;

    return gridClasses;
  };

  const gapStyles = {
    sm: 'gap-3',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
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
    <div
      className={`grid ${getGridColumns()} ${gapStyles[gap]} ${maxWidth ? maxWidthStyles[maxWidth] : ''} ${className}`}
    >
      {children}
    </div>
  );
};
