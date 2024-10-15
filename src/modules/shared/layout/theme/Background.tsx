import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  dataTestId?: string;
};

const Background = ({ children, className, dataTestId }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('scrollbar h-full w-full overflow-y-auto', className)}
      style={{ backgroundColor: theme.background.main }}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};
export default Background;
