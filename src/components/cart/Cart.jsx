import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectTotalCount, clearCart } from '../../store';
import { useCartTotal } from '../../hooks/useCartTotal';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const totalCount = useSelector(selectTotalCount);
  const { totalPrice, isLoading: priceLoading } = useCartTotal();
  const dispatch = useDispatch();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItemsArray = Object.values(cartItems);

  return (
    <div className={styles.cartContainer}>
      <button 
        className={styles.cartButton} 
        onClick={toggleCart}
        aria-label="Toggle cart"
      >
        <span className={styles.cartIcon}>🛒</span>
        <span className={styles.cartCount}>{totalCount}</span>
      </button>

      {isOpen && (
        <div className={styles.cartDropdown}>
          <div className={styles.cartHeader}>
            <h3>Your Cart</h3>
            <button 
              className={styles.closeButton} 
              onClick={toggleCart}
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          <div className={styles.cartContent}>
            {cartItemsArray.length > 0 ? (
              <>
                {cartItemsArray.map(item => (
                  <CartItem 
                    key={item.dish.id} 
                    dish={item.dish} 
                    quantity={item.quantity} 
                  />
                ))}

                <div className={styles.cartFooter}>
                  <div className={styles.cartTotal}>
                    <span>Total:</span>
                    <span>
                      {priceLoading ? 'Calculating...' : `$${totalPrice.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className={styles.cartActions}>
                    <button 
                      className={styles.clearButton} 
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                    <button className={styles.checkoutButton}>
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.emptyCart}>
                <p>Your cart is empty</p>
                <Link to="/restaurants" className={styles.shopLink}>
                  Browse Restaurants
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 