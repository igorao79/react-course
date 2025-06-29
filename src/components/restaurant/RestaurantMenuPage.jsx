import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  useGetRestaurantByIdQuery,
  useGetDishesByRestaurantIdQuery 
} from '../../store';
import RestaurantMenu from './RestaurantMenu';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantMenuPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  
  const { 
    data: restaurant,
    isLoading: restaurantLoading,
    error: restaurantError 
  } = useGetRestaurantByIdQuery(restaurantId);
  
  const {
    data: dishes = [],
    isLoading: dishesLoading,
    error: dishesError,
    refetch: refetchDishes,
  } = useGetDishesByRestaurantIdQuery(restaurantId);

  if (restaurantLoading || dishesLoading) {
    return <LoadingSpinner message="Загружаем меню..." />;
  }

  if (restaurantError) {
    return <ErrorMessage message={restaurantError.message} />;
  }

  if (dishesError) {
    return <ErrorMessage message={dishesError.message} onRetry={refetchDishes} />;
  }

  if (!restaurant) {
    return <div className={styles.error}>Данные ресторана недоступны</div>;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <RestaurantMenu dishes={dishes} />
    </div>
  );
};

export default RestaurantMenuPage; 