import { FC, ReactNode } from 'react';

interface ScrollingMarqueeProps {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: 'dot' | 'line' | 'none';
  separatorClassName?: string;
  customItems?: ReactNode[];
}

export const ScrollingMarquee: FC<ScrollingMarqueeProps> = ({
  items = [],
  className = '',
  itemClassName = '',
  separator = 'dot',
  separatorClassName = '',
  customItems,
}) => {
  const itemsToRender = customItems || items;

  const renderSeparator = () => {
    if (separator === 'none') return null;

    const baseClasses = separatorClassName || 'flex-shrink-0';

    if (separator === 'dot') {
      return (
        <div
          className={`w-1 h-1 bg-muted-foreground rounded-full ml-8 mr-8 ${baseClasses}`}
        />
      );
    }

    if (separator === 'line') {
      return (
        <div
          className={`w-8 h-px bg-muted-foreground ml-4 mr-4 ${baseClasses}`}
        />
      );
    }

    return null;
  };

  const renderItem = (item: string | ReactNode, index: number) => {
    if (typeof item === 'string') {
      return (
        <div key={index} className={`flex items-center ${itemClassName}`}>
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
      <div key={index} className={`flex items-center ${itemClassName}`}>
        {item}
        {renderSeparator()}
      </div>
    );
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center">
          {itemsToRender.map((item, index) => renderItem(item, index))}
        </div>
        <div className="flex items-center">
          {itemsToRender.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </div>
  );
};
