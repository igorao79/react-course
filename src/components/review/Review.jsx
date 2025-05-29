import PropTypes from 'prop-types';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import { RATING_MIN, RATING_MAX } from '../../constants';
import styles from './Review.module.css';

const Review = ({ review }) => {
  if (!review) return null;
  
  const renderStars = (rating) => {
    return Array.from({ length: RATING_MAX }, (_, i) => (
      <span 
        key={i} 
        className={classNames(styles.star, {
          [styles.filled]: i < rating
        })}
      >
        ★
      </span>
    ));
  };
  
  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <h4 className={styles.author}>{review.user}</h4>
        <div className={styles.rating}>
          <div className={styles.stars}>
            {renderStars(review.rating)}
          </div>
          <span className={styles.ratingValue}>({review.rating}/5)</span>
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
    </div>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })
};

export default Review; 