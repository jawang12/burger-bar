import React from 'react';
import PropTypes from 'prop-types';

const OrderSummary = props => {
  const listOfToppings = Object.keys(props.ingredients).map(item => (
    <li key={item}>
      <span style={{ textTransform: 'capitalize' }}>{item}</span>
      {`: ${props.ingredients[item]}`}
    </li>
  ));

  return (
    <>
      <h3>Order Summary</h3>
      <ul>{listOfToppings}</ul>
      <p>Checkout</p>
    </>
  );
};

export default OrderSummary;

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired
};
