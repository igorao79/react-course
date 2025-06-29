import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { useAddReviewMutation } from '../../store/api/reviewsApi';
import LoginForm from '../user/LoginForm';
import styles from './AddReviewForm.module.css';
import themeStyles from '../../styles/theme.module.css';

const AddReviewForm = memo(({ restaurantId }) => {
  const { theme } = useTheme();
  const { user } = useUser();
  const [addReview, { isLoading }] = useAddReviewMutation();
  
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginForm(true);
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
      await addReview({
        restaurantId,
        text: text.trim(),
        rating,
        userId: user.id,
        userName: user.name
      }).unwrap();
      
      setText('');
      setRating(5);
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
      alert('Ошибка при добавлении отзыва. Попробуйте еще раз.');
    }
  }, [addReview, restaurantId, text, rating, user]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleRatingChange = useCallback((e) => {
    setRating(Number(e.target.value));
  }, []);

  const handleCloseLoginForm = useCallback(() => {
    setShowLoginForm(false);
  }, []);

  if (!user) {
    return (
      <>
        <div className={classNames(styles.loginPrompt, themeStyles[theme])}>
          <div className={styles.promptContent}>
            <h3 className={styles.promptTitle}>Хотите оставить отзыв?</h3>
            <p className={styles.promptText}>
              Войдите в систему, чтобы поделиться своим мнением о ресторане
            </p>
            <button 
              className={styles.promptButton}
              onClick={() => setShowLoginForm(true)}
            >
              Войти и оставить отзыв
            </button>
          </div>
        </div>
        
        {showLoginForm && (
          <LoginForm onClose={handleCloseLoginForm} />
        )}
      </>
    );
  }

  return (
    <div className={classNames(styles.addReviewForm, themeStyles[theme])}>
      <div className={styles.formHeader}>
        <h3 className={styles.title}>Добавить отзыв</h3>
        <div className={styles.userInfo}>
          <span className={styles.userName}>От: {user.name}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="rating" className={styles.label}>
            Оценка
          </label>
          <select
            id="rating"
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
          <label htmlFor="reviewText" className={styles.label}>
            Ваш отзыв
          </label>
          <textarea
            id="reviewText"
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
            className={styles.submitButton}
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? 'Добавляем...' : 'Добавить отзыв'}
          </button>
        </div>
      </form>
    </div>
  );
});

AddReviewForm.displayName = 'AddReviewForm';

AddReviewForm.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default AddReviewForm; 