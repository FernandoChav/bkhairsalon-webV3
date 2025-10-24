'use client';

import { atom, useAtom } from 'jotai';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { CartItem } from '@/models/entities';
import { ServiceResponse } from '@/models/responses';

export const cartAtom = atom<CartItem[]>([]);
export const isCartOpenAtom = atom<boolean>(false);

export const useCartActions = () => {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtom);
  const [isCartOpen, setIsCartOpen] = useAtom(isCartOpenAtom);

  const addToCart = (service: ServiceResponse) => {
    const cartItem: CartItem = {
      ...service,
      cartId: `${service.id}-${Date.now()}`,
    };
    setCart(prev => [...prev, cartItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const handleCheckout = () => router.push('/userspace/booking');

  return {
    cart,
    totalPrice,
    isCartOpen,
    addToCart,
    removeFromCart,
    toggleCart,
    handleCheckout,
  };
};
