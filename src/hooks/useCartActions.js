import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectCartItemCount } from '../store';

/**
 * Хук для работы с корзиной
 * Предоставляет функционал добавления и удаления товаров из корзины
 */
export const useCartActions = (itemId) => {
  const dispatch = useDispatch();
  const count = useSelector(state => selectCartItemCount(state, itemId));
  
  const handleIncrement = () => {
    dispatch(addItem({ id: itemId }));
  };
  
  const handleDecrement = () => {
    dispatch(removeItem({ id: itemId }));
  };
  
  return {
    count,
    handleIncrement,
    handleDecrement
  };
}; 