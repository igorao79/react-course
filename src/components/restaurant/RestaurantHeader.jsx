import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RestaurantLayout.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.5;

const RestaurantHeader = ({ restaurant }) => {
  return (
    <div className={styles.header}>
      <Link to="/restaurants" className={styles.backLink}>
        ← All Restaurants
      </Link>
      <h1 className={styles.restaurantName}>{restaurant.name}</h1>
      <div className={styles.restaurantInfo}>
        <div className={styles.rating}>⭐ {DEFAULT_RATING.toFixed(1)}</div>
        <div className={styles.cuisineType}>{restaurant.cuisine}</div>
      </div>
    </div>
  );
};

RestaurantHeader.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default RestaurantHeader; 