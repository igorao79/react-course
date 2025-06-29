import { useState } from 'react';
import PropTypes from 'prop-types';
import RestaurantTabs from './RestaurantTabs';
// import Restaurant from './Restaurant'; // Компонент не найден, временно отключен

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
        <div>
          {/* Компонент Restaurant временно отключен - файл не найден */}
          <p>Restaurant {activeRestaurantId}</p>
        </div>
      )}
    </>
  );
};

RestaurantContainer.propTypes = {
  restaurantIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RestaurantContainer; 