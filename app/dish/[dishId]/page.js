import DishPage from '../../../src/components/dish/DishPage';

export default async function Dish({ params }) {
  const { dishId } = await params;
  return <DishPage dishId={dishId} />;
} 