'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetRestaurantByIdQuery } from '../../store';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';
import NotFound from '../common/NotFound';
import styles from './RestaurantLayout.module.css';
import themeStyles from '../../styles/theme.module.css';
import { FaStar } from 'react-icons/fa';

// Константа для дефолтного рейтинга
const DEFAULT_RATING = 4.2;

const RestaurantHeader = ({ restaurantId }) => {
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
    <div className={`${styles.header} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h1 className={styles.name}>{restaurant.name}</h1>
          <div className={styles.details}>
            <div className={styles.rating}>
              <FaStar className={styles.star} />
              {DEFAULT_RATING.toFixed(1)}
            </div>
            <span className={styles.cuisine}>{restaurant.cuisine}</span>
          </div>
        </div>
        
        {restaurant.description && (
          <p className={styles.description}>{restaurant.description}</p>
        )}
        
        {restaurant.address && (
          <div className={styles.address}>
            <strong>Адрес:</strong> {restaurant.address}
          </div>
        )}
      </div>
    </div>
  );
};

RestaurantHeader.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default RestaurantHeader; 