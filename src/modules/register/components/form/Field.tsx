import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { nanoid } from '@reduxjs/toolkit';
import { Theme } from '../../../shared/layout/theme';
import { supportColors } from '../../../shared/constants/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { getTheme } from '../../../shared/store/app/theme';
import WarningIcon from '../../../shared/components/icons/WarningIcon';

interface Props {
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  className?: string;
}

const Field = ({
  label,
  type = 'text',
  placeholder,
  error,
  onChange,
  onBlur,
  disabled,
  value,
  className,
}: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <div className="flex w-full flex-shrink-0 justify-start">
          <Theme.PrimaryText className="text-base">{label}</Theme.PrimaryText>
        </div>
      )}
      <Theme.Input
        id={nanoid()}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          borderColor: error ? supportColors.red : theme.border.primary,
        }}
        className="flex h-[2.5rem] w-full rounded-md border-[1px] text-base"
        disabled={disabled}
      />

      <div className="flex h-[1.5rem] w-full flex-shrink-0 items-center justify-start">
        {error && (
          <div className="flex flex-row items-center gap-1">
            <WarningIcon fill={supportColors.red} />
            <Theme.ErrorText className="text-sm">{error}</Theme.ErrorText>
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;
