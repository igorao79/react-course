import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById } from '../../store';
import RestaurantMenu from './RestaurantMenu';
import RestaurantReviews from './RestaurantReviews';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const Restaurant = ({ restaurantId, type = 'menu', multiplier = 1 }) => {
  const { theme } = useTheme();
  const params = useParams();
  // Use restaurantId from props or from URL params
  const id = restaurantId || params.restaurantId;
  const restaurant = useSelector(state => selectRestaurantById(state, id));

  if (!restaurant) {
    return <div className={styles.error}>Restaurant data is not available</div>;
  }

  // If type is specified, show only that content
  if (type === 'menu') {
    return (
      <div className={classNames(styles.restaurant, themeStyles[theme])}>
        <RestaurantMenu menuIds={restaurant.menu} />
      </div>
    );
  }

  if (type === 'reviews') {
    return (
      <div className={classNames(styles.restaurant, themeStyles[theme])}>
        <RestaurantReviews reviewIds={restaurant.reviews} restaurantId={id} />
      </div>
    );
  }

  // Default: show both menu and reviews
  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <div className={styles.header}>
        <h2 className={styles.name}>{restaurant.name}</h2>
        <div className={styles.badge}>
          {restaurant.menu.length} dishes • {restaurant.reviews.length} reviews
        </div>
      </div>
      
      {Array(multiplier).fill(null).map((_, index) => (
        <div key={index} className={styles.section}>
          <RestaurantMenu 
            menuIds={restaurant.menu} 
            title={multiplier > 1 ? `Menu (Copy ${index + 1})` : 'Menu'} 
          />

          <RestaurantReviews 
            reviewIds={restaurant.reviews} 
            restaurantId={id} 
            title={multiplier > 1 ? `Reviews (Copy ${index + 1})` : 'Reviews'} 
            showForm={index === 0} 
          />
        </div>
      ))}
    </div>
  );
};

Restaurant.propTypes = {
  restaurantId: PropTypes.string,
  type: PropTypes.oneOf(['menu', 'reviews', 'full']),
  multiplier: PropTypes.number
};

export default Restaurant; 