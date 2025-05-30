import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RestaurantTabs.module.css';

const RestaurantTabs = ({ restaurants, activeId, onTabClick }) => {
  if (!restaurants || restaurants.length === 0) return null;
  
  return (
    <div className={styles.tabs}>
      {restaurants.map((r) => (
        <button
          key={r.id}
          className={classNames(styles.tab, {
            [styles.active]: r.id === activeId
          })}
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