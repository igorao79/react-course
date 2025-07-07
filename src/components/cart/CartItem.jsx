import Link from 'next/link';
import PropTypes from 'prop-types';
import { useCartActions } from '../../hooks/useCartActions';
import styles from './CartItem.module.css';

const CartItem = ({ dish, quantity }) => {
  const { handleIncrement, handleDecrement } = useCartActions(dish);

  if (!dish) return null;

  const itemTotal = (dish.price * quantity).toFixed(2);

  return (
    <div className={styles.cartItem}>
      <Link href={`/dish/${dish.id}`} className={styles.itemName}>
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
            −
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
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired
};

export default CartItem; 