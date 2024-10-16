import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/store';

interface UserState {
  name: string;
  email: string;
  dob: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  dob: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;

export const selectUserState = createSelector(
  [(state: RootState) => state.data.user],
  (user) => user
);
