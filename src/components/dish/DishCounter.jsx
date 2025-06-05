import PropTypes from 'prop-types';
import Counter from '../counter/Counter';

const DishCounter = ({ count, onIncrement, onDecrement }) => {
  return (
    <Counter
      value={count}
      increment={onIncrement}
      decrement={onDecrement}
      min={0}
      max={5}
    />
  );
};

DishCounter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
};

export default DishCounter; 