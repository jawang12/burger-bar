import { combineReducers } from 'redux';
import burgerBuilderReducer from './reducers/burgerBuilder';
import ordersReducer from './reducers/orders';

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: ordersReducer
});

export default rootReducer;
