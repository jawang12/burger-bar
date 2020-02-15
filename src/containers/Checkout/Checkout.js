import React, { Component } from 'react';
import ReviewOrder from '../../components/ReviewOrder/ReviewOrder';

export default class Checkout extends Component {
  state = {
    ingredients: null
  };

  componentDidMount() {
    const queryIterator = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of queryIterator) {
      ingredients[param[0]] = param[1];
    }
    this.setState({ ingredients });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/order-info');
  };
  render() {
    return (
      <div>
        <ReviewOrder
          onCancelCheckout={this.cancelCheckoutHandler}
          onContinueCheckout={this.continueCheckoutHandler}
          ingredients={this.state.ingredients}
        />
      </div>
    );
  }
}
