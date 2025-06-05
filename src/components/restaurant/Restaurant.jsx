import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import DishCounter from '../dish/DishCounter';
import ReviewForm from '../review/ReviewForm';
import { RATING_MIN, RATING_MAX } from '../../constants';
import Dish from '../dish/Dish';
import Review from '../review/Review';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById, selectRestaurantDishes, selectRestaurantReviews } from '../../store';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const Restaurant = ({ restaurantId, multiplier = 1 }) => {
  const { theme } = useTheme();
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const dishIds = useSelector(state => selectRestaurantDishes(state, restaurantId));
  const reviewIds = useSelector(state => selectRestaurantReviews(state, restaurantId));
  
  const [localReviews, setLocalReviews] = useState([]);

  if (!restaurant) {
    return <div className={styles.error}>Restaurant data is not available</div>;
  }

  const handleReviewSubmit = (newReview) => {
    // Generate a unique ID for the new review
    const reviewWithId = {
      ...newReview,
      id: `local-${Date.now()}`
    };
    setLocalReviews([...localReviews, reviewWithId]);
  };

  // Create duplicated content for long scroll
  const duplicatedContent = Array(multiplier).fill(null);

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <div className={styles.header}>
        <h2 className={styles.name}>{restaurant.name}</h2>
        <div className={styles.badge}>
          {dishIds.length} dishes • {reviewIds.length + localReviews.length} reviews
        </div>
      </div>
      
      {duplicatedContent.map((_, index) => (
        <div key={index} className={styles.section}>
          {dishIds.length > 0 ? (
            <div className={styles.menu}>
              <h3 className={styles.sectionTitle}>
                Menu {multiplier > 1 ? `(Copy ${index + 1})` : ''}
              </h3>
              <div className={styles.dishGrid}>
                {dishIds.map((dishId) => (
                  <Dish key={`${dishId}-${index}`} dishId={dishId} />
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.emptyState}>No dishes available</p>
          )}

          <div className={styles.reviews}>
            <h3 className={styles.sectionTitle}>
              Reviews {multiplier > 1 ? `(Copy ${index + 1})` : ''}
            </h3>
            {(reviewIds.length > 0 || localReviews.length > 0) ? (
              <div className={styles.reviewsList}>
                {reviewIds.map((reviewId) => (
                  <Review key={`${reviewId}-${index}`} reviewId={reviewId} />
                ))}
                {localReviews.map((review) => (
                  <Review key={`${review.id}-${index}`} review={review} />
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>No reviews yet</p>
            )}

            {index === 0 && <ReviewForm onSubmit={handleReviewSubmit} />}
          </div>
        </div>
      ))}
    </div>
  );
};

Restaurant.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  multiplier: PropTypes.number
};

export default Restaurant; 