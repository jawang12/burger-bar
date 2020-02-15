import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const listOfToppings = Object.keys(this.props.ingredients).map(item => (
      <li key={item} style={{ listStyle: 'none', margin: '5px 0' }}>
        <span style={{ textTransform: 'capitalize' }}>{item}</span>
        {`: ${this.props.ingredients[item]}`}
      </li>
    ));

    return (
      <>
        <h3>Order Summary</h3>
        <ul style={{ padding: 0 }}>{listOfToppings}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <Button click={this.props.onClickCancel} btnType="Danger">
          Cancel
        </Button>
        <Button click={this.props.onClickSuccess} btnType="Success">
          Checkout
        </Button>
      </>
    );
  }
}

export default OrderSummary;

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  onClickSuccess: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};
