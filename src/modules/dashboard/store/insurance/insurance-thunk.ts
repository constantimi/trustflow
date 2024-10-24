import { AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppGetState } from '../../../shared/store';
import {
  UserPolicyRequest,
  UserPolicyResponse,
  userPolicySchema,
} from '../../types/policy';
import { isAxiosError, ThunkError } from '../../../shared/store/thunk';
import AppAPI from '../../../shared/constants/appApi';
import axiosClient from '../../../shared/utils/axios';

export const postUserPolicy = createAsyncThunk<
  UserPolicyResponse,
  undefined,
  {
    rejectValue: ThunkError;
  }
>('insurance/postUserPolicy', async (_, thunkAPI) => {
  const { user: form, policy } = (thunkAPI.getState as AppGetState)().data
    .insurance;

  const payload: UserPolicyRequest = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    dob: form.dob.value,
    policy: policy.value,
  };

  try {
    const response: AxiosResponse = await axiosClient.post(
      AppAPI.endpoints().addInsurance,
      payload
    );

    const validator = userPolicySchema.safeParse(response.data);

    if (!validator.success) {
      return thunkAPI.rejectWithValue(validator.error);
    }

    return validator.data;
  } catch (e) {
    if (isAxiosError(e)) {
      return thunkAPI.rejectWithValue({
        error: { raw: e, axios: e },
        message: 'Something went wrong',
      });
    }

    return thunkAPI.rejectWithValue({
      error: { raw: e },
      message: 'Something went wrong',
    });
  }
});
