import RestaurantLayout from '@components/restaurant/RestaurantLayout';
import { getRestaurantById } from '@/lib/api';

export async function generateMetadata({ params }) {
  const { restaurantId } = await params;
  
  try {
    const restaurant = await getRestaurantById(restaurantId);
    
    return {
      title: `${restaurant.name} | Restaurant Review App`,
      description: `${restaurant.description} - просмотрите меню и отзывы`,
    };
  } catch (error) {
    console.error('Ошибка получения данных ресторана для metadata:', error);
    return {
      title: 'Ресторан | Restaurant Review App',
      description: 'Информация о ресторане',
    };
  }
}

export default async function RestaurantLayoutPage({ children, params }) {
  const { restaurantId } = await params;
  
  return (
    <RestaurantLayout restaurantId={restaurantId}>
      {children}
    </RestaurantLayout>
  );
} 