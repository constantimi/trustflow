import React from 'react';
import { useAppSelector } from '../../../shared/store/hooks';
import {
  getFormState,
  getPolicyState,
  getStatusState,
} from '../../store/user/user-slice';
import { Step, StepName } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';
import { getTheme } from '../../../shared/store/app/theme';
import ArrowIcon from '../icons/ArrowIcon';
import LoadingIcon from '../../../shared/components/icons/LoadingIcon';

export const createSummaryScreenStep: () => Step = () => ({
  title: StepName.SUMMARY,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  jumpToStep: (stepName: StepName) => void;
}

export const Summary = ({ prevStep, nextStep, jumpToStep }: Props) => {
  const theme = useAppSelector(getTheme);
  const user = useAppSelector(getFormState);
  const policy = useAppSelector(getPolicyState);

  const status = useAppSelector(getStatusState);

  return (
    <div className="flex w-full flex-col">
      <Theme.PrimaryText className="text-2xl font-semibold">
        My details
      </Theme.PrimaryText>
      <Theme.PrimaryText className="text-lg">
        Review your data and insurance policy preferences.
      </Theme.PrimaryText>

      <div
        className="mb-auto mt-2 flex h-[1px] w-full"
        style={{ backgroundColor: theme.border.primary }}
      />

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>Name</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>
            {user.firstName.value} {user.lastName.value}
          </Theme.PrimaryText>
        </div>
      </div>

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>Email</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>{user.email.value}</Theme.PrimaryText>
        </div>
      </div>

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>Date of Birth</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>{user.dob.value}</Theme.PrimaryText>
        </div>
      </div>

      <div className="flex w-full flex-row justify-end">
        <Theme.DefaultButton
          onClick={() => jumpToStep(StepName.USER)}
          className="flex h-[2rem] w-fit flex-row gap-2"
        >
          <Theme.PrimaryText className="whitespace-normal text-sm">
            Change contact details
          </Theme.PrimaryText>
          <ArrowIcon fill={theme.text.primary} />
        </Theme.DefaultButton>
      </div>

      <div
        className="mb-auto mt-2 flex h-[1px] w-full"
        style={{ backgroundColor: theme.border.primary }}
      />

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>Insurance Policy</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>{policy.value}</Theme.PrimaryText>
        </div>
      </div>

      <div className="flex w-full flex-row justify-end">
        <Theme.DefaultButton
          onClick={() => jumpToStep(StepName.POLICY)}
          className="flex h-[2rem] w-fit flex-row gap-2"
        >
          <Theme.PrimaryText className="whitespace-normal text-sm">
            Change contact details
          </Theme.PrimaryText>
          <ArrowIcon fill={theme.text.primary} />
        </Theme.DefaultButton>
      </div>

      <div
        className="mb-6 mt-2 flex h-[1px] w-full"
        style={{ backgroundColor: theme.border.primary }}
      />

      <div className="flex w-full flex-row justify-end gap-2">
        <Theme.DefaultButton onClick={prevStep} className="h-[2rem] w-[6rem]">
          Back
        </Theme.DefaultButton>

        <Theme.PrimaryButton onClick={nextStep} className="h-[2rem] w-[6rem]">
          {status.loading ? (
            <LoadingIcon fill={theme.text.secondary} />
          ) : (
            'Submit'
          )}
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
