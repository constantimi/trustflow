import React from 'react';
import { useAppSelector } from '../../../../shared/store/hooks';
import {
  getUserState,
  getPolicyState,
  getStatusState,
} from '../../../store/insurance/insurance-slice';
import { Step, StepName } from '../../../types/step';
import { Theme } from '../../../../shared/layout/theme';
import { getTheme } from '../../../../shared/store/app/theme';
import { useDashboardTranslation } from '../../../hooks/useDashboardTranslation';
import ArrowIcon from '../../../components/icons/ArrowIcon';
import LoadingIcon from '../../../../shared/components/icons/LoadingIcon';

export const createSummaryScreenStep: () => Step = () => ({
  title: StepName.SUMMARY,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  jumpToStep: (stepName: StepName) => void;
}

export const Summary = ({ prevStep, nextStep, jumpToStep }: Props) => {
  const { t } = useDashboardTranslation();
  const theme = useAppSelector(getTheme);
  const user = useAppSelector(getUserState);
  const policy = useAppSelector(getPolicyState);

  const status = useAppSelector(getStatusState);

  return (
    <div className="flex w-full flex-col">
      <Theme.PrimaryText className="text-2xl font-semibold">
        {t('My details')}
      </Theme.PrimaryText>
      <Theme.SecondaryText className="text-lg">
        {t('Review your data and insurance policy preferences.')}
      </Theme.SecondaryText>

      <div
        className="mb-auto mt-2 flex h-[1px] w-full"
        style={{ backgroundColor: theme.border.primary }}
      />

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>{t('Name')}</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>
            {user.firstName.value} {user.lastName.value}
          </Theme.PrimaryText>
        </div>
      </div>

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>{t('Email')}</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>{user.email.value}</Theme.PrimaryText>
        </div>
      </div>

      <div className="grid w-full grid-cols-2">
        <div className="my-2">
          <Theme.PrimaryText>{t('Date of Birth')}</Theme.PrimaryText>
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
            {t('Change contact details')}
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
          <Theme.PrimaryText>{t('Insurance Policy')}</Theme.PrimaryText>
        </div>
        <div className="my-2">
          <Theme.PrimaryText disable>{t(policy.value)}</Theme.PrimaryText>
        </div>
      </div>

      <div className="flex w-full flex-row justify-end">
        <Theme.DefaultButton
          onClick={() => jumpToStep(StepName.POLICY)}
          className="flex h-[2rem] w-fit flex-row gap-2"
        >
          <Theme.PrimaryText className="whitespace-normal text-sm">
            {t('Change contact details')}
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
          {t('Back')}
        </Theme.DefaultButton>

        <Theme.PrimaryButton onClick={nextStep} className="h-[2rem] w-[6rem]">
          {status.loading ? (
            <LoadingIcon fill={theme.text.secondary} />
          ) : (
            t('Submit')
          )}
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
