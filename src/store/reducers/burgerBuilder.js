import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    patty: 0
  },
  price: 2.5
};

const prices = {
  lettuce: 0.5,
  bacon: 1.5,
  patty: 3,
  cheese: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
