import { combineReducers } from 'redux';
import userReducer from './user/user-slice';

const dataReducers = combineReducers({
  user: userReducer,
});

export default dataReducers;
