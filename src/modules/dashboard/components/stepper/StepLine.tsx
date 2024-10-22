import React from 'react';
import { Step } from '../../types/step';
import { useAppSelector } from '../../../shared/store/hooks';
import { getTheme } from '../../../shared/store/app/theme';

interface StepLineProps {
  step: Step;
  isCurrentStep: boolean;
}

const StepLine = ({ step, isCurrentStep }: StepLineProps) => {
  const theme = useAppSelector(getTheme);

  const lineColor =
    isCurrentStep || step.completed ? theme.text.primary : theme.text.disabled;

  return (
    <div
      className="mb-auto mt-4 flex h-[1px] w-[1.5rem] md:w-[5rem]"
      style={{ backgroundColor: lineColor }}
    />
  );
};

export default StepLine;
