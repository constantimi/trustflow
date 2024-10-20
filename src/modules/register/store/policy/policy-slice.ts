import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/store';

interface PolicyState {
  selected: string | null;
}

const initialState: PolicyState = {
  selected: null,
};

const policySlice = createSlice({
  name: 'policy',
  initialState,
  reducers: {
    selectPolicy: (state, action) => {
      state.selected = action.payload;
    },
  },
});

export const { selectPolicy } = policySlice.actions;

export default policySlice.reducer;

export const selectPolicyState = createSelector(
  [(state: RootState) => state.data.policy],
  (policy) => policy
);
