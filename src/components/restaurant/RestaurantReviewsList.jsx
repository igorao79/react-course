import { getReviews } from '@/lib/api';
import Review from '@components/review/Review';
import styles from './RestaurantReviewsPage.module.css';

const RestaurantReviewsList = async ({ restaurantId }) => {
  const reviews = await getReviews(restaurantId);

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Отзывов пока нет</h3>
        <p>Станьте первым, кто оставит отзыв о ресторане</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewsList}>
      {reviews.map(review => (
        <Review
          key={review.id}
          review={review}
          restaurantId={restaurantId}
        />
      ))}
    </div>
  );
};

export default RestaurantReviewsList; 