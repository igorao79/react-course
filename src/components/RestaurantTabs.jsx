import React from 'react';

function RestaurantTabs({ restaurants, activeRestaurantId, onSelectRestaurant }) {
  return (
    <div className="restaurant-tabs">
      {restaurants.map(restaurant => (
        <button
          key={restaurant.id}
          className={`tab-button ${restaurant.id === activeRestaurantId ? 'active' : ''}`}
          onClick={() => onSelectRestaurant(restaurant.id)}
        >
          {restaurant.name}
        </button>
      ))}
    </div>
  );
}

export default RestaurantTabs; 