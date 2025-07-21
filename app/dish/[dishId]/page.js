import { Suspense } from 'react';
import DishDetails from '@components/dish/DishDetails';

const DishLoading = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <p>Загружаем блюдо...</p>
  </div>
);

export default async function Dish({ params }) {
  const { dishId } = await params;
  
  return (
    <div>
      <Suspense fallback={<DishLoading />}>
        <DishDetails dishId={dishId} />
      </Suspense>
    </div>
  );
} 