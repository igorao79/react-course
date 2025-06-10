import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectRestaurantById, selectDishById } from '../../store';
import styles from './RestaurantsPage.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.5;

const RestaurantCard = ({ restaurantId }) => {
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const dishes = useSelector(state => 
    restaurant ? restaurant.menu.map(dishId => selectDishById(state, dishId)).filter(Boolean) : []
  );
  
  if (!restaurant) return null;
  
  // Получаем список ингредиентов для отображения как "кухня"
  const cuisineType = dishes.length > 0 
    ? dishes.slice(0, 2).map(dish => dish.ingredients[0]).join(', ')
    : `${restaurant.name} Cuisine`;

  return (
    <div className={styles.restaurantCard}>
      <h2 className={styles.restaurantName}>{restaurant.name}</h2>
      <div className={styles.restaurantDetails}>
        <div className={styles.rating}>
          ⭐ {DEFAULT_RATING.toFixed(1)}
        </div>
        <div className={styles.cuisineType}>
          {cuisineType}
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