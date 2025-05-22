import React from 'react';
import DishCounter from './DishCounter';

function Menu({ dishes }) {
  return (
    <div className="menu">
      <h3>Меню</h3>
      <ul>
        {dishes.map(dish => (
          <li key={dish.id}>
            <DishCounter dish={dish} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu; 