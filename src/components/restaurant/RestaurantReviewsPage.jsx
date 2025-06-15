import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById } from '../../store';
import RestaurantReviews from './RestaurantReviews';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantReviewsPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));

  if (!restaurant) {
    return <div className={styles.error}>Restaurant data is not available</div>;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <RestaurantReviews 
        reviewIds={restaurant.reviews} 
        restaurantId={restaurantId} 
      />
    </div>
  );
};

export default RestaurantReviewsPage; 