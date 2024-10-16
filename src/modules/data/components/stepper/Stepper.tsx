import React from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { getTheme } from '../../../shared/store/app/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { Step, StepList } from '../../types/step';

type Props = {
  steps: StepList;
};

const Stepper = ({ steps }: Props) => {
  const theme = useAppSelector(getTheme);

  const renderStep = (s: Step) => (
    <div
      key={nanoid()}
      className="flex flex-row items-center justify-center gap-6"
    >
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full border"
        style={{
          color: theme.text.buttonHover,
          borderColor:
            s === steps.currentStep
              ? theme.text.primary
              : s.completed
              ? theme.text.primary
              : theme.text.disabled,
          transform: 'scale(1.3)',
        }}
      >
        <div
          className="flex h-2.5 w-2.5 items-center justify-center rounded-full"
          style={{
            backgroundColor:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
            border: '1px solid',
            borderColor:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
            transform: 'scale(1.3)',
          }}
        />
        <div
          key={nanoid()}
          className="absolute left-1/2 top-8 -translate-x-1/2 transform whitespace-nowrap text-base"
          style={{
            color:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
          }}
        >
          {s.title}
        </div>
      </div>

      {s.next && (
        <div
          className="mb-auto mt-2 h-[1px] w-[8rem]"
          style={{
            backgroundColor:
              s === steps.currentStep
                ? theme.text.disabled
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
          }}
        />
      )}
    </div>
  );

  const chain: React.ReactElement[] = [];
  let current: Step | undefined = steps.chain;
  while (current) {
    chain.push(renderStep(current));
    current = current.next;
  }

  return (
    <div
      className={cn(
        'flex flex-shrink-0 items-center justify-center gap-8',
        'no-scrollbar my-4 h-[6rem] w-full overflow-x-auto'
      )}
    >
      {steps.chain.next && chain}
    </div>
  );
};

export default Stepper;
