import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { selectRestaurantById } from '../../store';
import styles from './RestaurantTabs.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantTabs = ({ restaurantIds, activeId, onTabClick }) => {
  if (!restaurantIds || restaurantIds.length === 0) return null;
  
  const { theme } = useTheme();
  
  return (
    <div className={classNames(styles.tabs, themeStyles[theme])}>
      {restaurantIds.map((id) => {
        const restaurant = useSelector(state => selectRestaurantById(state, id));
        if (!restaurant) return null;
        
        return (
          <button
            key={id}
            className={classNames(styles.tab, {
              [styles.active]: id === activeId
            })}
            onClick={() => onTabClick(id)}
          >
            {restaurant.name}
          </button>
        );
      })}
    </div>
  );
};

RestaurantTabs.propTypes = {
  restaurantIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeId: PropTypes.string,
  onTabClick: PropTypes.func.isRequired
};

export default RestaurantTabs; 