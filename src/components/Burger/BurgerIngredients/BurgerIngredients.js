import React from 'react';
import classes from './BurgerIngredients.module.css';

import PropTypes from 'prop-types';

const BurgerIngredients = props => {
  let ingredient;

  switch (props.type) {
    case 'bottom-bun':
      ingredient = <div className={classes.BottomBun}></div>;
      break;
    case 'top-bun':
      ingredient = (
        <div className={classes.TopBun}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case 'patty':
      ingredient = <div className={classes.Patty}></div>;
      break;
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case 'lettuce':
      ingredient = <div className={classes.Lettuce}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurgerIngredients.propTypes = {
  type: PropTypes.string
};

export default BurgerIngredients;
