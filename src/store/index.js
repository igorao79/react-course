import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './slices/restaurantsSlice';
import dishesReducer from './slices/dishesSlice';
import reviewsReducer from './slices/reviewsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

// Selectors
export const selectRestaurants = (state) => state.restaurants.entities;
export const selectRestaurantById = (state, id) => 
  state.restaurants.entities.find(restaurant => restaurant.id === id);

export const selectDishes = (state) => state.dishes.entities;
export const selectDishById = (state, id) => 
  state.dishes.entities.find(dish => dish.id === id);

export const selectReviews = (state) => state.reviews.entities;
export const selectReviewById = (state, id) => 
  state.reviews.entities.find(review => review.id === id);

export const selectUsers = (state) => state.users.entities;
export const selectUserById = (state, id) => 
  state.users.entities.find(user => user.id === id);

// Restaurant-specific selectors
export const selectRestaurantDishes = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.menu.map(dishId => selectDishById(state, dishId)).filter(Boolean);
};

export const selectRestaurantReviews = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.reviews.map(reviewId => selectReviewById(state, reviewId)).filter(Boolean);
}; 