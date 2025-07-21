import { Suspense } from 'react';
import RestaurantReviewsList from '@components/restaurant/RestaurantReviewsList';

const ReviewsLoading = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <p>Загружаем отзывы...</p>
  </div>
);

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