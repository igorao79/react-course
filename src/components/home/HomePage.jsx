'use client';

import Link from 'next/link';
import { FaUtensils, FaStar } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import classNames from 'classnames';
import styles from './HomePage.module.css';
import themeStyles from '../../styles/theme.module.css';

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.homePage, themeStyles[theme])}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Добро пожаловать в Restaurant Review</h1>
          <p className={styles.subtitle}>
            Найдите лучшие рестораны в вашем городе и поделитесь своими впечатлениями
          </p>
          <Link href="/restaurants" className={styles.exploreButton}>
            Посмотреть рестораны
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={classNames(styles.feature, themeStyles[theme])}>
          <div className={styles.featureIcon}>
            <FaUtensils />
          </div>
          <h2 className={styles.featureTitle}>Лучшие рестораны</h2>
          <p className={styles.featureDescription}>Откройте для себя новые места</p>
        </div>

        <div className={classNames(styles.feature, themeStyles[theme])}>
          <div className={styles.featureIcon}>
            <FaStar />
          </div>
          <h2 className={styles.featureTitle}>Честные отзывы</h2>
          <p className={styles.featureDescription}>Читайте и оставляйте отзывы</p>
        </div>
      </section>

      <section className={classNames(styles.callToAction, themeStyles[theme])}>
        <h2 className={styles.ctaTitle}>Ready to order?</h2>
        <Link href="/restaurants" className={styles.ctaButton}>
          Find Restaurants
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 