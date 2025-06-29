import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { useUpdateReviewMutation } from '../../store/api/reviewsApi';
import styles from './EditReviewForm.module.css';
import themeStyles from '../../styles/theme.module.css';

const EditReviewForm = memo(({ review, onCancel }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [updateReview, { isLoading }] = useUpdateReviewMutation();
  
  const [text, setText] = useState(review.text);
  const [rating, setRating] = useState(review.rating);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Необходимо войти в систему');
      return;
    }

    if (user.id !== review.userId) {
      alert('Вы можете редактировать только свои отзывы');
      return;
    }

    if (!text.trim()) {
      alert('Пожалуйста, напишите отзыв');
      return;
    }

    if (text.trim().length < 10) {
      alert('Отзыв должен содержать минимум 10 символов');
      return;
    }

    try {
      await updateReview({
        reviewId: review.id,
        text: text.trim(),
        rating,
      }).unwrap();
      
      onCancel();
    } catch (error) {
      console.error('Ошибка при обновлении отзыва:', error);
      alert('Ошибка при обновлении отзыва. Попробуйте еще раз.');
    }
  }, [updateReview, review.id, review.userId, text, rating, user, onCancel]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleRatingChange = useCallback((e) => {
    setRating(Number(e.target.value));
  }, []);

  // Проверка прав доступа
  if (!user || user.id !== review.userId) {
    return null;
  }

  return (
    <div className={classNames(styles.editReviewForm, themeStyles[theme])}>
      <div className={styles.formHeader}>
        <h4 className={styles.title}>Редактировать отзыв</h4>
        <div className={styles.userInfo}>
          <span className={styles.userName}>От: {user.name}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="editRating" className={styles.label}>
            Оценка
          </label>
          <select
            id="editRating"
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
          <label htmlFor="editReviewText" className={styles.label}>
            Ваш отзыв
          </label>
          <textarea
            id="editReviewText"
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
            className={styles.saveButton}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
});

EditReviewForm.displayName = 'EditReviewForm';

EditReviewForm.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditReviewForm; 