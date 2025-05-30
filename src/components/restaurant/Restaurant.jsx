import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import DishCounter from '../dish/DishCounter';
import ReviewForm from '../review/ReviewForm';
import { RATING_MIN, RATING_MAX } from '../../constants';
import Dish from '../dish/Dish';
import Review from '../review/Review';
import styles from './Restaurant.module.css';

const Restaurant = ({ restaurant, multiplier = 1 }) => {
  const [reviews, setReviews] = useState(restaurant?.reviews || []);

  if (!restaurant) {
    return <div className={styles.error}>Restaurant data is not available</div>;
  }

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  // Create duplicated content for long scroll
  const duplicatedContent = Array(multiplier).fill(null);

  return (
    <div className={styles.restaurant}>
      <div className={styles.header}>
        <h2 className={styles.name}>{restaurant.name}</h2>
        <div className={styles.badge}>
          {restaurant.menu?.length || 0} dishes • {reviews.length} reviews
        </div>
      </div>
      
      {duplicatedContent.map((_, index) => (
        <div key={index} className={styles.section}>
          {restaurant.menu ? (
            <div className={styles.menu}>
              <h3 className={styles.sectionTitle}>
                Menu {multiplier > 1 ? `(Copy ${index + 1})` : ''}
              </h3>
              {restaurant.menu.length > 0 ? (
                <div className={styles.dishGrid}>
                  {restaurant.menu.map((dish) => (
                    <Dish key={`${dish.id}-${index}`} dish={dish} />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>No dishes available</p>
              )}
            </div>
          ) : (
            <p className={styles.emptyState}>Menu is not available</p>
          )}

          <div className={styles.reviews}>
            <h3 className={styles.sectionTitle}>
              Reviews {multiplier > 1 ? `(Copy ${index + 1})` : ''}
            </h3>
            {reviews.length > 0 ? (
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
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
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
      })
    )
  }),
  multiplier: PropTypes.number
};

export default Restaurant; 