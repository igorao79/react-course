import { Suspense } from 'react';
import RestaurantReviewsList from '@components/restaurant/RestaurantReviewsList';
import ReviewsLoading from './loading';

export default async function ReviewsPage({ params }) {
  const { restaurantId } = await params;
  
  return (
    <div>
      <Suspense fallback={<ReviewsLoading />}>
        <RestaurantReviewsList restaurantId={restaurantId} />
      </Suspense>
    </div>
  );
} 