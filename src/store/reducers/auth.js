import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: '',
  userId: '',
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_AUTH:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.VERIFIED_AUTH:
      return {
        ...state,
        loading: false,
        idToken: action.idToken,
        userId: action.userId
      };
    case actionTypes.FAILED_AUTH:
      return {
        ...state,
        loading: false,
        error: action.err
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
