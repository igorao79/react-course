const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { restaurants, products, reviews, users } = require('./data');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Helper функции для поиска связанных данных
const getRestaurantDishes = (restaurantId) => {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  if (!restaurant) return [];
  
  return restaurant.menu.map(dishId => 
    products.find(product => product.id === dishId)
  ).filter(Boolean);
};

const getRestaurantReviews = (restaurantId) => {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  if (!restaurant) return [];
  
  return restaurant.reviews.map(reviewId => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review) return null;
    
    const user = users.find(u => u.id === review.userId);
    return {
      ...review,
      userName: user ? user.name : 'Unknown'
    };
  }).filter(Boolean);
};

// API Routes

// Рестораны
app.get('/api/restaurants', (req, res) => {
  try {
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения ресторанов' });
  }
});

app.get('/api/restaurant/:restaurantId', (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (!restaurant) {
      return res.status(404).json({ error: 'Ресторан не найден' });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения ресторана' });
  }
});

// Блюда
app.get('/api/dishes', (req, res) => {
  try {
    const { restaurantId } = req.query;
    
    if (!restaurantId) {
      return res.status(400).json({ error: 'Необходимо указать restaurantId' });
    }
    
    const dishes = getRestaurantDishes(restaurantId);
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения блюд' });
  }
});

app.get('/api/dish/:dishId', (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = products.find(p => p.id === dishId);
    
    if (!dish) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }
    
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения блюда' });
  }
});

// Отзывы
app.get('/api/reviews', (req, res) => {
  try {
    const { restaurantId } = req.query;
    
    if (!restaurantId) {
      return res.status(400).json({ error: 'Необходимо указать restaurantId' });
    }
    
    const restaurantReviews = getRestaurantReviews(restaurantId);
    res.json(restaurantReviews);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения отзывов' });
  }
});

app.post('/api/review/:restaurantId', (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { userId, userName, text, rating } = req.body;
    
    // Проверяем существование ресторана
    const restaurant = restaurants.find(r => r.id === restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Ресторан не найден' });
    }
    
    // Проверяем обязательные поля
    if (!userId || !userName || !text || !rating) {
      return res.status(400).json({ error: 'Необходимы поля: userId, userName, text, rating' });
    }
    
    // Проверяем/создаем пользователя
    let user = users.find(u => u.id === userId);
    if (!user) {
      user = { id: userId, name: userName };
      users.push(user);
      console.log(`👤 Создан новый пользователь: ${userName} (${userId})`);
    }
    
    // Создаем новый отзыв
    const newReview = {
      id: uuidv4(),
      userId,
      text,
      rating: Number(rating),
      userName: user.name
    };
    
    // Добавляем отзыв в массив
    reviews.push(newReview);
    
    // Добавляем ID отзыва в ресторан
    restaurant.reviews.push(newReview.id);
    
    console.log(`✅ Создан отзыв от ${userName} для ресторана ${restaurant.name}`);
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Ошибка создания отзыва:', error);
    res.status(500).json({ error: 'Ошибка создания отзыва' });
  }
});

app.patch('/api/review/:reviewId', (req, res) => {
  try {
    const { reviewId } = req.params;
    const { text, rating } = req.body;
    
    // Находим отзыв
    const reviewIndex = reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ error: 'Отзыв не найден' });
    }
    
    // Обновляем отзыв
    if (text !== undefined) {
      reviews[reviewIndex].text = text;
    }
    if (rating !== undefined) {
      reviews[reviewIndex].rating = Number(rating);
    }
    
    // Добавляем имя пользователя для ответа
    const user = users.find(u => u.id === reviews[reviewIndex].userId);
    const updatedReview = {
      ...reviews[reviewIndex],
      userName: user ? user.name : 'Unknown'
    };
    
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления отзыва' });
  }
});

// Пользователи
app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения пользователей' });
  }
});

// Обработка несуществующих маршрутов
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📍 API доступно по адресу: http://localhost:${PORT}/api`);
  console.log('\n📋 Доступные endpoint\'ы:');
  console.log('GET /api/restaurants - все рестораны');
  console.log('GET /api/restaurant/:restaurantId - ресторан по ID');
  console.log('GET /api/dishes?restaurantId=:restaurantId - блюда по ID ресторана');
  console.log('GET /api/dish/:dishId - блюдо по ID');
  console.log('GET /api/reviews?restaurantId=:restaurantId - отзывы по ID ресторана');
  console.log('POST /api/review/:restaurantId - создать отзыв');
  console.log('PATCH /api/review/:reviewId - изменить отзыв');
  console.log('GET /api/users - все пользователи');
});

module.exports = app; 