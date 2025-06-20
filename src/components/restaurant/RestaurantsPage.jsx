import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectRestaurantIds, 
  selectRestaurantsStatus, 
  selectRestaurantsError,
  fetchRestaurants
} from '../../store';
import { REQUEST_STATUS } from '../../store/constants';
import RestaurantCard from './RestaurantCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './RestaurantsPage.module.css';

const RestaurantsPage = () => {
  const dispatch = useDispatch();
  const restaurantIds = useSelector(selectRestaurantIds);
  const status = useSelector(selectRestaurantsStatus);
  const error = useSelector(selectRestaurantsError);

  useEffect(() => {
    // Загружаем рестораны только если они еще не загружены
    if (status === REQUEST_STATUS.IDLE) {
      dispatch(fetchRestaurants());
    }
  }, [dispatch, status]);

  const handleRetry = () => {
    dispatch(fetchRestaurants());
  };

  if (status === REQUEST_STATUS.LOADING) {
    return <LoadingSpinner message="Загружаем рестораны..." />;
  }

  if (status === REQUEST_STATUS.FAILED) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className={styles.restaurantsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Наши рестораны</h1>
        <p className={styles.subtitle}>Выберите ресторан для просмотра меню и отзывов</p>
      </div>
      
      <div className={styles.restaurantGrid}>
        {restaurantIds.map(id => (
          <RestaurantCard key={id} restaurantId={id} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage; 