import { useState } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';
import styles from './Header.module.css';
import themeStyles from '../../styles/theme.module.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
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
    clearCart();
  };

  return (
    <header className={classNames(styles.header, themeStyles[theme])}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Restaurant Review App</h1>
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
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
      </div>
    </header>
  );
};

export default Header; 