import { getDishById } from '@/lib/api';
import DishCounter from './DishCounter';
import styles from './DishPage.module.css';

const DishDetails = async ({ dishId }) => {
  const dish = await getDishById(dishId);

  if (!dish) {
    return (
      <div className={styles.errorState}>
        <h2>Блюдо не найдено</h2>
        <p>Возможно, блюдо больше не доступно</p>
      </div>
    );
  }

  return (
    <div className={styles.dishDetails}>
      <div className={styles.dishHeader}>
        <h1 className={styles.dishName}>{dish.name}</h1>
        <div className={styles.dishPrice}>${dish.price}</div>
      </div>
      
      <div className={styles.dishInfo}>
        <div className={styles.ingredients}>
          <h3>Ингредиенты:</h3>
          <ul>
            {dish.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.actions}>
          <DishCounter dish={dish} />
        </div>
      </div>
    </div>
  );
};

export default DishDetails; 