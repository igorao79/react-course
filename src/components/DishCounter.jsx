import React, { useState } from 'react';

function DishCounter({ dish }) {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };
  
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  
  return (
    <div className="dish-counter">
      <span>{dish.name}</span>
      <div className="counter-controls">
        <button 
          onClick={decrement}
          disabled={count === 0}
        >
          -
        </button>
        <span className="count">{count}</span>
        <button 
          onClick={increment}
          disabled={count === 5}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default DishCounter; 