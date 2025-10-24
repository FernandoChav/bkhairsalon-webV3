'use client';

import { FC } from 'react';

export const CustomerServiceViewSkeleton: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 pb-32">
      <div className="container mx-auto px-4 py-6">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-neutral-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-neutral-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* Category Filter Skeleton */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="h-9 bg-neutral-200 rounded-full w-20 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-sm border border-neutral-200 animate-pulse"
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-neutral-200 rounded w-20"></div>
                  <div className="flex items-center">
                    <div className="h-4 bg-neutral-200 rounded w-12"></div>
                  </div>
                </div>
                <div className="h-6 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-4 flex-grow">
                <div className="h-8 bg-neutral-200 rounded w-24"></div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="h-10 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg">
        <div className="w-full flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-neutral-200 rounded animate-pulse"></div>
            <div className="h-5 bg-neutral-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 bg-neutral-200 rounded w-16 animate-pulse"></div>
            <div className="h-5 w-5 bg-neutral-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
