import { memo } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './ReviewForm';

const EditReviewForm = memo(({ review, onCancel }) => {
  return (
    <ReviewForm 
      restaurantId={review.restaurantId}
      initialReview={review}
      onCancel={onCancel}
    />
  );
});

EditReviewForm.displayName = 'EditReviewForm';

EditReviewForm.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    restaurantId: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditReviewForm; 