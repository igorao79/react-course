import { useSelector } from 'react-redux';
import { useParams, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById } from '../../store';
import RestaurantHeader from './RestaurantHeader';
import RestaurantTabs from './RestaurantTabs';
import NotFound from '../common/NotFound';
import styles from './RestaurantLayout.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantLayout = () => {
  const { restaurantId } = useParams();
  const { theme } = useTheme();
  
  // Получаем данные о ресторане
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  
  // Если ресторан не найден, показываем страницу 404
  if (!restaurant) {
    return <NotFound message="Restaurant not found" backLink="/restaurants" backText="Back to restaurants" />;
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