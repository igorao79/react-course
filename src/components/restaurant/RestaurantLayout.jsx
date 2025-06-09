import { useSelector } from 'react-redux';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById } from '../../store';
import styles from './RestaurantLayout.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantLayout = () => {
  const { restaurantId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  // Get restaurant reviews from state
  const reviews = useSelector(state => {
    if (!restaurant) return [];
    return state.reviews.ids
      .map(id => state.reviews.entities[id])
      .filter(review => review.restaurantId === restaurantId);
  });
  
  // Calculate average rating
  const rating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 4.0; // Default rating if no reviews
  
  if (!restaurant) {
    return (
      <div className={styles.notFound}>
        <h2>Restaurant not found</h2>
        <Link to="/restaurants">Back to restaurants</Link>
      </div>
    );
  }
  
  const isMenuActive = location.pathname.includes('/menu') || location.pathname === `/restaurants/${restaurantId}`;
  const isReviewsActive = location.pathname.includes('/reviews');
  
  const handleTabClick = (tab) => {
    navigate(`/restaurants/${restaurantId}/${tab}`);
  };
  
  // Get cuisine type from restaurant's menu
  const dishes = useSelector(state => 
    restaurant ? restaurant.menu.map(dishId => state.dishes.entities[dishId]).filter(Boolean) : []
  );
  
  const ingredients = dishes.flatMap(dish => dish.ingredients);
  const uniqueIngredients = [...new Set(ingredients)];
  const cuisineType = uniqueIngredients.length > 0 
    ? uniqueIngredients.slice(0, 3).join(', ') 
    : `${restaurant.name} Cuisine`;
  
  return (
    <div className={classNames(styles.restaurantLayout, themeStyles[theme])}>
      <div className={styles.header}>
        <Link to="/restaurants" className={styles.backLink}>
          ← All Restaurants
        </Link>
        <h1 className={styles.restaurantName}>{restaurant.name}</h1>
        <div className={styles.restaurantInfo}>
          <div className={styles.rating}>⭐ {rating.toFixed(1)}</div>
          <div className={styles.cuisineType}>{cuisineType}</div>
        </div>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={classNames(styles.tab, { [styles.activeTab]: isMenuActive })}
          onClick={() => handleTabClick('menu')}
        >
          Menu
        </button>
        <button 
          className={classNames(styles.tab, { [styles.activeTab]: isReviewsActive })}
          onClick={() => handleTabClick('reviews')}
        >
          Reviews
        </button>
      </div>
      
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantLayout; 