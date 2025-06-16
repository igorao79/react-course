import { useSelector } from 'react-redux';
import { selectRestaurantIds } from '../../store';
import RestaurantCard from './RestaurantCard';
import styles from './RestaurantsPage.module.css';

const RestaurantsPage = () => {
  const restaurantIds = useSelector(selectRestaurantIds);

  return (
    <div className={styles.restaurantsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Our Restaurants</h1>
        <p className={styles.subtitle}>Select a restaurant to view menu and reviews</p>
      </div>
      
      <div className={styles.restaurantGrid}>
        {restaurantIds.map(id => (
          <RestaurantCard key={id} restaurantId={id} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsPage; 