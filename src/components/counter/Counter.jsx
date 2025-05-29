import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Counter.module.css';

const Counter = ({ value, increment, decrement, min, max }) => {
  return (
    <div className={styles.counter}>
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