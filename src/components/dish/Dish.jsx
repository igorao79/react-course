import PropTypes from 'prop-types';
import classNames from 'classnames';
import DishCounter from './DishCounter';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import styles from './Dish.module.css';
import themeStyles from '../../styles/theme.module.css';

const Dish = ({ dish }) => {
  if (!dish) return null;
  
  const { theme } = useTheme();
  const { user } = useUser();
  
  return (
    <div className={classNames(
      styles.dish, 
      themeStyles[theme]
    )}>
      <div className={styles.header}>
        <h4 className={styles.name}>{dish.name}</h4>
        <span className={styles.price}>${dish.price}</span>
      </div>
      <div className={styles.ingredients}>
        {dish.ingredients.map((ingredient, index) => (
          <span key={ingredient} className={styles.ingredient}>
            {ingredient}
            {index < dish.ingredients.length - 1 && <span className={styles.separator}>•</span>}
          </span>
        ))}
      </div>
      {user && (
        <div className={styles.counter}>
          <DishCounter dishId={dish.id} />
        </div>
      )}
    </div>
  );
};

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default Dish; 