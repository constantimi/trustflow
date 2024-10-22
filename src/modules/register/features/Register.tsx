import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Step, StepList, StepName } from '../types/step';
import UserForm, { createUserInformationStep } from './user/UserForm';
import {
  createPolicySelectionStep,
  PolicySelection,
} from './policy/PolicySelection';
import { createSummaryScreenStep, Summary } from './summary/Summary';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { postUserPolicy } from '../store/user/user-thunk';
import { Theme } from '../../shared/layout/theme';
import Stepper from '../components/stepper/Stepper';
import Content from '../../shared/layout/content/Content';
import Layout from '../../shared/layout/layout/Layout';
import {
  clearStatus,
  getStatusState,
  setInitialState,
} from '../store/user/user-slice';
import toast from '../../shared/components/toast/AppToast';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [stepper, setStepper] = useState<null | StepList>();

  const status = useAppSelector(getStatusState);

  // Effect to initialize the stepper with the steps for the registration process
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

  // Effect to handle status changes and provide feedback to the user
  useEffect(() => {
    if (!status.loading && status.code === 200 && !status.msg) {
      dispatch(setInitialState());

      toast.success({
        title: 'User added successfully',
      });

      setStepper(null);
      navigate('/');
    } else if (!status.loading && status.msg) {
      dispatch(clearStatus());

      toast.error({
        title: status.msg,
      });
    }
  }, [dispatch, navigate, status.code, status.loading, status.msg]);

  if (!stepper) {
    navigate('/');
    return null;
  }

  // Function to navigate to the next step in the stepper or
  // submit the user policy if on the last step
  const handleNextStep = () => {
    stepper.currentStep.completed = true;
    if (stepper.currentStep.next) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.next });
    } else {
      dispatch(postUserPolicy());
    }
  };

  // Function to navigate to the previous step in the stepper
  const handlePrevStep = () => {
    if (stepper.currentStep.prev) {
      setStepper({ ...stepper, currentStep: stepper.currentStep.prev });
    }
  };

  // Function to jump to a specific step in the stepper based on the step name
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

            {stepper.currentStep.title === StepName.USER && (
              <UserForm nextStep={handleNextStep} />
            )}

            {stepper.currentStep.title === StepName.POLICY && (
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
