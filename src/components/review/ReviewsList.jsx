import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useGetReviewsByRestaurantIdQuery } from '../../store';
import Review from './Review';
import AddReviewForm from './AddReviewForm';
import styles from './ReviewsList.module.css';
import themeStyles from '../../styles/theme.module.css';

const ReviewsList = memo(({ restaurantId }) => {
  const { theme } = useTheme();
  const {
    data: reviews = [],
    isLoading,
    error,
    refetch,
  } = useGetReviewsByRestaurantIdQuery(restaurantId);

  if (isLoading) {
    return (
      <div className={classNames(styles.container, themeStyles[theme])}>
        <div className={styles.loading}>Загружаем отзывы...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.container, themeStyles[theme])}>
        <div className={styles.error}>
          <p>Ошибка загрузки отзывов: {error.message}</p>
          <button onClick={refetch} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.container, themeStyles[theme])}>
      <h2 className={styles.title}>Отзывы о ресторане</h2>
      
      <AddReviewForm restaurantId={restaurantId} />
      
      <div className={styles.reviewsSection}>
        <h3 className={styles.sectionTitle}>
          Все отзывы ({reviews.length})
        </h3>
        
        {reviews.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Пока нет отзывов. Будьте первым, кто оставит отзыв!</p>
          </div>
        ) : (
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <Review 
                key={review.id} 
                review={review} 
                restaurantId={restaurantId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ReviewsList.displayName = 'ReviewsList';

ReviewsList.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default ReviewsList; 