import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import ReviewsList from '../review/ReviewsList';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantReviewsPage = () => {
  const { theme } = useTheme();
  const { restaurantId } = useParams();

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <ReviewsList restaurantId={restaurantId} />
    </div>
  );
};

export default RestaurantReviewsPage; 