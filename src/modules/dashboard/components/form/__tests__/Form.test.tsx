import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('should render the form with the provided children', () => {
    render(<Form>{mockChildren}</Form>);

    const formElement = screen.getByTestId('form');

    expect(formElement).toBeInTheDocument();
    expect(formElement).toContainHTML(
      '<input type="text" placeholder="Name" />'
    );
    expect(formElement).toContainHTML(
      '<input type="email" placeholder="Email" />'
    );
    expect(formElement).toContainHTML('<button type="submit">Submit</button>');
  });

  it('should apply the provided className to the form element', () => {
    render(<Form className={mockClassName}>{mockChildren}</Form>);

    const formElement = screen.getByTestId('form');

    expect(formElement).toHaveClass(mockClassName);
  });
});
