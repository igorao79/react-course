import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import styles from './Review.module.css';

const ReviewCard = ({ review, restaurantId }) => {
  if (!review) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : styles.empty}`}
      />
    ));
  };

  return (
    <div className={styles.review}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{review.userName}</span>
        </div>
        <div className={styles.rating}>
          {renderStars(review.rating)}
        </div>
      </div>
      
      <div className={styles.content}>
        <p className={styles.text}>{review.text}</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  restaurantId: PropTypes.string.isRequired,
};

export default ReviewCard; 