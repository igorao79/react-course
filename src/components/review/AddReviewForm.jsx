import PropTypes from 'prop-types';
import ReviewForm from './ReviewForm';

const AddReviewForm = ({ restaurantId }) => {
  return (
    <ReviewForm 
      restaurantId={restaurantId}
    />
  );
};

AddReviewForm.propTypes = {
  restaurantId: PropTypes.string.isRequired,
};

export default AddReviewForm; 