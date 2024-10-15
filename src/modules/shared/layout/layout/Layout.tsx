import React from 'react';
import cn from 'classnames';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Layout = ({ children: possibleChildren, className }: Props) => {
  const children = Array.isArray(possibleChildren)
    ? possibleChildren
    : [possibleChildren];

  return (
    <div className={cn('h-[100vh]', className)} data-testid="layout">
      {children.length === 3 && (
        <div className="flex flex-row">
          {children[1]}
          <div className="flex flex-grow flex-col overflow-hidden">
            <div className="flex min-h-[55px]">{children[0]}</div>
            <div className="flex h-[calc(100vh-55px)]">{children[2]}</div>
          </div>
        </div>
      )}
      {children.length === 2 && <div className="flex flex-row">{children}</div>}
      {children.length === 1 && children[0]}
    </div>
  );
};

export default Layout;
