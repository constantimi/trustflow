import React, { useState } from 'react';
import { useAppDispatch } from '../../../shared/store/hooks';
import { selectPolicy } from '../../store/policy/policy-slice';
import { Step, StepNames } from '../../types/step';

export const createPolicySelectionStep: () => Step = () => ({
  title: StepNames.POLICY_SELECTION,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

export const PolicySelection = ({ nextStep, prevStep }: Props) => {
  const dispatch = useAppDispatch();

  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);

  const handleSelectPolicy = (policy: string) => {
    setSelectedPolicy(policy);
    dispatch(selectPolicy(policy));
    nextStep();
  };

  return (
    <div>
      <h3>Select a Policy</h3>
      <button type="button" onClick={() => handleSelectPolicy('Basic')}>
        Basic Plan
      </button>
      <button type="button" onClick={() => handleSelectPolicy('Standard')}>
        Standard Plan
      </button>
      <button type="button" onClick={() => handleSelectPolicy('Premium')}>
        Premium Plan
      </button>

      <button type="button" onClick={prevStep}>
        Back
      </button>
    </div>
  );
};
