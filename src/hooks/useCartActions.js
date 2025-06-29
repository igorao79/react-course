import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemCount } from '../store';

/**
 * Хук для работы с корзиной
 * Предоставляет функционал добавления и удаления товаров из корзины
 */
export const useCartActions = (dish) => {
  const dispatch = useDispatch();
  const count = useSelector(state => selectCartItemCount(state, dish.id));
  
  const handleIncrement = () => {
    dispatch(addToCart({ dish }));
  };
  
  const handleDecrement = () => {
    dispatch(removeFromCart({ id: dish.id }));
  };
  
  return {
    count,
    handleIncrement,
    handleDecrement
  };
}; 