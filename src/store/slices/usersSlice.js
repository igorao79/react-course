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

export default usersSlice.reducer; 