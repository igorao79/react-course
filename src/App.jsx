import Layout from './components/layout/Layout';
import RestaurantsPage from './components/restaurant/RestaurantsPage';
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
            <RestaurantsPage />
          </Layout>
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
