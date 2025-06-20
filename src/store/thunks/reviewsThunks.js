import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';

export const fetchReviewsByRestaurantId = createAsyncThunk(
  'reviews/fetchReviewsByRestaurantId',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reviews?restaurantId=${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (restaurantId, { getState }) => {
      const { reviews } = getState();
      // Не выполняем запрос если отзывы для этого ресторана уже загружены
      return !reviews.fetchedRestaurants.includes(restaurantId);
    }
  }
); 