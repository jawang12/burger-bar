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
    default:
      return state;
  }
};
