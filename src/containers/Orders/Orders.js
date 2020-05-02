import React, { useEffect, useCallback } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios/orders';
import { thunkFetchOrders } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = () => {
  const dispatch = useDispatch();
  const ordersState = useSelector(({ orders }) => orders);
  const authState = useSelector(({ auth }) => auth);

  const fetchOrders = useCallback(
    () => dispatch(thunkFetchOrders(authState.idToken, authState.userId)),
    [dispatch, authState.idToken, authState.userId]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (ordersState.error) {
    return <h1>There was an error</h1>;
  }
  const allOrders = ordersState.loading ? (
    <Spinner />
  ) : (
    <div>
      {ordersState.orders.map((order) => (
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

/*
const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  loading: orders.loading,
  error: orders.error,
  idToken: auth.idToken,
  userId: auth.userId
});


const mapDispatchToProps = (dispatch) => ({
  thunkFetchOrders: () => dispatch(thunkFetchOrders(idToken, userId))
});
*/

export default withErrorHandler(Orders, axios);
