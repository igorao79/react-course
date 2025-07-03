'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { UserProvider } from '../src/contexts/UserContext';
import { CartProvider } from '../src/contexts/CartContext';
import { store } from '../src/store';

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