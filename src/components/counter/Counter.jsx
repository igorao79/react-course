import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import styles from './Counter.module.css';
import themeStyles from '../../styles/theme.module.css';

const Counter = ({ value, increment, decrement, min, max }) => {
  const { theme } = useTheme();
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className={classNames(
      styles.counter, 
      themeStyles[theme]
    )}>
      <button 
        onClick={decrement}
        disabled={value <= min}
        className={classNames(styles.button, styles.decrementButton, {
          [styles.disabled]: value <= min
        })}
      >
        −
      </button>
      <span className={styles.value}>{value}</span>
      <button 
        onClick={increment}
        disabled={value >= max}
        className={classNames(styles.button, styles.incrementButton, {
          [styles.disabled]: value >= max
        })}
      >
        +
      </button>
    </div>
  );
};

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number
};

export default Counter; 