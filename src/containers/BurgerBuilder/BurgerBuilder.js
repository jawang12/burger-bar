import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios/orders';

const PRICES = {
  lettuce: 0.5,
  bacon: 1.5,
  patty: 3,
  cheese: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      patty: 0
    },
    price: 2.5,
    orderable: false,
    isOrdering: false,
    loading: false
  };

  updateOrderableHandler = () => {
    this.setState(prevState => {
      const totalPrice = Object.values(this.state.ingredients).reduce(
        (sum, currentVal) => sum + currentVal
      );
      return { orderable: totalPrice > 0 };
    });
  };

  goToCheckout = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.price,
        customer: {
          name: 'James Bond',
          address: {
            street: 'Main St',
            city: 'London',
            country: 'UK'
          },
          email: '007@mi6.com'
        },
        priority: 'fastest'
      };
      axios
        .post('/orders.json', order)
        .then(res => {
          this.setState({ loading: false, isOrdering: false });
          console.log('success', res);
        })
        .catch(err => {
          this.setState({ loading: false, isOrdering: false });
          console.error(err);
        });
    }, 3000);
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.price,
    //   customer: {
    //     name: 'James Bond',
    //     address: {
    //       street: 'Main St',
    //       city: 'London',
    //       country: 'UK'
    //     },
    //     email: '007@mi6.com'
    //   },
    //   priority: 'fastest'
    // };
    // axios
    //   .post('/orders.json', order)
    //   .then(res => {
    //     this.setState({ loading: false, isOrdering: false });
    //     console.log('success', res);
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false, isOrdering: false });
    //     console.error(err);
    //   });
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
    return (
      <>
        <Modal
          show={this.state.isOrdering}
          onRemoveBackdrop={this.removeBackdropHandler}
        >
          {this.state.loading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              onClickCancel={this.cancelOrderHandler}
              onClickSuccess={this.goToCheckout}
              price={this.state.price}
            />
          )}
        </Modal>
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
    );
  }
}

export default BurgerBuilder;
