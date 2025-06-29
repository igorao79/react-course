import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // { dishId: { dish: {...}, quantity: number } }
  totalCount: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { dish } = action.payload; // Теперь ожидаем полные данные о блюде
      const id = dish.id;
      
      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = {
          dish,
          quantity: 1
        };
      }
      
      state.totalCount += 1;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      
      if (state.items[id] && state.items[id].quantity > 0) {
        state.items[id].quantity -= 1;
        state.totalCount -= 1;
        
        if (state.items[id].quantity === 0) {
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
export const selectCartItemCount = (state, id) => state.cart.items[id]?.quantity || 0;
export const selectTotalCount = (state) => state.cart.totalCount;

// Новый селектор для расчета общей стоимости
export const selectTotalPrice = (state) => {
  return Object.values(state.cart.items).reduce((total, item) => {
    return total + (item.dish.price * item.quantity);
  }, 0);
};

export default cartSlice.reducer; 