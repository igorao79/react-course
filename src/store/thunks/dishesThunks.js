import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';

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
  },
  {
    condition: (restaurantId, { getState }) => {
      const { dishes } = getState();
      // Не выполняем запрос если блюда для этого ресторана уже загружены
      return !dishes.fetchedRestaurants.includes(restaurantId);
    }
  }
);

export const fetchDishById = createAsyncThunk(
  'dishes/fetchDishById',
  async (dishId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/dish/${dishId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dish');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (dishId, { getState }) => {
      const { dishes } = getState();
      // Не выполняем запрос если блюдо уже есть в сторе
      return !dishes.entities[dishId];
    }
  }
); 