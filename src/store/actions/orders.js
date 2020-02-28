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
