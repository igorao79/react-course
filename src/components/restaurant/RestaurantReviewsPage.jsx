import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetRestaurantByIdQuery } from '../../store';
import ReviewsList from '../review/ReviewsList';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantReviewsPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  
  const { 
    data: restaurant, 
    isLoading, 
    error,
    refetch 
  } = useGetRestaurantByIdQuery(restaurantId);

  if (isLoading) {
    return <LoadingSpinner message="Загружаем данные ресторана..." />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  if (!restaurant) {
    return <div className={styles.error}>Данные ресторана недоступны</div>;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <ReviewsList restaurantId={restaurantId} />
    </div>
  );
};

export default RestaurantReviewsPage; 