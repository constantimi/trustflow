import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

const Sidebar = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('h-[100%] w-full', className)}
      style={{
        backgroundColor: theme.background.sidebar,
      }}
      data-testid="sidebar"
    >
      {children}
    </div>
  );
};

export default Sidebar;
