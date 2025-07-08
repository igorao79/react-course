import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './Dish.module.css';

const DishCard = ({ dish, className }) => {
  if (!dish) return null;

  return (
    <div className={`${styles.dish} ${className || ''}`}>
      <Link href={`/dish/${dish.id}`} className={styles.dishLink}>
        <div className={styles.header}>
          <h4 className={styles.name}>{dish.name}</h4>
          <div className={styles.price}>${dish.price}</div>
        </div>
        <div className={styles.ingredients}>
          {dish.ingredients.join(', ')}
        </div>
      </Link>
      <div className={styles.actions}>
        <span className={styles.viewDetails}>Нажмите для просмотра</span>
      </div>
    </div>
  );
};

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default DishCard; 