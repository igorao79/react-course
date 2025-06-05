import { createSlice } from '@reduxjs/toolkit';
import { normalizedDishes } from '../normalized-mock';

const initialState = {
  entities: normalizedDishes,
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
export const selectDishById = (state, id) => 
  state.dishes.entities.find(dish => dish.id === id);

export default dishesSlice.reducer; 