import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { selectDishById, selectRestaurantByDishId } from '../../store';
import { useCartActions } from '../../hooks/useCartActions';
import DishCounter from './DishCounter';
import styles from './DishPage.module.css';
import themeStyles from '../../styles/theme.module.css';

const DishPage = () => {
  const { dishId } = useParams();
  const dish = useSelector(state => selectDishById(state, dishId));
  const restaurant = useSelector(state => selectRestaurantByDishId(state, dishId));
  const { theme } = useTheme();
  const { count, handleIncrement, handleDecrement } = useCartActions(dishId);
  
  if (!dish) {
    return (
      <div className={styles.notFound}>
        <h2>Dish not found</h2>
        <Link to="/restaurants">Browse restaurants</Link>
      </div>
    );
  }
  
  return (
    <div className={classNames(styles.dishPage, themeStyles[theme])}>
      <div className={styles.header}>
        {restaurant && (
          <Link to={`/restaurants/${restaurant.id}/menu`} className={styles.backLink}>
            ← Back to {restaurant.name}'s Menu
          </Link>
        )}
      </div>
      
      <div className={styles.dishContent}>
        <div className={styles.dishInfo}>
          <h1 className={styles.dishName}>{dish.name}</h1>
          <div className={styles.dishPrice}>${dish.price}</div>
          
          <div className={styles.ingredientsSection}>
            <h3 className={styles.sectionTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {dish.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.cartSection}>
            <h3 className={styles.sectionTitle}>Add to Cart</h3>
            <div className={styles.counterWrapper}>
              <DishCounter
                count={count}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishPage; 