'use client';

import PropTypes from 'prop-types';
import { useTheme } from '../../contexts/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      className={`${styles.themeToggle} ${className || ''}`}
      onClick={toggleTheme}
      aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
    >
      {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
};

ThemeSwitcher.propTypes = {
  className: PropTypes.string
};

export default ThemeSwitcher; 