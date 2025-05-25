import { memo } from 'react';
import PropTypes from 'prop-types';

const Counter = memo(({ value, increment, decrement, min, max }) => {
  return (
    <div className="counter">
      <button 
        onClick={decrement}
        disabled={value <= min}
        className="counter-button"
      >
        -
      </button>
      <span className="counter-value">{value}</span>
      <button 
        onClick={increment}
        disabled={value >= max}
        className="counter-button"
      >
        +
      </button>
    </div>
  );
});

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

Counter.displayName = 'Counter';

export default Counter; 