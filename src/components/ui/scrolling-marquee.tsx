import { FC, ReactNode } from 'react';

import { cn } from '@/libs';

interface ScrollingMarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: 'dot' | 'line' | 'none';
  separatorClassName?: string;
  customItems?: ReactNode[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  fullWidth?: boolean;
}

export const ScrollingMarquee: FC<ScrollingMarqueeProps> = ({
  items = [],
  className = '',
  itemClassName = '',
  separator = 'dot',
  separatorClassName = '',
  customItems,
  speed = 'normal',
  direction = 'left',
  fullWidth = false,
}) => {
  const itemsToRender = customItems || items;

  const getAnimationStyle = () => {
    const duration =
      speed === 'slow' ? '90s' : speed === 'fast' ? '25s' : '45s';

    return {
      animation: `marquee-scroll ${duration} linear infinite`,
      animationDirection: direction === 'right' ? 'reverse' : 'normal',
    };
  };

  const containerClasses = cn(
    'overflow-hidden',
    fullWidth && 'w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]',
    className
  );

  const animatedClasses = cn('flex whitespace-nowrap will-change-transform');

  const renderSeparator = () => {
    if (separator === 'none') return null;

    const baseClasses = separatorClassName || 'flex-shrink-0';

    if (separator === 'dot') {
      return (
        <div
          className={cn(
            'w-1 h-1 bg-muted-foreground rounded-full ml-8 mr-8',
            baseClasses
          )}
        />
      );
    }

    if (separator === 'line') {
      return (
        <div
          className={cn('w-8 h-px bg-muted-foreground ml-4 mr-4', baseClasses)}
        />
      );
    }

    return null;
  };

  const renderItem = (item: string | ReactNode, index: number) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className={cn('flex items-center', itemClassName)}>
          <span
            className="text-muted-foreground whitespace-nowrap"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {item}
          </span>
          {renderSeparator()}
        </div>
      );
    }

    return (
      <div key={index} className={cn('flex items-center', itemClassName)}>
        {item}
        {renderSeparator()}
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      <div className={animatedClasses} style={getAnimationStyle()}>
        <div className="flex items-center flex-shrink-0">
          {itemsToRender.map((item, index) => renderItem(item, index))}
        </div>
        <div className="flex items-center flex-shrink-0">
          {itemsToRender.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </div>
  );
};
