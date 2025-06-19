import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS, API_URL } from '../constants';

// Создаем entity adapter для пользователей
const usersAdapter = createEntityAdapter();

// Async thunks для API вызовов
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue, getState }) => {
    // Проверяем, есть ли уже пользователи в сторе
    const usersState = getState().users;
    if (usersState.isFetched) {
      return usersState.ids.map(id => usersState.entities[id]); // Возвращаем существующих пользователей
    }

    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = usersAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
  isFetched: false, // Флаг для отслеживания, загружены ли пользователи
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка пользователей
      .addCase(fetchUsers.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.isFetched = true;
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
  },
});

export const { clearError } = usersSlice.actions;

// Селекторы
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUsersEntities,
  selectTotal: selectUsersTotal,
} = usersAdapter.getSelectors((state) => state.users);

// Дополнительные селекторы
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
export const selectAreUsersFetched = (state) => state.users.isFetched;

export default usersSlice.reducer; 