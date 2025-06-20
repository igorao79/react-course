const express = require('express');
const cors = require('cors');
const { oldRestaurants, dishes, oldReviews, oldUsers } = require('./data');

const app = express();
const PORT = 3003; // Изменил порт, чтобы не конфликтовал с server.js

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to simulate loading delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Routes

// Get all restaurants
app.get('/restaurants', async (req, res) => {
  await delay(500); // Simulate loading
  res.json(oldRestaurants);
});

// Get restaurant by ID
app.get('/restaurant/:restaurantId', async (req, res) => {
  await delay(300);
  const restaurant = oldRestaurants.find(r => r.id === req.params.restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.json(restaurant);
});

// Get dishes by restaurant ID
app.get('/dishes', async (req, res) => {
  await delay(400);
  const { restaurantId } = req.query;
  
  if (!restaurantId) {
    return res.status(400).json({ error: 'restaurantId query parameter is required' });
  }
  
  const restaurantDishes = dishes.filter(dish => dish.restaurantId === restaurantId);
  res.json(restaurantDishes);
});

// Get dish by ID
app.get('/dish/:dishId', async (req, res) => {
  await delay(300);
  const dish = dishes.find(d => d.id === req.params.dishId);
  if (!dish) {
    return res.status(404).json({ error: 'Dish not found' });
  }
  res.json(dish);
});

// Get reviews by restaurant ID
app.get('/reviews', async (req, res) => {
  await delay(400);
  const { restaurantId } = req.query;
  
  if (!restaurantId) {
    return res.status(400).json({ error: 'restaurantId query parameter is required' });
  }
  
  const restaurantReviews = oldReviews.filter(review => review.restaurantId === restaurantId);
  res.json(restaurantReviews);
});

// Get all users
app.get('/users', async (req, res) => {
  await delay(300);
  res.json(oldUsers);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server (index.js) запущен на http://localhost:${PORT}`);
  console.log('📋 Доступные endpoint\'ы:');
  console.log('GET /restaurants - все рестораны');
  console.log('GET /restaurant/:restaurantId - ресторан по ID');
  console.log('GET /dishes?restaurantId=:restaurantId - блюда по ID ресторана');
  console.log('GET /dish/:dishId - блюдо по ID');
  console.log('GET /reviews?restaurantId=:restaurantId - отзывы по ID ресторана');
  console.log('GET /users - все пользователи');
}); 