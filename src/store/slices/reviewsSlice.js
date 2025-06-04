import { createSlice } from '@reduxjs/toolkit';
import { normalizedReviews } from '../normalized-mock';

const initialState = {
  entities: normalizedReviews,
  ids: normalizedReviews.map(review => review.id),
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    // Add reducers if needed for future functionality
  },
});

export default reviewsSlice.reducer; 