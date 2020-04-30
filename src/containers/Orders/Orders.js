import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios/orders';
import { thunkFetchOrders } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = ({
  thunkFetchOrders,
  idToken,
  userId,
  loading,
  orders,
  error
}) => {
  useEffect(() => {
    console.log('mounted');
    thunkFetchOrders(idToken, userId);
    return () => {
      console.log('unmounted');
    };
  }, [thunkFetchOrders, idToken, userId]);

  console.log('hi');

  if (error) {
    console.log('errrrrror');
    return <h1>There was an error</h1>;
  }
  const allOrders = loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ))}
    </div>
  );
  return allOrders;
};

const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  loading: orders.loading,
  error: orders.error,
  idToken: auth.idToken,
  userId: auth.userId
});

const mapDispatchToProps = (dispatch) => ({
  thunkFetchOrders: (idToken, userId) =>
    dispatch(thunkFetchOrders(idToken, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
