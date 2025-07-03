'use client';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import ReviewsList from '../review/ReviewsList';
import styles from './Restaurant.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantReviewsPage = ({ restaurantId }) => {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.restaurant, themeStyles[theme])}>
      <ReviewsList restaurantId={restaurantId} />
    </div>
  );
};

RestaurantReviewsPage.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default RestaurantReviewsPage; 