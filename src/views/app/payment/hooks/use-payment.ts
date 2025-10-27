'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export const usePayment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    router.push('/payment/confirmation');
  };

  return {
    paymentMethod,
    setPaymentMethod,
    isProcessing,
    handlePayment,
  };
};
