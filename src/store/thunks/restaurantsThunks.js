import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';
import { selectRestaurantById } from '../slices/restaurantsSlice';

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
  },
  {
    condition: (_, { getState }) => {
      const { restaurants } = getState();
      // Не выполняем запрос если рестораны уже загружены или идёт загрузка
      return restaurants.status === 'idle';
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
  },
  {
    condition: (restaurantId, { getState }) => {
      const state = getState();
      // Не выполняем запрос если ресторан уже есть в сторе
      return !selectRestaurantById(state, restaurantId);
    }
  }
); 