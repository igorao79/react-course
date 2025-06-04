import { useSelector } from 'react-redux';
import { selectRestaurants } from './store';
import Layout from './components/layout/Layout';
import RestaurantContainer from './components/restaurant/RestaurantContainer';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import './reset.css';

function App() {
  const restaurants = useSelector(selectRestaurants);
  
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
