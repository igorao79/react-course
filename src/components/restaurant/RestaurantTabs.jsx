import PropTypes from 'prop-types';

const RestaurantTabs = ({ restaurants, activeId, onTabClick }) => {
  if (!restaurants || restaurants.length === 0) return null;
  return (
    <div className="restaurant-tabs">
      {restaurants.map((r) => (
        <button
          key={r.id}
          className={r.id === activeId ? 'tab active' : 'tab'}
          onClick={() => onTabClick(r.id)}
        >
          {r.name}
        </button>
      ))}
    </div>
  );
};

RestaurantTabs.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  activeId: PropTypes.string,
  onTabClick: PropTypes.func.isRequired
};

export default RestaurantTabs; 