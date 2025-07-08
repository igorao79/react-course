import { Suspense } from 'react';
import RestaurantMenuList from '@components/restaurant/RestaurantMenuList';
import MenuLoading from './loading';

export default async function MenuPage({ params }) {
  const { restaurantId } = await params;
  
  return (
    <div>
      <Suspense fallback={<MenuLoading />}>
        <RestaurantMenuList restaurantId={restaurantId} />
      </Suspense>
    </div>
  );
} 