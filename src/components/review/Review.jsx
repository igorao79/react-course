import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import Stars from './Stars';
import { RATING_MIN, RATING_MAX } from '../../constants';
import { selectReviewById, selectUserById } from '../../store';
import styles from './Review.module.css';

const Review = ({ reviewId, review: localReview }) => {
  // If a review object is directly passed, use it (for local reviews)
  // Otherwise, get it from Redux using the ID
  const reduxReview = useSelector(state => reviewId ? selectReviewById(state, reviewId) : null);
  const review = localReview || reduxReview;
  
  if (!review) return null;
  
  const user = useSelector(state => review.userId ? selectUserById(state, review.userId) : null);
  
  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <h4 className={styles.author}>{user?.name || review.user || 'Anonymous'}</h4>
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
  reviewId: PropTypes.string,
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string,
    user: PropTypes.string, // For backward compatibility with local reviews
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  })
};

export default Review; 