import { createSlice } from '@reduxjs/toolkit';
import { normalizedReviews } from '../normalized-mock';

const initialState = {
  entities: normalizedReviews.reduce((acc, review) => {
    acc[review.id] = review;
    return acc;
  }, {}),
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
export const selectReviewById = (state, id) => state.reviews.entities[id];
export const selectReviewsByRestaurant = (state, restaurantId) => {
  return state.reviews.ids
    .map(id => state.reviews.entities[id])
    .filter(review => review.restaurantId === restaurantId);
};

export default reviewsSlice.reducer; 