import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const Burger = props => {
  const ingredientsList = composeIngredients(props);

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="top-bun" />
      {ingredientsList}
      <BurgerIngredients type="bottom-bun" />
    </div>
  );
};

function composeIngredients(props) {
  const ingredientsList = [];
  const copyOfIngredients = Object.assign({}, { ...props.ingredients });
  const ingredients = Object.keys(copyOfIngredients);
  let currentType = ingredients[0];
  let keyIndex = 0;

  while (ingredients.length) {
    let quantity = copyOfIngredients[currentType]; // holds a ref to only the value of the property
    copyOfIngredients[currentType]--; // will actaully change the value in the object
    quantity--; // the value of the var is only changing and will not alter the value in the obj
    // solely for demonstrative purposes (pass by value vs pass by reference)
    ingredientsList.push(
      <BurgerIngredients type={currentType} key={currentType + keyIndex++} />
    );
    if (!quantity) {
      ingredients.shift();
      currentType = ingredients[0];
    }
  }
  return ingredientsList;
}

export default Burger;
