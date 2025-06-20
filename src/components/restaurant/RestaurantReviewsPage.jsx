import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  selectRestaurantById,
  selectReviewsStatus,
  selectReviewsError,
  selectAreReviewsFetchedForRestaurant,
  selectUsersStatus,
  selectUsersError,
  selectAreUsersFetched,
  fetchReviewsByRestaurantId,
  fetchUsers
} from '../../store';
import { REQUEST_STATUS } from '../../store/constants';
import RestaurantReviews from './RestaurantReviews';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantReviewsPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const reviewsStatus = useSelector(selectReviewsStatus);
  const reviewsError = useSelector(selectReviewsError);
  const areReviewsFetched = useSelector(state => 
    selectAreReviewsFetchedForRestaurant(state, restaurantId)
  );
  const usersStatus = useSelector(selectUsersStatus);
  const usersError = useSelector(selectUsersError);
  const areUsersFetched = useSelector(selectAreUsersFetched);

  // Отдельный effect для загрузки отзывов
  useEffect(() => {
    // Всегда вызываем thunk - condition внутри thunk'а решит, нужен ли запрос
    dispatch(fetchReviewsByRestaurantId(restaurantId));
  }, [dispatch, restaurantId]);

  // Отдельный effect для загрузки пользователей
  useEffect(() => {
    // Всегда вызываем thunk - condition внутри thunk'а решит, нужен ли запрос
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRetryReviews = () => {
    dispatch(fetchReviewsByRestaurantId(restaurantId));
  };

  const handleRetryUsers = () => {
    dispatch(fetchUsers());
  };

  if (!restaurant) {
    return <div className={styles.error}>Данные ресторана недоступны</div>;
  }

  if ((reviewsStatus === REQUEST_STATUS.LOADING && !areReviewsFetched) ||
      (usersStatus === REQUEST_STATUS.LOADING && !areUsersFetched)) {
    return <LoadingSpinner message="Загружаем отзывы..." />;
  }

  if (reviewsStatus === REQUEST_STATUS.FAILED) {
    return <ErrorMessage message={reviewsError} onRetry={handleRetryReviews} />;
  }

  if (usersStatus === REQUEST_STATUS.FAILED) {
    return <ErrorMessage message={usersError} onRetry={handleRetryUsers} />;
  }

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <RestaurantReviews 
        reviewIds={restaurant.reviews} 
        restaurantId={restaurantId} 
      />
    </div>
  );
};

export default RestaurantReviewsPage; 