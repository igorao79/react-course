import { Suspense } from 'react';
import RestaurantMenuList from '@components/restaurant/RestaurantMenuList';

const MenuLoading = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <p>Загружаем меню...</p>
  </div>
);

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