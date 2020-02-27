import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  price: 2.5,
  error: null
};

const prices = {
  lettuce: 0.5,
  bacon: 1.5,
  patty: 3,
  cheese: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      const { lettuce, bacon, patty, cheese } = action.ingredients;
      return {
        price: 2.5,
        ingredients: {
          lettuce,
          bacon,
          cheese,
          patty
        },
        error: false
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + prices[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        price: state.price - prices[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: action.err
      };
    default:
      return state;
  }
};
