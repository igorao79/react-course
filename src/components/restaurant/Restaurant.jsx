import { useState } from 'react';
import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import DishCounter from '../dish/DishCounter';
import ReviewForm from '../review/ReviewForm';
import { RATING_MIN, RATING_MAX } from '../../constants';
import Dish from '../dish/Dish';
import Review from '../review/Review';

const Restaurant = ({ restaurant }) => {
  const [reviews, setReviews] = useState(restaurant?.reviews || []);

  if (!restaurant) {
    return <div className="restaurant-error">Restaurant data is not available</div>;
  }

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="restaurant">
      <h2>{restaurant.name}</h2>
      
      {restaurant.menu ? (
        <div className="menu">
          <h3>Menu</h3>
          {restaurant.menu.length > 0 ? (
            restaurant.menu.map((dish) => (
              <Dish key={dish.id} dish={dish} />
            ))
          ) : (
            <p>No dishes available</p>
          )}
        </div>
      ) : (
        <p>Menu is not available</p>
      )}

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p>No reviews yet</p>
        )}

        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ),
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
      })
    )
  })
};

export default Restaurant; 