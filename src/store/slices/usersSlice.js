import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { fetchUsers } from '../thunks/usersThunks';

// Создаем entity adapter для пользователей
const usersAdapter = createEntityAdapter();

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