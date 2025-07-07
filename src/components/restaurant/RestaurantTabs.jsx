import PropTypes from 'prop-types';
import TabLink from './TabLink';
import styles from './RestaurantLayout.module.css';

const RestaurantTabs = ({ restaurantId }) => {
  return (
    <div className={styles.tabs}>
      <TabLink href={`/restaurants/${restaurantId}/menu`}>
        Menu
      </TabLink>
      <TabLink href={`/restaurants/${restaurantId}/reviews`}>
        Reviews
      </TabLink>
    </div>
  );
};

RestaurantTabs.propTypes = {
  restaurantId: PropTypes.string.isRequired
};

export default RestaurantTabs; 