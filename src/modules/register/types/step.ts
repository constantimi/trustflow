export type StepList = {
  currentStep: Step;
  chain: Step;
};

export enum StepNames {
  USER_FORM = 'General Information',
  POLICY_SELECTION = 'Insurance Policy',
  SUMMARY = 'Application Review',
}

export type Step = {
  title: StepNames;
  completed?: boolean;
  next?: Step;
  prev?: Step;
};
