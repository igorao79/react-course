import { createSlice } from '@reduxjs/toolkit';
import { normalizedUsers } from '../normalized-mock';

const initialState = {
  entities: normalizedUsers,
  ids: normalizedUsers.map(user => user.id),
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Add reducers if needed for future functionality
  },
});

// Selectors
export const selectUsers = (state) => state.users.entities;
export const selectUserIds = (state) => state.users.ids;
export const selectUserById = (state, id) => 
  state.users.entities.find(user => user.id === id);

export default usersSlice.reducer; 