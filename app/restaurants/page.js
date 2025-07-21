import { Suspense } from 'react';
import RestaurantsList from '@components/restaurant/RestaurantsList';
import styles from '@components/restaurant/RestaurantsPage.module.css';

export const metadata = {
  title: 'Рестораны | Restaurant Review App',
  description: 'Выберите ресторан для просмотра меню и отзывов',
};

const RestaurantsLoading = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <p>Загружаем рестораны...</p>
  </div>
);

export default function RestaurantsPage() {
  return (
    <div className={styles.restaurantsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Наши рестораны</h1>
        <p className={styles.subtitle}>Выберите ресторан для просмотра меню и отзывов</p>
      </div>
      
      <Suspense fallback={<RestaurantsLoading />}>
        <RestaurantsList />
      </Suspense>
    </div>
  );
} 