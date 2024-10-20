import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Step, StepList, StepNames } from '../types/step';
import UserForm, { createUserInformationStep } from './user/UserForm';
import {
  createPolicySelectionStep,
  PolicySelection,
} from './policy/PolicySelection';
import {
  createSummaryScreenStep,
  SummaryScreen,
} from './summary/SummaryScreen';
import Stepper from '../components/stepper/Stepper';
import Content from '../../shared/layout/content/Content';
import Layout from '../../shared/layout/layout/Layout';
import { Theme } from '../../shared/layout/theme';

const Register = () => {
  const [stepper, setStepper] = useState<null | StepList>();

  const navigate = useNavigate();

  useEffect(() => {
    let newStepper: Step | null = null;

    const userStep = createUserInformationStep();
    newStepper = userStep;

    if (newStepper) {
      const policyStep = createPolicySelectionStep();
      policyStep.prev = newStepper;
      newStepper.next = policyStep;
    } else {
      newStepper = createPolicySelectionStep();
    }

    const summaryStep = createSummaryScreenStep();
    if (newStepper.next) {
      summaryStep.prev = newStepper.next;
      newStepper.next.next = summaryStep;
    } else {
      summaryStep.prev = newStepper;
      newStepper.next = summaryStep;
    }

    if (newStepper) {
      setStepper({ currentStep: newStepper, chain: newStepper });
    }
  }, []);

  if (!stepper) {
    navigate('/');
    return null;
  }

  const handleNextStep = () => {
    stepper.currentStep.completed = true;
    if (stepper.currentStep.next) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.next });
    } else {
      // Submit form
      navigate('/');

      setStepper(null);
    }
  };

  const handlePrevStep = () => {
    if (stepper.currentStep.prev) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.prev });
    }
  };

  return (
    <Layout>
      <Content className="flex flex-col items-center">
        <div className="mb-4 mt-[6rem] flex w-full flex-col items-center justify-center gap-1">
          <Theme.PrimaryText className="text-3xl">
            Create Insurance Policy
          </Theme.PrimaryText>
          <Theme.SecondaryText className="text-lg">
            Create the contract for your insurance policy
          </Theme.SecondaryText>
        </div>

        <div className="flex w-[38rem] flex-col items-center px-4">
          <Stepper steps={stepper} />

          {stepper.currentStep.title === StepNames.USER_FORM && (
            <UserForm nextStep={handleNextStep} />
          )}

          {stepper.currentStep.title === StepNames.POLICY_SELECTION && (
            <PolicySelection
              nextStep={handleNextStep}
              prevStep={handlePrevStep}
            />
          )}

          {stepper.currentStep.title === StepNames.SUMMARY_SCREEN && (
            <SummaryScreen prevStep={handlePrevStep} />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Register;
