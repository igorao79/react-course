'use client';

import { useRouter } from 'next/navigation';
import { useEffect, use } from 'react';

export default function RestaurantPage({ params }) {
  const router = useRouter();
  const { restaurantId } = use(params);

  useEffect(() => {
    router.replace(`/restaurants/${restaurantId}/menu`);
  }, [router, restaurantId]);

  return null;
} 