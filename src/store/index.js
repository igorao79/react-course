import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './slices/restaurantsSlice';
import dishesReducer from './slices/dishesSlice';
import reviewsReducer from './slices/reviewsSlice';
import usersReducer from './slices/usersSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
    cart: cartReducer,
  },
});

// Re-export selectors from slices
export * from './slices/restaurantsSlice';
export * from './slices/dishesSlice';
export * from './slices/reviewsSlice';
export * from './slices/usersSlice';
export * from './slices/cartSlice'; 