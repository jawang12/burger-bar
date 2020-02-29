import * as actionTypes from './actionTypes';
import axios from '../../axios/orders';

const successfulOrder = (orderData, id) => ({
  type: actionTypes.SUCCESSFUL_ORDER,
  orderData,
  id
});

const failedOrder = error => ({
  type: actionTypes.FAILED_ORDER,
  error
});

export const initOrder = () => ({
  type: actionTypes.INIT_ORDER
});

const submittingOrder = () => ({
  type: actionTypes.SUBMITTING_ORDER
});

const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

const initFetchOrders = () => ({
  type: actionTypes.INIT_FETCH_ORDERS
});

export const thunkSubmitOrder = orderData => async dispatch => {
  dispatch(submittingOrder());
  try {
    const orderReq = await axios.post('/orders.json', orderData);
    console.log('success from CustomerInfo', orderReq);
    dispatch(successfulOrder(orderData, orderReq.data.name));
  } catch (error) {
    dispatch(failedOrder(error));
  }
};

export const thunkFetchOrders = () => async dispatch => {
  dispatch(initFetchOrders());
  try {
    const firebaseOrder = await axios.get('/orders.json');
    const orders = Object.keys(firebaseOrder.data).map(key => ({
      id: key,
      ...firebaseOrder['data'][key]
    }));
    dispatch(fetchOrdersSuccess(orders));
  } catch (error) {
    dispatch(fetchOrdersFail(error));
  }
};
