import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RestaurantsPage.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.5;

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <div className={styles.restaurantCard}>
      <h2 className={styles.restaurantName}>{restaurant.name}</h2>
      <div className={styles.restaurantDetails}>
        <div className={styles.rating}>
          ⭐ {DEFAULT_RATING.toFixed(1)}
        </div>
        <div className={styles.cuisineType}>
          {restaurant.cuisine}
        </div>
      </div>
      <Link 
        to={`/restaurants/${restaurant.id}`}
        className={styles.viewButton}
      >
        View Restaurant
      </Link>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
  }).isRequired
};

export default RestaurantCard; 