import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS, API_URL } from '../constants';

// Создаем entity adapter для ресторанов
const restaurantsAdapter = createEntityAdapter();

// Async thunks для API вызовов
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/restaurants`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchRestaurantById',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/restaurant/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = restaurantsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
});

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    // Сброс ошибки
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка списка ресторанов
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        restaurantsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      // Загрузка отдельного ресторана
      .addCase(fetchRestaurantById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        restaurantsAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = restaurantsSlice.actions;

// Селекторы
export const {
  selectAll: selectAllRestaurants,
  selectById: selectRestaurantById,
  selectIds: selectRestaurantIds,
  selectEntities: selectRestaurantsEntities,
  selectTotal: selectRestaurantsTotal,
} = restaurantsAdapter.getSelectors((state) => state.restaurants);

// Дополнительные селекторы
export const selectRestaurantsStatus = (state) => state.restaurants.status;
export const selectRestaurantsError = (state) => state.restaurants.error;

// Селекторы для связанных данных
export const selectRestaurantDishes = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.menu; // Возвращаем только ID блюд
};

export const selectRestaurantReviews = (state, restaurantId) => {
  const restaurant = selectRestaurantById(state, restaurantId);
  if (!restaurant) return [];
  return restaurant.reviews; // Возвращаем только ID отзывов
};

export default restaurantsSlice.reducer; 