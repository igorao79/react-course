import DishPage from '@components/dish/DishPage';

export default async function Dish({ params }) {
  const { dishId } = await params;
  return <DishPage dishId={dishId} />;
} 