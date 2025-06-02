import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ProgressBar.module.css';
import themeStyles from '../../styles/theme.module.css';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentPosition = window.scrollY;
      const progress = (currentPosition / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Вызываем сразу для инициализации
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classNames(styles.progressContainer, styles[theme], themeStyles[theme])}>
      <div 
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ProgressBar; 