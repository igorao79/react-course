import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// API Hooks
export { 
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery 
} from './api/restaurantsApi';

export { 
  useGetDishesByRestaurantIdQuery,
  useGetDishByIdQuery 
} from './api/dishesApi';

export { 
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
  useAddReviewMutation,
  useUpdateReviewMutation 
} from './api/reviewsApi';

// Cart actions and selectors
export { 
  addItem as addToCart, 
  removeItem as removeFromCart, 
  clearCart,
  selectCartItems,
  selectTotalCount,
  selectCartItemCount 
} from './slices/cartSlice'; 