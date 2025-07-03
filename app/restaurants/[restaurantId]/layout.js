import RestaurantLayout from '../../../src/components/restaurant/RestaurantLayout';

export default async function RestaurantLayoutPage({ children, params }) {
  const { restaurantId } = await params;
  
  return (
    <RestaurantLayout restaurantId={restaurantId}>
      {children}
    </RestaurantLayout>
  );
} 