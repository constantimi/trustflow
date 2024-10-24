/* eslint-disable import/order */
import { axiosMock } from '../../../../shared/utils/__mocks__/axios.mock';
import { postUserPolicy } from '../insurance-thunk';
import { UserPolicyResponse } from '../../../types/policy';
import { configureAppStore } from '../../../../shared/store/store';
import { cleanup } from '@testing-library/react';
import { AxiosRequestHeaders } from 'axios';
import { ThunkError } from '../../../../shared/store/thunk';

describe('postUserPolicy', () => {
  const mockStore = configureAppStore();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should dispatch with a valid response on success', async () => {
    const mockResponseData: UserPolicyResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      policy: 'Health Insurance',
    };

    const mockAxiosResponse = {
      data: mockResponseData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };

    axiosMock.post.mockResolvedValueOnce(mockAxiosResponse);

    await mockStore.dispatch(postUserPolicy()).then(({ payload }) => {
      expect(payload).toEqual(mockResponseData);
      expect(mockStore.getState().data.insurance.status.loading).toBe(false);
      expect(mockStore.getState().data.insurance.status.code).toBe(200);
    });
  });

  it('should dispatch with an error response on failure', async () => {
    const mockAxiosError = {
      response: {
        data: 'Invalid data',
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      },
    };

    axiosMock.post.mockRejectedValueOnce(mockAxiosError);

    await mockStore.dispatch(postUserPolicy()).then(({ payload }) => {
      expect((payload as ThunkError).message).toBe('Something went wrong');
      expect(mockStore.getState().data.insurance.status.loading).toBe(false);
      expect(mockStore.getState().data.insurance.status.code).toBe(500);
    });
  });

  it('should update loading state during request', async () => {
    const mockResponseData: UserPolicyResponse = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      policy: 'Health Insurance',
    };

    const mockAxiosResponse = {
      data: mockResponseData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {} as AxiosRequestHeaders,
      },
    };

    axiosMock.post.mockResolvedValueOnce(mockAxiosResponse);

    const action = mockStore.dispatch(postUserPolicy());

    expect(mockStore.getState().data.insurance.status.loading).toBe(true);

    await action;

    expect(mockStore.getState().data.insurance.status.loading).toBe(false);
  });
});
