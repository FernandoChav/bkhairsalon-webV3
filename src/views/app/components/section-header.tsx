import { FC } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  description,
  className = '',
  variant = 'light',
}) => {
  const textColor =
    variant === 'dark' ? 'text-primary-foreground' : 'text-foreground';
  const descriptionColor =
    variant === 'dark' ? 'text-primary-foreground/70' : 'text-muted-foreground';

  return (
    <div className={`mb-16 ${className}`}>
      <h2
        className={`text-5xl md:text-6xl mb-4 ${textColor}`}
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
      </h2>
      {description && (
        <p className={`${descriptionColor} max-w-3xl text-lg`}>{description}</p>
      )}
    </div>
  );
};
