import { getDishes } from '@/lib/api';
import DishCard from '@components/dish/DishCard';
import styles from './RestaurantMenuPage.module.css';

const RestaurantMenuList = async ({ restaurantId }) => {
  const dishes = await getDishes(restaurantId);

  if (!dishes || dishes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>Меню пока пусто</h3>
        <p>Блюда появятся здесь в ближайшее время</p>
      </div>
    );
  }

  return (
    <div className={styles.menuGrid}>
      {dishes.map(dish => (
        <DishCard
          key={dish.id}
          dish={dish}
          className={styles.menuItem}
        />
      ))}
    </div>
  );
};

export default RestaurantMenuList; 