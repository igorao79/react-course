import { useState } from 'react';
import { restaurants } from './mock';
import Restaurant from './components/restaurant/Restaurant';
import RestaurantTabs from './components/restaurant/RestaurantTabs';

function App() {
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurants[0]?.id);
  const activeRestaurant = restaurants.find(r => r.id === activeRestaurantId);

  return (
    <div className="app">
      <h1>Restaurant Review App</h1>
      <RestaurantTabs
        restaurants={restaurants}
        activeId={activeRestaurantId}
        onTabClick={setActiveRestaurantId}
      />
      {activeRestaurant && <Restaurant restaurant={activeRestaurant} />}
    </div>
  );
}

export default App;
