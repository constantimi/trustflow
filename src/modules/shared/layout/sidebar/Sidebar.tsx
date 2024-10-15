import React from 'react';
import cn from 'classnames';
import { Theme } from '../theme';
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
      className={cn(
        'h-[calc(100vh-55px)] w-1/6 flex-shrink-0 border-r-[2px]',
        className
      )}
      style={{
        borderColor: theme.background.topbar,
      }}
    >
      <Theme.Sidebar>{children}</Theme.Sidebar>
    </div>
  );
};
export default Sidebar;
