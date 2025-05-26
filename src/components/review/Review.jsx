import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import { RATING_MIN, RATING_MAX } from '../../constants';

const Review = ({ review }) => {
  if (!review) return null;
  return (
    <div className="review">
      <h4>{review.user}</h4>
      <p>{review.text}</p>
      <div className="rating">
        Rating: <Counter value={review.rating} min={RATING_MIN} max={RATING_MAX} />
      </div>
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