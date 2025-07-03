import RestaurantMenuPage from '../../../../src/components/restaurant/RestaurantMenuPage';

export default async function MenuPage({ params }) {
  const { restaurantId } = await params;
  return <RestaurantMenuPage restaurantId={restaurantId} />;
} 