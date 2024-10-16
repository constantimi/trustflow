import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Step, StepList, StepNames } from '../types/step';
import { createUserInformationStep, UserInfoForm } from './user/UserInfoForm';
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
      <Content>
        <Stepper steps={stepper} />

        {stepper.currentStep.title === StepNames.USER_INFO_FORM && (
          <UserInfoForm nextStep={handleNextStep} />
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
      </Content>
    </Layout>
  );
};

export default Register;
