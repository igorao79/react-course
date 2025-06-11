import { useEffect } from 'react';
import classNames from 'classnames';
import ProgressBar from '../progress-bar/ProgressBar';
import Header from '../header/Header';
import Cart from '../cart/Cart';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Layout.module.css';
import themeStyles from '../../styles/theme.module.css';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={classNames(
      styles.layout, 
      styles[theme],
      themeStyles[theme]
    )}>
      <Header />
      <ProgressBar />
      <main className={styles.main}>
        {children}
      </main>
      <Cart />
      <footer className={styles.footer}>
        <p>&copy; 2025 Restaurant Review App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 