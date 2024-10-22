import * as React from 'react';
import { IconProps } from '../../../shared/types/icon';

const CheckIcon = ({
  size = '18',
  fill = '#9FA9CA',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={className}
    {...props}
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 5L8 15l-5-4"
    />
  </svg>
);

export default CheckIcon;
