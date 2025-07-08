import { Suspense } from 'react';
import DishDetails from '@components/dish/DishDetails';
import DishLoading from './loading';

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