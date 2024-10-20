import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks';
import { getFormState } from '../../store/user/user-slice';
import { selectPolicyState } from '../../store/policy/policy-slice';
import { Step, StepNames } from '../../types/step';

export const createSummaryScreenStep: () => Step = () => ({
  title: StepNames.SUMMARY_SCREEN,
});

interface Props {
  prevStep: () => void;
}

export const SummaryScreen = ({ prevStep }: Props) => {
  const user = useAppSelector(getFormState);
  const policy = useAppSelector(selectPolicyState);

  return (
    <div>
      <h3>Summary</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Date of Birth: {user.dob}</p>
      <p>Selected Policy: {policy.selected}</p>
      <button type="button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};
