import React from 'react';
import { Step, StepName } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';
import { PolicyTable } from './table/PolicyTable';
import { useAppDispatch, useAppSelector } from '../../../shared/store/hooks';
import { getPolicyState, validatePolicy } from '../../store/user/user-slice';

export const createPolicySelectionStep: () => Step = () => ({
  title: StepName.POLICY,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

export const PolicySelection = ({ nextStep, prevStep }: Props) => {
  const dispatch = useAppDispatch();

  const policy = useAppSelector(getPolicyState);

  const handleSubmit = () => {
    let valid = true;

    if (policy.value === '') {
      dispatch(validatePolicy());
      valid = false;
    }

    if (!valid) return;

    nextStep();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <PolicyTable />

      <div className="flex w-full flex-row justify-end gap-2">
        <Theme.DefaultButton onClick={prevStep} className="h-[2rem] w-[6rem]">
          Back
        </Theme.DefaultButton>

        <Theme.PrimaryButton
          onClick={handleSubmit}
          className="h-[2rem] w-[6rem]"
        >
          Next
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
