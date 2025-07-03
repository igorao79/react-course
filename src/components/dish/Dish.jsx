import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext';
import { useCartActions } from '../../hooks/useCartActions';
import DishCounter from './DishCounter';
import styles from './Dish.module.css';
import themeStyles from '../../styles/theme.module.css';

const Dish = ({ dish }) => {
  const { theme } = useTheme();
  const { count, handleIncrement, handleDecrement } = useCartActions(dish);

  if (!dish) return null;

  return (
    <div className={classNames(styles.dish, themeStyles[theme])}>
      <Link href={`/dish/${dish.id}`} className={styles.dishLink}>
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
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Dish; 