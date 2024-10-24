import { cleanup } from '@testing-library/react';
import { configureAppStore } from '../../../../shared/store/store';
import {
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
} from '../insurance-slice';
import {
  getUserState,
  getPolicyState,
  getStatusState,
} from '../insurance-slice';

describe('insuranceSlice', () => {
  const mockStore = configureAppStore();

  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    mockStore.dispatch(setInitialState());
  });

  describe('reducers', () => {
    it('should set initial state', () => {
      mockStore.dispatch(setInitialState());
      expect(mockStore.getState().data.insurance).toEqual({
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
      });
    });

    it('should clear status', () => {
      mockStore.dispatch(clearStatus());
      expect(mockStore.getState().data.insurance.status).toEqual({
        code: -1,
        loading: false,
        msg: '',
      });
    });

    it('should set first name and clear error', () => {
      const firstName = 'John';
      mockStore.dispatch(setFirstName(firstName));
      expect(mockStore.getState().data.insurance.user.firstName).toEqual({
        value: firstName,
        error: '',
      });
    });

    it('should validate first name as required', () => {
      mockStore.dispatch(validateFirstName());
      expect(mockStore.getState().data.insurance.user.firstName.error).toEqual(
        'First name is a required field.'
      );
    });

    it('should set last name and clear error', () => {
      const lastName = 'Doe';
      mockStore.dispatch(setLastName(lastName));
      expect(mockStore.getState().data.insurance.user.lastName).toEqual({
        value: lastName,
        error: '',
      });
    });

    it('should validate last name as required', () => {
      mockStore.dispatch(validateLastName());
      expect(mockStore.getState().data.insurance.user.lastName.error).toEqual(
        'Last name is a required field.'
      );
    });

    it('should set email and clear error', () => {
      const email = 'john.doe@example.com';
      mockStore.dispatch(setEmail(email));
      expect(mockStore.getState().data.insurance.user.email).toEqual({
        value: email,
        error: '',
      });
    });

    it('should validate email', () => {
      mockStore.dispatch(validateEmail());
      expect(mockStore.getState().data.insurance.user.email.error).toEqual(
        'Email is a required field.'
      );
    });

    it('should set date of birth and clear error', () => {
      const dob = '1990-01-01';
      mockStore.dispatch(setDob(dob));
      expect(mockStore.getState().data.insurance.user.dob).toEqual({
        value: dob,
        error: '',
      });
    });

    it('should validate date of birth as required', () => {
      mockStore.dispatch(validateDob());
      expect(mockStore.getState().data.insurance.user.dob.error).toEqual(
        'Date of birth is a required field.'
      );
    });

    it('should set policy and clear error', () => {
      const policy = 'Health Insurance';
      mockStore.dispatch(setPolicy(policy));
      expect(mockStore.getState().data.insurance.policy).toEqual({
        value: policy,
        error: '',
      });
    });

    it('should validate policy as required', () => {
      mockStore.dispatch(validatePolicy());
      expect(mockStore.getState().data.insurance.policy.error).toEqual(
        'You must select insurance policy.'
      );
    });

    it('should clear policy error', () => {
      mockStore.dispatch(clearPolicyError());
      expect(mockStore.getState().data.insurance.policy.error).toEqual('');
    });
  });

  describe('selectors', () => {
    it('should select user state', () => {
      const user = {
        firstName: { value: 'John', error: '' },
        lastName: { value: 'Doe', error: '' },
        email: { value: 'john.doe@example.com', error: '' },
        dob: { value: '1990-01-01', error: '' },
      };
      mockStore.dispatch(setFirstName(user.firstName.value));
      mockStore.dispatch(setLastName(user.lastName.value));
      mockStore.dispatch(setEmail(user.email.value));
      mockStore.dispatch(setDob(user.dob.value));

      const result = getUserState(mockStore.getState());
      expect(result).toEqual(user);
    });

    it('should select policy state', () => {
      const policyValue = 'Health Insurance';
      mockStore.dispatch(setPolicy(policyValue));

      const result = getPolicyState(mockStore.getState());
      expect(result).toEqual({ value: policyValue, error: '' });
    });

    it('should select status state', () => {
      const status = {
        code: -1,
        loading: false,
        msg: '',
      };
      mockStore.dispatch(clearStatus());
      const result = getStatusState(mockStore.getState());
      expect(result).toEqual(status);
    });
  });
});
