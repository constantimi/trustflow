export type StepList = {
  currentStep: Step;
  chain: Step;
};

export enum StepName {
  USER_FORM = 'General Information',
  POLICY_SELECTION = 'Insurance Policy',
  SUMMARY = 'Application Review',
}

export type Step = {
  title: StepName;
  completed?: boolean;
  next?: Step;
  prev?: Step;
};
