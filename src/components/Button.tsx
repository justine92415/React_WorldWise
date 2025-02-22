import { ButtonProps } from '../types';
import styles from './Button.module.css';

function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {' '}
      {children}{' '}
    </button>
  );
}

export default Button;
