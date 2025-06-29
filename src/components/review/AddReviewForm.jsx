import { memo } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from './ReviewForm';

const AddReviewForm = memo(({ restaurantId }) => {
  return (
    <ReviewForm 
      restaurantId={restaurantId}
    />
  );
});

AddReviewForm.displayName = 'AddReviewForm';

AddReviewForm.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default AddReviewForm; 