import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  selectRestaurantById,
  selectRestaurantsStatus,
  selectRestaurantsError,
  fetchRestaurantById
} from '../../store';
import { REQUEST_STATUS } from '../../store/constants';
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
  const dispatch = useDispatch();
  
  // Получаем данные о ресторане
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const status = useSelector(selectRestaurantsStatus);
  const error = useSelector(selectRestaurantsError);

  useEffect(() => {
    // Всегда вызываем thunk - condition внутри thunk'а решит, нужен ли запрос
    dispatch(fetchRestaurantById(restaurantId));
  }, [dispatch, restaurantId]);

  const handleRetry = () => {
    dispatch(fetchRestaurantById(restaurantId));
  };

  if (status === REQUEST_STATUS.LOADING && !restaurant) {
    return <LoadingSpinner message="Загружаем ресторан..." />;
  }

  if (status === REQUEST_STATUS.FAILED && !restaurant) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
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