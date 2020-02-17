import React, { Component } from 'react';
import ReviewOrder from '../../components/ReviewOrder/ReviewOrder';
import { Route } from 'react-router-dom';
import CustomerInfo from './CustomerInfo/CustomerInfo';

export default class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0
  };

  componentDidMount() {
    const queryIterator = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of queryIterator) {
      if (param[0] !== 'price') {
        ingredients[param[0]] = param[1];
      }
    }
    const price = +queryIterator.get('price');
    this.setState({ ingredients, price });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/customer-info');
  };
  render() {
    return (
      <div>
        <ReviewOrder
          onCancelCheckout={this.cancelCheckoutHandler}
          onContinueCheckout={this.continueCheckoutHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.url + '/customer-info'}
          render={props => (
            <CustomerInfo
              {...props}
              price={this.state.price}
              ingredients={this.state.ingredients}
            />
          )}
        />
      </div>
    );
  }
}
