import RestaurantReviewsPage from '@components/restaurant/RestaurantReviewsPage';

export default async function ReviewsPage({ params }) {
  const { restaurantId } = await params;
  return <RestaurantReviewsPage restaurantId={restaurantId} />;
} 