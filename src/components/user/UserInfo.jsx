import { useState, useCallback } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import LoginForm from './LoginForm';
import styles from './UserInfo.module.css';
import themeStyles from '../../styles/theme.module.css';

const UserInfo = () => {
  const { theme } = useTheme();
  const { user, logout } = useUser();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = useCallback(() => {
    setShowLoginForm(true);
  }, []);

  const handleCloseLoginForm = useCallback(() => {
    setShowLoginForm(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (user) {
    return (
      <div className={classNames(styles.userInfo, themeStyles[theme])}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className={styles.userName}>{user.name}</span>
        </div>
        <button 
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Выйти"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={classNames(styles.userInfo, themeStyles[theme])}>
        <button 
          className={styles.loginButton}
          onClick={handleLoginClick}
        >
          Войти
        </button>
      </div>
      
      {showLoginForm && (
        <LoginForm onClose={handleCloseLoginForm} />
      )}
    </>
  );
};

export default UserInfo; 