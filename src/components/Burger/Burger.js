import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

import { composeIngredients } from './util/composeIngredients';

const Burger = props => {
  const ingredientsList = composeIngredients(props);

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="top-bun" />
      {ingredientsList.length ? (
        ingredientsList
      ) : (
        <p>Please select your toppings!</p>
      )}
      <BurgerIngredients type="bottom-bun" />
    </div>
  );
};

export default Burger;
