import { combineReducers } from 'redux';
import insuranceReducer from './insurance/insurance-slice';

const dataReducers = combineReducers({
  insurance: insuranceReducer,
});

export default dataReducers;
