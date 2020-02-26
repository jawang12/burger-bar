import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

import axios from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //     console.log(error);
    //   });
  }

  updateOrderableHandler = () => {
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
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdering: false });
  };

  isOrderingHandler = () => {
    this.setState({ isOrdering: true });
  };

  render() {
    const btndDisabledStatus = { ...this.props.ingredients };
    for (let key in btndDisabledStatus) {
      btndDisabledStatus[key] = btndDisabledStatus[key] ? false : true;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    } else if (this.props.ingredients) {
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
            />
          </>
        ) : this.state.error ? (
          <p>{this.state.error.message}</p>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ ingredients, price }) => ({
  ingredients,
  price
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ingredientName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  removeIngredient: ingredientName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
