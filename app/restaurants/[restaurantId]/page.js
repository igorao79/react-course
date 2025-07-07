import { redirect } from 'next/navigation';
import { use } from 'react';

export default function RestaurantPage({ params }) {
  const { restaurantId } = use(params);
  
  redirect(`/restaurants/${restaurantId}/menu`);
} 