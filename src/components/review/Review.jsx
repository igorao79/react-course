import PropTypes from 'prop-types';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import Stars from './Stars';
import { RATING_MIN, RATING_MAX } from '../../constants';
import styles from './Review.module.css';

const Review = ({ review }) => {
  if (!review) return null;
  
  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <h4 className={styles.author}>{review.user}</h4>
        <div className={styles.rating}>
          <Stars rating={review.rating} />
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