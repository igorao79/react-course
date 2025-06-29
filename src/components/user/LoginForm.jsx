import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import styles from './LoginForm.module.css';
import themeStyles from '../../styles/theme.module.css';

const LoginForm = ({ onClose }) => {
  const { theme } = useTheme();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert('Пожалуйста, введите ваше имя');
      return;
    }

    if (username.trim().length < 2) {
      alert('Имя должно содержать минимум 2 символа');
      return;
    }

    setIsLoading(true);
    
    try {
      // Имитируем небольшую задержку для лучшего UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      login(username);
      onClose?.();
    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка при входе. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  }, [username, login, onClose]);

  const handleUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  return (
    <div className={classNames(styles.overlay, themeStyles[theme])}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добро пожаловать!</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Как вас зовут?
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className={styles.input}
              placeholder="Введите ваше имя..."
              disabled={isLoading}
              maxLength={50}
              autoFocus
            />
          </div>

          <div className={styles.formActions}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading || !username.trim()}
            >
              {isLoading ? 'Входим...' : 'Войти'}
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.note}>
            Просто введите свое имя, чтобы начать оставлять отзывы о ресторанах
          </p>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func,
};

export default LoginForm; 