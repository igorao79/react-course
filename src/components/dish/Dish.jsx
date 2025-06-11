import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCartActions } from '../../hooks/useCartActions';
import DishCounter from './DishCounter';
import { selectDishById } from '../../store';
import styles from './Dish.module.css';
import themeStyles from '../../styles/theme.module.css';

const Dish = ({ dishId }) => {
  const dish = useSelector(state => selectDishById(state, dishId));
  const { theme } = useTheme();
  const { count, handleIncrement, handleDecrement } = useCartActions(dishId);

  if (!dish) return null;

  return (
    <div className={classNames(styles.dish, themeStyles[theme])}>
      <Link to={`/dish/${dish.id}`} className={styles.dishLink}>
        <div className={styles.header}>
          <h4 className={styles.name}>{dish.name}</h4>
          <div className={styles.price}>${dish.price}</div>
        </div>
        <div className={styles.ingredients}>
          {dish.ingredients.join(', ')}
        </div>
      </Link>
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