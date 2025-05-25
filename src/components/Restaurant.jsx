import { useState } from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';
import DishCounter from './DishCounter';
import ReviewForm from './ReviewForm';
import { RATING_MIN, RATING_MAX } from '../constants';

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
          {restaurant.menu.map((dish) => (
            <div key={dish.id} className="dish">
              <span>{dish.name}</span>
              <span>${dish.price}</span>
              <div className="ingredients">
                [{dish.ingredients.join(', ')}]
              </div>
              <DishCounter />
            </div>
          ))}
        </div>
      ) : (
        <p>Menu is not available</p>
      )}

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review">
                <h4>{review.user}</h4>
                <p>{review.text}</p>
                <div className="rating">
                  Rating: <Counter value={review.rating} min={RATING_MIN} max={RATING_MAX} />
                </div>
              </div>
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