import styles from './loading.module.css';

const DishLoading = () => {
  return (
    <div className={styles.dishLoading}>
      <div className={styles.dishDetails}>
        <div className={styles.dishHeader}>
          <div className={styles.dishNameSkeleton}></div>
          <div className={styles.dishPriceSkeleton}></div>
        </div>
        
        <div className={styles.dishInfo}>
          <div className={styles.ingredients}>
            <div className={styles.ingredientsTitleSkeleton}></div>
            <div className={styles.ingredientsListSkeleton}>
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={styles.ingredientSkeleton}></div>
              ))}
            </div>
          </div>
          
          <div className={styles.actions}>
            <div className={styles.actionsSkeleton}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishLoading; 