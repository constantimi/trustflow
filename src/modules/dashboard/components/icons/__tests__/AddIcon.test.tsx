import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddIcon from '../AddIcon';

describe('AddIcon', () => {
  it('should render with default props', () => {
    const { container } = render(<AddIcon />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveAttribute('width', '15');
      expect(svgElement).toHaveAttribute('height', '15');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'fill',
        '#9FA9CA'
      );
    }
  });

  it('should apply custom size and fill', () => {
    const { container } = render(<AddIcon size="20" fill="#FF0000" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveAttribute('width', '20');
      expect(svgElement).toHaveAttribute('height', '20');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'fill',
        '#FF0000'
      );
    }
  });

  it('should apply className', () => {
    const { container } = render(<AddIcon className="custom-class" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveClass('custom-class');
    }
  });
});
