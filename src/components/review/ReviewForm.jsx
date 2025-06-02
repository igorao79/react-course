import { useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Counter from '../counter/Counter';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';
import { RATING_MIN, RATING_MAX, SET_NAME, SET_TEXT, SET_RATING, CLEAR } from '../../constants';
import styles from './ReviewForm.module.css';
import themeStyles from '../../styles/theme.module.css';

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
  const { user } = useUser();
  const { theme } = useTheme();

  if (!user) {
    return (
      <div className={classNames(styles.loginPrompt, themeStyles[theme])}>
        <p>Please log in to leave a review</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...state,
        id: Date.now().toString(),
        user: user.name
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
    <div className={classNames(styles.formContainer, themeStyles[theme])}>
      <h4 className={styles.formTitle}>Add Your Review</h4>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="text" className={styles.label}>Review:</label>
          <textarea
            id="text"
            value={state.text}
            onChange={(e) => dispatch({ type: SET_TEXT, payload: e.target.value })}
            className={styles.textarea}
            placeholder="Share your experience..."
            rows="4"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Rating:</label>
          <div className={styles.ratingContainer}>
            <Counter
              value={state.rating}
              increment={handleRatingIncrement}
              decrement={handleRatingDecrement}
              min={RATING_MIN}
              max={RATING_MAX}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={classNames(styles.button, styles.submitButton)}>
            Submit Review
          </button>
          <button 
            type="button" 
            onClick={() => dispatch({ type: CLEAR })}
            className={classNames(styles.button, styles.clearButton)}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReviewForm; 