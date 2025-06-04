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

export default restaurantsSlice.reducer; 