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

export default dishesSlice.reducer; 