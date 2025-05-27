import PropTypes from 'prop-types';
import DishCounter from './DishCounter';

const Dish = ({ dish }) => {
  if (!dish) return null;
  return (
    <div className="dish">
      <span>{dish.name}</span>
      <span>${dish.price}</span>
      <div className="ingredients">
        [{dish.ingredients.join(', ')}]
      </div>
      <DishCounter />
    </div>
  );
};

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
  })
};

export default Dish; 