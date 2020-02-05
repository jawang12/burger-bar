import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        onClick={props.onRemoveIngredient}
        disabled={props.disabledStatus}
        className={classes.Remove}
      >
        Remove
      </button>
      <button onClick={props.onAddIngredient} className={classes.Add}>
        Add
      </button>
    </div>
  );
};

export default BuildControl;

BuildControl.propTypes = {
  disabledStatus: PropTypes.bool.isRequired,
  onAddIngredient: PropTypes.func.isRequired,
  onRemoveIngredient: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
