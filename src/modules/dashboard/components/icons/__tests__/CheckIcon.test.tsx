import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckIcon from '../CheckIcon';

describe('CheckIcon', () => {
  it('should render with default props', () => {
    const { container } = render(<CheckIcon />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveAttribute('width', '18');
      expect(svgElement).toHaveAttribute('height', '18');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'stroke',
        '#9FA9CA'
      );
    }
  });

  it('should apply custom size and fill', () => {
    const { container } = render(<CheckIcon size="24" fill="#FF0000" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveAttribute('width', '24');
      expect(svgElement).toHaveAttribute('height', '24');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'stroke',
        '#FF0000'
      );
    }
  });

  it('should apply className', () => {
    const { container } = render(<CheckIcon className="custom-class" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveClass('custom-class');
    }
  });
});
