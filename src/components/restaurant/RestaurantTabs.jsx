import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import RestaurantTab from './RestaurantTab';
import styles from './RestaurantTabs.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantTabs = ({ restaurantIds, activeId, onTabClick }) => {
  if (!restaurantIds || restaurantIds.length === 0) return null;
  
  const { theme } = useTheme();
  
  return (
    <div className={classNames(styles.tabs, themeStyles[theme])}>
      {restaurantIds.map((id) => (
        <RestaurantTab 
          key={id}
          id={id}
          isActive={id === activeId}
          onClick={onTabClick}
        />
      ))}
    </div>
  );
};

RestaurantTabs.propTypes = {
  restaurantIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeId: PropTypes.string,
  onTabClick: PropTypes.func.isRequired
};

export default RestaurantTabs; 