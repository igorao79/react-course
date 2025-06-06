import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { selectRestaurantById } from '../../store';
import styles from './RestaurantTabs.module.css';

const RestaurantTab = ({ id, isActive, onClick }) => {
  const restaurant = useSelector(state => selectRestaurantById(state, id));
  
  if (!restaurant) return null;
  
  return (
    <button
      className={classNames(styles.tab, {
        [styles.active]: isActive
      })}
      onClick={() => onClick(id)}
    >
      {restaurant.name}
    </button>
  );
};

RestaurantTab.propTypes = {
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RestaurantTab; 