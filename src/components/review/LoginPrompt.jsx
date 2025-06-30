import { useState, useCallback, memo } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import LoginForm from '../user/LoginForm';
import styles from './LoginPrompt.module.css';
import themeStyles from '../../styles/theme.module.css';

const LoginPrompt = memo(() => {
  const { theme } = useTheme();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleShowLoginForm = useCallback(() => {
    setShowLoginForm(true);
  }, []);

  const handleCloseLoginForm = useCallback(() => {
    setShowLoginForm(false);
  }, []);

  return (
    <>
      <div className={classNames(styles.loginPrompt, themeStyles[theme])}>
        <div className={styles.promptContent}>
          <h3 className={styles.promptTitle}>Хотите оставить отзыв?</h3>
          <p className={styles.promptText}>
            Войдите в систему, чтобы поделиться своим мнением о ресторане
          </p>
          <button 
            className={styles.promptButton}
            onClick={handleShowLoginForm}
          >
            Войти и оставить отзыв
          </button>
        </div>
      </div>
      
      {showLoginForm && (
        <LoginForm onClose={handleCloseLoginForm} />
      )}
    </>
  );
});

LoginPrompt.displayName = 'LoginPrompt';

export default LoginPrompt; 