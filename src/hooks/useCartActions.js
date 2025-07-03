import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItemCount } from '../store';

/**
 * Хук для работы с корзиной
 * Предоставляет функционал добавления и удаления товаров из корзины
 */
export const useCartActions = (dish) => {
  const dispatch = useDispatch();
  const count = useSelector(state => dish ? selectCartItemCount(state, dish.id) : 0);
  
  const handleIncrement = () => {
    if (dish) {
      dispatch(addToCart({ dish }));
    }
  };
  
  const handleDecrement = () => {
    if (dish) {
      dispatch(removeFromCart({ id: dish.id }));
    }
  };
  
  return {
    count,
    handleIncrement,
    handleDecrement
  };
}; 