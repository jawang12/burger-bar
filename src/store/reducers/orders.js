import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  ordering: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESSFUL_ORDER:
      const order = { ...action.orderData };
      order.id = action.id;
      return {
        orders: [...state.orders, order],
        loading: false,
        ordering: false
      };
    case actionTypes.FAILED_ORDER:
      return {
        ...state,
        loading: false,
        ordering: false
      };
    case actionTypes.SUBMITTING_ORDER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.INIT_ORDER:
      return {
        ...state,
        ordering: true
      };
    case actionTypes.INIT_FETCH_ORDERS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };
    default:
      return state;
  }
};
