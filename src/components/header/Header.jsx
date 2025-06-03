import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeSwitcher from '../theme/ThemeSwitcher';
import UserAuth from '../user/UserAuth';
import styles from './Header.module.css';
import themeStyles from '../../styles/theme.module.css';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={classNames(styles.header, themeStyles[theme])}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Restaurant Review App</h1>
        <div className={styles.actions}>
          <ThemeSwitcher className={styles.themeToggle} />
          <UserAuth />
        </div>
      </div>
    </header>
  );
};

export default Header; 