import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { fetchReviewsByRestaurantId } from '../thunks/reviewsThunks';

// Создаем entity adapter для отзывов
const reviewsAdapter = createEntityAdapter();

const initialState = reviewsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
  fetchedRestaurants: [], // Отслеживаем для каких ресторанов уже загружали отзывы
});

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка отзывов ресторана
      .addCase(fetchReviewsByRestaurantId.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchReviewsByRestaurantId.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        reviewsAdapter.setMany(state, action.payload);
        // Добавляем restaurant ID в список загруженных
        const restaurantId = action.meta.arg;
        if (!state.fetchedRestaurants.includes(restaurantId)) {
          state.fetchedRestaurants.push(restaurantId);
        }
      })
      .addCase(fetchReviewsByRestaurantId.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { clearError } = reviewsSlice.actions;

// Селекторы
export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectReviewIds,
  selectEntities: selectReviewsEntities,
  selectTotal: selectReviewsTotal,
} = reviewsAdapter.getSelectors((state) => state.reviews);

// Дополнительные селекторы
export const selectReviewsStatus = (state) => state.reviews.status;
export const selectReviewsError = (state) => state.reviews.error;
export const selectFetchedRestaurants = (state) => state.reviews.fetchedRestaurants;

// Селектор для получения отзывов ресторана
export const selectReviewsByRestaurant = (state, restaurantId) => {
  return selectAllReviews(state).filter(review => review.restaurantId === restaurantId);
};

// Селектор для проверки, загружены ли отзывы для конкретного ресторана
export const selectAreReviewsFetchedForRestaurant = (state, restaurantId) =>
  state.reviews.fetchedRestaurants.includes(restaurantId);

export default reviewsSlice.reducer; 