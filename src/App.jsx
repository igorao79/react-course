import { useState } from 'react';
import { restaurants } from './mock';
import Layout from './components/layout/Layout';
import Restaurant from './components/restaurant/Restaurant';
import RestaurantTabs from './components/restaurant/RestaurantTabs';
import './reset.css';

function App() {
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurants[0]?.id);
  const activeRestaurant = restaurants.find(r => r.id === activeRestaurantId);

  return (
    <Layout>
      <RestaurantTabs
        restaurants={restaurants}
        activeId={activeRestaurantId}
        onTabClick={setActiveRestaurantId}
      />
      {activeRestaurant && (
        <Restaurant 
          restaurant={activeRestaurant} 
          multiplier={3} 
        />
      )}
    </Layout>
  );
}

export default App;
