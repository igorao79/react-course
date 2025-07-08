'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useUser } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';
import styles from './UserAuth.module.css';

const UserAuth = ({ className }) => {
  const { user, login, logout } = useUser();
  const { clearCart } = useCart();
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setUsername('');
      setShowLoginForm(false);
    }
  };

  const handleLogout = () => {
    logout();
    clearCart(); // Очищаем корзину при выходе
  };

  return (
    <div className={`${styles.userAuth} ${className || ''}`}>
      {user ? (
        <div className={styles.userInfo}>
          <span className={styles.username}>{user.name}</span>
          <button 
            className={styles.logoutButton} 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : showLoginForm ? (
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className={styles.loginInput}
            autoFocus
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => setShowLoginForm(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button 
          className={styles.loginButton} 
          onClick={() => setShowLoginForm(true)}
        >
          Login
        </button>
      )}
    </div>
  );
};

UserAuth.propTypes = {
  className: PropTypes.string
};

export default UserAuth; 