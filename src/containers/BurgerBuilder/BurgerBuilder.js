import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';

const PRICES = {
  lettuce: 0.5,
  bacon: 1.5,
  patty: 3,
  cheese: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      patty: 0
    },
    price: 2.5
  };

  addIngredientHandler = type => {
    this.setState(prevState => {
      const price = prevState.price + PRICES[type];
      const copyOfOldState = { ...prevState };
      copyOfOldState.ingredients[type]++;

      return { price, ingredients: { ...copyOfOldState.ingredients } };
    });
  };

  removeIngredientHandler = type => {
    console.log('fire');
    this.setState(prevState => {
      if (prevState.ingredients[type] < 1) return;

      const price = prevState.price - PRICES[type];
      const copyOfOldState = Object.assign({}, { ...prevState });
      copyOfOldState.ingredients[type]--;

      return { price, ingredients: { ...copyOfOldState.ingredients } };
    });
  };

  render() {
    const btndDisabledStatus = { ...this.state.ingredients };

    for (let key in btndDisabledStatus) {
      btndDisabledStatus[key] = btndDisabledStatus[key] ? false : true;
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          disabledStatus={btndDisabledStatus}
          removeIngredient={this.removeIngredientHandler}
          addIngredient={this.addIngredientHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
