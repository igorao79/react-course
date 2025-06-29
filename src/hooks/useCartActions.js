import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemCount } from '../store';

/**
 * Хук для работы с корзиной
 * Предоставляет функционал добавления и удаления товаров из корзины
 */
export const useCartActions = (itemId) => {
  const dispatch = useDispatch();
  const count = useSelector(state => selectCartItemCount(state, itemId));
  
  const handleIncrement = () => {
    dispatch(addToCart({ id: itemId }));
  };
  
  const handleDecrement = () => {
    dispatch(removeFromCart({ id: itemId }));
  };
  
  return {
    count,
    handleIncrement,
    handleDecrement
  };
}; 