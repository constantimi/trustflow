import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  disable?: boolean;
  dataTestId?: string;
}

const PrimaryText = ({
  children,
  className,
  style,
  disable,
  dataTestId,
}: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('text-base', className)}
      data-testid={dataTestId}
      style={{
        color: disable ? theme.text.disabled : theme.text.primary,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default PrimaryText;
