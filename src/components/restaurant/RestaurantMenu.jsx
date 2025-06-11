import PropTypes from 'prop-types';
import Dish from '../dish/Dish';
import styles from './Restaurant.module.css';

const RestaurantMenu = ({ menuIds, title }) => {
  return (
    <div className={styles.menu}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      
      {menuIds.length > 0 ? (
        <div className={styles.dishGrid}>
          {menuIds.map((dishId) => (
            <Dish key={dishId} dishId={dishId} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>No dishes available</p>
      )}
    </div>
  );
};

RestaurantMenu.propTypes = {
  menuIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string
};

export default RestaurantMenu; 