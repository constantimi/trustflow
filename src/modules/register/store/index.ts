import { combineReducers } from 'redux';
import policyReducer from './policy/policy-slice';
import userReducer from './user/user-slice';

const registerReducers = combineReducers({
  policy: policyReducer,
  user: userReducer,
});

export default registerReducers;
