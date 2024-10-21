import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Step, StepList, StepName } from '../types/step';
import UserForm, { createUserInformationStep } from './user/UserForm';
import {
  createPolicySelectionStep,
  PolicySelection,
} from './policy/PolicySelection';
import { createSummaryScreenStep, Summary } from './summary/Summary';
import Stepper from '../components/stepper/Stepper';
import Content from '../../shared/layout/content/Content';
import Layout from '../../shared/layout/layout/Layout';
import { Theme } from '../../shared/layout/theme';

const Register = () => {
  const navigate = useNavigate();

  const [stepper, setStepper] = useState<null | StepList>();

  useEffect(() => {
    let newStepper: Step | null = null;

    const userStep = createUserInformationStep();
    newStepper = userStep;

    const policyStep = createPolicySelectionStep();
    policyStep.prev = newStepper;
    newStepper.next = policyStep;

    const summaryStep = createSummaryScreenStep();
    summaryStep.prev = policyStep;
    policyStep.next = summaryStep;

    setStepper({ currentStep: userStep, chain: userStep });
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
      navigate('/');
      setStepper(null);
    }
  };

  const handlePrevStep = () => {
    if (stepper.currentStep.prev) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.prev });
    }
  };

  const handleJumpToStep = (stepName: StepName) => {
    let targetStep = stepper.currentStep as Step | undefined;
    while (targetStep && targetStep.title !== stepName) {
      targetStep.completed = false;
      targetStep = targetStep.prev;
    }

    if (targetStep) {
      setStepper({ ...stepper, currentStep: targetStep });
    }
  };

  return (
    <Layout>
      <Content className="flex flex-col items-center">
        <div className="mb-4 mt-[6rem] flex w-full flex-col items-center justify-center gap-1">
          <Theme.PrimaryText className="!text-3xl font-medium">
            Create Insurance Policy
          </Theme.PrimaryText>
          <Theme.SecondaryText className="text-lg">
            Create the contract for your insurance policy
          </Theme.SecondaryText>
        </div>

        <div className="flex w-full flex-col items-center px-4">
          <div className="flex w-[30rem] flex-col items-center justify-center md:w-[48rem]">
            <Stepper steps={stepper} />

            {stepper.currentStep.title === StepName.USER_FORM && (
              <UserForm nextStep={handleNextStep} />
            )}

            {stepper.currentStep.title === StepName.POLICY_SELECTION && (
              <PolicySelection
                prevStep={handlePrevStep}
                nextStep={handleNextStep}
              />
            )}

            {stepper.currentStep.title === StepName.SUMMARY && (
              <Summary
                prevStep={handlePrevStep}
                nextStep={handleNextStep}
                jumpToStep={handleJumpToStep}
              />
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Register;
