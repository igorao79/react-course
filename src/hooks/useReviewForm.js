import { useState, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { useAddReviewMutation, useUpdateReviewMutation } from '../store/api/reviewsApi';

/**
 * Хук для работы с формами отзывов
 * Поддерживает как добавление новых отзывов, так и редактирование существующих
 */
export const useReviewForm = ({ 
  restaurantId, 
  initialReview = null, 
  onSuccess = null 
}) => {
  const { user } = useUser();
  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  
  const [text, setText] = useState(initialReview?.text || '');
  const [rating, setRating] = useState(initialReview?.rating || 5);
  
  const isLoading = isAdding || isUpdating;
  const isEditing = !!initialReview;

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Необходимо войти в систему');
      return;
    }

    if (isEditing && user.id !== initialReview.userId) {
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
      if (isEditing) {
        await updateReview({
          reviewId: initialReview.id,
          text: text.trim(),
          rating,
        }).unwrap();
      } else {
        await addReview({
          restaurantId,
          text: text.trim(),
          rating,
          userId: user.id,
          userName: user.name
        }).unwrap();
      }
      
      // Сброс формы только для новых отзывов
      if (!isEditing) {
        setText('');
        setRating(5);
      }
      
      // Вызов callback функции при успешном выполнении
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Ошибка при работе с отзывом:', error);
      alert('Ошибка при сохранении отзыва. Попробуйте еще раз.');
    }
  }, [
    addReview, 
    updateReview, 
    restaurantId, 
    text, 
    rating, 
    user, 
    isEditing, 
    initialReview, 
    onSuccess
  ]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleRatingChange = useCallback((e) => {
    setRating(Number(e.target.value));
  }, []);

  return {
    text,
    rating,
    isLoading,
    isEditing,
    user,
    handleSubmit,
    handleTextChange,
    handleRatingChange
  };
}; 