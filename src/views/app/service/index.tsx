'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import { useFormatPrice } from '@/hooks/common';
import {
  BookedServicesDrawer,
  BookingSheet,
} from '@/views/app/booking/components';
import { useBookedServices, useBookingSheet } from '@/views/app/booking/hooks';

import {
  CategoryFilter,
  CustomerServiceViewSkeleton,
  FlyingCardAnim,
  ServiceList,
} from './components';
import { useCustomerServiceView, useFlyingCartAnimation } from './hooks';

export const CustomerServiceView: FC = () => {
  const router = useRouter();

  // Categories and services
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

  // Booked services hook
  const {
    bookedServices,
    totalPrice,
    isOpen: isDrawerOpen,
    addBooking,
    removeBooking,
    toggleDrawer,
    handleContinue,
  } = useBookedServices();

  // Booking sheet hook
  const {
    isOpen: isSheetOpen,
    setIsOpen: setIsSheetOpen,
    openSheet,
    selectedService,
    forWho,
    setForWho,
    confirmBooking,
    isConfirmDisabled,
    selectedSlot,
    setSelectedSlot,
  } = useBookingSheet(addBooking);

  // Flying card animation
  const { flyingCards, cartRef } = useFlyingCartAnimation(addBooking);

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
          openBookingSheet={openSheet}
          formatPrice={formatPrice}
        />

        {/* Booking Sheet */}
        <BookingSheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          selectedService={selectedService}
          forWho={forWho}
          setForWho={setForWho}
          getCategoryName={getCategoryName}
          formatPrice={formatPrice}
          onConfirm={confirmBooking}
          isConfirmDisabled={isConfirmDisabled}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
      </div>

      {/* Flying Card Animations */}
      <FlyingCardAnim flyingCards={flyingCards} cartRef={cartRef} />

      {/* Booked Services Drawer */}
      <BookedServicesDrawer
        bookedServices={bookedServices}
        totalPrice={totalPrice}
        isOpen={isDrawerOpen}
        getCategoryName={getCategoryName}
        formatPrice={formatPrice}
        onToggle={toggleDrawer}
        onRemove={removeBooking}
        onContinue={() => handleContinue(() => router.push('/payment'))}
      />
    </div>
  );
};
