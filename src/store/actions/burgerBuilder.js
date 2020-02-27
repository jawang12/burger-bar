import * as actionTypes from './actionTypes';
import axios from '../../axios/orders';

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

const fetchIngredientsFailed = err => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
  err
});

export const thunkSetIngredients = () => async dispatch => {
  try {
    const data = await axios.get('/ingredients.json');
    const ingredients = data.data;
    dispatch(setIngredients(ingredients));
  } catch (err) {
    dispatch(fetchIngredientsFailed(err));
  }
};
