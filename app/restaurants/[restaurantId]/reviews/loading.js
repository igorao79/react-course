import styles from './loading.module.css';

const ReviewsLoading = () => {
  return (
    <div className={styles.reviewsLoading}>
      <div className={styles.reviewsList}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <div className={styles.userNameSkeleton}></div>
              <div className={styles.ratingSkeleton}></div>
            </div>
            <div className={styles.reviewTextSkeleton}></div>
            <div className={styles.reviewActionsSkeleton}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsLoading; 