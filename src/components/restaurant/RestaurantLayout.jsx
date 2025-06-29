import { useParams, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetRestaurantByIdQuery } from '../../store';
import RestaurantHeader from './RestaurantHeader';
import RestaurantTabs from './RestaurantTabs';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import NotFound from '../common/NotFound';
import styles from './RestaurantLayout.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantLayout = () => {
  const { restaurantId } = useParams();
  const { theme } = useTheme();
  
  const {
    data: restaurant,
    isLoading,
    error,
    refetch,
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) {
    return <LoadingSpinner message="Загружаем ресторан..." />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }
  
  // Если ресторан не найден, показываем страницу 404
  if (!restaurant) {
    return <NotFound message="Ресторан не найден" backLink="/restaurants" backText="Вернуться к ресторанам" />;
  }
  
  return (
    <div className={classNames(styles.restaurantLayout, themeStyles[theme])}>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantTabs restaurantId={restaurantId} />
      
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default RestaurantLayout; 