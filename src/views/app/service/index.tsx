'use client';

import { FC } from 'react';

import { useFormatPrice } from '@/hooks/common';

import {
  CartDrawer,
  CategoryFilter,
  CustomerServiceViewSkeleton,
  ServiceList,
} from './components';
import { useCartActions, useCustomerServiceView } from './hooks';

export const CustomerServiceView: FC = () => {
  const {
    topLevelCategories,
    filteredServices,
    selectedCategory,
    isAllSelected,
    getCategoryName,
    selectAllCategories,
    filterByCategory,
    isLoading,
  } = useCustomerServiceView();

  const {
    cart,
    totalPrice,
    isCartOpen,
    toggleCart,
    addToCart,
    removeFromCart,
    handleCheckout,
  } = useCartActions();

  const formatPrice = useFormatPrice();

  if (isLoading) {
    return <CustomerServiceViewSkeleton />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 pb-32">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Servicios
          </h1>
          <p className="text-neutral-600">
            Selecciona los servicios que deseas agendar
          </p>
        </div>

        {/* Categories filter */}
        <CategoryFilter
          categories={topLevelCategories}
          isAllSelected={isAllSelected}
          selectedCategory={selectedCategory}
          selectAllCategories={selectAllCategories}
          filterByCategory={filterByCategory}
        />

        {/* Services Grid */}
        <ServiceList
          services={filteredServices}
          getCategoryName={getCategoryName}
          onAddToCart={addToCart}
          formatPrice={formatPrice}
        />
      </div>

      {/* Cart Lower Drawer */}
      <CartDrawer
        cart={cart}
        totalPrice={totalPrice}
        isCartOpen={isCartOpen}
        getCategoryName={getCategoryName}
        formatPrice={formatPrice}
        onToggleCart={toggleCart}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};
