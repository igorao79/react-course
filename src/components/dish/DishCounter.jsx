import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Counter from '../counter/Counter';
import { useCart } from '../../contexts/CartContext';

const DishCounter = ({ dishId }) => {
  const { getDishCount, updateDishCount } = useCart();
  const count = getDishCount(dishId);

  const increment = useCallback(() => {
    updateDishCount(dishId, count + 1);
  }, [dishId, count, updateDishCount]);

  const decrement = useCallback(() => {
    if (count > 0) {
      updateDishCount(dishId, count - 1);
    }
  }, [dishId, count, updateDishCount]);

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
  dishId: PropTypes.string.isRequired
};

export default DishCounter; 