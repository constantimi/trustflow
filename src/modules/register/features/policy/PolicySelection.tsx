import React from 'react';
import { useAppDispatch } from '../../../shared/store/hooks';
import { Step, StepNames } from '../../types/step';
import { Theme } from '../../../shared/layout/theme';
import { setPolicy } from '../../store/user/user-slice';

export const createPolicySelectionStep: () => Step = () => ({
  title: StepNames.POLICY_SELECTION,
});

interface Props {
  nextStep: () => void;
  prevStep: () => void;
}

interface Policy {
  name: string;
  description: string;
  cost: string;
}

export const PolicySelection = ({ nextStep, prevStep }: Props) => {
  const dispatch = useAppDispatch();

  const policies: Policy[] = [
    {
      name: 'Basic',
      description: `Receive 100% reimbursement:
      - At all contracted hospitals
      - For urgent medical care at any hospital
      - At all contracted care providers
      - At all contracted treatment centres
      
      Receive 75% reimbursement of the average contracted rate at:
      - Any non-contracted hospital
      - Any non-contracted care provider`,
      cost: '€200/month',
    },
    {
      name: 'Standard',
      description: `Receive 100% reimbursement:
      - At all contracted hospitals
      - At all contracted care providers
      - At all contracted treatment centres
      
      Receive 75% reimbursement of the average contracted rate at:
      - Any non-contracted care provider`,
      cost: '€300/month',
    },
    {
      name: 'Premium',
      description: `Receive 100% reimbursement:
      - Any hospital
      - Any contracted care providers
      - Any contracted treatment centres

      At care providers without a contract, the reimbursement is up to:
      - 85% of the average contracted rate at non-contracted mental health care and district nursing
      - 100% market rate or statutory tariff at other non-contracted care providers.`,
      cost: '€400/month',
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Theme.PrimaryText className="text-lg">Select a Policy</Theme.PrimaryText>

      {policies.map((policy) => (
        <div key={policy.name} style={{ marginBottom: '20px' }}>
          <h4>{policy.name} Plan</h4>
          <p>{policy.description}</p>
          <p>
            <strong>Cost: {policy.cost}</strong>
          </p>
          <Theme.PrimaryButton
            onClick={() => dispatch(setPolicy(policy.name))}
            className="h-[2rem] w-[8rem]"
          >
            {policy.name} Plan
          </Theme.PrimaryButton>
        </div>
      ))}

      <div className="flex w-full flex-row justify-end gap-2">
        <Theme.DefaultButton onClick={prevStep} className="h-[2rem] w-[6rem]">
          Back
        </Theme.DefaultButton>

        <Theme.PrimaryButton onClick={nextStep} className="h-[2rem] w-[6rem]">
          Next
        </Theme.PrimaryButton>
      </div>
    </div>
  );
};
