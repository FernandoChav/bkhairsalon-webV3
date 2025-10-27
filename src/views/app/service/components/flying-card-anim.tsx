'use client';

import { AnimatePresence, motion } from 'motion/react';

import type { FC } from 'react';

import { Card, CardHeader, CardTitle } from '@/components/shadcn';
import type { FlyingCard } from '@/models/entities';

interface FlyingCardAnimProps {
  flyingCards: FlyingCard[];
  cartRef: React.RefObject<HTMLDivElement | null>;
}

export const FlyingCardAnim: FC<FlyingCardAnimProps> = ({
  flyingCards,
  cartRef,
}) => (
  <AnimatePresence>
    {flyingCards.map(card => {
      const cartRect = cartRef.current?.getBoundingClientRect();

      const endX = cartRect
        ? cartRect.left + cartRect.width / 2
        : window.innerWidth / 2;

      const endY = cartRect
        ? cartRect.top + cartRect.height / 2
        : window.innerHeight - 50;

      return (
        <motion.div
          key={card.id}
          initial={{
            position: 'fixed',
            left: card.startX,
            top: card.startY,
            x: '-50%',
            y: '-50%',
            scale: 1,
            opacity: 1,
            zIndex: 1000,
          }}
          animate={{
            left: endX,
            top: endY,
            scale: 0.3,
            opacity: 0.6,
          }}
          exit={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="pointer-events-none"
        >
          <Card className="w-64 bg-white shadow-xl">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">{card.service.name}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      );
    })}
  </AnimatePresence>
);
