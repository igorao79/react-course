'use client';

import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaStar, FaEdit } from 'react-icons/fa';
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

  const handleEditSuccess = useCallback(() => {
    setIsEditing(false);
  }, []);

  if (isEditing) {
    return (
      <EditReviewForm
        review={review}
        onCancel={handleCancelEdit}
        onSuccess={handleEditSuccess}
      />
    );
  }

  const canEdit = user && user.id === review.userId;

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className={styles.star} />
    ));
  };

  return (
    <div className={classNames(styles.review, themeStyles[theme])}>
      <div className={styles.reviewHeader}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{review.userName}</span>
            <div className={styles.rating}>
              {renderStars(review.rating)}
              <span className={styles.ratingNumber}>({review.rating}/5)</span>
            </div>
          </div>
        </div>
        
        {canEdit && (
          <button
            className={styles.editButton}
            onClick={handleEditClick}
            title="Редактировать отзыв"
          >
            <FaEdit />
          </button>
        )}
      </div>
      
      <div className={styles.reviewContent}>
        <p className={styles.reviewText}>{review.text}</p>
      </div>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(Review); 