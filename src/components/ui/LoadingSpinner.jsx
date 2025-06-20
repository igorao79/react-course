import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'medium', message = 'Загрузка...' }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 