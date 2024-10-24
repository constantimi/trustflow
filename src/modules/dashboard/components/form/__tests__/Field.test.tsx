import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, configureAppStore } from '../../../../shared/store/store';
import React, { ChangeEvent } from 'react';
import Field from '../Field';

describe('Field component', () => {
  let handleOnChangeMock: (event: ChangeEvent<HTMLInputElement>) => void;
  let mockStore: AppStore;
  const mockPlaceholder = 'Field 1';

  beforeEach(() => {
    handleOnChangeMock = jest.fn();
    mockStore = configureAppStore();
  });

  it('should render the component without an error message', () => {
    render(
      <Provider store={mockStore}>
        <Field placeholder={mockPlaceholder} onChange={handleOnChangeMock} />
      </Provider>
    );

    expect(screen.getByPlaceholderText(mockPlaceholder)).toBeInTheDocument();
  });

  it('should render the component with an error message', () => {
    const mockErrorMessage = 'error';

    render(
      <Provider store={mockStore}>
        <Field
          placeholder={mockPlaceholder}
          onChange={handleOnChangeMock}
          error={mockErrorMessage}
        />
      </Provider>
    );

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
