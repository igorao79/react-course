import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectRestaurantIds, selectRestaurantById, selectDishById } from '../../store';
import styles from './RestaurantsPage.module.css';

const RestaurantsPage = () => {
  const restaurantIds = useSelector(selectRestaurantIds);
  const navigate = useNavigate();

  const handleRestaurantClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className={styles.restaurantsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Restaurants</h1>
        <p className={styles.subtitle}>Select a restaurant to view menu and reviews</p>
      </div>
      
      <div className={styles.restaurantGrid}>
        {restaurantIds.map(id => (
          <RestaurantCard 
            key={id}
            restaurantId={id}
            onClick={() => handleRestaurantClick(id)}
          />
        ))}
      </div>
    </div>
  );
};

const RestaurantCard = ({ restaurantId, onClick }) => {
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const dishes = useSelector(state => 
    restaurant ? restaurant.menu.map(dishId => selectDishById(state, dishId)).filter(Boolean) : []
  );
  
  // Get average rating from reviews (hardcoded for now)
  const rating = 4.5;
  
  // Get cuisine type from dishes
  const ingredients = dishes.flatMap(dish => dish.ingredients);
  const uniqueIngredients = [...new Set(ingredients)];
  const cuisineType = uniqueIngredients.length > 0 
    ? uniqueIngredients.slice(0, 3).join(', ') 
    : `${restaurant.name} Cuisine`;

  if (!restaurant) return null;

  return (
    <div className={styles.restaurantCard} onClick={onClick}>
      <h2 className={styles.restaurantName}>{restaurant.name}</h2>
      <div className={styles.restaurantDetails}>
        <div className={styles.rating}>
          ⭐ {rating.toFixed(1)}
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

export default RestaurantsPage; 