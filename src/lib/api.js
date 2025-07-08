const API_URL = 'http://localhost:3001/api';

// Базовая функция для fetch запросов
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { 
        tags: options.tags || [],
        revalidate: options.revalidate || 60
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
  return fetchApi('/restaurants', {
    tags: ['restaurants'],
    revalidate: 300, // кеш на 5 минут
  });
}

export async function getRestaurantById(id) {
  return fetchApi(`/restaurant/${id}`, {
    tags: ['restaurants', `restaurant-${id}`],
    revalidate: 300,
  });
}

// Функции для работы с блюдами
export async function getDishes(restaurantId) {
  return fetchApi(`/dishes?restaurantId=${restaurantId}`, {
    tags: ['dishes', `restaurant-${restaurantId}-dishes`],
    revalidate: 600, // кеш на 10 минут
  });
}

export async function getDishById(id) {
  return fetchApi(`/dish/${id}`, {
    tags: ['dishes', `dish-${id}`],
    revalidate: 600,
  });
}

// Функции для работы с отзывами
export async function getReviews(restaurantId) {
  return fetchApi(`/reviews?restaurantId=${restaurantId}`, {
    tags: ['reviews', `restaurant-${restaurantId}-reviews`],
    revalidate: 120, // кеш на 2 минуты
  });
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