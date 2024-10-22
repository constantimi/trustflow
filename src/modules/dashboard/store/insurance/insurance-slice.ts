import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/store';
import { Status } from '../../../shared/types/status';
import { postUserPolicy } from './insurance-thunk';
import isEmailValid from '../../../shared/helpers/validateEmail';
import isDobValid from '../../../shared/helpers/validateDob';

interface Field {
  value: string;
  error: string;
}

interface InsuranceState {
  user: {
    firstName: Field;
    lastName: Field;
    email: Field;
    dob: Field;
  };
  policy: Field;
  status: Status;
}

const initialState: InsuranceState = {
  user: {
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    dob: { value: '', error: '' },
  },
  policy: { value: '', error: '' },
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.user = { ...initialState.user };
      state.policy = { ...initialState.policy };
      state.status = { ...initialState.status };
    },
    clearStatus: (state) => {
      state.status = { ...initialState.status };
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName.value = action.payload;
      state.user.firstName.error = '';
    },
    validateFirstName: (state) => {
      if (state.user.firstName.value === '') {
        state.user.firstName.error = 'First name is a required field.';
      } else {
        state.user.firstName.error = '';
      }
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName.value = action.payload;
      state.user.lastName.error = '';
    },
    validateLastName: (state) => {
      if (state.user.lastName.value === '') {
        state.user.lastName.error = 'Last name is a required field.';
      } else {
        state.user.lastName.error = '';
      }
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email.value = action.payload;
      state.user.email.error = '';
    },
    validateEmail: (state) => {
      if (
        state.user.email.value !== '' &&
        !isEmailValid(state.user.email.value)
      ) {
        state.user.email.error = "The email isn't valid.";
      } else if (state.user.email.value === '') {
        state.user.email.error = 'Email is a required field.';
      } else {
        state.user.email.error = '';
      }
    },
    setDob: (state, action: PayloadAction<string>) => {
      state.user.dob.value = action.payload;
      state.user.dob.error = '';
    },
    validateDob: (state) => {
      if (state.user.dob.value !== '' && !isDobValid(state.user.dob.value)) {
        state.user.dob.error = "The date of birth isn't valid.";
      } else if (state.user.dob.value === '') {
        state.user.dob.error = 'Date of birth is a required field.';
      } else {
        state.user.dob.error = '';
      }
    },
    setPolicy: (state, action: PayloadAction<string>) => {
      state.policy.value = action.payload;
      state.policy.error = '';
    },
    validatePolicy: (state) => {
      if (!state.policy.value) {
        state.policy.error = 'You must select insurance policy.';
      } else {
        state.policy.error = '';
      }
    },
    clearPolicyError: (state) => {
      state.policy.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserPolicy.fulfilled, (state) => {
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';
      })
      .addCase(postUserPolicy.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(postUserPolicy.rejected, (state, action) => {
        state.status.loading = false;
        state.status.msg = 'internalServerError';
        state.status.code = 500;

        if (
          !action.payload ||
          action.payload.validation ||
          !action.payload.error ||
          !action.payload.error.axios
        ) {
          return;
        }

        const { axios } = action.payload.error;

        if (!axios.response?.status) return;

        state.status.code = axios.response.status;

        if (state.status.code === 400) {
          state.status.msg = 'badRequest';
        }
        if (state.status.code === 401) {
          state.status.msg = 'unauthorized';
        }
        if (state.status.code === 404) {
          state.status.msg = 'notFound';
        }
        if (state.status.code === 409) {
          state.status.msg = 'notUnique';
        }
      });
  },
});

export const {
  setInitialState,
  clearStatus,
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
  clearPolicyError,
} = userSlice.actions;

export default userSlice.reducer;

export const getUserState = createSelector(
  [(state: RootState) => state.data.insurance.user],
  (form) => form
);

export const getPolicyState = createSelector(
  [(state: RootState) => state.data.insurance.policy],
  (policy) => policy
);

export const getStatusState = createSelector(
  [(state: RootState) => state.data.insurance.status],
  (status) => status
);
