import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectCartItemCount } from '../store';

/**
 * Хук для работы с корзиной
 * Предоставляет функционал добавления и удаления товаров из корзины
 */
export const useCartActions = (itemId) => {
  const dispatch = useDispatch();
  const count = useSelector(state => selectCartItemCount(state, itemId));
  
  const handleIncrement = (price) => {
    dispatch(addItem({ id: itemId, price }));
  };
  
  const handleDecrement = (price) => {
    dispatch(removeItem({ id: itemId, price }));
  };
  
  return {
    count,
    handleIncrement,
    handleDecrement
  };
}; 