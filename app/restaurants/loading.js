import styles from './loading.module.css';

const RestaurantsLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.subtitleSkeleton}></div>
      </div>
      
      <div className={styles.restaurantGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.restaurantCard}>
            <div className={styles.imageSkeleton}></div>
            <div className={styles.content}>
              <div className={styles.nameSkeleton}></div>
              <div className={styles.descriptionSkeleton}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsLoading; 