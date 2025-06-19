import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS, API_URL } from '../constants';

// Создаем entity adapter для блюд
const dishesAdapter = createEntityAdapter();

// Async thunks для API вызовов
export const fetchDishesByRestaurantId = createAsyncThunk(
  'dishes/fetchDishesByRestaurantId',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dishes?restaurantId=${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDishById = createAsyncThunk(
  'dishes/fetchDishById',
  async (dishId, { rejectWithValue, getState }) => {
    // Проверяем, есть ли уже блюдо в сторе
    const dishesState = getState().dishes;
    const existingDish = dishesState.entities[dishId];
    if (existingDish) {
      return existingDish;
    }

    try {
      const response = await fetch(`${API_URL}/dish/${dishId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dish');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = dishesAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
  fetchedRestaurants: [], // Отслеживаем для каких ресторанов уже загружали блюда
});

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка блюд ресторана
      .addCase(fetchDishesByRestaurantId.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchDishesByRestaurantId.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        dishesAdapter.setMany(state, action.payload);
        // Добавляем restaurant ID в список загруженных
        const restaurantId = action.meta.arg;
        if (!state.fetchedRestaurants.includes(restaurantId)) {
          state.fetchedRestaurants.push(restaurantId);
        }
      })
      .addCase(fetchDishesByRestaurantId.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      })
      // Загрузка отдельного блюда
      .addCase(fetchDishById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDishById.fulfilled, (state, action) => {
        dishesAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchDishById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = dishesSlice.actions;

// Селекторы
export const {
  selectAll: selectAllDishes,
  selectById: selectDishById,
  selectIds: selectDishIds,
  selectEntities: selectDishesEntities,
  selectTotal: selectDishesTotal,
} = dishesAdapter.getSelectors((state) => state.dishes);

// Дополнительные селекторы
export const selectDishesStatus = (state) => state.dishes.status;
export const selectDishesError = (state) => state.dishes.error;
export const selectFetchedRestaurants = (state) => state.dishes.fetchedRestaurants;

// Селектор для проверки, загружены ли блюда для ресторана
export const selectAreDishesFetchedForRestaurant = (state, restaurantId) => {
  return state.dishes.fetchedRestaurants.includes(restaurantId);
};

export default dishesSlice.reducer;