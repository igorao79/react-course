import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Counter from './Counter';

const DishCounter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  return (
    <Counter
      value={count}
      increment={increment}
      decrement={decrement}
      min={0}
      max={5}
    />
  );
};

DishCounter.propTypes = {
  initialCount: PropTypes.number
};

export default DishCounter; 