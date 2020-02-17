import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios/orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const PRICES = {
  lettuce: 0.5,
  bacon: 1.5,
  patty: 3,
  cheese: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 2.5,
    orderable: false,
    isOrdering: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error });
        console.log(error);
      });
  }

  updateOrderableHandler = () => {
    this.setState(prevState => {
      const totalPrice = Object.values(this.state.ingredients).reduce(
        (sum, currentVal) => sum + currentVal
      );
      return { orderable: totalPrice > 0 };
    });
  };

  goToCheckout = () => {
    const priceQuery = `price=${this.state.price}`;
    const queryParams = [priceQuery];

    const { ingredients } = this.state;
    for (let ingredient in ingredients) {
      queryParams.push(
        encodeURI(ingredient) + '=' + encodeURI(ingredients[ingredient])
      );
    }

    this.props.history.push({
      pathname: '/checkout',
      // state: { ingredients: this.state.ingredients }
      search: '?' + queryParams.join('&')
    });
  };

  cancelOrderHandler = () => {
    this.setState({ isOrdering: false });
  };

  isOrderingHandler = () => {
    this.setState({ isOrdering: true });
  };

  removeBackdropHandler = () => {
    this.setState({ isOrdering: false });
  };

  addIngredientHandler = type => {
    this.setState(prevState => {
      const price = prevState.price + PRICES[type];
      const copyOfOldState = { ...prevState };
      copyOfOldState.ingredients[type]++;

      return { price, ingredients: { ...copyOfOldState.ingredients } };
    });
    this.updateOrderableHandler();
  };

  removeIngredientHandler = type => {
    this.setState(prevState => {
      if (prevState.ingredients[type] < 1) return;

      const price = prevState.price - PRICES[type];
      const copyOfOldState = Object.assign({}, { ...prevState });
      copyOfOldState.ingredients[type]--;

      return { price, ingredients: { ...copyOfOldState.ingredients } };
    });
    this.updateOrderableHandler();
  };

  render() {
    const btndDisabledStatus = { ...this.state.ingredients };

    for (let key in btndDisabledStatus) {
      btndDisabledStatus[key] = btndDisabledStatus[key] ? false : true;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    } else if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          onClickCancel={this.cancelOrderHandler}
          onClickSuccess={this.goToCheckout}
          price={this.state.price}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.isOrdering}
          onRemoveBackdrop={this.removeBackdropHandler}
        >
          {orderSummary}
        </Modal>
        {this.state.ingredients ? (
          <>
            <Burger ingredients={this.state.ingredients} />
            <BurgerControls
              disabledStatus={btndDisabledStatus}
              removeIngredient={this.removeIngredientHandler}
              addIngredient={this.addIngredientHandler}
              price={this.state.price}
              isOrderable={this.state.orderable}
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

export default withErrorHandler(BurgerBuilder, axios);
