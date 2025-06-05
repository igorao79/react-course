import { useSelector } from 'react-redux';
import { selectRestaurantIds } from './store';
import Layout from './components/layout/Layout';
import RestaurantContainer from './components/restaurant/RestaurantContainer';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import './reset.css';

function App() {
  const restaurantIds = useSelector(selectRestaurantIds);
  
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          <Layout>
            <RestaurantContainer restaurantIds={restaurantIds} />
          </Layout>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
