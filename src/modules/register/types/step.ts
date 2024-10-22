export enum StepName {
  USER = 'General Information',
  POLICY = 'Insurance Policy',
  SUMMARY = 'Application Review',
}

export type StepList = {
  currentStep: Step;
  chain: Step;
};

export type Step = {
  title: StepName;
  completed?: boolean;
  next?: Step;
  prev?: Step;
};
