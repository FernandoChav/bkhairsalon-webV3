'use client';

import { useRef, useState } from 'react';

import type { FlyingCard } from '@/models/entities';
import type { ServiceResponse } from '@/models/responses';

export const useFlyingCartAnimation = (
  addToCart: (service: ServiceResponse) => void
) => {
  const [flyingCards, setFlyingCards] = useState<FlyingCard[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

  const triggerAnimation = (
    service: ServiceResponse,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const flyingCardId = `flying-${Date.now()}`;
    const flyingCard: FlyingCard = {
      id: flyingCardId,
      service: { ...service, isDeleted: false },
      startX: rect.left + rect.width / 2,
      startY: rect.top + rect.height / 2,
    };

    setFlyingCards(prev => [...prev, flyingCard]);

    setTimeout(() => {
      addToCart(service);
      setFlyingCards(prev => prev.filter(card => card.id !== flyingCardId));
    }, 800);
  };

  return { flyingCards, triggerAnimation, cartRef };
};
