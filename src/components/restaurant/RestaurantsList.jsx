import { getRestaurants } from '@/lib/api';
import RestaurantCard from './RestaurantCard';
import styles from './RestaurantsPage.module.css';

const RestaurantsList = async () => {
  const restaurants = await getRestaurants();

  return (
    <div className={styles.restaurantGrid}>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList; 