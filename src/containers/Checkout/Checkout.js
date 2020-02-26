import React, { Component } from 'react';
import ReviewOrder from '../../components/Order/ReviewOrder/ReviewOrder';
import { Route } from 'react-router-dom';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import { connect } from 'react-redux';

class Checkout extends Component {
  componentDidMount() {
    // const queryIterator = new URLSearchParams(this.props.location.search);
    // const ingredients = {};
    // for (let param of queryIterator) {
    //   if (param[0] !== 'price') {
    //     ingredients[param[0]] = param[1];
    //   }
    // }
    // const price = +queryIterator.get('price');
    // this.setState({ ingredients, price });
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
          ingredients={this.props.ingredients}
        />
        <Route
          path={this.props.match.url + '/customer-info'}
          component={CustomerInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients
});

export default connect(mapStateToProps)(Checkout);
