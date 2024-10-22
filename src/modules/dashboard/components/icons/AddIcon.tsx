import * as React from 'react';
import { IconProps } from '../../../shared/types/icon';

const AddIcon = ({
  size = '15',
  fill = '#9FA9CA',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 17 17"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8.49998C0 3.80611 3.80952 -0.00341797 8.5034 -0.00341797C13.1973 -0.00341797 17.0068 3.80611 17.0068 8.49998C17.0068 13.1939 13.1973 17.0034 8.5034 17.0034C3.80952 17.0034 0 13.1939 0 8.49998ZM9.35374 9.35032H12.7551V7.64964H9.35374V4.24828H7.65306V7.64964H4.2517V9.35032H7.65306V12.7517H9.35374V9.35032Z"
      fill={fill}
    />
  </svg>
);
export default AddIcon;
