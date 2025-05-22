import { useState } from 'react'
import { restaurants } from './mock.js'
import './App.css'
import Layout from './components/Layout'
import RestaurantTabs from './components/RestaurantTabs'
import Restaurant from './components/Restaurant'

function App() {
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurants[0].id);
  
  const handleSelectRestaurant = (id) => {
    setActiveRestaurantId(id);
  };
  
  const activeRestaurant = restaurants.find(restaurant => restaurant.id === activeRestaurantId);

  return (
    <Layout>
      <RestaurantTabs 
        restaurants={restaurants} 
        activeRestaurantId={activeRestaurantId} 
        onSelectRestaurant={handleSelectRestaurant} 
      />
      {activeRestaurant && <Restaurant restaurant={activeRestaurant} />}
    </Layout>
  )
}

export default App
