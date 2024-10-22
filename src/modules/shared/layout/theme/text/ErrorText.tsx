import React from 'react';
import { supportColors } from '../../../constants/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

const ErrorText = ({ children, className, style }: Props) => (
  <div className={className} style={{ color: supportColors.red, ...style }}>
    {children}
  </div>
);

export default ErrorText;
