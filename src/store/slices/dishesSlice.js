import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { fetchDishesByRestaurantId, fetchDishById } from '../thunks/dishesThunks';

// Создаем entity adapter для блюд
const dishesAdapter = createEntityAdapter();

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
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchDishById.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        dishesAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchDishById.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
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

export const selectDishesStatus = (state) => state.dishes.status;
export const selectDishesError = (state) => state.dishes.error;
export const selectFetchedRestaurants = (state) => state.dishes.fetchedRestaurants;

// Селектор для проверки, загружены ли блюда для конкретного ресторана
export const selectAreDishesFetchedForRestaurant = (state, restaurantId) => 
  state.dishes.fetchedRestaurants.includes(restaurantId);

export default dishesSlice.reducer;