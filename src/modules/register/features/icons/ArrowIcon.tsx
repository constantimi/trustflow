import * as React from 'react';
import { IconProps } from '../../../shared/types/icon';

const ArrowIcon = ({
  size = '10',
  fill = '#9FA9CA',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 34 34"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M1.86999 28.64L13.51 17L1.86999 5.36C0.699993 4.19 0.699993 2.3 1.86999 1.13C3.03999 -0.0399975 4.92999 -0.0399975 6.09999 1.13L19.87 14.9C21.04 16.07 21.04 17.96 19.87 19.13L6.09999 32.9C4.92999 34.07 3.03999 34.07 1.86999 32.9C0.729993 31.73 0.699993 29.81 1.86999 28.64Z"
      fill={fill}
    />
  </svg>
);

export default ArrowIcon;
