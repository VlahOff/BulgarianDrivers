import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const input = `${styles.input} ${props.error === false ? styles.error : ''}`;

  return (
    <div className={styles['input-wrapper']}>
      {props.label && (
        <label className={styles.label} htmlFor={props.input.id}>
          {props.label}
        </label>
      )}
      <input className={input} ref={ref} {...props.input} />
      {props.error === false ? <>{props.errorMessage}</> : ''}
    </div>
  );
});

export default Input;
