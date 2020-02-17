import React from 'react';
import classes from './Order.module.css';

const Order = props => {
  const ingredientsArr = [];
  for (let ingredient in props.ingredients) {
    ingredientsArr.push({
      name: ingredient,
      amount: props.ingredients[ingredient]
    });
  }

  return (
    <div className={classes.Order}>
      <p>
        Ingredients:{' '}
        {ingredientsArr.map(ingredient => (
          <span key={ingredient.name}>
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>

      <p>
        Price: $<strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
