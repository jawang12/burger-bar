import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 1,
      bacon: 2,
      cheese: 2,
      patty: 1
    }
  };

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </>
    );
  }
}

export default BurgerBuilder;
