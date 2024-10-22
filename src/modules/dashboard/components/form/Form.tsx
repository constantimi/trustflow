import cn from 'classnames';
import React, { ReactNode } from 'react';

interface Props {
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode | ReactNode[];
}

const Form = ({ className, onSubmit, children }: Props) => (
  <form
    onSubmit={onSubmit}
    className={cn('flex flex-shrink-0 items-center justify-center', className)}
    data-testid="form"
  >
    {children}
  </form>
);

export default Form;
