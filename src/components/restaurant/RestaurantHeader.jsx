import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDishById } from '../../store';
import styles from './RestaurantLayout.module.css';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.5;

const RestaurantHeader = ({ restaurant }) => {
  // Получаем блюда ресторана для отображения кухни
  const dishes = useSelector(state => 
    restaurant ? restaurant.menu.map(dishId => selectDishById(state, dishId)).filter(Boolean) : []
  );
  
  // Получаем список основных ингредиентов
  const cuisineType = dishes.length > 0 
    ? dishes.slice(0, 2).map(dish => dish.ingredients[0]).join(', ')
    : `${restaurant.name} Cuisine`;

  return (
    <div className={styles.header}>
      <Link to="/restaurants" className={styles.backLink}>
        ← All Restaurants
      </Link>
      <h1 className={styles.restaurantName}>{restaurant.name}</h1>
      <div className={styles.restaurantInfo}>
        <div className={styles.rating}>⭐ {DEFAULT_RATING.toFixed(1)}</div>
        <div className={styles.cuisineType}>{cuisineType}</div>
      </div>
    </div>
  );
};

RestaurantHeader.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default RestaurantHeader; 