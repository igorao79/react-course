import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../store';

/**
 * Хук для расчета общей стоимости корзины
 * Использует селектор из cartSlice для получения общей стоимости
 */
export const useCartTotal = () => {
  const totalPrice = useSelector(selectTotalPrice);
  
  return {
    totalPrice,
    isLoading: false,
    hasError: false
  };
}; 