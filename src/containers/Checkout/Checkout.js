import React from 'react';
import ReviewOrder from '../../components/Order/ReviewOrder/ReviewOrder';
import { Route, Redirect, withRouter } from 'react-router-dom';
import CustomerInfo from './CustomerInfo/CustomerInfo';
import { connect } from 'react-redux';

const Checkout = (props) => {
  // componentDidMount() {
  //   const queryIterator = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   for (let param of queryIterator) {
  //     if (param[0] !== 'price') {
  //       ingredients[param[0]] = param[1];
  //     }
  //   }
  //   const price = +queryIterator.get('price');
  //   this.setState({ ingredients, price });
  // }

  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };
  const continueCheckoutHandler = () => {
    props.history.replace('/checkout/customer-info');
  };

  const reviewOrder =
    !props.ingredients || !props.ordering ? (
      <Redirect to="/" />
    ) : (
      <div>
        <ReviewOrder
          onCancelCheckout={cancelCheckoutHandler}
          onContinueCheckout={continueCheckoutHandler}
          ingredients={props.ingredients}
        />
        <Route
          path={props.match.url + '/customer-info'}
          component={CustomerInfo}
        />
      </div>
    );
  return reviewOrder;
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  ordering: state.orders.ordering
});

export default withRouter(connect(mapStateToProps)(Checkout));
