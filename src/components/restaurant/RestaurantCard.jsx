import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './RestaurantsPage.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.2;

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <Link href={`/restaurants/${restaurant.id}`} className={styles.restaurantLink}>
      <div className={styles.restaurant}>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <div className={styles.rating}>
          <FaStar className={styles.star} />
          {DEFAULT_RATING.toFixed(1)}
        </div>
      </div>
    </Link>
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