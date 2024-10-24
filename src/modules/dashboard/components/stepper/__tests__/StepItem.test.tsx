import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppSelector } from '../../../../shared/store/hooks';
import { useDashboardTranslation } from '../../../hooks/useDashboardTranslation';
import { Step, StepName } from '../../../types/step';
import StepItem from '../StepItem';

jest.mock('../../../../shared/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../../../hooks/useDashboardTranslation', () => ({
  useDashboardTranslation: jest.fn(),
}));

describe('StepItem', () => {
  const mockStep: Step = {
    title: StepName.USER,
    completed: false,
  };

  const mockTranslation = jest.fn();
  const mockTheme = {
    text: {
      primary: '#000',
      disabled: '#ccc',
      button: '#f00',
    },
  };

  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        app: {
          themes: mockTheme,
        },
      })
    );
    (useDashboardTranslation as jest.Mock).mockReturnValue({
      t: mockTranslation,
    });
  });

  it('renders the step item with correct title', () => {
    mockTranslation.mockReturnValueOnce(StepName.USER);
    const { getByText } = render(
      <StepItem step={mockStep} isCurrentStep={false} />
    );

    expect(getByText(StepName.USER)).toBeInTheDocument();
  });
});
