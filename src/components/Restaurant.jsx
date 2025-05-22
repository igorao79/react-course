import React from 'react';
import Menu from './Menu';
import Reviews from './Reviews';

function Restaurant({ restaurant }) {
  return (
    <div className="restaurant">
      <h2>{restaurant.name}</h2>
      <Menu dishes={restaurant.menu} />
      <Reviews reviews={restaurant.reviews} />
    </div>
  );
}

export default Restaurant; 