import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

import axios from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

const BurgerBuilder = (props) => {
  const [isOrdering, setOrdering] = useState(false);
  const { thunkSetIngredients } = props;

  useEffect(() => {
    thunkSetIngredients();
  }, [thunkSetIngredients]);

  const updateOrderableHandler = () => {
    if (!props.ingredients) return false;

    const totalPrice = Object.values(props.ingredients).reduce(
      (sum, currentVal) => sum + currentVal
    );

    return totalPrice > 0;
  };

  const goToCheckout = () => {
    // const priceQuery = `price=${this.state.price}`;
    // const queryParams = [priceQuery];
    // const { ingredients } = this.state;
    // for (let ingredient in ingredients) {
    //   queryParams.push(
    //     encodeURI(ingredient) + '=' + encodeURI(ingredients[ingredient])
    //   );
    // }

    props.history.push({
      pathname: '/checkout'
      // state: { ingredients: this.state.ingredients }
      // search: '?' + queryParams.join('&')
    });
    props.initOrder();
  };

  const cancelOrderHandler = () => {
    setOrdering(false);
  };

  const isOrderingHandler = () => {
    if (props.isAuthenticated) {
      setOrdering(true);
    } else {
      props.history.push('/login');
      props.initOrder();
    }
  };

  const btndDisabledStatus = { ...props.ingredients };
  for (let key in btndDisabledStatus) {
    // check if current value is 0 (falsy), then replace that value with true to disable
    btndDisabledStatus[key] = btndDisabledStatus[key] ? false : true;
  }
  let orderSummary = null;
  if (props.ingredients) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        onClickCancel={cancelOrderHandler}
        onClickSuccess={goToCheckout}
        price={props.price}
      />
    );
  }

  return (
    <>
      <Modal show={isOrdering} onRemoveBackdrop={cancelOrderHandler}>
        {orderSummary}
      </Modal>
      {props.ingredients ? (
        <>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            disabledStatus={btndDisabledStatus}
            removeIngredient={props.removeIngredient}
            addIngredient={props.addIngredient}
            price={props.price}
            isOrderable={updateOrderableHandler()}
            isOrdering={isOrderingHandler}
            isAuthenticated={props.isAuthenticated}
          />
        </>
      ) : props.error ? (
        <p>{props.error.message}</p>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const mapStateToProps = ({ burgerBuilder, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  price: burgerBuilder.price,
  error: burgerBuilder.error,
  isAuthenticated: auth.idToken && true
});

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredientName) =>
    dispatch(actions.addIngredient(ingredientName)),
  removeIngredient: (ingredientName) =>
    dispatch(actions.removeIngredient(ingredientName)),
  thunkSetIngredients: () => dispatch(actions.thunkSetIngredients()),
  initOrder: () => dispatch(actions.initOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
