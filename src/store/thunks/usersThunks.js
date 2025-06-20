import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../constants';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState();
      // Не выполняем запрос если пользователи уже загружены
      return !users.isFetched;
    }
  }
); 