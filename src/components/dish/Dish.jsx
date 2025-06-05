import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';
import DishCounter from './DishCounter';
import { selectDishById } from '../../store';
import styles from './Dish.module.css';
import themeStyles from '../../styles/theme.module.css';

const Dish = ({ dishId }) => {
  const dish = useSelector(state => selectDishById(state, dishId));
  const { theme } = useTheme();
  const { addToCart, removeFromCart, getItemCount } = useCart();
  const [count, setCount] = useState(getItemCount(dishId));

  if (!dish) return null;

  const handleIncrement = () => {
    addToCart(dish);
    setCount(getItemCount(dishId));
  };

  const handleDecrement = () => {
    removeFromCart(dish.id);
    setCount(getItemCount(dishId));
  };

  return (
    <div className={classNames(styles.dish, themeStyles[theme])}>
      <div className={styles.header}>
        <h4 className={styles.name}>{dish.name}</h4>
        <div className={styles.price}>${dish.price}</div>
      </div>
      <div className={styles.ingredients}>
        {dish.ingredients.join(', ')}
      </div>
      <DishCounter
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
};

Dish.propTypes = {
  dishId: PropTypes.string.isRequired,
};

export default Dish; 