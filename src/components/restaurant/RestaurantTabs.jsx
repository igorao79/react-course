import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RestaurantLayout.module.css';

const RestaurantTabs = ({ restaurantId }) => {
  return (
    <div className={styles.tabs}>
      <NavLink
        to={`/restaurants/${restaurantId}/menu`}
        className={({ isActive }) => 
          classNames(styles.tab, { [styles.activeTab]: isActive })
        }
      >
        Menu
      </NavLink>
      <NavLink
        to={`/restaurants/${restaurantId}/reviews`}
        className={({ isActive }) => 
          classNames(styles.tab, { [styles.activeTab]: isActive })
        }
      >
        Reviews
      </NavLink>
    </div>
  );
};

RestaurantTabs.propTypes = {
  restaurantId: PropTypes.string.isRequired
};

export default RestaurantTabs; 