import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

const Topbar = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('h-full w-full', className)}
      style={{
        backgroundColor: theme.background.topbar,
      }}
      data-testid="topbarMain"
    >
      {children}
    </div>
  );
};

export default Topbar;
