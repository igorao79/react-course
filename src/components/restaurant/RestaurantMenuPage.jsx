import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetDishesByRestaurantIdQuery } from '../../store';
import RestaurantMenu from './RestaurantMenu';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantMenuPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  
  const {
    data: dishes = [],
    isLoading,
    error,
    refetch,
  } = useGetDishesByRestaurantIdQuery(restaurantId);

  if (isLoading) {
    return <LoadingSpinner message="Загружаем меню..." />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <RestaurantMenu dishes={dishes} />
    </div>
  );
};

export default RestaurantMenuPage; 