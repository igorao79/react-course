import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RestaurantTabs from './RestaurantTabs';
import Restaurant from './Restaurant';
import { selectRestaurantById } from '../../store';

const RestaurantContainer = ({ restaurantIds }) => {
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

RestaurantContainer.propTypes = {
  restaurantIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RestaurantContainer; 