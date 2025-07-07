'use client';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetDishesByRestaurantIdQuery } from '../../store';
import RestaurantMenu from './RestaurantMenu';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantMenuPage = ({ restaurantId }) => {
  const { theme } = useTheme();
  
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

RestaurantMenuPage.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default RestaurantMenuPage; 