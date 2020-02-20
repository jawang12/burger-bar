import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  let inputElement = null;
  const styles = [classes.InputElement];

  if (props.touched && props.invalid) {
    styles.push(classes.Invalid);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          onChange={props.onInputChange}
          className={styles.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          onChange={props.onInputChange}
          className={styles.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={props.value}
          className={styles.join(' ')}
          onChange={props.onInputChange}
        >
          {props.elementConfig.options.map((option, i) => (
            <option key={option.value + i} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.onInputChange}
          className={styles.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
