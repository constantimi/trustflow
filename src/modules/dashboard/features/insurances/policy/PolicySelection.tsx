import React, { useEffect } from 'react';
import { Step, StepName } from '../../../types/step';
import { Theme } from '../../../../shared/layout/theme';
import { PolicyTable } from './table/PolicyTable';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import {
  clearPolicyError,
  getPolicyState,
  validatePolicy,
} from '../../../store/insurance/insurance-slice';
import { useDashboardTranslation } from '../../../hooks/useDashboardTranslation';
import toast from '../../../../shared/components/toast/AppToast';

export const createPolicySelectionStep: () => Step = () => ({
  title: StepName.POLICY,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

export const PolicySelection = ({ nextStep, prevStep }: Props) => {
  const { t } = useDashboardTranslation();
  const dispatch = useAppDispatch();

  const policy = useAppSelector(getPolicyState);

  useEffect(() => {
    if (policy.error) {
      toast.error({
        title: t(policy.error),
      });

      dispatch(clearPolicyError());
    }
  }, [dispatch, policy.error, t]);

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
          {t('Back')}
        </Theme.DefaultButton>

        <Theme.PrimaryButton
          onClick={handleSubmit}
          className="h-[2rem] w-[6rem]"
        >
          {t('Next')}
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
