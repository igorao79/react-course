import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './RestaurantTabs.module.css';
import themeStyles from '../../styles/theme.module.css';

const RestaurantTabs = ({ restaurants, activeId, onTabClick }) => {
  if (!restaurants || restaurants.length === 0) return null;
  
  const { theme } = useTheme();
  
  return (
    <div className={classNames(styles.tabs, themeStyles[theme])}>
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