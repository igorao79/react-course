import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalCount: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const currentCount = state.items[id] || 0;
      
      state.items[id] = currentCount + 1;
      state.totalCount += 1;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const currentCount = state.items[id] || 0;
      
      if (currentCount > 0) {
        state.items[id] = currentCount - 1;
        state.totalCount -= 1;
        
        if (state.items[id] === 0) {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalCount = 0;
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state, id) => state.cart.items[id] || 0;
export const selectTotalCount = (state) => state.cart.totalCount;

export default cartSlice.reducer; 