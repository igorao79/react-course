import { useState } from 'react';
import { restaurants } from './mock';
import Layout from './components/layout/Layout';
import RestaurantContainer from './components/restaurant/RestaurantContainer';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import './reset.css';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <Layout>
            <RestaurantContainer restaurants={restaurants} />
          </Layout>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
