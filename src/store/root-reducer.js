import { combineReducers } from 'redux';
import burgerBuilderReducer from './reducers/burgerBuilder';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer
});

export default rootReducer;
