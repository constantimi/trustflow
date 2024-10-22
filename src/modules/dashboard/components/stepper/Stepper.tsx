import React from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { Step, StepList } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';
import { getTheme } from '../../../shared/store/app/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { useDashboardTranslation } from '../../hooks/useDashboardTranslation';
import StepItem from './StepItem';
import StepLine from './StepLine';

interface Props {
  steps: StepList;
}

const Stepper = ({ steps }: Props) => {
  const theme = useAppSelector(getTheme);
  const { t } = useDashboardTranslation();

  const renderStepChain = () => {
    const chain: React.ReactElement[] = [];
    let current = steps.chain as Step | undefined;

    while (current) {
      const isCurrentStep = current === steps.currentStep;
      chain.push(
        <div
          key={nanoid()}
          className="flex flex-row items-center justify-center"
        >
          {current.prev && (
            <StepLine step={current} isCurrentStep={isCurrentStep} />
          )}
          <StepItem step={current} isCurrentStep={isCurrentStep} />
        </div>
      );
      current = current.next;
    }

    return chain;
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-shrink-0 flex-row items-center justify-center',
          'no-scrollbar my-4 w-full overflow-x-auto'
        )}
      >
        {steps.chain.next && renderStepChain()}
      </div>

      <div className="my-4 flex w-full flex-shrink-0 flex-col items-start">
        <Theme.PrimaryText className="text-lg">
          {t(steps.currentStep.title)}
        </Theme.PrimaryText>

        <div
          className="mb-auto mt-2 flex h-[1px] w-full"
          style={{ backgroundColor: theme.border.primary }}
        />
      </div>
    </>
  );
};

export default Stepper;
