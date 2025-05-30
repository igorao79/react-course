import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RATING_MAX } from '../../constants';
import styles from './Stars.module.css';

const Stars = ({ rating }) => {
  return (
    <div className={styles.stars}>
      {Array.from({ length: RATING_MAX }, (_, i) => (
        <span 
          key={i} 
          className={classNames(styles.star, {
            [styles.filled]: i < rating
          })}
        >
          ★
        </span>
      ))}
    </div>
  );
};

Stars.propTypes = {
  rating: PropTypes.number.isRequired
};

export default Stars; 