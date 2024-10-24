import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from '../Form';

describe('Form component', () => {
  const mockChildren = (
    <div>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </div>
  );
  const mockClassName = 'custom-form';
  const mockOnSubmit = jest.fn();

  it('should render the form with the provided children', () => {
    render(<Form onSubmit={mockOnSubmit}>{mockChildren}</Form>);

    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should apply the provided className to the form element', () => {
    render(
      <Form className={mockClassName} onSubmit={mockOnSubmit}>
        {mockChildren}
      </Form>
    );

    const formElement = screen.getByTestId('form');
    expect(formElement).toHaveClass(mockClassName);
  });

  it('should call onSubmit when the form is submitted', async () => {
    render(<Form onSubmit={mockOnSubmit}>{mockChildren}</Form>);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
