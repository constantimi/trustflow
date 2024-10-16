import { combineReducers } from 'redux';
import policyReducer from './policy/policy-slice';
import userReducer from './user/user-slice';

const dataReducers = combineReducers({
  policy: policyReducer,
  user: userReducer,
});

export default dataReducers;
