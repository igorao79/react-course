import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectRestaurantById } from '../../store';
import styles from './RestaurantsPage.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.5;

const RestaurantCard = ({ restaurantId }) => {
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  
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
        to={`/restaurants/${restaurantId}`}
        className={styles.viewButton}
      >
        View Restaurant
      </Link>
    </div>
  );
};

RestaurantCard.propTypes = {
  restaurantId: PropTypes.string.isRequired
};

export default RestaurantCard; 