import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
}

const SecondaryText = ({ children, className, style, dataTestId }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('text-base', className)}
      style={{
        color: theme.text.secondary,
        ...style,
      }}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default SecondaryText;
