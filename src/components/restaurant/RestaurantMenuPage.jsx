import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  selectRestaurantById,
  selectDishesStatus,
  selectDishesError,
  selectAreDishesFetchedForRestaurant,
  fetchDishesByRestaurantId
} from '../../store';
import { REQUEST_STATUS } from '../../store/constants';
import RestaurantMenu from './RestaurantMenu';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantMenuPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const dishesStatus = useSelector(selectDishesStatus);
  const dishesError = useSelector(selectDishesError);
  const areDishesFetched = useSelector(state => 
    selectAreDishesFetchedForRestaurant(state, restaurantId)
  );

  useEffect(() => {
    // Загружаем блюда ресторана, если они еще не загружены
    if (!areDishesFetched) {
      dispatch(fetchDishesByRestaurantId(restaurantId));
    }
  }, [dispatch, restaurantId, areDishesFetched]);

  const handleRetry = () => {
    dispatch(fetchDishesByRestaurantId(restaurantId));
  };

  if (!restaurant) {
    return <div className={styles.error}>Данные ресторана недоступны</div>;
  }

  if (dishesStatus === REQUEST_STATUS.LOADING && !areDishesFetched) {
    return <LoadingSpinner message="Загружаем меню..." />;
  }

  if (dishesStatus === REQUEST_STATUS.FAILED) {
    return <ErrorMessage message={dishesError} onRetry={handleRetry} />;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <RestaurantMenu menuIds={restaurant.menu} />
    </div>
  );
};

export default RestaurantMenuPage; 