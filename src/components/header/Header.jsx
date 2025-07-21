'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher from '../theme/ThemeSwitcher';
import UserInfo from '../user/UserInfo';
import styles from './Header.module.css';
import themeStyles from '../../styles/theme.module.css';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={classNames(styles.header, themeStyles[theme])}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <h1 className={styles.title}>Restaurant Review App</h1>
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/restaurants" className={styles.navLink}>Restaurants</Link>
        </nav>
        
        <div className={styles.actions}>
          <ThemeSwitcher className={styles.themeToggle} />
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header; 