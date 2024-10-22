import React from 'react';
import { Step } from '../../types/step';
import { useAppSelector } from '../../../shared/store/hooks';
import { getTheme } from '../../../shared/store/app/theme';
import { useRegisterTranslation } from '../../hooks/useRegisterTranslation';

interface StepItemProps {
  step: Step;
  isCurrentStep: boolean;
}

const StepItem = ({ step, isCurrentStep }: StepItemProps) => {
  const { t } = useRegisterTranslation();
  const theme = useAppSelector(getTheme);

  const stepColor =
    isCurrentStep || step.completed ? theme.text.primary : theme.text.disabled;

  return (
    <div className="flex flex-row items-center justify-center">
      <div
        className="flex h-[2rem] w-fit flex-row items-center justify-start gap-1 rounded-full border-[1px] px-2"
        style={{ color: theme.text.button, borderColor: stepColor }}
      >
        <div
          className="flex h-4 w-4 items-center justify-center rounded-full"
          style={{
            border: '4px solid',
            borderColor: stepColor,
          }}
        />
        <div
          className="whitespace-nowrap text-base"
          style={{ color: stepColor }}
        >
          {t(step.title)}
        </div>
      </div>
    </div>
  );
};

export default StepItem;
