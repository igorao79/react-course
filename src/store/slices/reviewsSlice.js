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

// Selectors
export const selectReviews = (state) => state.reviews.entities;
export const selectReviewIds = (state) => state.reviews.ids;
export const selectReviewById = (state, id) => 
  state.reviews.entities.find(review => review.id === id);

export default reviewsSlice.reducer; 