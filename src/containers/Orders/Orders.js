import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios/orders';
import { thunkFetchOrders } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
  componentDidMount() {
    this.props.thunkFetchOrders(this.props.idToken, this.props.userId);
  }

  render() {
    const orders = this.props.loading ? (
      <Spinner />
    ) : (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
    return orders;
  }
}

const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  loading: orders.loading,
  idToken: auth.idToken,
  userId: auth.userId
});

const mapDispatchToProps = dispatch => ({
  thunkFetchOrders: (idToken, userId) =>
    dispatch(thunkFetchOrders(idToken, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
