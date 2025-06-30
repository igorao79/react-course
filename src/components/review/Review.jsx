import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import EditReviewForm from './EditReviewForm';
import styles from './Review.module.css';
import themeStyles from '../../styles/theme.module.css';

const Review = ({ review }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Проверяем, может ли пользователь редактировать этот отзыв
  const canEdit = user && user.id === review.userId;

  if (isEditing) {
    return (
      <div className={classNames(styles.reviewContainer, themeStyles[theme])}>
        <EditReviewForm 
          review={review}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className={classNames(styles.reviewContainer, themeStyles[theme])}>
      <div className={styles.review}>
        <div className={styles.reviewHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {review.userName ? review.userName.charAt(0).toUpperCase() : 'А'}
            </div>
            <div className={styles.userDetails}>
              <h4 className={styles.userName}>
                {review.userName || 'Аноним'}
              </h4>
              <div className={styles.rating}>
                {'⭐'.repeat(review.rating)}
                <span className={styles.ratingNumber}>({review.rating})</span>
              </div>
            </div>
          </div>
          
          {canEdit && (
            <button 
              className={styles.editButton}
              onClick={handleEditClick}
              title="Редактировать отзыв"
            >
              ✏️
            </button>
          )}
        </div>

        <div className={styles.reviewContent}>
          <p className={styles.reviewText}>{review.text}</p>
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string,
  }).isRequired,
};

export default Review; 