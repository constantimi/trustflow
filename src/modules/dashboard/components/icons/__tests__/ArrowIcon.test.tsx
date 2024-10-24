import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArrowIcon from '../ArrowIcon';

describe('ArrowIcon', () => {
  it('should render with default props', () => {
    const { container } = render(<ArrowIcon />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toBeInTheDocument();
      expect(svgElement).toHaveAttribute('width', '10');
      expect(svgElement).toHaveAttribute('height', '10');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'fill',
        '#9FA9CA'
      );
    }
  });

  it('should apply custom size and fill', () => {
    const { container } = render(<ArrowIcon size="15" fill="#00FF00" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveAttribute('width', '15');
      expect(svgElement).toHaveAttribute('height', '15');
      expect(svgElement.querySelector('path')).toHaveAttribute(
        'fill',
        '#00FF00'
      );
    }
  });

  it('should apply className', () => {
    const { container } = render(<ArrowIcon className="custom-class" />);
    const svgElement = container.querySelector('svg');

    expect(svgElement).not.toBeNull();
    if (svgElement) {
      expect(svgElement).toHaveClass('custom-class');
    }
  });
});
