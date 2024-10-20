import React from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { getTheme } from '../../../shared/store/app/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { Step, StepList } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';

type Props = {
  steps: StepList;
};

const Stepper = ({ steps }: Props) => {
  const theme = useAppSelector(getTheme);

  const renderStep = (s: Step) => (
    <div key={nanoid()} className="flex flex-row items-center justify-center">
      <div
        className="flex h-[2rem] w-fit flex-row items-center justify-start gap-1 rounded-full border-[1px] px-2"
        style={{
          color: theme.text.button,
          borderColor:
            s === steps.currentStep
              ? theme.text.primary
              : s.completed
              ? theme.text.primary
              : theme.text.disabled,
        }}
      >
        <div
          className="flex h-4 w-4 items-center justify-center rounded-full"
          style={{
            border: '4px solid',
            borderColor:
              s === steps.currentStep
                ? theme.text.primary
                : s.completed
                ? theme.text.primary
                : theme.text.disabled,
          }}
        />
        <div
          key={nanoid()}
          className="whitespace-nowrap text-base"
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
          className="mb-auto mt-4 flex h-[1px] w-[3.5rem]"
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
    <>
      <div
        className={cn(
          'flex flex-shrink-0 flex-row items-center justify-center',
          'no-scrollbar my-4 w-full overflow-x-auto'
        )}
      >
        {steps.chain.next && chain}
      </div>

      <div className="my-4 flex w-full flex-shrink-0 flex-col items-start px-5">
        <Theme.PrimaryText className="text-lg">
          {steps.chain.title}
        </Theme.PrimaryText>

        <div
          className="mb-auto mt-2 flex h-[1px] w-full"
          style={{
            backgroundColor: theme.border.primary,
          }}
        />
      </div>
    </>
  );
};

export default Stepper;
