import { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
          <label htmlFor={`rating-${isEditing ? 'edit' : 'add'}`} className={styles.label}>
            Оценка
          </label>
          <select
            id={`rating-${isEditing ? 'edit' : 'add'}`}
            value={rating}
            onChange={handleRatingChange}
            className={styles.ratingSelect}
            disabled={isLoading}
          >
            <option value={1}>1 ⭐ - Ужасно</option>
            <option value={2}>2 ⭐ - Плохо</option>
            <option value={3}>3 ⭐ - Нормально</option>
            <option value={4}>4 ⭐ - Хорошо</option>
            <option value={5}>5 ⭐ - Отлично</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={`reviewText-${isEditing ? 'edit' : 'add'}`} className={styles.label}>
            Ваш отзыв
          </label>
          <textarea
            id={`reviewText-${isEditing ? 'edit' : 'add'}`}
            value={text}
            onChange={handleTextChange}
            className={styles.textarea}
            placeholder="Поделитесь впечатлениями о ресторане..."
            rows={4}
            disabled={isLoading}
            maxLength={1000}
          />
          <div className={styles.charCount}>
            {text.length}/1000 символов
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={classNames(
              styles.submitButton,
              isEditing ? styles.saveButton : styles.addButton
            )}
            disabled={isLoading || !text.trim()}
          >
            {submitButtonText}
          </button>
          
          {isEditing && onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className={styles.cancelButton}
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
  initialReview: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
  }),
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default ReviewForm; 