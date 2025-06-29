import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGetDishByIdQuery } from '../../store';
import { useCartActions } from '../../hooks/useCartActions';
import styles from './CartItem.module.css';

const CartItem = ({ dishId, quantity }) => {
  const { data: dish, isLoading } = useGetDishByIdQuery(dishId);
  const { handleIncrement, handleDecrement } = useCartActions(dishId);

  if (isLoading) {
    return (
      <div className={styles.cartItem}>
        <div className={styles.loading}>Загружаем...</div>
      </div>
    );
  }

  if (!dish) return null;

  const itemTotal = (dish.price * quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <Link to={`/dish/${dishId}`} className={styles.itemName}>
        {dish.name}
      </Link>
      
      <div className={styles.itemDetails}>
        <div className={styles.priceInfo}>
          <span className={styles.price}>${dish.price}</span>
          <span className={styles.quantity}>× {quantity}</span>
          <span className={styles.total}>${itemTotal}</span>
        </div>
        
        <div className={styles.controls}>
          <button 
            className={styles.controlButton} 
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className={styles.count}>{quantity}</span>
          <button 
            className={styles.controlButton} 
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  dishId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};

export default CartItem; 