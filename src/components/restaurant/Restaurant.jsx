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
import { selectRestaurantReviews, selectDishById } from '../../store';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const Restaurant = ({ restaurant, multiplier = 1 }) => {
  const { theme } = useTheme();
  const reviews = useSelector(state => selectRestaurantReviews(state, restaurant?.id));
  const [localReviews, setLocalReviews] = useState([]);
  
  // Get dishes for this restaurant
  const dishes = useSelector(state => 
    restaurant?.menu?.map(dishId => selectDishById(state, dishId)).filter(Boolean) || []
  );

  if (!restaurant) {
    return <div className={styles.error}>Restaurant data is not available</div>;
  }

  const handleReviewSubmit = (newReview) => {
    setLocalReviews([...localReviews, newReview]);
  };

  // Create duplicated content for long scroll
  const duplicatedContent = Array(multiplier).fill(null);

  // Combine Redux reviews with local reviews
  const allReviews = [...reviews, ...localReviews];

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <div className={styles.header}>
        <h2 className={styles.name}>{restaurant.name}</h2>
        <div className={styles.badge}>
          {dishes.length} dishes • {allReviews.length} reviews
        </div>
      </div>
      
      {duplicatedContent.map((_, index) => (
        <div key={index} className={styles.section}>
          {dishes.length > 0 ? (
            <div className={styles.menu}>
              <h3 className={styles.sectionTitle}>
                Menu {multiplier > 1 ? `(Copy ${index + 1})` : ''}
              </h3>
              <div className={styles.dishGrid}>
                {dishes.map((dish) => (
                  <Dish key={`${dish.id}-${index}`} dish={dish} />
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
            {allReviews.length > 0 ? (
              <div className={styles.reviewsList}>
                {allReviews.map((review) => (
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
    menu: PropTypes.arrayOf(PropTypes.string),
    reviews: PropTypes.arrayOf(PropTypes.string)
  }),
  multiplier: PropTypes.number
};

export default Restaurant; 