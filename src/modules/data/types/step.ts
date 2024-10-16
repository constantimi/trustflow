export type StepList = {
  currentStep: Step;
  chain: Step;
};

export enum StepNames {
  USER_INFO_FORM = 'User Information Form',
  POLICY_SELECTION = 'Policy Selection',
  SUMMARY_SCREEN = 'Summary Screen',
}

export type Step = {
  title: StepNames;
  completed?: boolean;
  next?: Step;
  prev?: Step;
};
