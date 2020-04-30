import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

import axios from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false
  };

  componentDidMount() {
    this.props.thunkSetIngredients();
  }

  updateOrderableHandler = () => {
    if (!this.props.ingredients) return false;

    const totalPrice = Object.values(this.props.ingredients).reduce(
      (sum, currentVal) => sum + currentVal
    );

    return totalPrice > 0;
  };

  goToCheckout = () => {
    // const priceQuery = `price=${this.state.price}`;
    // const queryParams = [priceQuery];
    // const { ingredients } = this.state;
    // for (let ingredient in ingredients) {
    //   queryParams.push(
    //     encodeURI(ingredient) + '=' + encodeURI(ingredients[ingredient])
    //   );
    // }

    this.props.history.push({
      pathname: '/checkout'
      // state: { ingredients: this.state.ingredients }
      // search: '?' + queryParams.join('&')
    });
    this.props.initOrder();
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdering: false });
  };

  isOrderingHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ isOrdering: true });
    } else {
      this.props.history.push('/login');
      this.props.initOrder();
    }
  };

  render() {
    const btndDisabledStatus = { ...this.props.ingredients };
    for (let key in btndDisabledStatus) {
      btndDisabledStatus[key] = btndDisabledStatus[key] ? false : true;
    }
    let orderSummary = null;
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          onClickCancel={this.cancelOrderHandler}
          onClickSuccess={this.goToCheckout}
          price={this.props.price}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.isOrdering}
          onRemoveBackdrop={this.cancelOrderHandler}
        >
          {orderSummary}
        </Modal>
        {this.props.ingredients ? (
          <>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              disabledStatus={btndDisabledStatus}
              removeIngredient={this.props.removeIngredient}
              addIngredient={this.props.addIngredient}
              price={this.props.price}
              isOrderable={this.updateOrderableHandler()}
              isOrdering={this.isOrderingHandler}
              isAuthenticated={this.props.isAuthenticated}
            />
          </>
        ) : this.props.error ? (
          <p>{this.props.error.message}</p>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ burgerBuilder, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  price: burgerBuilder.price,
  error: burgerBuilder.error,
  isAuthenticated: auth.idToken && true
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ingredientName =>
    dispatch(actions.addIngredient(ingredientName)),
  removeIngredient: ingredientName =>
    dispatch(actions.removeIngredient(ingredientName)),
  thunkSetIngredients: () => dispatch(actions.thunkSetIngredients()),
  initOrder: () => dispatch(actions.initOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
