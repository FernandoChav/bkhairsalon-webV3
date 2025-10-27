'use client';

import { useRef, useState } from 'react';

import type { FlyingCard } from '@/models/entities';
import type { Service } from '@/models/entities';

export const useFlyingCartAnimation = (
  onComplete: (service: Service, forWho: string) => void
) => {
  const [flyingCards, setFlyingCards] = useState<FlyingCard[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

  const triggerAnimation = (
    service: Service,
    forWho: string, // new argument
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const flyingCardId = `flying-${Date.now()}`;

    setFlyingCards(prev => [
      ...prev,
      {
        id: flyingCardId,
        service: { ...service, isDeleted: false },
        startX: rect.left + rect.width / 2,
        startY: rect.top + rect.height / 2,
      },
    ]);

    setTimeout(() => {
      onComplete(service, forWho); // pass both
      setFlyingCards(prev => prev.filter(card => card.id !== flyingCardId));
    }, 800);
  };

  return { flyingCards, triggerAnimation, cartRef };
};
