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

// Re-export selectors from slices
export * from './slices/restaurantsSlice';
export * from './slices/dishesSlice';
export * from './slices/reviewsSlice';
export * from './slices/usersSlice'; 