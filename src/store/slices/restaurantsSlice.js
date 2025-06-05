import { createSlice } from '@reduxjs/toolkit';
import { normalizedRestaurants } from '../normalized-mock';

const initialState = {
  entities: normalizedRestaurants,
  ids: normalizedRestaurants.map(restaurant => restaurant.id),
};

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    // Add reducers if needed for future functionality
  },
});

// Selectors
export const selectRestaurants = (state) => state.restaurants.entities;
export const selectRestaurantIds = (state) => state.restaurants.ids;
export const selectRestaurantById = (state, id) => 
  state.restaurants.entities.find(restaurant => restaurant.id === id);

// Restaurant-specific selectors that depend on other slices
export const selectRestaurantDishes = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.menu; // Return dish IDs only
};

export const selectRestaurantReviews = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.reviews; // Return review IDs only
};

export default restaurantsSlice.reducer; 