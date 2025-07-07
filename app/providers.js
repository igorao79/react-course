'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@contexts/ThemeContext';
import { UserProvider } from '@contexts/UserContext';
import { CartProvider } from '@contexts/CartContext';
import { store } from '@store';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
} 