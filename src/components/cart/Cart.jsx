'use client';

import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { selectCartItems, selectTotalCount, selectTotalPrice, clearCart } from '../../store';
import CartItem from './CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartItemsArray = useMemo(() => Object.values(cartItems), [cartItems]);

  return (
    <div className={styles.cartContainer}>
      <button 
        className={styles.cartButton} 
        onClick={toggleCart}
        aria-label="Toggle cart"
      >
        <FaShoppingCart className={styles.cartIcon} />
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
              <MdClose />
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
                  <div className={styles.totalPrice}>
                    Total: ${totalPrice.toFixed(2)}
                  </div>
                  <button 
                    className={styles.clearButton} 
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.emptyCart}>
                <p>Your cart is empty</p>
                <Link href="/restaurants" className={styles.shopLink}>
                  Start Shopping
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