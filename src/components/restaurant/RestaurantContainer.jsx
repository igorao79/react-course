import { useState } from 'react';
import PropTypes from 'prop-types';
import RestaurantTabs from './RestaurantTabs';
import Restaurant from './Restaurant';

const RestaurantContainer = ({ restaurants }) => {
  const [activeRestaurantId, setActiveRestaurantId] = useState(restaurants[0]?.id);
  const activeRestaurant = restaurants.find(r => r.id === activeRestaurantId);

  return (
    <>
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
    </>
  );
};

RestaurantContainer.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default RestaurantContainer; 