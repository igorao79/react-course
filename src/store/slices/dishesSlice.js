import { createSlice } from '@reduxjs/toolkit';
import { normalizedDishes } from '../normalized-mock';

const initialState = {
  entities: normalizedDishes.reduce((acc, dish) => {
    acc[dish.id] = dish;
    return acc;
  }, {}),
  ids: normalizedDishes.map(dish => dish.id),
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    // Add reducers if needed for future functionality
  },
});

// Selectors
export const selectDishes = (state) => state.dishes.entities;
export const selectDishIds = (state) => state.dishes.ids;
export const selectDishById = (state, dishId) => state.dishes.entities[dishId];
export const selectAllDishes = (state) => state.dishes.ids.map(id => state.dishes.entities[id]);

export default dishesSlice.reducer; 