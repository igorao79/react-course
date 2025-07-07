import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './NotFound.module.css';

const NotFound = ({ message, backLink, backText }) => {
  return (
    <div className={styles.notFound}>
      <h2>{message || 'Page not found'}</h2>
      <Link href={backLink || '/'} className={styles.backLink}>
        {backText || 'Back to home'}
      </Link>
    </div>
  );
};

NotFound.propTypes = {
  message: PropTypes.string,
  backLink: PropTypes.string,
  backText: PropTypes.string
};

export default NotFound; 