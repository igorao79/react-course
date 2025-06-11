import { Link } from 'react-router-dom';
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
          <h1 className={styles.title}>Find the Best Restaurants in Your Area</h1>
          <p className={styles.subtitle}>
            Discover delicious food from top-rated restaurants with easy online ordering
          </p>
          <Link to="/restaurants" className={styles.exploreButton}>
            Explore Restaurants
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={classNames(styles.feature, themeStyles[theme])}>
          <div className={styles.featureIcon}>🍽️</div>
          <h2 className={styles.featureTitle}>Wide Selection</h2>
          <p className={styles.featureDescription}>
            Browse through hundreds of restaurants with diverse cuisine options
          </p>
        </div>

        <div className={classNames(styles.feature, themeStyles[theme])}>
          <div className={styles.featureIcon}>⭐</div>
          <h2 className={styles.featureTitle}>Honest Reviews</h2>
          <p className={styles.featureDescription}>
            Read authentic customer reviews to help you make the best choice
          </p>
        </div>

        <div className={classNames(styles.feature, themeStyles[theme])}>
          <div className={styles.featureIcon}>🛒</div>
          <h2 className={styles.featureTitle}>Easy Ordering</h2>
          <p className={styles.featureDescription}>
            Add items to your cart and checkout with just a few clicks
          </p>
        </div>
      </section>

      <section className={classNames(styles.callToAction, themeStyles[theme])}>
        <h2 className={styles.ctaTitle}>Ready to order?</h2>
        <Link to="/restaurants" className={styles.ctaButton}>
          Find Restaurants
        </Link>
      </section>
    </div>
  );
};

export default HomePage; 