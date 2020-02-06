import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {
    label: 'Lettuce',
    type: 'lettuce'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Patty',
    type: 'patty'
  }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.type}
          label={control.label}
          onRemoveIngredient={() => props.removeIngredient(control.type)}
          onAddIngredient={() => props.addIngredient(control.type)}
          disabledStatus={props.disabledStatus[control.type]}
        />
      ))}
      <button disabled={!props.isOrderable} className={classes.OrderButton}>
        Place Order
      </button>
    </div>
  );
};

export default BuildControls;

BuildControls.propTypes = {
  removeIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  disabledStatus: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  isOrderable: PropTypes.bool.isRequired
};
