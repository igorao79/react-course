import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRestaurantIds } from '../../store';
import RestaurantTabs from './RestaurantTabs';
import Restaurant from './Restaurant';

const RestaurantsPage = () => {
  const restaurantIds = useSelector(selectRestaurantIds);
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurantIds[0] || '');

  return (
    <>
      <RestaurantTabs
        restaurantIds={restaurantIds}
        activeId={activeRestaurantId}
        onTabClick={setActiveRestaurantId}
      />
      {activeRestaurantId && (
        <Restaurant 
          restaurantId={activeRestaurantId} 
          multiplier={3} 
        />
      )}
    </>
  );
};

export default RestaurantsPage; 