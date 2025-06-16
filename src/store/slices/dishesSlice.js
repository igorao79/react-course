import { createSlice, createSelector } from '@reduxjs/toolkit';
import { normalizedDishes } from '../normalized-mock';

const initialState = {
  entities: normalizedDishes.reduce((acc, dish) => {
    acc[dish.id] = dish;
    return acc;
  }, {}),
  ids: normalizedDishes.map(dish => dish.id),
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    // Add reducers if needed for future functionality
  },
});

// Base selectors
const selectDishesState = (state) => state.dishes;
const selectDishesEntities = createSelector(
  [selectDishesState],
  (dishesState) => dishesState.entities
);
const selectDishesIds = createSelector(
  [selectDishesState],
  (dishesState) => dishesState.ids
);

// Memoized selectors
export const selectDishes = selectDishesEntities;
export const selectDishIds = selectDishesIds;
export const selectDishById = createSelector(
  [selectDishesEntities, (_, dishId) => dishId],
  (entities, dishId) => entities[dishId]
);
export const selectAllDishes = createSelector(
  [selectDishesEntities, selectDishesIds],
  (entities, ids) => ids.map(id => entities[id])
);

export default dishesSlice.reducer;