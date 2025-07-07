import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaStar } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { useReviewForm } from '../../hooks/useReviewForm';
import LoginPrompt from './LoginPrompt';
import styles from './ReviewForm.module.css';
import themeStyles from '../../styles/theme.module.css';
import { useUser } from '../../contexts/UserContext';

const ReviewForm = ({ 
  restaurantId, 
  initialReview = null, 
  onCancel = null,
  onSuccess = null 
}) => {
  const { theme } = useTheme();
  const {
    text,
    rating,
    isLoading,
    isEditing,
    user,
    handleSubmit,
    handleTextChange,
    handleRatingChange
  } = useReviewForm({ 
    restaurantId, 
    initialReview, 
    onSuccess: () => {
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    }
  });

  const { user: userContext } = useUser();

  // Если пользователь не авторизован и это не режим редактирования, показываем LoginPrompt
  if (!user && !isEditing) {
    return <LoginPrompt />;
  }

  // Проверка прав доступа для редактирования
  if (isEditing && (!user || user.id !== initialReview.userId)) {
    return null;
  }

  const formTitle = isEditing ? 'Редактировать отзыв' : 'Добавить отзыв';
  const submitButtonText = isLoading 
    ? (isEditing ? 'Сохраняем...' : 'Добавляем...') 
    : (isEditing ? 'Сохранить' : 'Добавить отзыв');

  const ratingOptions = [
    { value: 1, label: 'Ужасно' },
    { value: 2, label: 'Плохо' },
    { value: 3, label: 'Нормально' },
    { value: 4, label: 'Хорошо' },
    { value: 5, label: 'Отлично' }
  ];

  return (
    <div className={classNames(styles.reviewForm, themeStyles[theme])}>
      <div className={styles.formHeader}>
        <h3 className={styles.title}>{formTitle}</h3>
        <div className={styles.userInfo}>
          <span className={styles.userName}>От: {user.name}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="rating" className={styles.label}>
            Оценка:
          </label>
          <select
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            className={styles.select}
            disabled={isLoading}
          >
            {ratingOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.value} <FaStar style={{ display: 'inline' }} /> - {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reviewText" className={styles.label}>
            Ваш отзыв:
          </label>
          <textarea
            id="reviewText"
            value={text}
            onChange={handleTextChange}
            className={styles.textarea}
            placeholder="Поделитесь своими впечатлениями о ресторане..."
            disabled={isLoading}
            maxLength={1000}
            rows={5}
          />
          <div className={styles.charCount}>
            {text.length}/1000
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading || !text.trim()}
          >
            {submitButtonText}
          </button>
          
          {onCancel && (
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onCancel}
              disabled={isLoading}
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  initialReview: PropTypes.object,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default memo(ReviewForm); 