// Определяем базовый URL в зависимости от окружения
const getBaseUrl = () => {
  // На сервере используем абсолютный URL
  if (typeof window === 'undefined') {
    return 'http://localhost:3002/api';
  }
  // В браузере используем относительный URL (через прокси Next.js)
  return '/api';
};

// Базовая функция для fetch запросов
async function fetchApi(endpoint, options = {}) {
  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Функции для работы с ресторанами
export async function getRestaurants() {
  return fetchApi('/restaurants');
}

export async function getRestaurantById(id) {
  return fetchApi(`/restaurant/${id}`);
}

// Функции для работы с блюдами
export async function getDishes(restaurantId) {
  return fetchApi(`/dishes?restaurantId=${restaurantId}`);
}

export async function getDishById(id) {
  return fetchApi(`/dish/${id}`);
}

// Функции для работы с отзывами
export async function getReviews(restaurantId) {
  return fetchApi(`/reviews?restaurantId=${restaurantId}`);
}

export async function createReview(restaurantId, reviewData) {
  return fetchApi(`/review/${restaurantId}`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  });
}

export async function updateReview(reviewId, reviewData) {
  return fetchApi(`/review/${reviewId}`, {
    method: 'PATCH',
    body: JSON.stringify(reviewData),
  });
}

// Функции для работы с пользователями
export async function getUsers() {
  return fetchApi('/users');
}

// Функция для инвалидации кеша (для Next.js)
export async function revalidateRestaurants() {
  return fetch('/api/revalidate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tag: 'restaurants',
    }),
  });
} 