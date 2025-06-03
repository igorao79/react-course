import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={`${styles.themeToggle} ${className || ''}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

ThemeSwitcher.propTypes = {
  className: PropTypes.string
};

export default ThemeSwitcher; 