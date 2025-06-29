import { useGetRestaurantsQuery } from '../../store';
import RestaurantCard from './RestaurantCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './RestaurantsPage.module.css';

const RestaurantsPage = () => {
  const {
    data: restaurants = [],
    isLoading,
    error,
    refetch,
  } = useGetRestaurantsQuery();

  if (isLoading) {
    return <LoadingSpinner message="Загружаем рестораны..." />;
  }

  if (error) {
    return <ErrorMessage message={error.message} onRetry={refetch} />;
  }

  return (
    <div className={styles.restaurantsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Наши рестораны</h1>
        <p className={styles.subtitle}>Выберите ресторан для просмотра меню и отзывов</p>
      </div>
      
      <div className={styles.restaurantGrid}>
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage; 