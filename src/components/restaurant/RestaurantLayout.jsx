import PropTypes from 'prop-types';
import RestaurantHeader from './RestaurantHeader';
import RestaurantTabs from './RestaurantTabs';
import styles from './RestaurantLayout.module.css';

const RestaurantLayout = ({ restaurantId, children }) => {
  return (
    <div className={styles.restaurantLayout}>
      <RestaurantHeader restaurantId={restaurantId} />
      <RestaurantTabs restaurantId={restaurantId} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

RestaurantLayout.propTypes = {
  restaurantId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RestaurantLayout; 