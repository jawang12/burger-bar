import React, { Component } from 'react';
import ReviewOrder from '../../components/Order/ReviewOrder/ReviewOrder';
import { Route, Redirect } from 'react-router-dom';
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
    const reviewOrder =
      !this.props.ingredients || !this.props.ordering ? (
        <Redirect to="/" />
      ) : (
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
    return reviewOrder;
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  ordering: state.orders.ordering
});

export default connect(mapStateToProps)(Checkout);
