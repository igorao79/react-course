import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import RestaurantsPage from './components/restaurant/RestaurantsPage';
import RestaurantLayout from './components/restaurant/RestaurantLayout';
import Restaurant from './components/restaurant/Restaurant';
import DishPage from './components/dish/DishPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import './reset.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurants" element={<RestaurantsPage />} />
                <Route path="/restaurants/:restaurantId" element={<RestaurantLayout />}>
                  <Route index element={<Navigate to="menu" replace />} />
                  <Route path="menu" element={<Restaurant type="menu" />} />
                  <Route path="reviews" element={<Restaurant type="reviews" />} />
                </Route>
                <Route path="/dish/:dishId" element={<DishPage />} />
              </Routes>
            </Layout>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
