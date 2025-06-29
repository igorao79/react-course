import { useSelector } from 'react-redux';
import { useGetDishByIdQuery } from '../store';
import { selectCartItems } from '../store';

/**
 * Хук для расчета общей стоимости корзины
 * Использует RTK Query для получения информации о блюдах
 */
export const useCartTotal = () => {
  const cartItems = useSelector(selectCartItems);
  const dishIds = Object.keys(cartItems);
  
  // Получаем данные о всех блюдах в корзине
  const dishQueries = dishIds.map(dishId => 
    useGetDishByIdQuery(dishId)
  );
  
  // Проверяем, загружены ли все блюда
  const isLoading = dishQueries.some(query => query.isLoading);
  const hasError = dishQueries.some(query => query.error);
  
  // Рассчитываем общую стоимость
  const totalPrice = dishQueries.reduce((total, query, index) => {
    const dish = query.data;
    const dishId = dishIds[index];
    const quantity = cartItems[dishId];
    
    if (!dish) return total;
    return total + (dish.price * quantity);
  }, 0);
  
  return {
    totalPrice,
    isLoading,
    hasError
  };
}; 