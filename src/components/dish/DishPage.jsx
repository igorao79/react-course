import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  selectDishById, 
  selectRestaurantById,
  selectDishesStatus,
  selectDishesError,
  fetchDishById
} from '../../store';
import { REQUEST_STATUS } from '../../store/constants';
import { useCartActions } from '../../hooks/useCartActions';
import DishCounter from './DishCounter';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './DishPage.module.css';
import themeStyles from '../../styles/theme.module.css';

const DishPage = () => {
  const { dishId } = useParams();
  const dispatch = useDispatch();
  const dish = useSelector(state => selectDishById(state, dishId));
  const restaurant = useSelector(state => 
    dish ? selectRestaurantById(state, dish.restaurantId) : null
  );
  const dishesStatus = useSelector(selectDishesStatus);
  const dishesError = useSelector(selectDishesError);
  const { theme } = useTheme();
  const { count, handleIncrement, handleDecrement } = useCartActions(dishId);

  useEffect(() => {
    // Всегда вызываем thunk - condition внутри thunk'а решит, нужен ли запрос
    dispatch(fetchDishById(dishId));
  }, [dispatch, dishId]);

  const handleRetry = () => {
    dispatch(fetchDishById(dishId));
  };

  if (dishesStatus === REQUEST_STATUS.LOADING && !dish) {
    return <LoadingSpinner message="Загружаем блюдо..." />;
  }

  if (dishesStatus === REQUEST_STATUS.FAILED && !dish) {
    return <ErrorMessage message={dishesError} onRetry={handleRetry} />;
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
        {restaurant && (
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