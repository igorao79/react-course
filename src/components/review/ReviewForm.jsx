import { useReducer } from 'react';
import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import { RATING_MIN, RATING_MAX, SET_NAME, SET_TEXT, SET_RATING, CLEAR } from '../../constants';

const initialState = {
  name: '',
  text: '',
  rating: RATING_MIN
};

function reducer(state, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_TEXT:
      return { ...state, text: action.payload };
    case SET_RATING:
      return { ...state, rating: action.payload };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}

function useReviewForm() {
  return useReducer(reducer, initialState);
}

const ReviewForm = ({ onSubmit }) => {
  const [state, dispatch] = useReviewForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...state,
        id: Date.now().toString(),
        user: state.name
      });
    }
    dispatch({ type: CLEAR });
  };

  const handleRatingIncrement = () => {
    dispatch({ 
      type: SET_RATING, 
      payload: state.rating + 1
    });
  };

  const handleRatingDecrement = () => {
    dispatch({ 
      type: SET_RATING, 
      payload: state.rating - 1
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={state.name}
          onChange={(e) => dispatch({ type: SET_NAME, payload: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="text">Review:</label>
        <textarea
          id="text"
          value={state.text}
          onChange={(e) => dispatch({ type: SET_TEXT, payload: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Rating:</label>
        <Counter
          value={state.rating}
          increment={handleRatingIncrement}
          decrement={handleRatingDecrement}
          min={RATING_MIN}
          max={RATING_MAX}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
        <button 
          type="button" 
          onClick={() => dispatch({ type: CLEAR })}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReviewForm; 