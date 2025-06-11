import { useState } from 'react';
import PropTypes from 'prop-types';
import Review from '../review/Review';
import ReviewForm from '../review/ReviewForm';
import styles from './Restaurant.module.css';

const RestaurantReviews = ({ reviewIds, restaurantId, title, showForm = true }) => {
  const [localReviews, setLocalReviews] = useState([]);

  const handleReviewSubmit = (newReview) => {
    // Generate a unique ID for the new review
    const reviewWithId = {
      ...newReview,
      id: `local-${Date.now()}`
    };
    setLocalReviews([...localReviews, reviewWithId]);
  };

  return (
    <div className={styles.reviews}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      
      {(reviewIds.length > 0 || localReviews.length > 0) ? (
        <div className={styles.reviewsList}>
          {reviewIds.map((reviewId) => (
            <Review key={reviewId} reviewId={reviewId} restaurantId={restaurantId} />
          ))}
          {localReviews.map((review) => (
            <Review key={review.id} review={review} restaurantId={restaurantId} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>No reviews yet</p>
      )}

      {showForm && <ReviewForm onSubmit={handleReviewSubmit} restaurantId={restaurantId} />}
    </div>
  );
};

RestaurantReviews.propTypes = {
  reviewIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  restaurantId: PropTypes.string.isRequired,
  title: PropTypes.string,
  showForm: PropTypes.bool
};

export default RestaurantReviews; 