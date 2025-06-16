import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './RestaurantLayout.module.css';

const TabLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        classNames(styles.tab, { [styles.activeTab]: isActive })
      }
    >
      {children}
    </NavLink>
  );
};

TabLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default TabLink; 