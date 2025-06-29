import PropTypes from 'prop-types';
import Dish from '../dish/Dish';
import styles from './Restaurant.module.css';

const RestaurantMenu = ({ dishes, title }) => {
  return (
    <div className={styles.menu}>
      {title && <h3 className={styles.sectionTitle}>{title}</h3>}
      
      {dishes.length > 0 ? (
        <div className={styles.dishGrid}>
          {dishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>No dishes available</p>
      )}
    </div>
  );
};

RestaurantMenu.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
  })).isRequired,
  title: PropTypes.string
};

export default RestaurantMenu; 