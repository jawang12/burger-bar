import React, { Component } from 'react';
import ReviewOrder from '../../components/ReviewOrder/ReviewOrder';

export default class Checkout extends Component {
  state = {
    ingredients: {
      lettuce: 1,
      meat: 1,
      cheese: 1,
      patty: 1
    }
  };
  render() {
    return (
      <div>
        <ReviewOrder ingredients={this.state.ingredients} />
      </div>
    );
  }
}
