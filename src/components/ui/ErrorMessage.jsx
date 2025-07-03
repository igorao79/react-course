import { MdWarning } from 'react-icons/md';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className={styles.container}>
      <MdWarning className={styles.icon} />
      <p className={styles.message}>{message || 'Произошла ошибка'}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 