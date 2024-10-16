import { Action, Reducer, combineReducers } from 'redux';
import { RootState } from '.';
import { resetStore } from './actions';
import appReducers from './app/app';
import dataReducers from '../../data/store';

export const combinedReducer = combineReducers({
  app: appReducers,
  data: dataReducers,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
  let s = state;
  if (action.type === resetStore.type) {
    s = {} as RootState;
  }
  return combinedReducer(s, action);
};

export default rootReducer;
