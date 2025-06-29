import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  useGetDishByIdQuery, 
  useGetRestaurantByIdQuery 
} from '../../store';
import { useCartActions } from '../../hooks/useCartActions';
import DishCounter from './DishCounter';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './DishPage.module.css';
import themeStyles from '../../styles/theme.module.css';

const DishPage = () => {
  const { dishId } = useParams();
  const { theme } = useTheme();
  
  const {
    data: dish,
    isLoading: dishLoading,
    error: dishError,
    refetch: refetchDish,
  } = useGetDishByIdQuery(dishId);
  
  const {
    data: restaurant,
    isLoading: restaurantLoading,
  } = useGetRestaurantByIdQuery(dish?.restaurantId, {
    skip: !dish?.restaurantId,
  });
  
  const cartActions = dish ? useCartActions(dish) : { count: 0, handleIncrement: () => {}, handleDecrement: () => {} };
  const { count, handleIncrement, handleDecrement } = cartActions;

  if (dishLoading) {
    return <LoadingSpinner message="Загружаем блюдо..." />;
  }

  if (dishError) {
    return <ErrorMessage message={dishError.message} onRetry={refetchDish} />;
  }
  
  if (!dish) {
    return (
      <div className={styles.notFound}>
        <h2>Блюдо не найдено</h2>
        <Link to="/restaurants">Перейти к ресторанам</Link>
      </div>
    );
  }
  
  return (
    <div className={classNames(styles.dishPage, themeStyles[theme])}>
      <div className={styles.header}>
        {restaurant && !restaurantLoading && (
          <Link to={`/restaurants/${restaurant.id}/menu`} className={styles.backLink}>
            ← Вернуться к меню {restaurant.name}
          </Link>
        )}
      </div>
      
      <div className={styles.dishContent}>
        <div className={styles.dishInfo}>
          <h1 className={styles.dishName}>{dish.name}</h1>
          <div className={styles.dishPrice}>${dish.price}</div>
          
          <div className={styles.ingredientsSection}>
            <h3 className={styles.sectionTitle}>Ингредиенты</h3>
            <ul className={styles.ingredientsList}>
              {dish.ingredients.map((ingredient, index) => (
                <li key={index} className={styles.ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.cartSection}>
            <h3 className={styles.sectionTitle}>Добавить в корзину</h3>
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