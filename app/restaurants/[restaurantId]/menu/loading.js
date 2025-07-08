import styles from './loading.module.css';

const MenuLoading = () => {
  return (
    <div className={styles.menuLoading}>
      <div className={styles.menuGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.dishCard}>
            <div className={styles.dishHeader}>
              <div className={styles.dishNameSkeleton}></div>
              <div className={styles.dishPriceSkeleton}></div>
            </div>
            <div className={styles.dishIngredientsSkeleton}></div>
            <div className={styles.dishActionsSkeleton}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuLoading; 