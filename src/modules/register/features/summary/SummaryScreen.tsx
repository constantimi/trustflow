import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks';
import { getFormState, getPolicyState } from '../../store/user/user-slice';
import { Step, StepNames } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';

export const createSummaryScreenStep: () => Step = () => ({
  title: StepNames.SUMMARY,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

export const SummaryScreen = ({ prevStep, nextStep }: Props) => {
  const user = useAppSelector(getFormState);
  const policy = useAppSelector(getPolicyState);

  return (
    <div className="flex w-full flex-col">
      <Theme.PrimaryText className="text-lg">My details</Theme.PrimaryText>

      <Theme.PrimaryText>
        Name: {user.firstName.value} {user.lastName.value}
      </Theme.PrimaryText>
      <Theme.PrimaryText>Email: {user.lastName.value}</Theme.PrimaryText>
      <Theme.PrimaryText>Date of Birth: {user.dob.value}</Theme.PrimaryText>
      <Theme.PrimaryText>Selected policy: {policy.value}</Theme.PrimaryText>

      <div className="flex w-full flex-row justify-end gap-2 px-6">
        <Theme.DefaultButton onClick={prevStep} className="h-[2rem] w-[6rem]">
          Back
        </Theme.DefaultButton>

        <Theme.PrimaryButton onClick={nextStep} className="h-[2rem] w-[6rem]">
          Submit
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
