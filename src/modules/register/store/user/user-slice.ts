import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/store';
import isEmailValid from '../../../shared/helpers/validateEmail';
import isDobValid from '../../../shared/helpers/validateDob';

interface Field {
  value: string;
  error: string;
}

interface UserState {
  form: {
    firstName: Field;
    lastName: Field;
    email: Field;
    dob: Field;
  };
  policy: Field;
}

const initialState: UserState = {
  form: {
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    dob: { value: '', error: '' },
  },
  policy: { value: '', error: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.form = { ...initialState.form };
      state.policy = { ...initialState.policy };
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.form.firstName.value = action.payload;
      state.form.firstName.error = '';
    },
    validateFirstName: (state) => {
      if (state.form.firstName.value === '') {
        state.form.firstName.error = 'First name is a required field.';
      } else {
        state.form.firstName.error = '';
      }
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.form.lastName.value = action.payload;
      state.form.lastName.error = '';
    },
    validateLastName: (state) => {
      if (state.form.lastName.value === '') {
        state.form.lastName.error = 'Last name is a required field.';
      } else {
        state.form.lastName.error = '';
      }
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.form.email.value = action.payload;
      state.form.email.error = '';
    },
    validateEmail: (state) => {
      if (
        state.form.email.value !== '' &&
        !isEmailValid(state.form.email.value)
      ) {
        state.form.email.error = "The email isn't valid.";
      } else if (state.form.email.value === '') {
        state.form.email.error = 'Email is a required field.';
      } else {
        state.form.email.error = '';
      }
    },
    setDob: (state, action: PayloadAction<string>) => {
      state.form.dob.value = action.payload;
      state.form.dob.error = '';
    },
    validateDob: (state) => {
      if (state.form.dob.value !== '' && !isDobValid(state.form.dob.value)) {
        state.form.dob.error = "The date of birth isn't valid.";
      } else if (state.form.dob.value === '') {
        state.form.dob.error = 'Date of birth is a required field.';
      } else {
        state.form.dob.error = '';
      }
    },
    setPolicy: (state, action: PayloadAction<string>) => {
      state.policy.value = action.payload;
      state.policy.error = '';
    },
    validatePolicy: (state) => {
      if (!state.policy.value) {
        state.policy.error = 'You must accept the policy.';
      } else {
        state.policy.error = '';
      }
    },
  },
});

export const {
  setInitialState,
  setFirstName,
  validateFirstName,
  setLastName,
  validateLastName,
  setEmail,
  validateEmail,
  setDob,
  validateDob,
  setPolicy,
  validatePolicy,
} = userSlice.actions;

export default userSlice.reducer;

export const getFormState = (state: RootState) => state.data.user.form;

export const getPolicyState = (state: RootState) => state.data.user.policy;
